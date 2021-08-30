import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

export default function App() {
  const [todos, setTodos] = useState([])
  const [popupActive, setPopupActive] = useState(false)
  const [newTodo, setNewTodo] = useState("")

  useEffect(() => {
    getTodos()
  }, [todos])

  const awaitInstance = axios.create({
    baseURL: "https://avtodos.herokuapp.com/"
  })

  const getTodos = async () => {
    const res = await awaitInstance.get('/todos')
    setTodos(res.data)
  }

  const completeTodo = async (id) => {
    const res = await awaitInstance.put('/todo/complete/' + id, {
      completed: todos.completed
    })
    setTodos(todos => todos.map(todo => {
      if (todo._id === res.data._id) {
        todo.completed = res.data.completed
      }
      return todo
    }))
  }

  const deleteTodo = async (id) => {
    await awaitInstance.delete('/todo/delete/' + id)
    // console.log(res)
    setTodos(todos => todos.filter(todo => todo._id !== id));
  }

  const addTodo = async () => {
    const res = await awaitInstance.post('/todo/new', {
      text: newTodo
    }, {
      headers: {
        "Content-Type": "application/json"
      },

    })
    // console.log(res.data.text)
    setTodos([...todos, res]);
    setPopupActive(false);
    setNewTodo("");
  }
  return (
    <div className="App">
      <h1>TO DO LIST</h1>
      <h4>Your tasks</h4>
      <div className="todos">
        {todos.map(todo => {
          return (
            <div className={"todo " + (todo.completed ? " is-complete" : "")} key={todo._id} onClick={() => completeTodo(todo._id)}>
              <div className="checkbox"></div>
              <div className="text">{todo.text}</div>
              <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>-</div>
            </div>
          )
        })}

      </div>

      <div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>x</div>
          <div className="content">
            <h3>Add Task</h3>
            <input type="text" className="add-todo-input" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
            <div className="button" onClick={addTodo}>Create Task</div>
          </div>
        </div>
      ) : ''}


    </div>
  )
}
