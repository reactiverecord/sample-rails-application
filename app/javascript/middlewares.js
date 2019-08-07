import { applyMiddleware } from "redux"
import ReactiveRecord, { middleware } from "reactiverecord"

export default otherMiddlewares => {
  const middlewares = [...otherMiddlewares]
  middlewares.push(ReactiveRecord::middleware())
  return applyMiddleware(...middlewares)
}
