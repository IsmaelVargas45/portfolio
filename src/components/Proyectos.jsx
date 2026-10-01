import React from "react";
import "./styles/Proyectos.css";
import ecomerceImg from "../assets/proyectos/ecomerce.png";
import gestorTareasImg from "../assets/proyectos/gerstor_tareas.png";

function Proyectos() {
  return (
    <section id="proyectos" className="proyectos">
      <h2>Mis proyectos</h2>
      <div className="proyectos-contenedor">
        <div className="proyecto">
          <h3>Ecommerce</h3>
          <img src={ecomerceImg} alt="Captura de la tienda online Ecommerce" />
          <p>Tienda online con carrito, autenticación y gestión de productos.</p>
        </div>

        <div className="proyecto">
          <h3>Gestor de Tareas</h3>
          <img src={gestorTareasImg} alt="Captura de la aplicación Gestor de Tareas" />
          <p>Aplicación para crear, editar y organizar tareas fácilmente.</p>
        </div>
      </div>

      <p className="proyectos-nota">
        Estoy trabajando en más proyectos que todavía no terminé. Pronto los voy
        a ir sumando acá.
      </p>
    </section>
  );
}

export default Proyectos;