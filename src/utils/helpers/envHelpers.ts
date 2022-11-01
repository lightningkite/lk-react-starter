export enum DeploymentType {
  LOCAL = "local",
  DEV = "dev",
  STAGING = "staging",
  PRODUCTION = "production"
}

// Load environment variables
export const envBackendHTTP = process.env
  .REACT_APP_BACKEND_HTTP_URL as DeploymentType
export const envDeploymentType = process.env.REACT_APP_DEPLOYMENT

const consoleFormat = "color:red; font-size: 20px"

// Verify environment variables
if (!envBackendHTTP)
  console.log("%cREACT_APP_BACKEND_HTTP_URL is not set", consoleFormat)
if (!envDeploymentType)
  console.log("%cREACT_APP_DEPLOYMENT is not set", consoleFormat)
if (
  !(Object.values(DeploymentType) as string[]).includes(envDeploymentType ?? "")
)
  console.log(
    `%cREACT_APP_DEPLOYMENT is not one of ${Object.values(DeploymentType).join(
      ", "
    )}`,
    consoleFormat
  )
