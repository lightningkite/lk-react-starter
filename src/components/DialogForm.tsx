import {Close} from "@mui/icons-material"
import {LoadingButton} from "@mui/lab"
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  IconButton,
  Tooltip
} from "@mui/material"
import React, {FC, useState} from "react"

export interface DialogFormProps extends DialogProps {
  title: string
  submitLabel?: string
  cancelLabel?: string
  instructions?: string
  onClose: () => void
  onSubmit: () => Promise<void>
  errorMessage?: string
  disableSubmitBtn?: boolean
}

export const DialogForm: FC<DialogFormProps> = (props) => {
  const {
    title,
    submitLabel = "Save",
    cancelLabel = "Cancel",
    fullWidth = true,
    children,
    instructions,
    onSubmit,
    disableSubmitBtn = false,
    onClose,
    errorMessage,
    ...rest
  } = props

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didError, setDidError] = useState(false)

  const handleClose = () => {
    setDidError(false)
    setIsSubmitting(false)
    onClose()
  }

  const handleOnSubmit = () => {
    setDidError(false)
    setIsSubmitting(true)

    onSubmit()
      .then(onClose)
      .catch((e) => {
        console.error(e)
        setDidError(true)
      })
      .finally(() => setIsSubmitting(false))
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-modal-title"
      fullWidth={fullWidth}
      {...rest}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleOnSubmit()
        }}
      >
        <DialogTitle id="customized-modal-title">
          {title}

          <Tooltip title="Close">
            <IconButton
              onClick={onClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500]
              }}
            >
              <Close />
            </IconButton>
          </Tooltip>
        </DialogTitle>

        <DialogContent sx={{pb: 2}}>
          {instructions && (
            <DialogContentText>{instructions}</DialogContentText>
          )}

          <Box my={2}>{children}</Box>

          {(didError || errorMessage) && (
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            <Alert severity="error">{errorMessage || "Error submitting"}</Alert>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>{cancelLabel}</Button>
          <LoadingButton
            loading={isSubmitting}
            color="primary"
            variant="contained"
            disableElevation
            disabled={disableSubmitBtn}
            type="submit"
          >
            {submitLabel}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default DialogForm
