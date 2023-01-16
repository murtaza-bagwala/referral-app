class AddCustomAttributesToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :name, :string
    add_column :users, :address, :text
    add_column :users, :phone_no, :string
  end
end
