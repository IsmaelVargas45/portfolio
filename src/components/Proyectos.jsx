import React from "react";
import "./styles/Proyectos.css";
import ecomerceImg from "../assets/proyectos/ecomerce.png";
import gestorTareasImg from "../assets/proyectos/gerstor_tareas.png";

function Proyectos() {
  return (
    <div className="proyectos">
      <h2>Mis proyectos</h2>
      <div className="proyectos-contenedor">
        <div className="proyecto">
          <h3>Ecommerce</h3>
          <img src={ecomerceImg} alt="Ecommerce" />
          <p>Tienda online con carrito, autenticación y gestión de productos.</p>
        </div>

        <div className="proyecto">
          <h3>Gestor de Tareas</h3>
          <img src={gestorTareasImg} alt="Gestor de Tareas" />
          <p>Aplicación para crear, editar y organizar tareas fácilmente.</p>
        </div>
      </div>
    </div>
  );
}

export default Proyectos;
