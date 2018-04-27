class StaticPagesController < ApplicationController
  def index
  	@items = Item.where("closing_time > ?", Time.now)
  end
end
