import type { Component } from "solid-js"
import { NavLink } from "solid-app-router"
import SearchPatient from "./SearchPatient"

const navLink = `
  text-lg text-white no-underline
`

const Nav: Component = () => (
  <div class="container max-w-4xl flex items-center gap-6 p-6">
    <SearchPatient/>
    <div class="flex-grow"></div>
    <NavLink class={navLink} href="/" end>Pazienti</NavLink>
    <NavLink class={navLink} href="/register">Registra</NavLink>
    <NavLink class={navLink} href="/stats">Statistiche</NavLink>
  </div>
)

export default Nav