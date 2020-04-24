import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";

interface ITodo {
  text: string;
  complete: boolean;
}

export default function App(): JSX.Element {
  const [value, setValue] = useState<string>("");
  const [todo, setTodo] = useState<ITodo[]>([]);

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };

  const addTodo = (text: string) => {
    const newTodo: ITodo[] = [...todo, { text, complete: false }];
    setTodo(newTodo);
  };

  const completeTodo = (index: number): void => {
    const newTodo: ITodo[] = [...todo];
    newTodo[index].complete = !newTodo[index].complete;
    setTodo(newTodo);
  };

  const removeTodo = (index: number): void => {
    const newTodo: ITodo[] = [...todo];
    newTodo.splice(index, 1);
    setTodo(newTodo);
  };

  const renderData = () => {
    if (!todo.length) {
      return <li className="list-group-item">No data</li>;
    }

    return todo.map((todo: ITodo, index: number) => (
      <li key={index} className="list-group-item">
        {todo.text}

        <div className="btns">
          <button
            onClick={() => completeTodo(index)}
            type="button"
            className={
              todo.complete
                ? "btn btn-outline-success"
                : "btn btn-outline-primary"
            }
          >
            {todo.complete ? "Done!" : "In progress"}
          </button>
          <button
            onClick={() => removeTodo(index)}
            type="button"
            className="btn btn-outline-danger ml-2"
          >
            delete
          </button>
        </div>
      </li>
    ));
  };

  return (
    <div className="col-md-4 offset-md-4 mt-5">
      <div className="jumbotron">
        <h1 className="display-4 mb-3">To do!</h1>
        <hr className="my-4"></hr>
        <label className="d-block">Title</label>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="input-group-append">
            <button
              onClick={handleSubmit}
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              disabled={!value.length}
            >
              Add
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">To do list</div>
          <ul className="list-group list-group-flush">{renderData()}</ul>
        </div>
      </div>
    </div>
  );
}

const root = document.getElementById("app-root");

ReactDOM.render(<App />, root);
