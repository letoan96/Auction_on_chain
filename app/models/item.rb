class Item < ApplicationRecord
	validates :name, :description, :address, :opening_price, :closing_time, presence: true
end
