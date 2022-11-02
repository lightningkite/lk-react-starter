import {
  Card,
  Container,
  List,
  ListItemButton,
  ListItemText,
  Typography
} from "@mui/material"
import React, {FC} from "react"
import {useNavigate} from "react-router-dom"

export const ItemIndex: FC = () => {
  const navigate = useNavigate()

  return (
    <Container maxWidth="sm">
      <Typography variant="h1">Items List</Typography>

      <Card sx={{mt: 3}}>
        <List>
          {Array.from({length: 10}, (_, i) => (
            <ListItemButton key={i} onClick={() => navigate(`/items/${i + 1}`)}>
              <ListItemText>View item #{i + 1}</ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Card>
    </Container>
  )
}
