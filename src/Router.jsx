import React from 'react';
import { Routes, Route } from 'react-router';
import { Navbar } from './components/Navbar';
import SneaakersList from './components/SneaakersList';
import SneaakerDetail from './components/SneaakerDetail';
import BrandDetail from './components/BrandDetail';
import CategoryDetail from './components/CategoryDetail';
import CategoryBrandDetail from './components/CategoryBrandDetail';
import PurchaseScreen from './components/PurchaseScreen';

const Router = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<SneaakersList />} />
        <Route path="/sneaker/:id" element={<SneaakerDetail />} />
        <Route path="/marca/:brand" element={<BrandDetail />} />
        <Route path="/categoria/:category" element={<CategoryDetail />} />
        <Route path="/categoria/:category/marca/:brand" element={<CategoryBrandDetail />} />
        <Route path="/compra" element={<PurchaseScreen />} />
      </Routes>
    </>
  );
};

export default Router;