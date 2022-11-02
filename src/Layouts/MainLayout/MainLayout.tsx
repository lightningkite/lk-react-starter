import {AccountCircle, Logout} from "@mui/icons-material"
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
import {NavLink, useNavigate} from "react-router-dom"

// Define the items that will appear in the sidebar navigation
const navItems: Array<{label: string; to: string}> = [
  {label: "Home", to: "/"},
  {label: "Users", to: "/users"}
]

const MainLayout: FC<{children: ReactNode}> = ({children}) => {
  const {logout, currentUser} = useContext(AuthContext)
  const navigate = useNavigate()

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
              <Avatar src={currentUser.profilePic} />
            </ListItemAvatar>
            <ListItemText
              primary={currentUser.name}
              secondary={currentUser.email}
            />
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
        <MenuItem
          onClick={() => {
            closeMenu()
            navigate(`/users/${currentUser._id}`)
          }}
        >
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
