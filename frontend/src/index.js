import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import KeyboardList from "./components/KeyboardList";
import KeyboardDetails from "./components/KeyboardDetails";
import KeyboardAdd from "./components/KeyboardAdd";
import KeyboardUpdate from "./components/KeyboardUpdate";
import { LogInPage } from "./components/LogInPage";
import { SignUpPage } from "./components/SignUpPage";
import { PrivateRoute } from "./auth/PrivateRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/keyboards" element={<KeyboardList />} />
        <Route path="/keyboards/:id" element={<KeyboardDetails />} />
        {/* TODO: 8 - change element for KeyboardAdd to <PrivateRoute><KeyboardAdd /></PrivateRoute>*/}
        <Route
          path="/keyboards/add"
          element={
            <PrivateRoute>
              <KeyboardAdd />
            </PrivateRoute>
          }
        />
        {/* TODO: 9 - change element for KeyboardUpdate to <PrivateRoute><KeyboardUpdate /></PrivateRoute>*/}
        <Route
          path="/keyboards/update/:id"
          element={
            <PrivateRoute>
              <KeyboardUpdate />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
