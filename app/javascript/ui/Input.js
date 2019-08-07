import React, { Fragment, forwardRef } from "react"
import { validated } from "reactiverecord"

function InputComponent({ labelText, errorText, forwardedRef, validating, ...props }) {
  return (
    <label>
      {labelText}: <input disabled={validating} {...props} ref={forwardedRef} />
      {errorText ? (
        <Fragment>
          <br />
          {errorText}
        </Fragment>
      ) : null}
    </label>
  )
}

const Input = forwardRef((props, ref) => <InputComponent {...props} forwardedRef={ref} />)

const ValidatedInput = validated(Input)

export default ValidatedInput
