// src/components/HabilidadesBlandas.jsx
import React from "react";
import "./styles/HabilidadesBlandas.css";

const HabilidadesBlandas = () => {
  return (
    <section id="habilidades-blandas" className="skills-section">
      <h2>Habilidades Blandas</h2>
      <div className="skills-grid">
        <div className="skill-card">
          <span className="skill-icon">💬</span>
          <p>Comunicación efectiva</p>
        </div>
        <div className="skill-card">
          <span className="skill-icon">🤝</span>
          <p>Trabajo en equipo</p>
        </div>
        <div className="skill-card">
          <span className="skill-icon">🧩</span>
          <p>Resolución de problemas</p>
        </div>
        <div className="skill-card">
          <span className="skill-icon">🔄</span>
          <p>Adaptabilidad</p>
        </div>
        <div className="skill-card">
          <span className="skill-icon">🧠</span>
          <p>Pensamiento crítico</p>
        </div>
        <div className="skill-card">
          <span className="skill-icon">🌟</span>
          <p>Liderazgo</p>
        </div>
      </div>
    </section>
  );
};

export default HabilidadesBlandas;
