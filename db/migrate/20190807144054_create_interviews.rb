class CreateInterviews < ActiveRecord::Migration[5.2]
  def change
    create_table :interviews do |t|
      t.belongs_to :employer_schedule
    end
  end
end
