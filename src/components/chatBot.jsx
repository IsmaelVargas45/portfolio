import "./styles/chatBot.css";
import React, { useState, useRef, useEffect } from "react";

const API_URL = "http://localhost:8080/v1/chat/completions";

// Cambia este texto para que el bot conozca tu portfolio
import SYSTEM_PROMPT from "./systemPrompt.txt?raw";
function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatboxRef = useRef(null);
  const inputRef = useRef(null);

  // Baja el scroll cada vez que hay un mensaje nuevo o se abre el chat
  useEffect(() => {
    if (open && chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  // Al abrir, el cursor queda listo para escribir
  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  // Escape cierra el chat
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages = [...messages, { sender: "user", text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Se envía el historial para que el bot recuerde la conversación
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
      const reply = data.choices[0].message.content.trim();

      setMessages([...newMessages, { sender: "bot", text: reply }]);
    } catch (error) {
      console.error(error);
      setMessages([
        ...newMessages,
        {
          sender: "bot",
          text: "No pude conectarme al servidor. Verifica que llama-cpu-server.sh esté corriendo.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      <section
        id="ismabot-panel"
        className={`chatbot ${open ? "abierto" : ""}`}
        aria-label="IsmaBot"
      >
        <div className="chatbot-header">
          <h2>Asistente</h2>
          <button
            type="button"
            className="chatbot-close"
            onClick={() => setOpen(false)}
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
          {messages.map((msg, i) => (
            <p key={i} className={msg.sender}>
              <strong>{msg.sender === "user" ? "Tú" : "Bot"}:</strong>{" "}
              {msg.text}
            </p>
          ))}
          {loading && (
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
            disabled={loading}
          />
          <button
            type="button"
            className="chatbot-send"
            onClick={sendMessage}
            disabled={loading}
          >
            {loading ? "..." : "Enviar"}
          </button>
        </div>
      </section>

      <button
        type="button"
        className="chatbot-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Cerrar chat" : "Abrir chat"}
        aria-expanded={open}
        aria-controls="ismabot-panel"
      >
        {open ? (
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