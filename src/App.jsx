import Navbar from "./components/Navbar";
import Inicio from "./components/Inicio";
import Footer from "./components/Footer";
import AboutMe from "./components/AboutMe";
import Tecnologias from "./components/Tecnologias"
import Contacto from "./components/Contacto"
import Proyectos from "./components/Proyectos"
import ChatBot from "./components/chatBot"
function App() {
  return (
    <>
    <Navbar/>
    <main>
    <Inicio/>
    <AboutMe/>
    <Tecnologias/>
    <Proyectos/>
    <Contacto/>
    <ChatBot />
    </main>
    <Footer/>
    </>
  );
}

export default App;