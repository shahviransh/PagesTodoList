import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";

var key = "todos";

function EditTodo() {
  const navigate = useNavigate();
  const params = useParams();
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem(key)));
  const [input, setInput] = useState("");
  var selected = false;

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(todos));
  }, [todos]);

  const handleChange = (e) => {
    selected = e.target.value === "yes" ? true : false;
  };

  const submitInput = () => {
    let id = params.id;
    if (id !== undefined) {
      for (var i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
          todos[i].name = input;
          todos[i].finished = selected;
        }
      }
    } else if (input !== "") {
      const todo = {
        id: Date.now().toString(),
        name: input,
        finished: selected,
      };
      setTodos((todos) => [...todos, todo]);
    }
    localStorage.setItem(key, JSON.stringify(todos));
  };

  return (
    <div>
      <button
        onClick={() => navigate("/")}
        className="btn btn-secondary floatLeft"
      >
        Back
      </button>
      <div>
        <h6 className="nameLeft">Name</h6>
        <input
          type="text"
          placeholder="Name Here"
          value={input}
          onInput={(e) => setInput(e.target.value)}
        />
      </div>
      <div>
        <h6 className="finLeft">Finished</h6>
        <input
          type="radio"
          id="yes"
          name="choose"
          value="yes"
          onChange={handleChange}
          className="form-check-input"
        />
        <label for="yes" className="label">
          Yes
        </label>

        <input
          type="radio"
          id="no"
          name="choose"
          value="no"
          onChange={handleChange}
          className="form-check-input"
        />
        <label for="no" className="label">
          No
        </label>
      </div>
      <div>
        <button onClick={submitInput} className="btn btn-outline-primary">
          {params.id !== undefined ? "Edit" : "Add"}
        </button>
      </div>
    </div>
  );
}

export default EditTodo;
