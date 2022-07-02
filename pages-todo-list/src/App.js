import "./logo.svg";
import { React } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditTodo from "./pages/EditTodo";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="todo" element={<EditTodo />} />
        <Route path="todo/:id" element={<EditTodo />} />
      </Routes>
    </Router>
  );
}

export default App;
