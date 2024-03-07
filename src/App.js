import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from "./pages/Manager/Dashboard.js";
import Entry from "./pages/Manager/Entry.js";
import Profile from "./pages/Manager/Profile.js";
import Year from "./pages/Manager/Year.js";
import Month from "./pages/Manager/Month.js";
import Login from "./pages/Manager/Login.js";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/mgr-dashboard" element={<Dashboard />} />
      <Route path="/mgr-profile" element={<Profile />} />
      <Route path="/mgr-year" element={<Year />} />
      <Route path="/mgr-month/:yearId/:yearName" element={<Month />} />
      <Route path="/mgr-entry/:yearName/:monthName" element={<Entry />} />
    </Routes>
  );
};

export default App;