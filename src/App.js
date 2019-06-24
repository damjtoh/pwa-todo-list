import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import clsx from "clsx";
import axios from "axios";

const endpoint = "/todos";

const Loading = () => (
  <div className="loading">
    <i class="fas fa-circle-notch fa-spin fa-3x" />
  </div>
);

function App() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [todos, setTodos] = useState([]);
  const toggleTask = id => () => {
    console.log("clicked");
    setTodos(todos => {
      const todoIndex = todos.findIndex(t => t._id === id);
      const todo = {
        ...todos[todoIndex],
        completed: !todos[todoIndex].completed
      };
      return [
        ...todos.slice(0, todoIndex),
        todo,
        ...todos.slice(todoIndex + 1, todos.lengrh)
      ];
    });
  };

  const inputRef = useRef(null);

  const addTask = e => {
    e.preventDefault();
    console.log(inputRef.current.value);
  };

  useEffect(() => {
    axios.get(endpoint).then(response => {
      setLoaded(true);
      setTodos(response.data);
      setError(false);
    });
  }, []);
  return (
    <div className="wrapper">
      <div className="wrapper__inner">
        <div className="notepad">
          <h1 className="notepad__heading">Todo List</h1>
          <form className="notepad__form" onSubmit={addTask}>
            <input
              ref={inputRef}
              className="notepad__form-input"
              placeholder="Escribí una tarea"
              id="form-input"
            />
            <label className="notepad__form-label" htmlFor="form-input">
              Agregar un item
            </label>
          </form>
          {!loaded ? (
            <Loading />
          ) : (
            <ul className="notepad__list">
              {todos.map(task => (
                <li className="notepad__list-item" key={task._id}>
                  <button
                    className={clsx({ done: task.completed })}
                    onClick={toggleTask(task._id)}
                    type="button"
                  >
                    {task.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
    // <div className="wrapper">
    //   <h1>Todo List</h1>
    //   <div className="todo">
    //     <input type="text" placeholder="Ingrese la tarea" />
    //     <ul>
    //       {todos.map(task => (
    //         <li>{task.name}</li>
    //       ))}
    //     </ul>
    //   </div>
    // </div>
  );
}

export default App;
