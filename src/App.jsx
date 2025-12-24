import './App.css';
import React from 'react';
import { Navbar } from './components/Navbar';
import SneaakersList from './components/SneaakersList';
import PopularSneaakersGallery from './features/home/PopularSneaakersGallery';


function App() {
  return (
    <>
      <Navbar />
      <SneaakersList />
      <div className="app-wrapper">
        <h1>Bienvenido a Urban Sneaakers 👟</h1>
        <p>¡Muy pronto podrás ver nuestro catálogo de tenis!</p>
      </div>
    </>
  );
}
export default App;
