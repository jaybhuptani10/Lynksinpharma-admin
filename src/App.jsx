import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Admin from "./components/Admin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
//testimonials employees and blogs
