import {Box, CircularProgress} from "@mui/material"
import type {FC} from "react"


const Loading: FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "20rem"
      }}
    >
      <CircularProgress />
    </Box>
  )
}

export default Loading
