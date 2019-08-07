import React, { Component, Fragment } from "react"
import ReactiveRecord, { Form } from "reactiverecord"
import Input from "ui/Input"

const EmployerSchedule = ReactiveRecord.model("EmployerSchedule")

class EmployerSchedulesNew extends Component {
  employerSchedule = new EmployerSchedule()
  render() {
    return (
      <Form afterSave={this.handleAfterSave} for={this.employerSchedule}>
        {fields => (
          <Fragment>
            <h1>New Employer Schedule</h1>
            <Input type="date" {...fields.start_time} />
            <br />
            <Input {...fields.email} />
            <div>
              <button {...fields.submit}>Save</button>
            </div>
          </Fragment>
        )}
      </Form>
    )
  }

  handleAfterSave = employerSchedule => {
    this.props.history.push(`/employer-schedules/${employerSchedule.id}`)
  }
}

export default EmployerSchedulesNew
