import React, { useState, useEffect } from 'react';
import './App.css';

const Todo = ({todo, removeTodo}) => <div onClick={() => removeTodo(todo.id)}>{todo.title} x</div>

function TodoForm({addTodo}) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    if(!value) return;
    addTodo(value);
    setValue("");
  }

  return (
    <>
      <input type="text" placeholder="todo title" value={value} onChange={e => setValue(e.target.value)}/>
      <button onClick={handleSubmit}>Add todo</button>
    </>
  )
}

function App() {
  const [ todoList, setTodos ] = useState([]);
  const [ userAlert, setAlert ] = useState("");

  const addTodo = text => {
    const newTodos = [...todoList, {title: text, id: (new Date().getTime())}]
    setTodos(newTodos);
  }

  const removeTodo = id => {
    const updatedTodos = todoList.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  }

  useEffect(() => {
    if(todoList.length) {
      setAlert(`You last added todo its ${todoList[todoList.length - 1].title}`)
    }
  })

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <TodoForm addTodo={addTodo} />
      {todoList.map(todo => <Todo todo={todo} key={todo.id} removeTodo={todo => removeTodo(todo)} />)}
      <h3>{userAlert}</h3>
    </div>
  );
}

export default App;
