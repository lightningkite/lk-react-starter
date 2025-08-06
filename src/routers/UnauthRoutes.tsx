import Loading from "components/Loading"
import UnauthLayout from "layouts/UnauthLayout"
import {Login} from "pages/Login"
import {Suspense, type FC} from "react"

import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    Component: UnauthLayout,
    children: [
      {
        path: "/login",
        Component: Login
      },
      {
        index: true,
        element: <Navigate to={getLoginRedirectURL() ?? "/login"} replace />
      },
      {
        path: "*",
        element: <Navigate to={getLoginRedirectURL() ?? "/login"} replace />
      }
    ]
  }
])

const UnauthRoutes: FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
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
