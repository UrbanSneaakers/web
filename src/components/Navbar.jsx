import React, { useState } from 'react';
import '../styles/Navbar.css';

const navItems = ['Lo Nuevo', 'Hombre', 'Mujer', 'Niño/a', 'Ofertas', 'SNKRS'];

const menuData = {
  Mujer: {
    Destacados: ['Comprar todo Mujer', 'Lo Nuevo', 'Los más vendidos', 'Ofertas para Mujer'],
    Calzado: ['Todo el calzado', 'Casual', 'Jordan', 'Gym y Entrenamiento', 'Correr', 'AF1', 'Tenis'],
    Ropa: ['Toda la ropa', 'Playeras y Tops', 'Leggings', 'Bras deportivos', 'Pants'],
    Deporte: ['Fitness', 'Correr', 'Baile', 'Tenis y Padel', 'Fútbol'],
    Accesorios: ['Todos los accesorios', 'Bolsas y mochilas', 'Gorras, viseras y bandas'],
  }
};

export const Navbar = () => {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <nav className="navbar">
      <div className="navbar-logo">👟</div>
      <ul className="navbar-menu">
        {navItems.map((item) => (
          <li
            key={item}
            className={`navbar-item ${activeItem === item ? 'active' : ''}`}
            onMouseEnter={() => setActiveItem(item)}
            onMouseLeave={() => setActiveItem(null)}
          >
            {item}
            {activeItem === item && menuData[item] && (
              <div className="dropdown-menu">
                {Object.entries(menuData[item]).map(([category, links]) => (
                  <div key={category} className="dropdown-column">
                    <strong>{category}</strong>
                    {links.map((link) => (
                      <p key={link}>{link}</p>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="navbar-icons">🔍 ❤️ 🛒</div>
    </nav>
  );
};