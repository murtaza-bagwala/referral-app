# frozen_string_literal: true

class ApplicationController < ActionController::API
  def handle_not_found_error(exception = nil)
    message = exception && exception.message || I18n.t('errors.not_found')

    render json: { errors: [message] }, status: :not_found
  end

  def handle_validation_error(resource)
    render json: { errors: resource.errors.full_messages.to_sentence.to_s }, status: 422
  end
end
