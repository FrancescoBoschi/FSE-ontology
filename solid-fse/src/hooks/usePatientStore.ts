import { createResource } from "solid-js"
import { PatientDetails } from "../models/Patient"
import mapBindingsToValues from "../utils/mapBindingsToValues"
import createStardogQuery from "./createStardogQuery"

type PatientFetcher = (fiscalCode: string) => Promise<PatientDetails>
const fetchPatient: PatientFetcher = async (fiscalCode: string) => {
  const query = createStardogQuery(`
    SELECT ?ID ?name ?surname ?birthDate ?fiscalCode ?healthCardNumber (CONCAT(?familyDoctorName, " ", ?familyDoctorSurname) AS ?familyDoctor)
    FROM <https://fse.ontology/>
    WHERE {
      ?ID
        fse:fiscalCode "${fiscalCode}" ;
        rdf:type fse:patient ;
        foaf:firstName ?name ;
        foaf:lastName ?surname ;
        foaf:birthday ?birthDate ;
        fse:fiscalCode ?fiscalCode .
      OPTIONAL { ?ID fse:healthCardNumber ?healthCardNumber }
      OPTIONAL {
        ?ID fse:hasFamilyDoctor ?doctor .
        ?doctor
          foaf:firstName ?familyDoctorName ;
          foaf:lastName ?familyDoctorSurname .
      }
    }
  `)
  const res = (await query.execute()).results.bindings
  const patient = mapBindingsToValues(res)[0]
  patient["clinicalDocuments"] = [
    {
      id: "0",
      documentType: "PSS",
      timestamp: "01/01/2021",
      confidentialityCode: "CC",
      realmCode: "RC",
      version: "1.0",
      author: { name: "Gianni", surname: "Tumedei" },
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam ut soluta ducimus veritatis expedita, et sunt voluptatem saepe nihil assumenda nulla. Ratione asperiores mollitia officiis placeat ipsa aut rem laudantium."
    },
    {
      id: "1",
      documentType: "PSS",
      timestamp: "01/01/2021",
      confidentialityCode: "CC",
      realmCode: "RC",
      version: "1.0",
      author: { name: "Gianni", surname: "Tumedei" },
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam ut soluta ducimus veritatis expedita, et sunt voluptatem saepe nihil assumenda nulla. Ratione asperiores mollitia officiis placeat ipsa aut rem laudantium."
    }
  ]
  return patient as PatientDetails
}

const usePatientStore = (fiscalCode: string) => {
  const [patient] = createResource<PatientDetails>(
    () => fetchPatient(fiscalCode),
    { initialValue: undefined }
  )
  return patient
}

export default usePatientStore