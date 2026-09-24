import React, { useState } from 'react';
import './styles/Contacto.css';

function Contacto() {
  // Estado para guardar lo que escribe el usuario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Función que se ejecuta al hacer clic en "Enviar"
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    alert(`¡Gracias ${nombre}! Tu mensaje ha sido enviado.`);
    
    // Limpiamos los campos
    setNombre('');
    setEmail('');
    setMensaje('');
  };

  return (
    <section id="contacto" className="contacto">
      <h2>Contacto</h2>
      <p>¿Tienes alguna consulta o proyecto? Envíame un mensaje.</p>

      <form onSubmit={handleSubmit} className="contacto-form">
        <div className="form-campo">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
            required
          />
        </div>

        <div className="form-campo">
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
          />
        </div>

        <div className="form-campo">
          <label htmlFor="mensaje">Mensaje:</label>
          <textarea
            id="mensaje"
            rows="4"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Escribe tu mensaje..."
            required
          ></textarea>
        </div>

        <button type="submit" className="btn-enviar">
          Enviar Mensaje
        </button>
      </form>
    </section>
  );
}

export default Contacto;