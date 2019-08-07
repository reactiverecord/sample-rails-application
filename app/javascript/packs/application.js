import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import storeBuilder from "storeBuilder"
import reducer from "reducer"
import ReactiveRecord from "reactiverecord"
import App from "containers/app"

let reactDOMMethod = "render"
const mountPoint = document.querySelector("div[data-react-class=App]")
if (mountPoint.firstChild) {
  reactDOMMethod = "hydrate"
}
const props = mountPoint.getAttribute("data-react-props")
const { INITIAL_STATE } = JSON.parse(props)
const store = storeBuilder(INITIAL_STATE, reducer)
ReactiveRecord.setAPI({ prefix: "/api" })
ReactiveRecord.store = store
ReactiveRecord.dispatch = store.dispatch

ReactDOM[reactDOMMethod](
  <Provider store={store}>
    <App />
  </Provider>,
  mountPoint
)
