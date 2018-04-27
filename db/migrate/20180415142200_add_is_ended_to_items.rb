class AddIsEndedToItems < ActiveRecord::Migration[5.1]
  def change
    add_column :items, :is_ended, :boolean, default: false
  end
end
