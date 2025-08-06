import {CssBaseline, ThemeProvider} from "@mui/material"
import App from "App"

import {createRoot} from "react-dom/client"
import "styles/index.css"

// Fonts designed to be used by MUI
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import {theme} from "theme"
import React from "react"

const consoleFormat = "color:red; font-size: 20px"

// Verify environment variables
if (!import.meta.env.VITE_BACKEND_HTTP_URL)
  console.log("%cVITE_BACKEND_HTTP_URL is not set", consoleFormat)

import.meta.env.DEV && console.log("Available ENV Variables", import.meta.env)

const root = createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>p
  </React.StrictMode>
)
