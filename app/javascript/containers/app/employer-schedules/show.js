import React, { Fragment } from "react"
import ReactiveRecord, { Member } from "reactiverecord"

const EmployerSchedule = ReactiveRecord.model("EmployerSchedule")

function EmployerSchedulesShow({
  match: {
    params: { id }
  },
  history: { push }
}) {
  return (
    <Member for={EmployerSchedule} find={parseInt(id)}>
      {employerSchedule => (
        <div>
          <h1>Employer Schedule #{id}</h1>
          {employerSchedule._request.status === 200 ? (
            <Fragment>
              <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(employerSchedule, null, 2) }} />
              <a
                href="#"
                onClick={event => {
                  event.preventDefault()
                  employerSchedule.destroy().then(() => {
                    push(`/employer-schedules`)
                  }).catch(() => {
                    alert("An error occured processing your request.")
                  })
                }}
              >
                Delete this
              </a>
            </Fragment>
          ) : "Loading..."}
        </div>
      )}
    </Member>
  )
}

export default EmployerSchedulesShow
