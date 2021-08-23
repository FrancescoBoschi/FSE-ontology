import { Component, Match, Switch } from "solid-js"
import { useParams } from "solid-app-router"
import usePatientStore from "../hooks/usePatientStore"
import PatientInfo from "../components/PatientInfo"
import PatientDocs from "../components/PatientDocs"

const Patient: Component = () => {
  const params = useParams()

  const patient = usePatientStore(params.name)

  return (
    <Switch fallback={
      <div class="patient flex gap-12">
        <div class="w-1/4"><PatientInfo patient={patient()}/></div>
        <div class="w-3/4"><PatientDocs patient={patient()}/></div>
      </div>
    }>
      <Match when={patient.loading}>
        <p class="text-center">Loading...</p>
      </Match>
      <Match when={patient.error}>
        <p class="text-center">An error occurred.</p>
      </Match>
    </Switch>
  )
}

export default Patient