import * as React from "react"
import {A} from "hookrouter"
export default () => {
  return (
    <div className="d-flex flex-column">
      <A className="btn btn-primary mb-2" href="/with-person">I want to play with friend</A>
      <A className="btn btn-secondary"href="/with-ai">I want to play against AI</A>
    </div>
  )
}