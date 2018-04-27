class CreateItems < ActiveRecord::Migration[5.1]
  def change
    create_table :items do |t|
      t.string :name
      t.string :description
      t.string :address
      t.string :image
      t.float :opening_price
      t.datetime :closing_time

      t.timestamps
    end
  end
end
