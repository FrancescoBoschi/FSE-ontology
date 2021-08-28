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
      SELECT
        ?id ?body ?languageCode ?realmCode ?version
        (CONCAT(?patientName, " ", ?patientSurname) AS ?patient)
        (CONCAT(?authorName, " ", ?authorSurname) AS ?humanAuthor)
        ?organization
      FROM <https://fse.ontology/>
      WHERE {
        ?id
          rdf:type fse:clinicalDocument ;
          fse:body ?body ;
          fse:languageCode ?languageCode ;
          fse:realmCode ?realmCode ;
          fse:versionNumber ?version ;
          #fse:confidentialyCode ?confidentialyCode.
        OPTIONAL {
          ?id fse:refersTo ?p .
          ?p
            foaf:firstName ?patientName ;
            foaf:lastName ?patientSurname .
        }
        OPTIONAL {
          ?id fse:hasHumanAuthor ?ha .
          ?ha
            foaf:firstName ?authorName ;
            foaf:lastName ?authorSurname .
        }
        OPTIONAL {
          ?id fse:hasCustodian ?o .
          ?o org:identifier ?organization .
        }
      }
    `,
    { reasoning: true }
  )
  const res = (await query.execute()).results.bindings
  const documents = mapBindingsToValues(res)
  return documents as ClinicalDocument[]
}

const usePatientStore = (fiscalCode: string) => {
  const [patient] = createResource<Patient>(() => fetchPatient(fiscalCode))
  const [documents] = createResource<ClinicalDocument[]>(() => fetchClinicalDocuments(fiscalCode))
  return { patient, documents }
}

export default usePatientStore