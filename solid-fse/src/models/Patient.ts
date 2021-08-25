import { ClinicalDocument } from "./ClinicalDocument"
import { Person } from "./Person"

export interface Patient extends Person {
  birthDate: string
  fiscalCode: string
  healthCardNumber: string
  email: string
  phone: string
}

export interface PatientDetails extends Patient {
  clinicalDocuments: ClinicalDocument[]
}