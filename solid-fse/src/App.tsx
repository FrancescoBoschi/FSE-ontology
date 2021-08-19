import { Component, lazy } from "solid-js"
import { Routes, Route } from "solid-app-router"
import Nav from "./components/Nav"

const Home = lazy(() => import("./pages/Home"))
const Counter = lazy(() => import("./pages/Counter"))
const Todo = lazy(() => import("./pages/Todo"))
const NotFound = lazy(() => import("./pages/NotFound"))

// TODO: transitions, scoped styles

const App: Component = () => {
  return (
    <>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/counter" element={<Counter/>}/>
        <Route path="/todo" element={<Todo/>}/>
        <Route path="/*all" element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App