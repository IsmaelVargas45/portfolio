import html from "../assets/tecnologias/html.svg";
import css from "../assets/tecnologias/css.svg";
import javascript from "../assets/tecnologias/javascript.svg";
import react from "../assets/tecnologias/react.svg";
import git from "../assets/tecnologias/git.svg";
import github from "../assets/tecnologias/github.svg";
import flutter from "../assets/tecnologias/flutter.svg"
import "./styles/Tecnologias.css";

function Tecnologias() {
  return (
    <section id="tecnologias" className="tecnologias">
      <h2 className="tecnologias__titulo">Tecnologías</h2>
      <ul className="tecnologias__grid">
        <li className="tecnologias__item">
          <img src={html} alt="" className="tecnologias__icono" width="48" height="48" loading="lazy" />
          <span className="tecnologias__nombre">HTML5</span>
        </li>
        <li className="tecnologias__item">
          <img src={css} alt="" className="tecnologias__icono" width="48" height="48" loading="lazy" />
          <span className="tecnologias__nombre">CSS3</span>
        </li>
        <li className="tecnologias__item">
          <img src={javascript} alt="" className="tecnologias__icono" width="48" height="48" loading="lazy" />
          <span className="tecnologias__nombre">JavaScript</span>
        </li>
        <li className="tecnologias__item">
          <img src={react} alt="" className="tecnologias__icono" width="48" height="48" loading="lazy" />
          <span className="tecnologias__nombre">React</span>
        </li>
        <li className="tecnologias__item">
          <img src={git} alt="" className="tecnologias__icono" width="48" height="48" loading="lazy" />
          <span className="tecnologias__nombre">Git</span>
        </li>
        <li className="tecnologias__item">
          <img src={github} alt="" className="tecnologias__icono" width="48" height="48" loading="lazy" />
          <span className="tecnologias__nombre">GitHub</span>
        </li>
        <li className="tecnologias__item">
          <img src={flutter} alt="" className="tecnologias__icono" width="48" height="48" loading="lazy" />
          <span className="tecnologias__nombre">Flutter</span>
        </li>
      </ul>
    </section>
  );
}

export default Tecnologias;