import type { Component } from "solid-js"
import useCounter from "../hooks/useCounter"

const btn = `
  w-32
  p-2
  rounded-lg
  text-white
  bg-blue-400
  cursor-pointer
`

const Counter: Component = () => {
  const { counter, increment, decrement } = useCounter()

  return (
    <>
      <div class="page counter">
        <h1 class="text-6xl mb-8">{counter.value}</h1>

        <div class="flex gap-4">
          <button class={btn} onClick={increment}> + </button>
          <button class={btn} onClick={decrement}> - </button>
        </div>
      </div>
    </>
  )
}

export default Counter