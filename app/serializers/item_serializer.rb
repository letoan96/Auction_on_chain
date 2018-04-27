class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :price_step, :description, :address, :image, :opening_price, :closing_time, :time_left, :is_ended

  def time_left
  	time_left_calculate
  end

private
  def time_left_calculate
  	close = object.closing_time.to_time
  	now = Time.now
  	seconds_left = close - now
  	return { "hours" => 0, "minutes" => 0, "seconds" => 0} if (seconds_left <= 0)
  	hours_left, seconds_left = seconds_left.divmod(3600)
  	minutes_left, seconds_left = seconds_left.divmod(60)
  	seconds_left = seconds_left.round(0)

  	a = { "hours" => hours_left, "minutes" => minutes_left, "seconds" => seconds_left}
  	return a
  end

end
