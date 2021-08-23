import { createSignal } from "solid-js"
import { Query } from "../models/Query"

const [queries, setQueries] = createSignal<Query[]>([
  { name: "Query 1", code: "" },
  { name: "Query 2", code: "" }
])

const runQuery = (query: Query) => {
  console.log("run query")
  console.log(query)
  setQueryResult(query.name)
}

const [queryResult, setQueryResult] = createSignal<unknown>(undefined)

export default () => ({ queries, runQuery, queryResult })