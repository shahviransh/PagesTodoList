import { React, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";

var key = "todos";

function Home() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem(key)));
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(todos));
  }, [todos]);

  const filterList = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const listTodos = () => {
    if (location.search === "?finished=1") {
      return printTodos(todos.filter((item) => item.finished));
    } else if (location.search === "?finished=0") {
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
                filterList(item.id);
              }}
              className="btn btn-danger"
            >
              D
            </button>
            <button
              onClick={() => navigate("/todo/" + item.id)}
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
        {listTodos()}
      </dl>
    </div>
  );
}

export default Home;
