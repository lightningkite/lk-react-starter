import {Container, ThemeProvider, Typography} from "@mui/material"
import React from "react"
import {theme} from "./theme"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography>Hello World</Typography>
      </Container>
    </ThemeProvider>
  )
}

export default App
