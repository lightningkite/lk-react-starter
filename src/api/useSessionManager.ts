import {useState} from "react"
import {LocalStorageKey} from "utils/constants"
import {envBackendHTTP} from "utils/helpers/envHelpers"
import {MockApi} from "./mockApi"
import {Api, LiveApi, UserSession} from "./sdk"

export interface URLOption {
  url: string
  label: string
}

export const backendURLOptions: URLOption[] = [
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
  session: UserSession | null
  authenticate: (userToken: string) => void
  logout: () => void
} => {
  const [api, setApi] = useState<Api>(() => {
    const localStorageBackendURL = localStorage.getItem(
      LocalStorageKey.BACKEND_URL
    )

    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const initialBackendURL = localStorageBackendURL || envBackendHTTP || "mock"

    if (localStorageBackendURL !== initialBackendURL) {
      localStorage.setItem(LocalStorageKey.BACKEND_URL, initialBackendURL)
    }

    if (initialBackendURL === "mock") return new MockApi()
    return new LiveApi(initialBackendURL)
  })

  // Null if not logged in, a session if logged in
  const [session, setSession] = useState<UserSession | null>(() => {
    const token = localStorage.getItem(LocalStorageKey.USER_TOKEN)

    if (token) {
      return new UserSession(api, token)
    }
    return null
  })

  const authenticate = (userToken: string) => {
    setSession(new UserSession(api, userToken))
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
