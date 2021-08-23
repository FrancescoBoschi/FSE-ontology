import { createResource } from "solid-js"
import { Patient } from "../models/Patient"

const [patients] = createResource<Patient[]>(
  () => fetch("https://jsonplaceholder.typicode.com/users").then((res) => res.json()),
  { initialValue: [] }
)

export default () => patients