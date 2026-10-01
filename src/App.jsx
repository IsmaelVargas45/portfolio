import Navbar from "./components/Navbar";
import Inicio from "./components/Inicio";
import AboutMe from "./components/AboutMe";
import Tecnologias from "./components/Tecnologias";
import Proyectos from "./components/Proyectos";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";
import ChatBot from "./components/chatBot";

function App() {
  return (
    <>
      {/* ARREGLO (🟡 skip link): primer elemento enfocable de la página.
          Con Tab aparece, y con Enter salta directo al contenido. */}
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <Navbar />

      {/* id="contenido" es el destino del skip link.
          tabIndex={-1} permite que reciba el foco al activar el enlace. */}
      <main id="contenido" tabIndex={-1}>
        <Inicio />
        <AboutMe />
        <Tecnologias />
        <Proyectos />
        <Contacto />
      </main>

      <Footer />

      {/* ARREGLO: el chat es un widget flotante, no contenido principal,
          así que va fuera del <main>. */}
      <ChatBot />
    </>
  );
}

export default App;