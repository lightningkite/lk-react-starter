import {Box, Button, Divider, Stack} from "@mui/material"

import {NavLink, Outlet} from "react-router-dom"
import MyUserMenu from "./MyUserMenu"

const SIDEBAR_WIDTH = "17rem"

const MainLayout = () => (
  <>
    <Box
      sx={{
        p: 1,
        zIndex: 100,
        backgroundColor: "white",
        width: SIDEBAR_WIDTH,
        boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
        position: "fixed",
        height: "100vh",
        overflowY: "auto"
      }}
    >
      <MyUserMenu />

      <Divider sx={{m: 2}} />

      <Stack spacing={1}>
        {[
          {label: "Home", to: "/"},
          {label: "Users", to: "/users"},
          {label: "Formik Input Demo", to: "/input-demo"}
        ].map(({label, to}) => (
          <Button
            key={to}
            component={NavLink}
            to={to}
            sx={{
              justifyContent: "start",
              "&.active": {
                bgcolor: "primary.main",
                color: "white"
              }
            }}
          >
            {label}
          </Button>
        ))}
      </Stack>
    </Box>
    <Box
      bgcolor="background.default"
      pt={3}
      pb={7}
      pl={SIDEBAR_WIDTH}
      minHeight="100vh"
    >
      <Outlet />
    </Box>
  </>
)

export default MainLayout
