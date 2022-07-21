import { React, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";

function Home() {
  const key = "todos";
  const navigate = useNavigate();
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem(key)));
  const location = useLocation();

  const deleteItem = (id) => {
    const items = todos.filter((item) => item.id !== id);
    setTodos(items);
    localStorage.setItem(key, JSON.stringify(items));
  };

  const renderTodos = () => {
    const queryParams = new URLSearchParams(location.search);
    const finished = queryParams.get("finished");
    if (finished === "1") {
      return printTodos(todos.filter((item) => item.finished));
    } else if (finished === "0") {
      return printTodos(todos.filter((item) => !item.finished));
    }
    return printTodos(todos);
  };

  const printTodos = (editedTodos) => {
    return editedTodos.map((item) => (
      <dd key={item.id}>
        <div className="row list">
          <div className="column">{item.name}</div>
          <div className="column">{item.finished ? "Yes" : "No"}</div>
          <div className="column">
            <button
              onClick={() => {
                deleteItem(item.id);
              }}
              className="btn btn-danger"
            >
              D
            </button>
            <button
              onClick={() => navigate(`/todo/${item.id}`)}
              className="btn btn-primary"
            >
              E
            </button>
          </div>
        </div>
      </dd>
    ));
  };

  return (
    <div>
      <button
        onClick={() => navigate("/todo")}
        className="btn btn-warning floatRight"
      >
        New
      </button>
      <dl>
        <div className="row">
          <div className="column">Name</div>
          <div className="column">Finished</div>
          <div className="column">Actions</div>
        </div>
        {renderTodos()}
      </dl>
    </div>
  );
}

export default Home;
