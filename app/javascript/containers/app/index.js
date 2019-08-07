import React from "react"
import { hot } from "react-hot-loader"
import { BrowserRouter, Route } from "react-router-dom"
import { StaticRouter, Switch } from "react-router"
import { canUseDOM } from "utils"
import EmployerSchedulesIndex from "./employer-schedules"
import EmployerSchedulesNew from "./employer-schedules/new"
import EmployerSchedulesShow from "./employer-schedules/show"

const Router = canUseDOM ? BrowserRouter : StaticRouter

function App({ location }) {
  const propsForRouter = canUseDOM ? {} : { location, context: {} }
  return (
    <Router {...propsForRouter}>
      <Switch>
        <Route path="/employer-schedules" exact component={EmployerSchedulesIndex} />
        <Route path="/employer-schedules/new" exact component={EmployerSchedulesNew} />
        <Route path="/employer-schedules/:id" exact component={EmployerSchedulesShow} />
      </Switch>
    </Router>
  )
}

export default hot(module)(App)
