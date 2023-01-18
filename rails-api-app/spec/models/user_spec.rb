# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    subject { build(:user, password: "test", password_confirmation: "test") }

    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:password) }
  end

  describe 'associations' do
    subject { build(:user, password: "test", password_confirmation: "test") }

    it { is_expected.to have_many(:invitations) }
  end
end
