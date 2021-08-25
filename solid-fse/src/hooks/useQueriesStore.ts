import { createSignal } from "solid-js"
import { Query } from "../models/Query"
import { StardogQueryOptions, StardogQueryResult } from "../models/Stardog"
import createStardogQuery from "./createStardogQuery"

const [queries, setQueries] = createSignal<Query[]>([
  {
    name: "Lista pazienti",
    code: `
      SELECT ?ID ?Nome ?Cognome ?Data_di_Nascita ?Codice_Fiscale ?Tessera_Sanitaria ?Nome_Medico ?Cognome_Medico
      FROM <https://fse.ontology/>
      WHERE {
        ?ID
          rdf:type fse:patient ;
          foaf:firstName ?Nome ;
          foaf:lastName ?Cognome ;
          foaf:birthday ?Data_di_Nascita ;
          fse:fiscalCode ?Codice_Fiscale .
        OPTIONAL { ?ID fse:healthCardNumber ?Tessera_Sanitaria }
        OPTIONAL {
          ?ID fse:hasFamilyDoctor ?Medico_di_Famiglia .
          ?Medico_di_Famiglia
            foaf:firstName ?Nome_Medico ;
            foaf:lastName ?Cognome_Medico .
        }
      }
    `
  }
])

const [queryCode, setQueryCode] = createSignal("")
const [queryResult, setQueryResult] = createSignal<StardogQueryResult | undefined>(undefined)

const runQuery = async (code: string, options: Partial<StardogQueryOptions> = {}) => {
  setQueryCode(queryCode)
  const query = createStardogQuery(code, options)
  const res = await query.execute()
  setQueryResult(res)
}

export default () => ({
  queries,
  queryCode, setQueryCode,
  runQuery, queryResult
})