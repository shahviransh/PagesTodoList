import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";

function EditTodo() {
  const key = "todos";
  const navigate = useNavigate();
  const params = useParams();
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem(key)));
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(todos));
  }, [todos]);

  const submitInput = () => {
    let id = params.id;
    let items = [...todos];
    if (name === "") {
      alert("Please enter a name");
    } else {
      if (id) {
        items.map((item) => {
          if (item.id === id) {
            item.name = name;
            item.finished = selected;
          }
        });
      } else {
        const todo = {
          id: Date.now().toString(),
          name: name,
          finished: selected,
        };
        items = [...items, todo];
      }
      setTodos(items);
      localStorage.setItem(key, JSON.stringify(items));
      navigate("/");
    }
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <h6 className="finLeft">Finished</h6>
        {[
          { id: "1", value: "yes" },
          { id: "2", value: "no" },
        ].map((item) => (
          <span key={item.id}>
            <input
              type="radio"
              id={item.id}
              name="choose"
              value={item.value}
              onChange={(e) => setSelected(e.target.value === "yes")}
              className="form-check-name"
            />
            <label htmlFor={item.id} className="label">
              {item.value === "yes" ? "Yes" : "No"}
            </label>
          </span>
        ))}
      </div>
      <div>
        <button onClick={submitInput} className="btn btn-outline-primary">
          {params.id ? "Edit" : "Add"}
        </button>
      </div>
    </div>
  );
}

export default EditTodo;
