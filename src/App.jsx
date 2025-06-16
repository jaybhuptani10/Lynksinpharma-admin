import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";
import Admin from "./components/Admin";
import Login from "./components/auth/Login";
import { store } from "./store/store";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const App = () => {
  axios.defaults.baseURL = API_BASE_URL;

  axios.defaults.withCredentials = true;

  // Get token from cookie if not in localStorage
  function getToken() {
    const token = localStorage.getItem("token");

    if (token) {
      return token;
    }
    return null;
  }
  const token = getToken();
  const isAuthenticated = !!token;

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
//testimonials employees and blogs
