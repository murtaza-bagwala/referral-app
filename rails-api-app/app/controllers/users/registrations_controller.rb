# frozen_string_literal: true

module Users
  class RegistrationsController < Devise::RegistrationsController
    before_action :configure_sign_up_params, only: [:create]
    respond_to :json

    protected

    def configure_sign_up_params
      devise_parameter_sanitizer.permit(:sign_up, keys: %i[name address email phone_no])
    end

    private

    def respond_with(resource, _opts = {})
      if resource.persisted?
        render json: {
          status: { status: 201, message: 'Signed up sucessfully.' },
          data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
        }
      else
        handle_validation_error(resource)
      end
    end
  end
end
