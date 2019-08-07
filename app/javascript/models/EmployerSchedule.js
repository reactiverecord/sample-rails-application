import ReactiveRecord, { Model } from "reactiverecord"

class EmployerSchedule extends Model {
  static schema = {
    start_time: Date,
    email: {
      labelText: "E-mail address",
      type: String,
    },
  }
}

export default ReactiveRecord.model("EmployerSchedule", EmployerSchedule)
