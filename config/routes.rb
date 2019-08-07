Rails.application.routes.draw do
  root "pages#react_root"
  resources :employer_schedules, only: %i[index new show], path: "employer-schedules", to: "pages#react_root"
  # resources :interviews, only: %i[index new show], path: "employer-schedules"

  namespace :api, defaults: { format: :json } do
    resources :employer_schedules, only: %i[index create show destroy], path: "employer-schedules" do
      collection do
        get :email_exists
      end
    end
    # resources :interviews, only: %i[index create show destroy]
  end
end
