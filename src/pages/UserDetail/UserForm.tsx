import {makeObjectModification} from "@lightningkite/lightning-server-simplified"
import {LoadingButton} from "@mui/lab"
import {Alert, Stack, TextField} from "@mui/material"
import {User} from "api/sdk"
import {AuthContext} from "App"
import {useFormik} from "formik"
import React, {FC, useContext, useEffect, useState} from "react"
import * as yup from "yup"

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required"),
  phone: yup.string().required("Phone is required")
})

export interface UserFormProps {
  user: User
  refreshUser: () => Promise<void>
}

export const UserForm: FC<UserFormProps> = (props) => {
  const {user, refreshUser} = props

  const {session} = useContext(AuthContext)

  const [error, setError] = useState("")

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      phone: user.phone
    },
    validationSchema,
    onSubmit: (values, {resetForm}) => {
      setError("")

      const modification = makeObjectModification(user, values)

      if (!modification) {
        return Promise.resolve()
      }

      return session.user
        .modify(user._id, modification)
        .then(() => {
          refreshUser()
          resetForm({values})
        })
        .catch(() => setError("Error updating user"))
    }
  })

  // Reset the form if the user changes
  useEffect(() => formik.resetForm({values: user}), [user])

  return (
    <Stack gap={2}>
      <TextField
        name="name"
        label="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && !!formik.errors.name}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextField
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && !!formik.errors.email}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        name="phone"
        label="Phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        error={formik.touched.phone && !!formik.errors.phone}
        helperText={formik.touched.phone && formik.errors.phone}
      />
      {error && <Alert severity="error">{error}</Alert>}
      <LoadingButton
        onClick={() => {
          formik.submitForm()
        }}
        variant="contained"
        color="primary"
        loading={formik.isSubmitting}
        style={{alignSelf: "end"}}
        disabled={!formik.dirty}
      >
        {formik.dirty ? "Save Changes" : "Saved"}
      </LoadingButton>
    </Stack>
  )
}
