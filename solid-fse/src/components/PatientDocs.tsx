import { Component, For } from "solid-js"
import { PatientDetails } from "../models/Patient"
import DocumentCard from "../components/DocumentCard"

interface Props { patient: PatientDetails }

const PatientDocs: Component<Props> = (props) => {
  return (
    <div class="flex flex-col gap-6">
      <h1 class="text-3xl">Documenti</h1>
      <For each={props.patient.clinicalDocuments}>{ document =>
        <DocumentCard document={document}/>
      }</For>
    </div>
  )
}

export default PatientDocs