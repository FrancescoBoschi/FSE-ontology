import { Component, createMemo, For, Match, Switch } from "solid-js"
import usePatientsStore from "../hooks/usePatientsStore"
import PatientCard from "../components/PatientCard"
import useSearch from "../hooks/useSearch"

const Patients: Component = () => {

  const { search } = useSearch()

  const patients = usePatientsStore()
  const filteredPatients = createMemo(() =>
    patients().filter(p => p.name.toLowerCase().includes(search()))
  )

  return (
    <Switch fallback={
      <div class="flex flex-col gap-4">
        <For each={filteredPatients()}>{ patient =>
          <PatientCard patient={patient}/>
        }</For>
      </div>
    }>
      <Match when={patients.loading}>
        <p class="text-center">Loading...</p>
      </Match>
      <Match when={patients.error}>
        <p class="text-center">An error occurred.</p>
      </Match>
    </Switch>
  )
}

export default Patients