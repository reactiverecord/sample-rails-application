import React, { Fragment } from "react"
import ReactiveRecord, { Collection } from "reactiverecord"
import { Link } from "react-router-dom"

const EmployerSchedule = ReactiveRecord.model("EmployerSchedule")

function EmployerSchedulesIndex() {
  return (
    <Collection for={EmployerSchedule}>
      {employerSchedules => (
        <div>
          Employer Schedules:<br />
          <Link to={"/employer-schedules/new"}>Create New</Link>
          {employerSchedules.map(employerSchedule => (
            <Fragment key={employerSchedule.id}>
              <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(employerSchedule, null, 2) }} />
              <Link to={`/employer-schedules/${employerSchedule.id}`}>View</Link>
            </Fragment>
          ))}
        </div>
      )}
    </Collection>
  )
}

export default EmployerSchedulesIndex
