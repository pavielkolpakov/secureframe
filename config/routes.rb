Rails.application.routes.draw do
  resources :coaches, only: [:index]
  resources :appointment, only: [:index, :create]
end
