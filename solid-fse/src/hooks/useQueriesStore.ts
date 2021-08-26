import { createResource, createRoot, createSignal } from "solid-js"
import { Query } from "../models/Query"
import createStardogQuery from "./createStardogQuery"

const queries: Query[] = [
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
  },
  {
    name: "Lista documenti",
    code: `
      SELECT ?clinicalDocument ?body ?languageCode ?realmCode ?versionNumber
      FROM <https://fse.ontology/>
      WHERE {
        ?clinicalDocument
          rdf:type fse:clinicalDocument ;
          fse:body ?body ;
          fse:languageCode ?languageCode ;
          fse:realmCode ?realmCode ;
          fse:versionNumber ?versionNumber .
      }
    `,
    options: { reasoning: true }
  }
]

const queriesStore = createRoot(() => {
  // Query code string, used in CustomQuery
  const [queryCode, setQueryCode] = createSignal("")

  // Dynamic resource, refetches whenever currentQuery changes
  const runQuery = async (query: Query) => {
    if (query.code == "") return
    const res = await createStardogQuery(query.code, query.options ?? {}).execute()
    if (res?.head?.vars == undefined || res?.results?.bindings == undefined)
      throw "Errore nell'esecuzione della query."
    return res
  }
  const [currentQuery, setCurrentQuery] = createSignal<Query | undefined>(undefined)
  const [queryResult] = createResource(currentQuery, runQuery)

  return {
    queries,
    queryCode, setQueryCode,
    currentQuery,
    runQuery: setCurrentQuery,
    queryResult
  }
})

export default () => queriesStore