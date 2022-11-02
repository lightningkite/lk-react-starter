import {Stack, Typography} from "@mui/material"
import React, {FC, PropsWithChildren} from "react"

export interface PageHeaderProps {
  title: string
}

const PageHeader: FC<PropsWithChildren<PageHeaderProps>> = (props) => {
  const {title, children} = props

  return (
    <Stack direction="row" alignItems="center" justifyContent="start">
      <Typography variant="h1" sx={{mt: 3, mb: 3, mr: "auto"}}>
        {title}
      </Typography>
      {children}
    </Stack>
  )
}

export default PageHeader
