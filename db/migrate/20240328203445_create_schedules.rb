class CreateSchedules < ActiveRecord::Migration[7.1]
  def change
    create_table :schedules do |t|
      t.references :coach, null: false, foreign_key: true
      t.string :day_of_the_week
      t.string :available_at
      t.string :available_until

      t.timestamps
    end
  end
end
