import type { Component } from "solid-js"
import { NavLink } from "solid-app-router"
import useSearch from "../hooks/useSearch"

const SearchBar: Component = () => {
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

const navLink = `
  text-lg text-white no-underline
`

const Nav: Component = () => (
  <div class="container max-w-4xl flex items-center gap-6 p-6">
    <SearchBar/>
    <div class="flex-grow"></div>
    <NavLink class={navLink} href="/" end>Pazienti</NavLink>
    <NavLink class={navLink} href="/register">Registra</NavLink>
    <NavLink class={navLink} href="/queries">Query</NavLink>
  </div>
)

export default Nav