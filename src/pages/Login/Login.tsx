import type {FC} from "react"
import React, {useContext, useEffect, useState} from "react"
import {UnauthContext} from "utils/context"
import DeveloperOptions, {DEVELOPER_SECRET_CODE} from "./DeveloperOptions"
import EnterEmail from "./EnterEmail"
import EnterPin from "./EnterPin"

export const Login: FC = () => {
  const {api, backendUrl} = useContext(UnauthContext)

  const isUsingCustomBackendURL =
    backendUrl !== import.meta.env.VITE_BACKEND_HTTP_URL

  const [tempId, setTempId] = useState("")
  const [email, setEmail] = useState("")

  const [showDeveloperSettings, setShowDeveloperSettings] = useState(
    isUsingCustomBackendURL || import.meta.env.DEV
  )

  const sendEmail = () =>
    api.emailProof.beginEmailOwnershipProof(email).then((res) => {
      setTempId(res)
    })

  useEffect(() => {
    // If the user enters this secret code, force the developer settings to show (even on production)
    if (email === DEVELOPER_SECRET_CODE) {
      setShowDeveloperSettings(true)
    }
  }, [email])

  return tempId ? (
    <EnterPin email={email} tempId={tempId} />
  ) : (
    <>
      <EnterEmail email={email} setEmail={setEmail} sendEmail={sendEmail} />
      {showDeveloperSettings && <DeveloperOptions />}
    </>
  )
}
