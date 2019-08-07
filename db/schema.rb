ActiveRecord::Schema.define(version: 2019_08_07_164351) do

  create_table "employer_schedules", force: :cascade do |t|
    t.datetime "start_time"
    t.string "email"
  end

  create_table "interviews", force: :cascade do |t|
    t.bigint "employer_schedule_id"
    t.index ["employer_schedule_id"], name: "index_interviews_on_employer_schedule_id"
  end

end
