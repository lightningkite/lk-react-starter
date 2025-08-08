import {Container, ListItemIcon, ListItemText, MenuItem} from "@mui/material"
import PageHeader from "components/PageHeader"
import type {FC} from "react"
import {useContext, useState} from "react"
import {useNavigate} from "react-router-dom"
import {AuthContext} from "utils/context"
import {AddUserButton} from "./AddUserButton"
import type {Condition} from "@lightningkite/lightning-server-simplified"
import {Animal, type User} from "api/sdk"
import {
  getOptionsFromQuery,
  FilterBar,
  RestDataTable,
  getRowsFromEndpoint,
  createBasicFilter,
  buildFilterChip,
  createFilter,
  useFilterBarSaveLocally
} from "@lightningkite/mui-lightning-components"
import {Person} from "@mui/icons-material"

export const UserIndex: FC = () => {
  const navigate = useNavigate()
  const {api} = useContext(AuthContext)

  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const [filter, setFilter] = useState<Condition<User>[]>([])

  const filterState = useFilterBarSaveLocally(
    {
      animal: createBasicFilter({
        menuLabel: "Favorite Animal",
        processor: (v: Animal[]): Condition<User> =>
          v.length > 0 ? {favoriteAnimal: {Inside: v}} : {Always: true},
        FilterChip: buildFilterChip.multiSelect({
          getOptionLabel: (a) => a,
          options: Object.values(Animal),
          optionToId: (a) => a
        })
      }),
      gender: createBasicFilter({
        menuLabel: "Gender",
        processor: (g: User["gender"][]) => {
          return g.length > 0 ? {gender: {Inside: g}} : {Always: true}
        },
        FilterChip: buildFilterChip.singleSelect({
          getOptionLabel: (g) => ({m: "Male", f: "Female"})[g],
          options: ["m", "f"] as const,
          optionToId: (g) => g
        })
      }),
      name: createFilter({
        menuLabel: "Name",
        processor: (names: string[]) => {
          if (names.length > 0) return {name: {Inside: names}}
          else return {Always: true}
        },
        FilterChip: buildFilterChip.asyncMultiSelect({
          getOptionLabel: (user: string) => user,
          itemGetter: getOptionsFromQuery({
            getOptions: api.user.query,
            searchFields: ["name"],
            then: async (users: User[]) => users.map((user) => user.name)
          }),
          optionToId: (name) => name
        }),
        MenuItem: function Component(props) {
          return (
            <MenuItem {...props.menuProps}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              <ListItemText>Name</ListItemText>
            </MenuItem>
          )
        }
      })
    },
    {animal: [Animal.Cat], gender: ["m"], name: null}
  )

  return (
    <Container maxWidth="md">
      <PageHeader title="Users List">
        <AddUserButton
          afterSubmit={() => setRefreshTrigger((prev) => prev + 1)}
        />
      </PageHeader>

      <FilterBar {...filterState} setProducts={setFilter} />

      <RestDataTable
        getRows={getRowsFromEndpoint<User>({
          endpoint: api.user,
          condition: {And: filter}
        })}
        onRowClick={(user) => navigate(`/users/${user._id}`)}
        searchFields={["name", "email"]}
        dependencies={[refreshTrigger, filter]}
        columns={[
          {field: "name", headerName: "User Name", flex: 1},
          {field: "email", headerName: "Email", flex: 1}
        ]}
      />
    </Container>
  )
}
