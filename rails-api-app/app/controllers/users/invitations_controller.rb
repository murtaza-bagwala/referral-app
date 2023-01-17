# frozen_string_literal: true

module Users
  class InvitationsController < Devise::InvitationsController
    before_action :authenticate_user!

    def create
      invite = User.invite!(
        { email: invite_params[:email], skip_invitation: true, invitation_sent_at: DateTime.now }, current_user
      )
      invite_url = accept_user_invitation_url(invitation_token: invite.raw_invitation_token)
      UserMailer.invitation_email(invite, invite_url).deliver_now
      render json: { status: :ok }
    rescue ex
      handle_validation_error(invite)
    end

    def update
      super do |resource|
        if resource.errors.empty?
          render json: { status: 'Invitation Accepted!' }, status: 200 and return
        else
          render json: resource.errors, status: 401 and return
        end
      end
    end
  end
end
