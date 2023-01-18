# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::Users::Sessions', type: :request do
  describe 'POST api/users/login' do
    context 'with valid parameters' do
      it 'It creates a user' do
        user = create(:user, password: "test1234", password_confirmation: "test1234")
        post user_session_path, params: { user: {
            email: user.email,
            password: user.password,
         }
        }

        expect(response.status).to eq 200

        expect(json_response['data'].keys).to match_array(%w[
          id email phone_no address name created_date invite_status
       ])
      end
    end

    context 'with invalid password' do
      it 'It returns an error' do
        user = create(:user, password: "test12345", password_confirmation: "test12345")
        post user_session_path, params: { user: {
            email: user.email,
            password: 'test12346',
         }
        }

        expect(response.status).to eq 401
        expect(json_response["error"]).to eq("Invalid Email or password.")
      end
    end
  end

  describe 'DELETE api/users/logout' do
    context 'with valid jwt' do
      it 'It logs out a user' do
        user = create(:user, password: "test1234", password_confirmation: "test1234")
        jwt_user = Devise::JWT::TestHelpers.auth_headers({}, user)
        delete destroy_user_session_path, headers: { "Authorization": jwt_user["Authorization"] }

        expect(response.status).to eq 200

        expect(json_response["message"]).to eq("logged out successfully")
      end
    end
  end
end
