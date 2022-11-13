import "./logo.svg";
import { React } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditTodo from "./pages/EditTodo";
import Home from "./pages/Home";

function App() {
  if (!localStorage.getItem("todos")) {
    localStorage.setItem("todos", JSON.stringify([]));
  }
  return (
    <Router>
      <Routes>
        <Route path="todo" element={<EditTodo />} />
        <Route path="todo/:id" element={<EditTodo />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
