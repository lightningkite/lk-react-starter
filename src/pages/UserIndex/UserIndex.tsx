import {RestDataTable} from "@lightningkite/mui-lightning-components"
import {Container} from "@mui/material"
import {AuthContext} from "App"
import PageHeader from "components/PageHeader"
import React, {FC, useContext, useState} from "react"
import {useNavigate} from "react-router-dom"
import {AddUserButton} from "./AddUserButton"

export const UserIndex: FC = () => {
  const navigate = useNavigate()
  const {session} = useContext(AuthContext)

  const [refreshTrigger, setRefreshTrigger] = useState(0)

  return (
    <Container maxWidth="md">
      <PageHeader title="Users List">
        <AddUserButton onSubmit={() => setRefreshTrigger((prev) => prev + 1)} />
      </PageHeader>

      <RestDataTable
        restEndpoint={session.user}
        onRowClick={(user) => navigate(`/users/${user._id}`)}
        searchFields={["name", "email"]}
        dependencies={[refreshTrigger]}
        columns={[
          {field: "name", headerName: "User Name", flex: 1},
          {field: "email", headerName: "Email", flex: 1},
          {
            field: "modifiedAt",
            headerName: "Last Modified",
            width: 120,
            type: "date",
            valueGetter: ({value}) => new Date(value),
            valueFormatter: ({value}) => value.toLocaleDateString()
          }
        ]}
      />
    </Container>
  )
}
