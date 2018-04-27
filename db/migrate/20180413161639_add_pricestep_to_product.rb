class AddPricestepToProduct < ActiveRecord::Migration[5.1]
  def change
    add_column :items, :price_step, :string
  end
end
