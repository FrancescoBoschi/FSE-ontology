import { createResource } from "solid-js"
import { PatientDetails } from "../models/Patient"

type PatientFetcher = (name: string) => Promise<PatientDetails>
const fetchPatient: PatientFetcher = async (name: string) => {
  return {
    name,
    surname: "Rossi",
    email: `${name}.rossi@gmail.com`,
    phone: "+39 123 456 7890",
    clinicalDocuments: [
      {
        id: "0",
        documentType: "PSS",
        timestamp: new Date(),
        confidentialityCode: "CC",
        realmCode: "RC",
        version: "1.0",
        author: { name: "Gianni", surname: "Tumedei" },
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam ut soluta ducimus veritatis expedita, et sunt voluptatem saepe nihil assumenda nulla. Ratione asperiores mollitia officiis placeat ipsa aut rem laudantium."
      },
      {
        id: "1",
        documentType: "PSS",
        timestamp: new Date(),
        confidentialityCode: "CC",
        realmCode: "RC",
        version: "1.0",
        author: { name: "Gianni", surname: "Tumedei" },
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam ut soluta ducimus veritatis expedita, et sunt voluptatem saepe nihil assumenda nulla. Ratione asperiores mollitia officiis placeat ipsa aut rem laudantium."
      }
    ]
  }
}

const usePatientStore = (name: string) => {
  const [patient] = createResource<PatientDetails>(
    // () => fetch(`https://jsonplaceholder.typicode.com/users?name=${name}`).then((res) => res.json()).then(json => json[0]),
    () => fetchPatient(name),
    { initialValue: undefined }
  )
  return patient
}

export default usePatientStore