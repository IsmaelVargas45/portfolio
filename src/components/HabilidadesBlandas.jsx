// src/components/HabilidadesBlandas.jsx
import React from "react";
import "./styles/HabilidadesBlandas.css";

const HabilidadesBlandas = () => {
  return (
    <section id="habilidades-blandas" className="skills-section">
      <h2>Habilidades</h2>
      <div className="skills-grid">
        <div className="skill-card">
          <p>Comunicación efectiva</p>
        </div>
        <div className="skill-card">
          <p>Trabajo en equipo</p>
        </div>
        <div className="skill-card">
          <p>Resolución de problemas</p>
        </div>
        <div className="skill-card">
          <p>Adaptabilidad</p>
        </div>
        <div className="skill-card">
          <p>Pensamiento crítico</p>
        </div>
        
      </div>
    </section>
  );
};

export default HabilidadesBlandas;