class EmployerSchedule < ApplicationRecord
  has_many :interviews
  validates :start_time, presence: true
  validates :email, uniqueness: true
  # validates :email, presence: true, email: true
end
