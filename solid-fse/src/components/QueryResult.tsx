import { Component } from "solid-js"
import useQueriesStore from "../hooks/useQueriesStore"

const QueryResult: Component = () => {
  const { queryResult } = useQueriesStore()
  return <p>QueryResult {JSON.stringify(queryResult())}</p>
}

export default QueryResult