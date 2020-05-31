import * as React from "react"
import routes from "./router/router"
import {useRoutes} from "hookrouter"

export default () => {
  const routeResult = useRoutes(routes)
  return (
    <div className="d-flex flex-row justify-content-center align-items-center h-100">
      {routeResult}
    </div>
  )
}