import { useEffect, useRef, useState } from "react";
import "./styles/Contacto.css";
import githubIcon from "../assets/tecnologias/github.svg";
import linkedinIcon from "../assets/footer/linkedin.png";
import emailIcon from "../assets/footer/email.png";

const EMAIL = "ismaaavargaas@gmail.com";
const GITHUB_URL = "https://github.com/IsmaelVargas45";
const LINKEDIN_URL = "https://www.linkedin.com/in/ismael-vargas-01b7b243b/"; 

function Contacto() {
  const [isCopied, setIsCopied] = useState(false);
  const [hasCopyError, setHasCopyError] = useState(false);
  const timeoutRef = useRef(null);

  // Limpia el timer si el componente se desmonta
  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setIsCopied(true);
      setHasCopyError(false);
    } catch {
      setHasCopyError(true);
      setIsCopied(false);
    }
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsCopied(false);
      setHasCopyError(false);
    }, 2500);
  }

  return (
  
    <section id="contacto" className="contacto">
      <h2 className="contacto-titulo">Contacto</h2>
      <h3 className="contacto-subtitulo">¿Tenés un proyecto en mente?</h3>
      <p className="contacto-texto">
        Estoy buscando pasantías y proyectos. Escribime por correo y lo
        charlamos.
      </p>

      <div className="contacto-email">
        <div className="contacto-principal">
          <div className="contacto-email-fila">
            <img src={emailIcon} alt="" width="24" height="24" />
            <a className="contacto-email-link" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </div>

          <div className="contacto-acciones">
            <a className="btn btn-primario" href={`mailto:${EMAIL}`}>
              Enviar correo
            </a>
            <button type="button" className="btn btn-secundario" onClick={handleCopy}>
              Copiar correo
            </button>
          </div>

          {/* Anuncia el resultado a lectores de pantalla */}
          <p className="contacto-estado" role="status" aria-live="polite">
            {isCopied && "Correo copiado al portapapeles"}
            {hasCopyError && "No se pudo copiar. Seleccioná el correo y copialo a mano."}
          </p>
        </div>

        <ul className="contacto-redes">
          <li>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <img src={githubIcon} alt="" width="24" height="24" />
              GitHub<span className="sr-only"> (se abre en una pestaña nueva)</span>
            </a>
          </li>
          <li>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
              <img src={linkedinIcon} alt="" width="24" height="24" />
              LinkedIn<span className="sr-only"> (se abre en una pestaña nueva)</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Contacto;