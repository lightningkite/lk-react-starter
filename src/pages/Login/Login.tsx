import {LoadingButton} from "@mui/lab"
import {
  Alert,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from "@mui/material"
import {MockApi} from "api/mockApi"
import {LiveApi} from "api/sdk"
import {UnauthContext} from "App"
import React, {createRef, FC, useContext, useEffect, useState} from "react"
import {
  DeploymentType,
  envBackendHTTP,
  envDeploymentType
} from "utils/helpers/envHelpers"
import DeveloperOptions from "./DeveloperOptions"

type IdentifierType = "email" | "sms"

export const Login: FC = () => {
  const {api, authenticate} = useContext(UnauthContext)

  const [identifierType, setIdentifierType] = useState<IdentifierType>("email")
  const [identifier, setIdentifier] = useState("")
  const [code, setCode] = useState("")
  const [tempUUID, setTempUUID] = useState("")

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const selectedBackendURL = (api as LiveApi | MockApi).httpUrl
  const isUsingCustomBackendURL = selectedBackendURL !== envBackendHTTP

  const [showDeveloperSettings, setShowDeveloperSettings] = useState(
    isUsingCustomBackendURL ||
      (envDeploymentType !== DeploymentType.PRODUCTION &&
        envDeploymentType !== DeploymentType.STAGING)
  )

  const submitCodeButton = createRef<HTMLButtonElement>()

  useEffect(() => {
    // If the user enters this secret code, force the developer settings to show (even on production)
    if (identifier === "info@lightningkite.com") {
      setShowDeveloperSettings(true)
    }

    // Remove whitespace and convert to lowercase
    if (identifierType === "email") {
      if (/\s/.test(identifier) || /[A-Z]/.test(identifier)) {
        setIdentifier(identifier.replace(/\s/g, "").toLowerCase())
      }
      return
    }

    // Remove whitespace and non-numeric characters
    if (identifierType === "sms") {
      if (/\s/.test(identifier) || /[^0-9]/.test(identifier)) {
        setIdentifier(identifier.replace(/\s/g, "").replace(/[^0-9]/g, ""))
      }
    }
  }, [identifier, identifierType])

  const sendSSO = () => {
    setError("")

    if (identifierType === "email") {
      if (identifier.length === 0) {
        setError("Please enter an email address")
        return
      }

      if (
        !identifier
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        setError("Email address is invalid")
        return
      }
    }

    if (identifierType === "sms") {
      if (identifier.length === 0) {
        setError("Please enter a phone number")
        return
      }

      if (identifier.length < 10) {
        setError("Phone number must be at least 10 digits")
        return
      }
    }

    setSubmitting(true)

    api.auth
      .loginSSO(identifier)
      .then(setTempUUID)
      .catch(() => setError(`Error sending ${identifierType}`))
      .finally(() => setSubmitting(false))
  }

  useEffect(() => {
    if (code.length === 7) {
      submitCodeButton.current?.focus()
    }
  }, [code])

  if (!tempUUID) {
    return (
      <>
        <Typography variant="h1" textAlign="center">
          React App Starter
        </Typography>
        <Typography variant="subtitle1" lineHeight={1.2} mt={3}>
          Enter your email or phone number, and we&apos;ll send you a code to
          sign in.
        </Typography>
        <Stack spacing={2} mt={3}>
          <RadioGroup
            row
            value={identifierType}
            onChange={(e) =>
              setIdentifierType(e.target.value as IdentifierType)
            }
          >
            <FormControlLabel value="email" control={<Radio />} label="Email" />
            <FormControlLabel
              value="sms"
              control={<Radio />}
              label="Text Message"
            />
          </RadioGroup>

          <TextField
            label={(() => {
              if (identifierType === "email") {
                return "Email"
              }
              if (identifierType === "sms") {
                return "Phone Number"
              }
            })()}
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            type={(() => {
              if (identifierType === "email") {
                return "email"
              }
              if (identifierType === "sms") {
                return "tel"
              }
            })()}
            fullWidth
          />

          {!!error && <Alert severity="error">{error}</Alert>}

          <LoadingButton
            variant="contained"
            color="primary"
            fullWidth
            loading={submitting}
            onClick={sendSSO}
          >
            Send Code
          </LoadingButton>

          {showDeveloperSettings && <DeveloperOptions />}
        </Stack>
      </>
    )
  }

  return (
    <>
      <Typography variant="h1">Code Sent!</Typography>
      <Typography variant="subtitle1" mt={3} lineHeight={1.2}>
        Enter the 7-digit code that has been sent to &quot;
        {identifier}&quot;
      </Typography>

      <TextField
        value={code}
        onChange={(e) => setCode(e.target.value)}
        fullWidth
        sx={{my: 2}}
      />

      {!!error && (
        <Alert severity="error" sx={{mb: 2}}>
          {error}
        </Alert>
      )}

      <LoadingButton
        loading={submitting}
        variant="contained"
        disabled={code.length < 7}
        fullWidth
        ref={submitCodeButton}
        onClick={() => {
          setSubmitting(true)
          setError("")
          api.auth
            .submitSSO({
              value: code,
              clientKey: tempUUID
            })
            .then((token) => {
              authenticate(token)
            })
            .catch(() => setError("Failed to sign-in using the code"))
            .finally(() => setSubmitting(false))
        }}
      >
        Submit
      </LoadingButton>

      <Button onClick={() => window.location.reload()} fullWidth sx={{mt: 1}}>
        Try Again
      </Button>
    </>
  )
}
