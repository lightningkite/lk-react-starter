import {Card, CardContent, Container} from "@mui/material"
import type {User} from "api/sdk"
import ErrorAlert from "components/ErrorAlert"
import Loading from "components/Loading"
import PageHeader from "components/PageHeader"
import type {FC} from "react"
import React, {useContext, useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {AuthContext} from "utils/context"
import {DeleteUserButton} from "./DeleteUserButton"
import {UserForm} from "./UserForm"

const UserDetail: FC = () => {
  const {userId} = useParams()
  const {api} = useContext(AuthContext)

  const [user, setUser] = useState<User | null>()

  useEffect(() => {
    api.user
      .detail(userId as string)
      .then(setUser)
      .catch(() => setUser(null))
  }, [userId])

  if (user === undefined) {
    return <Loading />
  }

  if (user === null) {
    return <ErrorAlert>Error loading user</ErrorAlert>
  }

  return (
    <Container maxWidth="sm">
      <PageHeader
        title={user.name}
        breadcrumbs={[
          ["All Users", "/users"],
          [user.name, ""]
        ]}
      >
        <DeleteUserButton user={user} />
      </PageHeader>

      <Card>
        <CardContent sx={{mt: 2}}>
          <UserForm user={user} setUser={setUser} />
        </CardContent>
      </Card>
    </Container>
  )
}

export default UserDetail
