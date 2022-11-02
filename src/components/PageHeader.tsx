import {Typography} from "@mui/material"
import React, {FC} from "react"

export interface PageHeaderProps {
  title: string
}

const PageHeader: FC<PageHeaderProps> = (props) => {
  const {title} = props

  return (
    <Typography variant="h1" sx={{mt: 3, mb: 3}}>
      {title}
    </Typography>
  )
}

export default PageHeader
