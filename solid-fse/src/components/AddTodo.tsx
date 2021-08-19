import type { Component } from "solid-js"
import { createSignal } from "solid-js"
import useTodos from "../hooks/useTodos"

const AddTodo: Component = () => {
  const [text, setText] = createSignal("")
  let input: HTMLInputElement
  const { todos } = useTodos()

  const onSubmit = (e: Event) => {
    e.preventDefault()
    todos.value.push({
      id: todos.value.length,
      text: text(),
      done: false
    })
    setText("")
    input.focus()
  }

  return (
    <form onSubmit={onSubmit} class="flex gap-2">
      <input
        type="text"
        ref={input}
        value={text()}
        onkeyup={(e) => setText(e.currentTarget.value)}
        class="
          px-4 py-2
          rounded-lg
          outline-none
          text-gray-800
        "
     />
      <button type="submit" class="
        px-8 py-2
        rounded-lg
        text-white
        bg-blue-400
        cursor-pointer
      ">Add</button>
    </form>
  )
}

export default AddTodo