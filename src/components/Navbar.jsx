import React, { useState } from 'react';
import '../styles/Navbar.css';

const navItems = ['Hombre', 'Mujer', 'Ofertas'];

const menuData = {
  Mujer: {
    Nike: ['Modelo 1', 'Modelo 2', 'Modelo 3', 'Modelo 4'],
    Puma: ['Modelo 1', 'Modelo 2', 'Modelo 3', 'Modelo 4'],
    Reebok: ['Modelo 1', 'Modelo 2', 'Modelo 3', 'Modelo 4'],
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