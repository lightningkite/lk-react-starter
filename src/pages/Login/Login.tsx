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
import EnterCode from "./EnterCode"
import EnterIdentifier from "./EnterIdentifier"

export const Login: FC = () => {
  const {api} = useContext(UnauthContext)

  const selectedBackendURL = (api as LiveApi | MockApi).httpUrl
  const isUsingCustomBackendURL = selectedBackendURL !== envBackendHTTP

  const [identifier, setIdentifier] = useState("")
  const [tempUUID, setTempUUID] = useState("")
  const [showDeveloperSettings, setShowDeveloperSettings] = useState(
    isUsingCustomBackendURL ||
      (envDeploymentType !== DeploymentType.PRODUCTION &&
        envDeploymentType !== DeploymentType.STAGING)
  )

  useEffect(() => {
    // If the user enters this secret code, force the developer settings to show (even on production)
    if (identifier === "info@lightningkite.com") {
      setShowDeveloperSettings(true)
    }
  }, [identifier])

  return !tempUUID ? (
    <>
      <EnterIdentifier
        identifier={identifier}
        setIdentifier={setIdentifier}
        setTempUUID={setTempUUID}
      />
      {showDeveloperSettings && <DeveloperOptions />}
    </>
  ) : (
    <EnterCode tempUUID={tempUUID} identifier={identifier} />
  )
}
