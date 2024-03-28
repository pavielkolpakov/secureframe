class CreateAppointments < ActiveRecord::Migration[7.1]
  def change
    create_table :appointments do |t|
      t.string :name
      t.string :email
      t.references :coach, null: false, foreign_key: true
      t.datetime :date

      t.timestamps
    end
  end
end
