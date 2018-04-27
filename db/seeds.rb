# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
	def end_time
		Time.now + rand(1..3).days
	end
	
	# Item.create(name: 'Macbook Pro', description: 'Macbook Pro 15 inch 2017 16gb DDR4 512GB SSD perfect condition', address: "0x123456879123432", image: 'http://hoangphat360.vn/uploads/img_content/macbook-pro-2016-21.jpg', opening_price: 3, closing_time: end_time)
	Item.create(name: 'Logitech G903', description: 'Logitech G903 like new', address: "0x12345687679123432", image: 'http://www.tncstore.vn/image/catalog/BAI%20VIET/logitech%20G903/mo-hop-va-tren-tay-nhanh-chuot-logitech-g903-lightspeed-tncstore-9.jpg', opening_price: 3, closing_time: end_time)
	