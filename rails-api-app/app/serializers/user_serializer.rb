# frozen_string_literal: true

class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :email, :phone_no, :address, :name

  attribute :created_date do |user|
    user.created_at&.strftime('%d/%m/%Y')
  end

  attribute :invite_status do  |user|
    user.invitation_accepted_at ? :accepted : :unaccepted
  end
end
