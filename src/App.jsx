import React from 'react';
import { Navbar } from './components/Navbar';
import SneaakersList from './components/SneaakersList';

function App() {
  return (
    <>
      <Navbar />
      <SneaakersList />
      <div style={{ padding: '100px 30px' }}>
        <h1>Bienvenido a Urban Sneaakers 👟</h1>
        <p>¡Muy pronto podrás ver nuestro catálogo de tenis!</p>
      </div>
    </>
  );
}
export default App;