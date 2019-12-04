import { createStore, compose } from "redux"
import middlewares from "middlewares"
import { canUseDOM } from "utils"

let reduxDevTools = cs => cs
if (canUseDOM && window.__REDUX_DEVTOOLS_EXTENSION__) {
  reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__()
}

export default function storeBuilder(initialState, reducer, ...otherMiddlewares) {
  const createStoreArgs = [reducer]
  const storeEnhancers = [middlewares(otherMiddlewares)]

  if (initialState) {
    createStoreArgs.push(initialState)
  }

  if (process.env.NODE_ENV !== "production") {
    storeEnhancers.push(reduxDevTools)
  }

  return createStore(...createStoreArgs, compose(...storeEnhancers))
}
