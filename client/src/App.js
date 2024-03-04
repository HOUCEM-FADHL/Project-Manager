import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Register from "./Views/Register";
import Login from "./Views/Login";
import water3 from "./Assets/water3.jpg";
import Dashboard from "./Views/Dashboard";
import Create from "./Views/Create";
import Update from "./Views/Update";
import ShowOne from "./Views/ShowOne";
import Todo from "./Views/Todo";
import Performances from "./Views/Performances";
import About from "./Views/About";
import Contact from "./Views/Contact";

function App() {
  return (
    <div style={{ backgroundImage: `url(${water3})` }} className="min-vh-100">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customer/create" element={<Create />} />
        <Route path="/customer/edit/:id" element={<Update />} />
        <Route path="/customer/:id" element={<ShowOne />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/performances" element={<Performances />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
