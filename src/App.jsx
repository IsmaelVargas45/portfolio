import Navbar from "./components/Navbar";
import Inicio from "./components/Inicio";
import AboutMe from "./components/AboutMe";
import Tecnologias from "./components/Tecnologias";
import Proyectos from "./components/Proyectos";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";
import HabilidadesBlandas from "./components/HabilidadesBlandas";
import LlmAvatarAssistant from "./components/LlmAvatarAssistant";
import SYSTEM_PROMPT from "./components/systemPrompt.txt?raw";
// Fuera de App, así no se recrea en cada render
const ASSISTANT_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL ?? "http://localhost:8080/v1",
  model: "default",
  temperature: 0.2,
  systemPrompt: SYSTEM_PROMPT,
  sectionDiscovery: [
    { id: "inicio", title: "Inicio" },
    { id: "sobre-mi", title: "Sobre mí", aliases: ["estudios", "quién es", "ubicación"] },
    { id: "tecnologias", title: "Tecnologías", aliases: ["stack", "herramientas", "lenguajes"] },
    { id: "proyectos", title: "Proyectos", aliases: ["e-commerce", "gestor de tareas"] },
    { id: "contacto", title: "Contacto", aliases: ["email", "correo", "escribirle"] },
  ],
};

function App() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <Navbar />

      <main id="contenido" tabIndex={-1}>
        <Inicio />
        <AboutMe />
        <Tecnologias />
        <HabilidadesBlandas />
        <Proyectos />
        <Contacto/>
        
      </main>

      <Footer />

      <LlmAvatarAssistant config={ASSISTANT_CONFIG} />
    </>
  );
}

export default App;