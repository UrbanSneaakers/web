import './App.css';
import React from 'react';
import { Navbar } from './components/Navbar';
import PopularSneaakersGallery from './features/home/PopularSneaakersGallery';

function App() {
  return (
    <>
      <Navbar />
      <PopularSneaakersGallery />
      <div className="app-wrapper">
        <h1>Bienvenido a Urban Sneaakers 👟</h1>
        <p>¡Muy pronto podrás ver nuestro catálogo de tenis!</p>
      </div>
    </>
  );
}
export default App;
