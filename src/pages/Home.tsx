import {Button, Typography} from "@mui/material"
import {AuthContext} from "App"
import React, {FC, useContext} from "react"

export const Home: FC = () => {
  const {logout} = useContext(AuthContext)

  return (
    <>
      <Typography variant="h1">Home</Typography>
      <Button onClick={logout}>Logout</Button>
    </>
  )
}
