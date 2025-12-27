import React from 'react';
import { Routes, Route } from 'react-router';
import SneaakersList from './components/SneaakersList';
import SneaakerDetail from './components/SneaakerDetail';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<SneaakersList />} />
      <Route path="/sneaker/:id" element={<SneaakerDetail />} />
    </Routes>
  );
};

export default Router;