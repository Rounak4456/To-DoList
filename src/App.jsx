import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react'
import Navbar from './Component/Navbar'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos")
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos))
    }
  }, [])

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos))
    }
  }, [todos])

  const handleAdd = () => {
    if (todo.trim()) {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
      setTodo("")
    }
  }

  const handleEdit = (e, id) => {
    const todoToEdit = todos.find(item => item.id === id)
    setTodo(todoToEdit.todo)
    setTodos(todos.filter(item => item.id !== id))
  }

  const handleDelete = (e, id) => {
    setTodos(todos.filter(item => item.id !== id))
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckBox = (e) => {
    const id = e.target.name
    setTodos(todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    ))
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-red-400">
        <div className="container mx-auto rounded-xl p-5 bg-white">
          <div className="addTodo my-5 text-center">
            <h2 className='text-lg font-bold mb-3'>Add a Task</h2>
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className='w-80 p-2 border border-gray-300 rounded-md'
            />
            <button
              onClick={handleAdd}
              className='bg-violet-500 hover:bg-violet-700 font-bold p-3 py-1 text-white rounded-md mx-6 transition-all'
            >
              Add to List
            </button>
          </div>
          <h1 className='text-2xl font-bold text-center mb-5'>Your Todos</h1>
          <div className='todos text-center'>
            {todos.length === 0 && <div className='text-lg font-bold m-5'>No To - Dos to display</div>}
            {todos.map((item) => (
              <div key={item.id} className="todo flex justify-between items-center w-1/2 mx-auto my-4">
                <div className='flex gap-5 items-center'>
                  <input
                    type="checkbox"
                    onChange={handleCheckBox}
                    checked={item.isCompleted}
                    name={item.id}
                    className="form-checkbox h-5 w-5"
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex gap-3">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className='bg-violet-500 hover:bg-violet-700 font-bold p-2 text-white rounded-md transition-all'
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className='bg-red-500 hover:bg-red-700 font-bold p-2 text-white rounded-md transition-all'
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
