Rails.application.routes.draw do
  scope :api, defaults: { format: :json } do
    devise_for :users, path_names: {
      sign_in: 'login',
      sign_out: 'logout',
      registration: 'signup'
    },
    controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations',
      invitations: 'users/invitations',
    }
  end
end
