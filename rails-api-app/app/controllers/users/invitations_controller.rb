# frozen_string_literal: true

module Users
  class InvitationsController < Devise::InvitationsController
    before_action :authenticate_user!

    def create
      invite = User.invite!(
        { email: invite_params[:email], skip_invitation: true, invitation_sent_at: DateTime.now }, current_user
      )
      return handle_validation_error(invite) if invite.errors.present?

      invite_url = "#{ENV.fetch('REACT_HOST', nil)}?invitation_token=#{invite.raw_invitation_token}"
      UserMailer.invitation_email(invite, invite_url).deliver_now
      render json: { status: :ok }
    end

    def invited_by_user
      invitations = current_user.invitations
      render json: {
        referralList: UserSerializer.new(invitations).serializable_hash[:data].map { |data| data[:attributes] }
      }, status: :ok
    end

    def update
      super do |resource|
        if resource.errors.empty?
          render json: { message: 'Invitation Accepted!', status: 200 }, status: 200 and return
        else
          handle_validation_error(resource) and return
        end
      end
    end
  end
end
