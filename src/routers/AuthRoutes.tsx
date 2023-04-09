import Loading from "components/Loading"
import React, {FC, Suspense} from "react"
import {Navigate, Route, Routes} from "react-router-dom"

// Code Splitting: This downloads the code for each page the first time the user
// navigates to it. This is highly recommended for large apps since it reduces
// the initial bundle size and improves performance.
const Home = React.lazy(() => import("pages/Home"))
const UserIndex = React.lazy(() => import("pages/UserIndex"))
const UserDetail = React.lazy(() => import("pages/UserDetail"))
const FormikInputDemo = React.lazy(() => import("pages/FormikInputDemo"))

const AuthRoutes: FC = () => {
  return (
    // The Suspense component is used to show a loading indicator while the
    // code for the page is being downloaded. (see above)
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserIndex />} />
          <Route path="/users/:userId" element={<UserDetail />} />
          <Route path="/input-demo" element={<FormikInputDemo />} />

          <Route
            path="*"
            element={<Navigate to={getUrlFromNextParam() ?? "/"} replace />}
          />
        </Route>
      </Routes>
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
