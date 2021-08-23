import type { Component } from "solid-js"
import { Patient } from "../models/Patient"

interface Props { patient: Patient }

const PatientDocs: Component<Props> = (props) => {
  return <h1>PatientDocs of {props.patient.name}</h1>
}

export default PatientDocs