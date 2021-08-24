import { createSignal } from "solid-js"
import { Query } from "../models/Query"
import { StardogQueryOptions, StardogQueryResult } from "../models/Stardog"
import createStardogQuery from "./createStardogQuery"

const [queries, setQueries] = createSignal<Query[]>([
  {
    name: "Lista pazienti",
    code: `
      SELECT ?ID ?Nome ?Cognome ?Data_di_Nascita
      FROM <https://fse.ontology/>
      WHERE {
        ?ID rdf:type fse:patient .
        ?ID foaf:firstName ?Nome .
        ?ID foaf:lastName ?Cognome .
        ?ID foaf:birthday ?Data_di_Nascita .
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