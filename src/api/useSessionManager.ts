import {useMemo} from "react"
import {MockApi} from "./mockApi"
import {LiveApi} from "./sdk"
import {
  createBasicFetcher,
  createBulkFetcher
} from "@lightningkite/lightning-server-simplified"
import {usePersistentState} from "@lightningkite/mui-lightning-components"

export const useSessionManager = () => {
  const [backendUrl, setBackendUrl] = usePersistentState<string>(
    "backend-url",
    import.meta.env.VITE_BACKEND_HTTP_URL || "mock"
  )
  const [sessionToken, setSessionToken] = usePersistentState<string>(
    "session-token",
    ""
  )

  // Update the user token in local storage when it changes

  const getAccessToken = useMemo(() => {
    const api = new LiveApi(createBasicFetcher(backendUrl, () => ({})))

    let lastPull = new Date()
    let accessToken = ""

    return async () => {
      // refresh after 3 minutes
      const timedOut =
        new Date().getTime() - lastPull.getTime() > 1_000 * 60 * 3

      if (!accessToken || timedOut) {
        lastPull = new Date()
        return api.userAuth.getTokenSimple(sessionToken).then((res) => {
          accessToken = res
          return res
        })
      }
      return accessToken
    }
  }, [backendUrl, sessionToken])

  const api = useMemo(() => {
    if (backendUrl === "mock") {
      return new MockApi()
    }

    if (sessionToken) {
      return new LiveApi(
        createBulkFetcher({
          serverUrl: backendUrl,
          headerCalculator: async () => ({
            Authorization: `Bearer ${await getAccessToken()}`
          })
        })
      )
    }
    return new LiveApi(createBulkFetcher({serverUrl: backendUrl}))
  }, [sessionToken, backendUrl])

  function changeToken(userToken: string) {
    const url = new URL(window.location.href)

    if (url.searchParams.get("jwt")) {
      url.searchParams.delete("jwt")
      window.history.replaceState({}, "", url.toString())
    }
    setSessionToken(userToken)
  }

  return {
    api,
    backendUrl,
    changeBackendURL: setBackendUrl,
    authenticate: changeToken,
    isLoggedIn: !!sessionToken
  }
}

export function logout(): void {
  localStorage.removeItem("session-token")
  window.location.reload()
}
