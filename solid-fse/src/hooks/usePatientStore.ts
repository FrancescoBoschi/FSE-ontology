import { createResource } from "solid-js"
import { PatientDetails } from "../models/Patient"

type PatientFetcher = (name: string) => Promise<PatientDetails>
const fetchPatient: PatientFetcher = async (name: string) => {
  return {
    name: "Mario",
    surname: "Rossi",
    birthDate: "01/01/1990",
    fiscalCode: "RSSMRO62B25E205Y",
    healthCardNumber: "80380800301234567890",
    email: "mario.rossi@gmail.com",
    phone: "+39 123 456 7890",
    familyDoctor: "Gregory House",
    clinicalDocuments: [
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