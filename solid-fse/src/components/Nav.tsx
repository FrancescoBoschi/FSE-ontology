import type { Component } from "solid-js"
import { NavLink } from "solid-app-router"

const navLink = `
  inline-block
  px-2 py-1
  text-white
`

const Nav: Component = () => (
  <>
    <div>
      <NavLink class={navLink} href="/" end>Home</NavLink>
      <NavLink class={navLink} href="/counter">Counter</NavLink>
      <NavLink class={navLink} href="/todo">Todo</NavLink>
    </div>

    <style>{`
      a.active {
        color: #b318f0;
      }
    `}</style>
  </>
)

export default Nav