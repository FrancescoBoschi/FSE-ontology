import { Component, createSignal } from "solid-js"
import { useNavigate } from "solid-app-router"

const SearchPatient: Component = () => {
  const navigate = useNavigate()

  const [search, setSearch] = createSignal("")

  const onSubmit = (e: Event) => {
    e.preventDefault()
    if (search() == "") return
    const text = search()
    setSearch("")
    navigate(`/search?name=${text}`)
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        class="input rounded-r-none"
        type="text"
        placeholder="Cerca un paziente"
        value={search()}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
      <button class="btn rounded-l-none" type="submit">Cerca</button>
    </form>
  )
}

export default SearchPatient