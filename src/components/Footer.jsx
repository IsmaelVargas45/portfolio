// Footer.js
import React from "react";
import "./styles/Footer.css";

// Importá tus íconos desde assets
import githubIcon from "../assets/footer/github.png";
import linkedinIcon from "../assets/footer/linkedin.png";
import emailIcon from "../assets/footer/email.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Mi Sitio Web. Todos los derechos reservados.</p>
        

        <div className="footer-social">
          <a href="mailto:ismaaavargaas@gmail.com" className="icon">
            <img src={emailIcon} alt="Email" />
          </a>
          <a href="https://github.com/IsmaelVargas45" target="_blank" rel="noopener noreferrer" className="icon">
            <img src={githubIcon} alt="GitHub" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="icon">
            <img src={linkedinIcon} alt="LinkedIn" />
          </a>
        </div>

        
      </div>
    </footer>
  );
}

export default Footer;
