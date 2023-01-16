# frozen_string_literal: true

module Users
  class RegistrationsController < Devise::RegistrationsController
    before_action :configure_sign_up_params, only: [:create]
    respond_to :json

    # GET /resource/sign_up
    # def new
    #   super
    # end

    # POST /resource
    # def create
    #   super do |resource|
    #     resource.provider = 'mobile'
    #   end
    # end

    # GET /resource/edit
    # def edit
    #   super
    # end

    # PUT /resource
    # def update
    #   super
    # end

    # DELETE /resource
    # def destroy
    #   super
    # end

    # GET /resource/cancel
    # Forces the session data which is usually expired after sign
    # in to be expired now. This is useful if the user wants to
    # cancel oauth signing in/up in the middle of the process,
    # removing all OAuth session data.
    # def cancel
    #   super
    # end

    protected

    def configure_sign_up_params
      devise_parameter_sanitizer.permit(:sign_up, keys: %i[name address email phone_no])
    end

    private

    def respond_with(resource, _opts = {})
      if resource.persisted?
        render json: {
          status: { code: 200, message: 'Signed up sucessfully.' },
          data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
        }
      else
        render json: {
          status: { message: "User couldn't be created successfully. #{resource.errors.full_messages.to_sentence}" }
        }, status: :unprocessable_entity
      end
    end

    # The path used after sign up.
    # def after_sign_up_path_for(resource)
    #   super(resource)
    # end

    # The path used after sign up for inactive accounts.
    # def after_inactive_sign_up_path_for(resource)
    #   super(resource)
    # end
  end
end
