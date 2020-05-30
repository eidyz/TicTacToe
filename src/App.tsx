import * as React from "react"
import { useState } from "react"
import Todos from "./Components/Todos/todos"

export default () => {
  const [todos, setTodos] = useState([])

  const toggleTodo = (i: number) => {
    setTodos(todos.map(
      (todo, index) => index === i ?
        {
          ...todo,
          done: !todo.done
        } :
        todo))
  }

  return (
    <div className="app">
      <Todos onSubmit={(text: string) => setTodos([...todos, { text, done: false }])} />

      {todos.map((todo, i) => {
        return <div
          key={i}
          onClick={() => toggleTodo(i)}
          className={`todo-item ${todo.done ? "line-through" : ""}`}>
          {todo.text}
        </div>
      })}
    </div>
  )
}