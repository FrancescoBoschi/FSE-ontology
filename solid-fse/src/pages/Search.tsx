import { Component, createMemo } from "solid-js"
import { useLocation } from "solid-app-router"

const Search: Component = () => {

  const location = useLocation()

  return (
    <>
      <h1>Search</h1>
      <p>{location.query.name}</p>
    </>
  )
}

export default Search