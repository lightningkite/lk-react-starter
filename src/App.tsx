import {LocalizationProvider} from "@mui/x-date-pickers"
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import type {User} from "api/sdk"
import {useSessionManager} from "api/useSessionManager"
import ErrorAlert from "components/ErrorAlert"
import Loading from "components/Loading"
import React, {useEffect, useState} from "react"
import {AuthRoutes, UnauthRoutes} from "routers"
import {AuthContext, UnauthContext} from "utils/context"

const App = () => {
  const {api, backendUrl, changeBackendURL, authenticate, isLoggedIn} =
    useSessionManager()

  const [currentUser, setCurrentUser] = useState<User | null>()

  useEffect(() => {
    if (isLoggedIn) {
      api.userAuth
        .getSelf()
        .then(setCurrentUser)
        .catch(() => setCurrentUser(null))
    } else {
      setCurrentUser(undefined)
    }
  }, [isLoggedIn])

  if (isLoggedIn && currentUser === undefined) {
    return <Loading />
  }

  if (currentUser === null) {
    return <ErrorAlert>Error loading current user</ErrorAlert>
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {isLoggedIn && currentUser ? (
        <AuthContext.Provider value={{api, currentUser, setCurrentUser}}>
          <AuthRoutes />
        </AuthContext.Provider>
      ) : (
        <UnauthContext.Provider
          value={{api, backendUrl, changeBackendURL, authenticate}}
        >
          <UnauthRoutes />
        </UnauthContext.Provider>
      )}
    </LocalizationProvider>
  )
}

export default App
