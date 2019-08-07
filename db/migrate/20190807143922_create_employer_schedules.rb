class CreateEmployerSchedules < ActiveRecord::Migration[5.2]
  def change
    create_table :employer_schedules do |t|
      t.datetime :start_time
    end
  end
end
