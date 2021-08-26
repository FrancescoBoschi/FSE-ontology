import { createResource } from "solid-js"
import { ClinicalDocument } from "../models/ClinicalDocument"
import { Patient } from "../models/Patient"
import mapBindingsToValues from "../utils/mapBindingsToValues"
import createStardogQuery from "./createStardogQuery"

const fetchPatient = async (fiscalCode: string) => {
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
  return patient as Patient
}

const fetchClinicalDocuments = async (fiscalCode: string) => {
  const query = createStardogQuery(
    `
      SELECT ?id ?body ?languageCode ?realmCode ?version
      FROM <https://fse.ontology/>
      WHERE {
        ?id
          rdf:type fse:clinicalDocument ;
          fse:body ?body ;
          fse:languageCode ?languageCode ;
          fse:realmCode ?realmCode ;
          fse:versionNumber ?version .
      }
    `,
    { reasoning: true }
  )
  const res = (await query.execute()).results.bindings
  const documents = mapBindingsToValues(res)
  return documents as ClinicalDocument[]
  /* return [
    {
      id: "0",
      languageCode: "IT",
      realmCode: "RC",
      version: 1,
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam ut soluta ducimus veritatis expedita, et sunt voluptatem saepe nihil assumenda nulla. Ratione asperiores mollitia officiis placeat ipsa aut rem laudantium."
    },
    {
      id: "1",
      languageCode: "IT",
      realmCode: "RC",
      version: 1,
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam ut soluta ducimus veritatis expedita, et sunt voluptatem saepe nihil assumenda nulla. Ratione asperiores mollitia officiis placeat ipsa aut rem laudantium."
    }
  ] as ClinicalDocument[] */
}

const usePatientStore = (fiscalCode: string) => {
  const [patient] = createResource<Patient>(() => fetchPatient(fiscalCode))
  const [documents] = createResource<ClinicalDocument[]>(() => fetchClinicalDocuments(fiscalCode))
  return { patient, documents }
}

export default usePatientStore