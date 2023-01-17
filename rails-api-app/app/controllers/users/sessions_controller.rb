# frozen_string_literal: true

module Users
  class SessionsController < Devise::SessionsController
    respond_to :json

    def destroy
      current_user.invalidate_all_sessions!
      super
    end

    private

    def respond_with(resource, _opts = {})
      render json: {
        status: { code: 200, message: 'Logged in sucessfully.' },
        data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
      }, status: :ok
    end

    def respond_to_on_destroy
      jwt_payload = JWT.decode(request.headers['Authorization']
        .split[1], Rails.application.credentials.fetch(:secret_key_base))
      jti = jwt_payload.first['jti']
      current_user = User.find_by_jti(jti)

      if current_user
        render json: {
          status: 200,
          message: 'logged out successfully'
        }, status: :ok
      else
        handle_not_found_error
      end
    end
  end
end
