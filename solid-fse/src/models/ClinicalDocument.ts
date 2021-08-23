import { Person } from "./Person";

export interface ClinicalDocument {
  id: string
  documentType: string
  timestamp: Date
  version: string
  realmCode: string
  confidentialityCode: string
  author: Person,
  body: string
}