import withSideEffect from "react-side-effect"

function DocumentTitle({ children }) {
  return children
}

function reducePropsToState(propsList) {
  var innermostProps = propsList[propsList.length - 1]
  if (innermostProps) {
    return innermostProps.title
  }
}

function handleStateChangeOnClient(title) {
  document.title = title || ""
}

export default withSideEffect(reducePropsToState, handleStateChangeOnClient)(DocumentTitle)
