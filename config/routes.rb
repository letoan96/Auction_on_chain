Rails.application.routes.draw do

  get 'auction/new', to: 'items#new'
  post 'auction/new' ,to: 'items#create'
  namespace :api do
  	namespace :v1 do
  		resources :items, only: [:index, :update]
  	end
  end

  devise_for :users
  root 'static_pages#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
