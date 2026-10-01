import { useState, useRef, useEffect } from "react";
import "./styles/chatBot.css";
// Cambia este texto para que el bot conozca tu portfolio
import SYSTEM_PROMPT from "./systemPrompt.txt?raw";

// ARREGLO (🟡 URL hardcodeada): la URL sale de una variable de entorno.
// - En local NO necesitás crear nada: usa el localhost de abajo (el "??").
// - Al desplegar, definí VITE_API_URL=https://tu-api.com/v1/chat/completions
//   en un archivo .env (sin commitarlo) o en el panel de tu hosting.
const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:8080/v1/chat/completions";

function ChatBot() {
  // ARREGLO (🟢 nombres booleanos): open -> isOpen, loading -> isLoading
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatboxRef = useRef(null);
  const inputRef = useRef(null);

  // Baja el scroll cada vez que hay un mensaje nuevo o se abre el chat
  useEffect(() => {
    if (isOpen && chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen]);

  // Al abrir, el cursor queda listo para escribir
  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  // Escape cierra el chat
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    // ARREGLO (🔴 key={i}): cada mensaje nace con un id estable.
    // Hay que ponérselo a TODOS los mensajes: el del usuario,
    // el de la respuesta del bot y el de error (ver más abajo).
    const newMessages = [
      ...messages,
      { id: crypto.randomUUID(), sender: "user", text },
    ];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Se envía el historial para que el bot recuerde la conversación.
      // Solo se mandan role y content: el id es solo para React,
      // la API nunca lo ve.
      const history = newMessages.map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      }));

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      if (!response.ok) throw new Error(`Error ${response.status}`);

      const data = await response.json();

      // ARREGLO (🟡 optional chaining): si la API devuelve algo con otra
      // forma, ya no se rompe con "Cannot read properties of undefined".
      // "?." corta si algo no existe y "??" da un mensaje de respaldo.
      const reply =
        data.choices?.[0]?.message?.content?.trim() ??
        "El servidor no devolvió una respuesta válida.";

      setMessages([
        ...newMessages,
        { id: crypto.randomUUID(), sender: "bot", text: reply },
      ]);
    } catch (error) {
      console.error(error);
      setMessages([
        ...newMessages,
        {
          id: crypto.randomUUID(),
          sender: "bot",
          text: "No pude conectarme al servidor. Verifica que llama-cpu-server.sh esté corriendo.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      <section
        id="AsistenteVirtual-panel"
        className={`chatbot ${isOpen ? "abierto" : ""}`}
        aria-label="Asistente virtual"
      >
        <div className="chatbot-header">
          <h2>Asistente</h2>
          <button
            type="button"
            className="chatbot-close"
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar chat"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </button>
        </div>

        <div className="chatbox" ref={chatboxRef}>
          {/* ARREGLO (🔴): key={msg.id} en vez de key={i}.
              Con el índice, React podía mezclar o re-renderizar mal
              los mensajes cuando la lista cambia. */}
          {messages.map((msg) => (
            <p key={msg.id} className={msg.sender}>
              <strong>{msg.sender === "user" ? "Tú" : "Bot"}:</strong>{" "}
              {msg.text}
            </p>
          ))}
          {isLoading && (
            <p className="bot">
              <strong>Bot:</strong> escribiendo...
            </p>
          )}
        </div>

        <div className="chatbot-form">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu mensaje..."
            disabled={isLoading}
          />
          <button
            type="button"
            className="chatbot-send"
            onClick={sendMessage}
            disabled={isLoading}
          >
            {isLoading ? "..." : "Enviar"}
          </button>
        </div>
      </section>

      <button
        type="button"
        className="chatbot-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
        aria-expanded={isOpen}
        aria-controls="AsistenteVirtual-panel"
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
            <path
              d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.2 3.6a.6.6 0 0 1-1-.46V16A2.5 2.5 0 0 1 4 13.5v-8Z"
              fill="currentColor"
            />
          </svg>
        )}
      </button>
    </>
  );
}

export default ChatBot;