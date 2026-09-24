import React from 'react';
import './styles/AboutMe.css';

function AboutMe() {
  return (
    <section id="about" className="about-me">
      <div className="about-me__content">
        <h2 className="about-me__title">¿Quién Soy?</h2>

        <p className="about-me__text">
          Actualmente soy estudiante de la Tecnicatura Universitaria en Programación Web
          en la Universidad Nacional de San Juan, Argentina. Tengo un gran interés en el
          desarrollo front-end y back-end.
          Además, empleo mis habilidades para diseñar soluciones de
          software innovadoras, personalizables y sostenibles.
        </p>
      </div>
    </section>
  );
}

export default AboutMe;