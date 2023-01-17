# frozen_string_literal: true

class UserMailer < ApplicationMailer
  def invitation_email(invite, invite_url)
    @invite = invite
    @invite_url = invite_url
    mail(to: invite.email, subject: 'Invite to Referral App')
  end
end
