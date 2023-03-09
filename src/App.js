import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Controls from "./pages/Controls";
import Article from "./pages/Article";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/controls" element={<Controls />} />
        <Route path="/article/:id" element={<Article />} />
      </Routes>
    </Router>
  );
}

export default App;
