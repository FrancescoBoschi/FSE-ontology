import { createResource } from "solid-js"
import { Patient } from "../models/Patient"
import mapBindingsToValues from "../utils/mapBindingsToValues"
import createStardogQuery from "./createStardogQuery"

const fetchPatients = async () => {
  const query = createStardogQuery(`
    SELECT ?id ?name ?surname ?birthDate
    FROM <https://fse.ontology/>
    WHERE {
      ?id rdf:type fse:patient .
      ?id foaf:firstName ?name .
      ?id foaf:lastName ?surname .
      ?id foaf:birthday ?birthDate .
    }
  `)
  const res = (await query.execute()).results.bindings
  const patients = mapBindingsToValues(res)
  return patients as Patient[]
}

const [patients] = createResource<Patient[]>(fetchPatients, { initialValue: [] })

export default () => patients