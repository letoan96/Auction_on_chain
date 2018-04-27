require 'ethereum.rb'

class ItemsController < ApplicationController
  def new
    @item = Item.new
  end

  def create
  	@item = Item.new item_params
    client = Ethereum::HttpClient.new('http://127.0.0.1:8545')
    Ethereum::Contract.create(file: "/Users/letoan/Auction/public/Auction.sol", client: client)
    contract = Auction.new

    @item.closing_time = Time.now + params[:item][:closing_time].to_i.hours
    @item.price_step = params[:item][:price_step].to_i 
    address = contract.deploy_and_wait(1, params[:item][:opening_price].to_i , params[:item][:closing_time].to_i)
    # binding.pry
    @item.address = address
  	if @item.save
      flash[:success] = "Posted"
  		redirect_to root_url
  	else
  		flash.now[:error] = "All fields must be filled!!!"
      render :new
  	end
  end

  private
  def item_params
  	params.require(:item).permit(:name, :description, :image, :closing_time, :opening_price, :price_step)
  end
end
