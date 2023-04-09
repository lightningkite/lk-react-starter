import {Login} from "pages/Login"
import React, {FC} from "react"
import {Navigate, Route, Routes} from "react-router-dom"

const UnauthRoutes: FC = () => {
  return (
    <Routes>
      <Route>
        <Route path="/login" element={<Login />} />
        {/* Add another route here if you want a sign-up screen, or any other unauthenticated routes */}

        <Route
          path="*"
          element={<Navigate to={getLoginRedirectURL()} replace />}
        />
      </Route>
    </Routes>
  )
}

/**
 * @returns a URL where the path is "/login" and the next query parameter is the current path. Other query parameters are preserved.
 */
function getLoginRedirectURL(): string {
  const url = new URL(location.href)
  const nextPath = url.pathname
  url.pathname = "/login"
  url.searchParams.set("next", nextPath)

  return url.pathname + url.search
}

export default UnauthRoutes
