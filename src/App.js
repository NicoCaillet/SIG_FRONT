import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {DataProvided} from "./context/dataContext";
import Home from "./pages/HomePage/HomePage";
import Login from "./pages/login/Login";
import DetailJob from './pages/DetailJob/DetailJob';
import PageNotFound from './pages/PageNotFound/PageNotFound'
import AllBudgets from './pages/Budgets/Budgets'
import CreateBudgets from './pages/CreateBudgets/CreateBudets'
import Requirements from './pages/Requirements/Requirements'
export default function App() {

  return (
    <DataProvided>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/jobs/:id" element={<DetailJob />} />
          <Route path="/createBudgets" element={<CreateBudgets />} />
          <Route path="/allBudgets" element={<AllBudgets />} />
          <Route path="/requirements" element={<Requirements />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </DataProvided>
  );
}
