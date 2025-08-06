import Loading from "components/Loading"
import MainLayout from "layouts/MainLayout"
import type {FC} from "react"
import React, {Suspense} from "react"
import {Navigate, RouterProvider, createBrowserRouter} from "react-router-dom"

// Code Splitting: This downloads the code for each page the first time the user
// navigates to it. This is highly recommended for large apps since it reduces
// the initial bundle size and improves performance.
const Home = React.lazy(() => import("pages/Home"))
const UserIndex = React.lazy(() => import("pages/UserIndex"))
const UserDetail = React.lazy(() => import("pages/UserDetail"))
const FormikInputDemo = React.lazy(() => import("pages/FormikInputDemo"))

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/users",
        element: <UserIndex />
      },
      {
        path: "/users/:userId",
        element: <UserDetail />
      },
      {
        path: "/input-demo",
        element: <FormikInputDemo />
      },
      {
        index: true,
        element: <Navigate to={getUrlFromNextParam() ?? "/home"} replace />
      },
      {
        path: "*",
        element: <Navigate to={getUrlFromNextParam() ?? "/home"} replace />
      }
    ]
  }
])

const AuthRoutes: FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

/**
 *
 * @returns a URL where the path is from the next query parameter, preserve the other query parameters
 */
function getUrlFromNextParam(): string | null {
  if (location.pathname !== "/login") return null

  // Return a URL where the path is from the next query parameter, preserve the other query parameters
  const url = new URL(location.href)
  const nextPath = url.searchParams.get("next")
  if (!nextPath) return null

  url.pathname = nextPath
  url.searchParams.delete("next")

  return url.pathname + url.search
}

export default AuthRoutes
