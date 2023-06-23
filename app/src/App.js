import React, { useState } from "react";
import "./App.css";

function Input(props) {
  const [todo, setTodo] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.setTodos((prevTodos) => [
          ...prevTodos,
          { id: Date.now(), text: todo },
        ]);
        setTodo("");
      }}
    >
      <input
        type="text"
        className="input"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button type="submit" className="button">
        Add
      </button>
    </form>
  );
}

function EditInput(props) {
  const [todo, setTodo] = useState(props.todo.text);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.setTodos((prevTodos) =>
            prevTodos.map((item) => {
              if (item.id === props.todo.id) {
                return { ...item, text: todo };
              }
              return item;
            })
          );
          setTodo("");
          props.setIsEdit(false);
        }}
      >
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="input"
        />
        <button type="submit" className="button button-success">
          Save
        </button>
      </form>
      <button onClick={() => props.setIsEdit(false)} className="button">
        Cancel
      </button>
    </>
  );
}

function TodoItem(props) {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div
      className={["sub-todo-item", props.todo.done && "done"]
        .filter(Boolean)
        .join(" ")}
    >
      {isEdit ? (
        <EditInput
          setTodos={props.setTodos}
          todo={props.todo}
          setIsEdit={setIsEdit}
        />
      ) : (
        props.todo.text
      )}{" "}
      <button onClick={() => setIsEdit(true)} className="button">
        Edit
      </button>
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", done: false },
  ]);

  const done = todos.filter((todo) => todo.done).length;

  return (
    <div className="App">
      <h1>Todo App</h1>
      <Input setTodos={setTodos} />
      <p>
        Done {done}/{todos.length}
      </p>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <input
              type="checkbox"
              value={todo.done}
              onChange={(e) =>
                setTodos((prevTodos) =>
                  prevTodos.map((item) => {
                    if (item.id === todo.id) {
                      return { ...item, done: !item.done };
                    }
                    return item;
                  })
                )
              }
            />
            <TodoItem todo={todo} setTodos={setTodos} />
            <button
              onClick={() =>
                setTodos((prevTodos) =>
                  prevTodos.filter((item) => item.id !== todo.id)
                )
              }
              className="button button-danger"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
