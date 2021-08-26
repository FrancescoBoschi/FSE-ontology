import { Component, Match, Switch } from "solid-js"
import { useParams } from "solid-app-router"
import usePatientStore from "../hooks/usePatientStore"
import PatientInfo from "../components/PatientInfo"
import PatientDocs from "../components/PatientDocs"

const PatientPage: Component = () => {
  const params = useParams()
  const patient = usePatientStore(params.fiscalCode)

  return (
    <Switch fallback={
      <div class="patient flex gap-12">
        <div class="w-1/4"><PatientInfo patient={patient()}/></div>
        <div class="w-3/4"><PatientDocs patient={patient()}/></div>
      </div>
    }>
      <Match when={patient.error}>
        <p class="text-center">Si è verificato un errore.</p>
      </Match>
      <Match when={patient.loading}>
        <p class="text-center">Caricamento...</p>
      </Match>
    </Switch>
  )
}

export default PatientPage