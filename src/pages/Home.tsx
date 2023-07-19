import {Container} from "@mui/material"
import PageHeader from "components/PageHeader"
import type {FC} from "react";
import React from "react"

const Home: FC = () => {
  return (
    <Container maxWidth="md">
      <PageHeader title="Home Page" />
    </Container>
  )
}

export default Home
