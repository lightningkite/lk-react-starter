import {AccountCircle, Logout} from "@mui/icons-material"
import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem
} from "@mui/material"
import {logout} from "api/useSessionManager"
import type {FC} from "react"
import React, {useContext, useState} from "react"
import {useNavigate} from "react-router-dom"
import {AuthContext} from "utils/context"

const MyUserMenu: FC = () => {
  const {currentUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null)

  const closeMenu = (): void => setUserMenuAnchor(null)

  return (
    <>
      <ListItemButton onClick={(e) => setUserMenuAnchor(e.currentTarget)}>
        <ListItemAvatar>
          <Avatar src={currentUser.profilePic} />
        </ListItemAvatar>
        <ListItemText
          primary={currentUser.name}
          secondary={currentUser.email}
        />
      </ListItemButton>

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

export default MyUserMenu
