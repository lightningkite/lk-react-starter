import {Box, Typography} from "@mui/material"
import {Stack} from "@mui/system"
import type {FC, PropsWithChildren} from "react"
import React from "react"

export interface FormSectionProps {
  title?: string
  subtitle?: string
  disableTopPadding?: boolean
}

export const FormSection: FC<PropsWithChildren<FormSectionProps>> = (props) => {
  const {title, subtitle, disableTopPadding, children} = props

  return (
    <Box pt={disableTopPadding ? undefined : 6}>
      {title && (
        <Typography variant="h3" color="primary.main">
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography variant="body2" sx={{color: "#888"}}>
          {subtitle}
        </Typography>
      )}
      <Stack
        spacing={3}
        mt={
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          title || subtitle ? 3 : 2
        }
      >
        {children}
      </Stack>
    </Box>
  )
}

export default FormSection
