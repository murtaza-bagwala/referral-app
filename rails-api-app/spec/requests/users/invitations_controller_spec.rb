# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::Users::Invitations', type: :request do
  describe 'POST api/users/invitation' do
    context 'with valid parameters' do
      it 'It creates an invite for user' do
        user = create(:user, password: "test1234", password_confirmation: "test1234")
        jwt_user = Devise::JWT::TestHelpers.auth_headers({}, user)
        post user_invitation_path, params: { user: {
            email: Faker::Internet.email,
         }
        }, headers: { "Authorization": jwt_user["Authorization"] }

        expect(response.status).to eq 200

        expect(json_response["status"]).to eq("ok")
      end
    end

    context 'with invalid parameters' do
      it 'It returns an error' do
        user = create(:user, password: "test1234", password_confirmation: "test1234")
        jwt_user = Devise::JWT::TestHelpers.auth_headers({}, user)
        post user_invitation_path, params: { user: {
            email: "s"
         }
        }, headers: { "Authorization": jwt_user["Authorization"] }

        expect(response.status).to eq 422
        expect(json_response["errors"]).to eq("Email is invalid")
      end
    end
  end

  describe 'GET api/users/invitations/invited_by_user' do
    context 'with valid parameters' do
      it 'It returns a list of users invited by the current user' do
        user = create(:user, password: "test1234", password_confirmation: "test1234")
        User.invite!(
        { email: "bagwalamurtaza@gmail.com", skip_invitation: true, invitation_sent_at: DateTime.now }, user
        )
        User.invite!(
        { email: "bagwalamurtaza@yahoo.com", skip_invitation: true, invitation_sent_at: DateTime.now }, user
        )
        jwt_user = Devise::JWT::TestHelpers.auth_headers({}, user)
        get users_invitations_invited_by_user_path, headers: { "Authorization": jwt_user["Authorization"] }

        expect(response.status).to eq 200

        expect(json_response["referralList"][0]["email"]).to eq("bagwalamurtaza@gmail.com")
        expect(json_response["referralList"][1]["email"]).to eq("bagwalamurtaza@yahoo.com")
      end
    end
  end

  describe 'PUT api/users/invitation' do
    context 'with valid parameters' do
      it 'It accepts an invite' do
        user = create(:user, password: "test1234", password_confirmation: "test1234")
        invite = User.invite!(
        { email: "bagwalamurtaza@gmail.com", skip_invitation: true, invitation_sent_at: DateTime.now }, user
        )
        put user_invitation_path, params: { user: {
            password: "test12345",
            password_confirmation: "test12345",
            invitation_token: invite.raw_invitation_token,
         }
        }

        expect(response.status).to eq 200
        expect(json_response["message"]).to eq("Invitation Accepted!")
      end
    end

    context 'with invalid parameters' do
        it 'It returns an error' do
          user = create(:user, password: "test1234", password_confirmation: "test1234")
          invite = User.invite!(
          { email: "bagwalamurtaza@gmail.com", skip_invitation: true, invitation_sent_at: DateTime.now }, user
          )
          put user_invitation_path, params: { user: {
              password: "test12345",
              password_confirmation: "test12345",
              invitation_token: "1234"
           }
          }
  
          expect(response.status).to eq 422
          expect(json_response["errors"]).to eq("Invitation token is invalid")
        end
      end
  end
end
