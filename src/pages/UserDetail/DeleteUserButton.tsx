import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip
} from "@mui/material"
import type {User} from "api/sdk"
import type {FC} from "react"
import React, {useContext, useState} from "react"
import {useNavigate} from "react-router-dom"
import {AuthContext} from "utils/context"
import {AutoLoadingButton} from "../../components/AutoLoadingButton"

export const DeleteUserButton: FC<{user: User}> = ({user}) => {
  const {api} = useContext(AuthContext)
  const navigate = useNavigate()

  const [openDialog, setOpenDialog] = useState(false)

  const handleOpen = () => setOpenDialog(true)
  const handleClose = () => setOpenDialog(false)

  async function deleteUser() {
    api.user
      .delete(user._id)
      .then(() => navigate("/users"))
      .catch(() => alert("Failed to delete user"))
  }

  return (
    <>
      <Tooltip title={`Delete ${user.name}`}>
        <Button onClick={handleOpen} color="error">
          Delete
        </Button>
      </Tooltip>

      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby={`alert-dialog-title-${user._id}`}
        aria-describedby={`alert-dialog-description-${user._id}`}
      >
        <DialogTitle id={`alert-dialog-title-${user._id}`}>
          Delete {user.name}?
        </DialogTitle>

        <DialogContent>
          <DialogContentText id={`alert-dialog-description-${user._id}`}>
            Are you sure you want to delete {user.name}? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disableElevation>
            Cancel
          </Button>
          <AutoLoadingButton
            onClick={deleteUser}
            variant="contained"
            color="error"
            disableElevation
          >
            Delete
          </AutoLoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}
