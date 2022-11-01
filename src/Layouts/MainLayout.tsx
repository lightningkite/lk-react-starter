import {AccountCircle, Logout, Person} from "@mui/icons-material"
import {
  Avatar,
  Box,
  Button,
  Divider,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack
} from "@mui/material"
import {AuthContext} from "App"
import React, {FC, ReactNode, useContext, useState} from "react"
import {NavLink} from "react-router-dom"

const navItems: Array<{label: string; to: string}> = [
  {label: "Home", to: "/"},
  {label: "Items", to: "/items"}
]

const MainLayout: FC<{children: ReactNode}> = ({children}) => {
  const {logout} = useContext(AuthContext)

  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null)
  const closeMenu = (): void => setUserMenuAnchor(null)

  return (
    <>
      <Stack direction="row" minHeight="100vh">
        <Box
          sx={{
            p: 1,
            zIndex: 1,
            backgroundColor: "white",
            width: "20rem",
            boxShadow: "0 3px 6px rgba(0,0,0,0.16)"
          }}
        >
          <ListItemButton onClick={(e) => setUserMenuAnchor(e.currentTarget)}>
            <ListItemAvatar>
              <Avatar>
                <Person />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="My User" />
          </ListItemButton>

          <Divider sx={{m: 2}} />

          <Stack spacing={1}>
            {navItems.map(({label, to}) => (
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
        <Box bgcolor="background.default" width="100%" pt={3} pb={7}>
          {children}
        </Box>
      </Stack>

      <Menu
        anchorEl={userMenuAnchor}
        open={!!userMenuAnchor}
        onClose={closeMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button"
        }}
      >
        <MenuItem onClick={undefined}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          <ListItemText>My Account</ListItemText>
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}

export default MainLayout
