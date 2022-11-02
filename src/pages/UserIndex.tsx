import {
  Avatar,
  Button,
  Card,
  Container,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText
} from "@mui/material"
import {User} from "api/sdk"
import {AuthContext} from "App"
import ErrorAlert from "components/ErrorAlert"
import Loading from "components/Loading"
import PageHeader from "components/PageHeader"
import React, {FC, useContext, useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"

export const UserIndex: FC = () => {
  const navigate = useNavigate()
  const {session} = useContext(AuthContext)

  const [users, setUsers] = useState<User[] | null>()

  useEffect(() => {
    session.user
      .query({orderBy: ["name"]})
      .then(setUsers)
      .catch(() => setUsers(null))
  }, [])

  if (users === undefined) {
    return <Loading />
  }

  if (users === null) {
    return <ErrorAlert>Error loading users</ErrorAlert>
  }

  return (
    <Container maxWidth="sm">
      <PageHeader title="Users List">
        <Button>Add User</Button>
      </PageHeader>

      <Card>
        <List>
          {users.map((user) => (
            <ListItemButton
              key={user._id}
              onClick={() => navigate(`/users/${user._id}`)}
            >
              <ListItemAvatar>
                <Avatar src={user.profilePic} />
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.email} />
            </ListItemButton>
          ))}
        </List>
      </Card>
    </Container>
  )
}
