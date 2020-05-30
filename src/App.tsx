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

  const deleteTodo = (i: number) => {
    setTodos(todos.filter((todo, index) => index !== i))
  }

  return (
    <div className="app">
      <Todos onSubmit={(text: string) => setTodos([...todos, { text, done: false }])} />

      {todos.map((todo, i) => {
        return <div className="d-flex justify-content-center align-items-center">
          <div
            key={i}
            className={`todo-item ${todo.done ? "line-through" : ""}`}
            onClick={() => toggleTodo(i)}>
            {todo.text}
          </div>
          <div className="todo-item__delete" onClick={() => deleteTodo(i)}>X</div>
        </div>
      })}
    </div>
  )
}