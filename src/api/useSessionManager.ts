import {useState} from "react"
import {LocalStorageKey} from "utils/constants"
import {envBackendHTTP} from "utils/helpers/envHelpers"
import {MockApi} from "./mockApi"
import {Api, LiveApi, RequesterSession} from "./sdk"

export interface URLOption {
  url: string
  label: string
}

export const backendURLOptions: URLOption[] = [
  {
    label: "Dev",
    url: "https://dev.example.com/api"
  },
  {
    label: "Stage",
    url: "https://stage.example.com/api"
  },
  {
    label: "Prod",
    url: "https://prod.example.com/api"
  }
]

if (
  envBackendHTTP &&
  !backendURLOptions.some((o) => o.url === envBackendHTTP)
) {
  backendURLOptions.push({label: "Custom Env Default", url: envBackendHTTP})
}

export const useSessionManager = (): {
  api: Api
  changeBackendURL: (backendURL: string) => void
  session: RequesterSession | null | undefined
  authenticate: (userToken: string) => void
  logout: () => void
} => {
  // Undefined if it's waiting, null if not logged in, and a session if logged in
  const [session, setSession] = useState<RequesterSession | null | undefined>(
    localStorage.getItem(LocalStorageKey.USER_TOKEN) ? undefined : null
  )

  const [api, setApi] = useState<Api>(() => {
    const localStorageBackendURL = localStorage.getItem(
      LocalStorageKey.BACKEND_URL
    )
    const urlToUse = localStorageBackendURL ?? envBackendHTTP

    if (!urlToUse)
      return new LiveApi(envBackendHTTP ?? backendURLOptions[0].url)
    if (urlToUse === "mock") return new MockApi()
    return new LiveApi(urlToUse)
  })

  const authenticate = (userToken: string) => {
    setSession(new RequesterSession(api, userToken))
    localStorage.setItem(LocalStorageKey.USER_TOKEN, userToken)
  }

  const logout = (): void => {
    localStorage.removeItem(LocalStorageKey.USER_TOKEN)
    window.location.href = "/"
  }

  const changeBackendURL = (backendURL: string) => {
    localStorage.setItem(LocalStorageKey.BACKEND_URL, backendURL)
    if (backendURL === "mock") {
      setApi(new MockApi())
    } else {
      setApi(new LiveApi(backendURL))
    }
  }

  return {
    api,
    changeBackendURL,
    session,
    authenticate,
    logout
  }
}
