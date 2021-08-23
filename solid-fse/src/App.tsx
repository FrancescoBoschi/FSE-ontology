import { Component, lazy } from "solid-js"
import { Routes, Route } from "solid-app-router"
import Nav from "./components/Nav"

const Patients = lazy(() => import("./pages/Patients"))
const Patient = lazy(() => import("./pages/Patient"))
const Register = lazy(() => import("./pages/Register"))
const Queries = lazy(() => import("./pages/Queries"))
const NotFound = lazy(() => import("./pages/NotFound"))

const App: Component = () => {
  return (
    <>
      <Nav/>
      <div class="container max-w-4xl flex-grow p-6">
        <Routes>
          <Route path="/" element={<Patients/>}/>
          <Route path="/patients/:name" element={<Patient/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/queries" element={<Queries/>}/>
          <Route path="/*all" element={<NotFound/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App