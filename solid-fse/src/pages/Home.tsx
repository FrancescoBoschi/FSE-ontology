import { Component, onMount } from "solid-js"
import { Connection, db, query } from "stardog"

const Home: Component = () => {

  onMount(async () => {
    console.clear()

    const conn = new Connection({
      username: "admin",
      password: "admin",
      endpoint: "http://localhost:5820"
    })
    console.log(conn)

    const { body: databases } = await db.list(conn)
    console.log(databases)

    const { body: database } = await db.get(conn, "fse")
    console.log(database)

    const { body: model } = await db.model(conn, "fse", {}, { reasoning: true })
    console.log(model)

    query.execute(conn, 'fse', `SELECT ?healthWorker FROM <https://fse.ontology/> WHERE { ?healthWorker rdf:type fse:healthWorker . } `, 'application/sparql-results+json', {
      limit: 10,
      reasoning: true,
      offset: 0,
    }).then((r) => {
      console.log(r);
    });
  })

  return (
    <div class="page home">
      <p class="mt-8">
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a
        href="https://github.com/solidjs/solid"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn Solid
      </a>
    </div>
  )
}

export default Home