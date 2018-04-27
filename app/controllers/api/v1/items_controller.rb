module Api
	class V1::ItemsController < ApplicationController
		  protect_from_forgery except: :update

		def index
			@items = Item.where('closing_time > ?', Time.now - 1.hour)
			render json: @items, status: :ok
		end

		def update
			@item = Item.find_by(:id => params[:id])

			@item.opening_price = params[:item][:opening_price] if params[:item][:opening_price]
			@item.toggle(:is_ended) if params[:item][:is_ended]
			if @item.save
				render json: @item, status: :ok
			else
				render json: @item, status: :error
			end
		end
	end
end