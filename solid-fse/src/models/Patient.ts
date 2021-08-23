import { ClinicalDocument } from "./ClinicalDocument"
import { Person } from "./Person"

export interface Patient extends Person {
  email: string
  phone: string
}

export interface PatientDetails extends Patient {
  clinicalDocuments: ClinicalDocument[]
}