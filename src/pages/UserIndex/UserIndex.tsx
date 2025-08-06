import {
  createFilter,
  createMultiSelectFilterChip,
  createSingleSelectFilterChip,
  FilterBar,
  FilterType,
  FilterTypeValue,
  getRowsFromEndpoint,
  RestDataTable,
  usePersistentState
} from "@lightningkite/mui-lightning-components"
import {Container} from "@mui/material"
import PageHeader from "components/PageHeader"
import type {FC} from "react"
import {useContext, useMemo, useState} from "react"
import {useNavigate} from "react-router-dom"
import {AuthContext} from "utils/context"
import {AddUserButton} from "./AddUserButton"
import type {Condition} from "@lightningkite/lightning-server-simplified"
import {Animal, type User} from "api/sdk"

export const UserIndex: FC = () => {
  const navigate = useNavigate()
  const {api} = useContext(AuthContext)

  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const [filter, setFilter] = useState<Condition<User>[]>([])

  const filterState = useFilterLocalStorage(
    {
      animal: createFilter({
        menuLabel: "Favorite Animal",
        availability: "available",
        processor: (v: Animal[]): Condition<User> =>
          v.length > 0 ? {favoriteAnimal: {Inside: v}} : {Always: true},
        FilterChip: createMultiSelectFilterChip({
          displayValue: (a) => a,
          options: Object.values(Animal),
          optionToId: (a) => a
        })
      }),
      gender: createFilter({
        menuLabel: "Gender",
        processor: (g: User["gender"][]) => {
          return g.length > 0 ? {gender: {Inside: g}} : {Always: true}
        },
        FilterChip: createSingleSelectFilterChip({
          displayValue: (g) => ({m: "Male", f: "Female"})[g],
          options: ["m", "f"] as const,
          optionToId: (g) => g
        })
      })
    },
    {animal: [Animal.Cat], gender: ["m"]}
  )

  return (
    <Container maxWidth="md">
      <PageHeader title="Users List">
        <AddUserButton
          afterSubmit={() => setRefreshTrigger((prev) => prev + 1)}
        />
      </PageHeader>

      <FilterBar setProducts={setFilter} {...filterState} />

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

const useFilterLocalStorage = <T extends Record<string, FilterType>>(
  filters: T,
  initState?: {
    [K in keyof T]: FilterTypeValue<T[K]> | null
  }
) => {
  const f = useMemo(() => filters, [])

  const [filterState, setFilterState] = usePersistentState<{
    [K in keyof T]: FilterTypeValue<T[K]> | null
  }>(
    JSON.stringify(filters),
    initState ??
      Object.keys(filters).reduce((acc, key) => {
        ;(acc as any)[key] = null
        return acc
      }, {} as any)
  )

  return {filterTypes: f, filterState, setFilterState}
}
