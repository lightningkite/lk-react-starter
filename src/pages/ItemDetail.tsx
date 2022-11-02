import {ArrowLeft} from "@mui/icons-material"
import {Button, Card, CardContent, Container, Typography} from "@mui/material"
import React, {FC} from "react"
import {useNavigate, useParams} from "react-router-dom"

export const ItemDetail: FC = () => {
  const {itemId} = useParams()
  const navigate = useNavigate()

  return (
    <Container maxWidth="sm">
      <Typography variant="h1">Item #{itemId}</Typography>

      <Card sx={{mt: 3}}>
        <CardContent>
          <Typography variant="body1" sx={{mb: 3}}>
            About this item...
          </Typography>
          <Button startIcon={<ArrowLeft />} onClick={() => navigate("/items")}>
            Return to items list
          </Button>
        </CardContent>
      </Card>
    </Container>
  )
}
