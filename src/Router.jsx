import React from 'react';
import { Routes, Route } from 'react-router';
import SneaakersList from './components/SneaakersList';
import SneaakerDetail from './components/SneaakerDetail';
import BrandDetail from './components/BrandDetail';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<SneaakersList />} />
      <Route path="/sneaker/:id" element={<SneaakerDetail />} />
      <Route path="/marca/:brand" element={<BrandDetail />} />
    </Routes>
  );
};

export default Router;