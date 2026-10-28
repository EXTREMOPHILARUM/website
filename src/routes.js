import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Project from './pages/Project';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="work/:slug" element={<Project />} />
      {/* Old /blog/*, /projects/* and /content/* URLs pointed at retired pages. */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);

export default AppRoutes;
