import React, { useState, useEffect } from 'react';
import './styles/Navbar.css';

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Si bajamos más de 50px y nos desplazamos hacia abajo, ocultamos la barra
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false);
      } else {
        // Si subimos, la volvemos a mostrar
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav className={`navbar ${showNavbar ? 'navbar--visible' : 'navbar--hidden'}`}>
      <div className="navbar-brand">
        <a href="#inicio">Ismael Vargas</a>
      </div>
      <ul className="navbar-links">
        <li>
          <a href="#about" className="navbar-link">Sobre Mí</a>
        </li>
        <li>
          <a href="#proyectos" className="navbar-link">Proyectos</a>
        </li>
        <li>
          <a href="#contacto" className="navbar-link navbar-btn-contact">Contacto</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;