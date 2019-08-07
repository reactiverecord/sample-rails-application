class AddEmailToEmployerSchedules < ActiveRecord::Migration[5.2]
  def change
    add_column :employer_schedules, :email, :string
  end
end
