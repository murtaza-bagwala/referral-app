# frozen_string_literal: true

class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable

  devise :invitable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  validates :phone_no, uniqueness: true, presence: true, numericality: true,
                       length: { minimum: 10, maximum: 15 }
  validates :name, uniqueness: true, format: { with: /\A[^0-9`!@#$%\^&*+_=]+\z/ }, presence: true

  has_many :invitations, class_name: 'User', as: :invited_by

  def authenticatable_salt
    "#{super}#{session_token}"
  end

  def invalidate_all_sessions!
    update_attribute(:session_token, SecureRandom.hex)
  end
end
