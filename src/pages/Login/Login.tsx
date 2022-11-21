import {MockApi} from "api/mockApi"
import {LiveApi} from "api/sdk"
import {UnauthContext} from "App"
import React, {FC, useContext, useEffect, useState} from "react"
import {
  DeploymentType,
  envBackendHTTP,
  envDeploymentType
} from "utils/helpers/envHelpers"
import DeveloperOptions from "./DeveloperOptions"
import EnterEmail from "./EnterEmail"
import EnterPin from "./EnterPin"

export const Login: FC = () => {
  const {api} = useContext(UnauthContext)

  const selectedBackendURL = (api as LiveApi | MockApi).httpUrl
  const isUsingCustomBackendURL = selectedBackendURL !== envBackendHTTP

  const [isEmailSent, setIsEmailSent] = useState(false)
  const [email, setEmail] = useState("")
  // Show extra developer options for switching the backend URL
  const [showDeveloperSettings, setShowDeveloperSettings] = useState(
    isUsingCustomBackendURL || envDeploymentType === DeploymentType.LOCAL
  )

  const sendEmail = () =>
    api.auth.emailLoginLink(email).then(() => setIsEmailSent(true))

  useEffect(() => {
    // If the user enters this secret code, force the developer settings to show (even on production)
    if (email === "info@lightningkite.com") {
      setShowDeveloperSettings(true)
    }
  }, [email])

  return !isEmailSent ? (
    <>
      <EnterEmail email={email} setEmail={setEmail} sendEmail={sendEmail} />
      {showDeveloperSettings && <DeveloperOptions />}
    </>
  ) : (
    <EnterPin email={email} />
  )
}
