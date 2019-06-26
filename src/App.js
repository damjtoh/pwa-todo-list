import React, { useRef, useState, useEffect, useCallback } from "react";
import "./App.css";
import clsx from "clsx";
import TodosService from "./TodosService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Loading = () => (
  <div className="loading">
    <i className="fas fa-circle-notch fa-spin fa-3x" />
  </div>
);

function App() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [todos, setTodos] = useState([]);

  const getTodos = useCallback(() => {
    TodosService.get().then(todos => {
      setLoaded(true);
      setTodos(todos);
      setError(false);
    });
  }, [setLoaded, setTodos, setError]);

  const toggleTask = id => () => {
    console.log("clicked");
    setTodos(todos => {
      const todoIndex = todos.findIndex(t => t._id === id);
      const todo = {
        ...todos[todoIndex],
        completed: !todos[todoIndex].completed
      };
      TodosService.toggle(id, todo.completed).then(getTodos);
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
    const name = inputRef.current.value;
    if (!name) {
      toast.error("Debe ingresar una tarea");
      return null;
    }
    TodosService.add(name).then(newTodo => {
      setTodos(todos => [...todos, newTodo]);
      inputRef.current.value = "";
    });
    console.log(inputRef.current.value);
  };

  useEffect(() => getTodos(), [getTodos]);

  return (
    <>
      <ToastContainer />
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
    </>
  );
}

export default App;
