import { createResource } from "solid-js"
import { PatientDetails } from "../models/Patient"

const usePatientStore = (name: string) => {
  const [patient] = createResource<PatientDetails>(
    () => fetch(`https://jsonplaceholder.typicode.com/users?name=${name}`).then((res) => res.json()).then(json => json[0]),
    { initialValue: undefined }
  )
  return patient
}

export default usePatientStore