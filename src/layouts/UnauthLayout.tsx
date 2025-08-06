import {Card, CardContent, Container, Stack} from "@mui/material"
import {Outlet} from "react-router-dom"

const UnauthLayout = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="space-evenly"
      sx={{
        height: "100vh",
        bgcolor: "primary.main"
      }}
    >
      <Container maxWidth="xs">
        <Card>
          <CardContent sx={{maxHeight: "80vh", overflowY: "auto"}}>
            <Outlet />
          </CardContent>
        </Card>
      </Container>
    </Stack>
  )
}

export default UnauthLayout
