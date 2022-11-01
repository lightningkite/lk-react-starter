import {Container, Typography} from "@mui/material"
import {AuthContext} from "App"
import React, {FC, useContext} from "react"

export const ItemIndex: FC = () => {
  const {logout} = useContext(AuthContext)

  return (
    <Container>
      <Typography variant="h1">Items List</Typography>
    </Container>
  )
}
