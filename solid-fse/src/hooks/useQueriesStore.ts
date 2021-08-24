import { createSignal } from "solid-js"
import { Query } from "../models/Query"
import { StardogQueryOptions, StardogQueryResult } from "../models/Stardog"
import createStardogQuery from "./createStardogQuery"

const [queries, setQueries] = createSignal<Query[]>([
  { name: "Query 1", code: "" },
  { name: "Query 2", code: "" }
])

const [queryCode, setQueryCode] = createSignal("")
const [queryResult, setQueryResult] = createSignal<StardogQueryResult | undefined>(undefined)

const runQuery = async (code: string, options: Partial<StardogQueryOptions> = {}) => {
  setQueryCode(queryCode)
  const query = createStardogQuery(code, options)
  const res = await query.execute()
  setQueryResult(res)
  console.log(res)

  const fields = res.head.vars
  const records = res.results.bindings
  console.log(fields, records)
  for (const record of records) {
    for (const field of fields) {
      console.log(record[field].value)
    }
  }
}

export default () => ({
  queries,
  queryCode, setQueryCode,
  runQuery, queryResult
})