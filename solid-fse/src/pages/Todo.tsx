import { Component, For, Show } from "solid-js"
import useTodos from "../hooks/useTodos"
import AddTodo from "../components/AddTodo"

const Todo: Component = () => {
  const { todos, count, doneCount } = useTodos()

  return (
    <div class="page todo pt-8">
      <div class="flex-grow flex flex-col align-middle gap-8">

        <AddTodo/>

        <Show
          when={todos.value.length > 0}
          fallback={<p>The Todo list is empty.</p>}
        >
          <ul class="pl-8">
            <For each={todos.value}>{item =>
              <li class={`list-disc ${item.done ? "text-green-300" : ""}`}>
                {item.text}
              </li>
            }</For>
          </ul>
        </Show>

      </div>
    </div>
  )
}

export default Todo