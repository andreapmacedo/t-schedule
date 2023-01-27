import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from "../pages/MainPage";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<MainPage/>}/>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;