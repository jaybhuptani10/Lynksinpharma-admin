import React, { useEffect, useState } from "react";
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

  // PrivateRoute should always check the latest token and validate it via API
  const PrivateRoute = ({ children }) => {
    const [isValid, setIsValid] = useState(null);
    const admin_token = localStorage.getItem("admin_token");

    useEffect(() => {
      const validateToken = async () => {
        if (!admin_token) {
          setIsValid(false);
          return;
        }
        try {
          // Send request with credentials, token will be read from cookie by backend
          const response = await axios.get("admin/validate", { withCredentials: true });
          console.log("Validation response:", response);
          setIsValid(response.data.success === true);
          if (response.data.success !== true) {
            localStorage.removeItem("admin_token");
            localStorage.removeItem("adminInfo");
          }
        } catch (err) {
          setIsValid(false);
          localStorage.removeItem("admin_token");
          localStorage.removeItem("adminInfo");
        }
      };
      validateToken();
    }, []);

    if (isValid === null) {
      // Optionally show a loading spinner
      return <div className="flex justify-center items-center h-screen">Validating session...</div>;
    }
    return isValid ? children : <Navigate to="/login" replace />;
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
