import React from 'react';
import './styles/Inicio.css';
import fotoIsmael from '../assets/perfil.jpg';

function Inicio() {
  return (
    <section id="inicio" className="inicio">
      <div className="inicio-texto">
        <p className="inicio-nombre">👋 ¡Hola! Soy Ismael Vargas</p>
        <h1 className="inicio-titulo">Desarrollador web</h1>
        <p className="inicio-descripcion">
          Me especializo en crear experiencias de usuario inmersivas usando
          las últimas tecnologías y frameworks para dar vida a tu visión.
        </p>
        <div className="inicio-acciones">
          <a href="#contacto" className="inicio-boton btn-principal">
            Dale vida a tu idea
          </a>

        </div>
      </div>

      <div className="inicio-imagen-wrapper">
        <img
          src={fotoIsmael}
          alt="Foto de perfil de Ismael Vargas"
          className="inicio-imagen"
        />
      </div>
    </section>
  );
}

export default Inicio;