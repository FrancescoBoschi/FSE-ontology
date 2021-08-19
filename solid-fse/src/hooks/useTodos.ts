import { createMemo } from "solid-js"
import { createMutable } from "solid-js/store"

interface Todo {
  id: number,
  text: string,
  done: boolean
}

const todos = createMutable({
  value: [
    { id: 0, text: "asd", done: true }
  ] as Todo[]
})

const count = createMemo(() => todos.value.length)
const doneCount = createMemo(() => todos.value.filter(i => i.done).length)

export default () => ({
  todos,
  count,
  doneCount
})