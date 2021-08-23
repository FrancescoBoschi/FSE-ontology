import { Component, createMemo, For, Match, Switch } from "solid-js"
import { Link } from "solid-app-router"
import usePatientsStore from "../hooks/usePatientsStore"
import useSearch from "../hooks/useSearch"
import { Patient } from "../models/Patient"

const PatientCard: Component<{ patient: Patient }> = (props) => {
  const avatarLetter = createMemo(() => props.patient.name[0].toUpperCase())

  return (
    <Link href={`/patients/${props.patient.name}`} class="no-underline flex items-center gap-6 rounded-full hover:bg-gray-700">
      <div class="
        avatar
        w-12 h-12 rounded-full
        flex justify-center items-center
        bg-blue-400 text-gray-700
        text-lg font-semibold
      ">{avatarLetter}</div>
      <div class="info flex-grow">
        <p>{props.patient.name}</p>
        <p class="text-sm text-gray-400">Maschio</p>
      </div>
      <p class="birth text-gray-400 mr-4">01/01/2000</p>
    </Link>
  )
}

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