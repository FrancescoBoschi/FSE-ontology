import { createStore } from "solid-js/store"

const [counter, setCounter] = createStore({ value: 0 })

const increment = () => setCounter("value", v => v + 1)
const decrement = () => setCounter("value", v => v - 1)

export default () => ({
  counter,
  increment,
  decrement
})