import { Component } from "solid-js"
import useSearch from "../hooks/useSearch"

const SearchPatient: Component = () => {
  const { search, setSearch } = useSearch()

  return (
    <input
      class="input w-80"
      type="text"
      placeholder="Cerca un paziente"
      value={search()}
      onKeyUp={(e) => setSearch(e.currentTarget.value)}
    />
  )
}

export default SearchPatient