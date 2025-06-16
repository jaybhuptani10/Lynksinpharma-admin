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

  // PrivateRoute should always check the latest token
  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const isAuthenticated = !!token;
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
