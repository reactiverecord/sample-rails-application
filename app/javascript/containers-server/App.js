import React from "react"
import { Provider } from "react-redux"
import storeBuilder from "storeBuilder"
import reducer from "reducer"
import App from "containers/app"

export default function({ location, INITIAL_STATE }) {
  const store = storeBuilder(INITIAL_STATE, reducer)

  return (
    <Provider store={store}>
      <App location={location} />
    </Provider>
  )
}
