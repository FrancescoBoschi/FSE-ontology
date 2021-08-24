import { Component, createMemo, For, Show } from "solid-js"
import useQueriesStore from "../hooks/useQueriesStore"

const QueryResult: Component = () => {
  const { queryResult } = useQueriesStore()

  const queryFields = createMemo(() => queryResult()?.head.vars)
  const queryRecords = createMemo(() => queryResult()?.results.bindings)

  return (
    <Show
      when={queryResult() != undefined}
      fallback={<p class="text-center">I risultati delle query saranno mostrati qui.</p>}
    >
      <div class="overflow-hidden border-2 rounded-lg border-gray-600">
        <table class="min-w-full">
          <thead>
            <tr class="text-left border-b-2 bg-gray-700 border-gray-600">
              <For each={queryFields()}>{ (field) =>
                <th class="px-3 py-2">{field.replaceAll("_", " ")}</th>
              }</For>
            </tr>
          </thead>
          <tbody>
            <For each={queryRecords()}>{ (record) =>
              <tr class="border-b-2 last-of-type:border-b-0 border-gray-700">
                <For each={queryFields()}>{ (field) =>
                  <td class="px-3 py-2">{record[field].value}</td>
                }</For>
              </tr>
            }</For>
          </tbody>
        </table>
      </div>
    </Show>
  )
}

export default QueryResult