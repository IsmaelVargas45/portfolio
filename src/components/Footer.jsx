import "./styles/Footer.css";

import githubIcon from "../assets/footer/github.png";
import linkedinIcon from "../assets/footer/linkedin.png";
import emailIcon from "../assets/footer/email.png";

// ARREGLO (🟢 new Date en el render): el año se calcula una sola vez,
// fuera del componente, y no en cada render.
const CURRENT_YEAR = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          &copy; {CURRENT_YEAR} Ismael Vargas. Todos los derechos reservados.
        </p>

        <div className="footer-social">
          {/* ARREGLO (accesibilidad): la imagen es decorativa (alt="") y el
              nombre del enlace lo da el texto sr-only. Así el lector de
              pantalla dice una sola vez qué es el enlace. */}
          <a href="mailto:ismaaavargaas@gmail.com" className="icon">
            <img src={emailIcon} alt="" />
            <span className="sr-only">Enviar correo</span>
          </a>

          {/* ARREGLO (🟢 pestaña nueva): se avisa en el texto sr-only que
              estos enlaces abren una pestaña nueva. */}
          <a
            href="https://github.com/IsmaelVargas45"
            target="_blank"
            rel="noopener noreferrer"
            className="icon"
          >
            <img src={githubIcon} alt="" />
            <span className="sr-only">GitHub (se abre en una pestaña nueva)</span>
          </a>

          <a
            href="https://www.linkedin.com/in/ismael-vargas-01b7b243b/"
            target="_blank"
            rel="noopener noreferrer"
            className="icon"
          >
            <img src={linkedinIcon} alt="" />
            <span className="sr-only">LinkedIn (se abre en una pestaña nueva)</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;