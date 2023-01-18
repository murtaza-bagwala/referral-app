# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::Users::Registrattions', type: :request do
  describe 'POST api/users/signup' do
    context 'with valid parameters' do
      it 'It creates a user' do
        post user_registration_path, params: { user: {
            name: Faker::Name.name,
            phone_no: Faker::PhoneNumber.cell_phone_in_e164,
            address: Faker::Educator.university,
            email: Faker::Internet.email,
            password: 'test1234',
            password_confirmation: 'test1234'
         }
        }

        expect(response.status).to eq 200

        expect(json_response['data'].keys).to match_array(%w[
                                                              id email phone_no address name created_date invite_status
                                                                        ])
      end
    end

    context 'with invalid parameters' do
      it 'It returns an error' do
        post user_registration_path, params: { user: {
            name: Faker::Name.name,
            phone_no: Faker::PhoneNumber.cell_phone_in_e164,
            address: Faker::Educator.university,
            password: 'test1234',
            password_confirmation: 'test1234'
         }
        }

        expect(response.status).to eq 422
        expect(json_response['errors']).to include("Email can't be blank")
      end
    end
  end
end
