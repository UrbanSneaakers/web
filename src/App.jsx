import './App.css';
import React from 'react';
import { Navbar } from './components/Navbar';
import SneaakersPerspectiveScroll from './components/SneaakersPerspectiveScroll';

function App() {
  return (
    <>
      <Navbar />
      <SneaakersPerspectiveScroll />
      <div className="app-wrapper">
        <h1>Bienvenido a Urban Sneaakers 👟</h1>
        <p>¡Muy pronto podrás ver nuestro catálogo de tenis!</p>
      </div>
    </>
  );
}
export default App;
