import { React, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";

var key = "todos";
var addOrEdit = true;

function EditTodo() {
  const navigate = useNavigate();
  const params = useParams();
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem(key)));
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState("");

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  const submitInput = () => {
    let id = params.id;
    if (id !== undefined) {
      for (var i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
          todos[i].name = input;
          todos[i].finished = selected === "yes";
        }
      }
    } else if (input !== "") {
      const todo = {
        id: Date.now().toString(),
        name: input,
        finished: selected === "yes",
      };
      setTodos((todos) => [...todos, todo]);
    }
    localStorage.setItem(key, JSON.stringify(todos));
  };

  return (
    <div>
      <button
        onClick={() => {
          navigate("/");
          addOrEdit = true;
        }}
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
          {addOrEdit ? "Add" : "Edit"}
        </button>
      </div>
    </div>
  );
}

export default EditTodo;
