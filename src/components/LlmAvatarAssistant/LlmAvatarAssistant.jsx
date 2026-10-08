/**
 * LlmAvatarAssistant.jsx — versión con CSS puro (sin Tailwind, sin lucide-react).
 * Botón flotante que abre un panel de chat. Hace auto-scroll a la sección
 * que el modelo menciona en su respuesta.
 */
import {
  useState, useRef, useEffect, useMemo, useCallback,
} from 'react';
import { createLlmClient, normalizeLlmConfig } from './llmClient.js';
import { collectSections, findSectionReference, scrollToSection } from './sectionScanner.js';
import { displayMarkdown } from './utils.js';
import './LlmAvatarAssistant.css';

const DEFAULT_CONFIG = {
  baseUrl: '/v1',
  apiKey: '',
  model: 'default',
  temperature: 0.7,
  defaultText: '¡Hola! Soy el asistente de este portfolio. Preguntame lo que quieras.',
  maxBubbleHeight: 240,
  sectionDiscovery: 'auto',
  systemPrompt:
    'Sos un asistente amigable integrado en un portfolio personal. ' +
    'La lista "Secciones de la página" es el contenido real de la página: ' +
    'usala para responder sobre el dueño del portfolio (formación, ' +
    'habilidades, proyectos, contacto). No inventes datos que no estén ahí. ' +
    'Respondé en el idioma del usuario (por defecto español), en 2 a 4 ' +
    'oraciones. Cuando corresponda, mencioná UNA sección por su título exacto ' +
    'para llevar al usuario hasta ahí. No inventes secciones.',
  streaming: true,
};

export { DEFAULT_CONFIG };

// Verbos de navegación. Se prueba contra el texto SIN tildes, por eso no
// llevan acentos (así "llévame", "andá", "muéstrame" también funcionan).
const NAV = /\b(ir|ve|vamos|anda|llevame|lleva|mostrame|muestrame)\b/;

const stripAccents = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export default function LlmAvatarAssistant({
  config = {},
  onScrollToSection,
  onSend,
}) {
  const cfg = useMemo(() => ({ ...DEFAULT_CONFIG, ...config }), [config]);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(() => [
    { id: 'greeting', role: 'assistant', text: cfg.defaultText, matchedSection: null },
  ]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const bubbleRef = useRef(null);
  const inputRef = useRef(null);
  const clientRef = useRef(null);
  const sectionsRef = useRef([]);
  const nextIdRef = useRef(1);

  useEffect(() => {
    const res = normalizeLlmConfig(cfg);
    if (!res.ok) {
      setError(res.error);
      clientRef.current = null;
      return;
    }
    clientRef.current = createLlmClient({
      baseUrl: res.value.baseUrl,
      apiKey: res.value.apiKey,
      model: res.value.model,
      timeoutMs: cfg.timeoutMs,
      extra: { temperature: res.value.temperature },
    });
    setError('');
  }, [cfg]);

  // Descubre las secciones al abrir el chat, así encuentra las que ya renderizaron
  useEffect(() => {
    const list = collectSections(
      document,
      cfg.sectionDiscovery === 'auto' ? null : cfg.sectionDiscovery,
    );
    sectionsRef.current = list;
  }, [cfg.sectionDiscovery, isOpen]);

  const stickToBottom = useRef(true);
  useEffect(() => {
    const el = bubbleRef.current;
    if (!el) return;
    if (stickToBottom.current) el.scrollTop = el.scrollHeight;
  }, [messages, busy, isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const handleBubbleScroll = useCallback(() => {
    const el = bubbleRef.current;
    if (!el) return;
    stickToBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 24;
  }, []);

  const performScroll = useCallback((section) => {
    const ok = scrollToSection(section.id, { behavior: 'smooth', offset: 80 });
    if (onScrollToSection && ok) onScrollToSection(section);
  }, [onScrollToSection]);

  const updateAssistantMessage = useCallback((id, patch) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  }, []);

  const ask = useCallback(async (text) => {
    const q = (text ?? input).trim();
    if (!q || busy) return;

    // Atajo de navegación: funciona SIEMPRE, incluso con el modelo apagado.
    const direct = findSectionReference(q, sectionsRef.current);
    if (direct && NAV.test(stripAccents(q))) {
      setInput('');
      setError('');
      setMessages((prev) => [
        ...prev,
        { id: `user-${nextIdRef.current++}`, role: 'user', text: q },
        {
          id: `assistant-${nextIdRef.current++}`,
          role: 'assistant',
          text: `Te llevo a ${direct.section.title}.`,
          matchedSection: null,
        },
      ]);
      performScroll(direct.section);
      return;
    }

    const client = clientRef.current;
    if (!client) {
      setError('El asistente no está configurado correctamente.');
      return;
    }

    setError('');
    setBusy(true);
    setInput('');
    stickToBottom.current = true;

    const assistantId = `assistant-${nextIdRef.current++}`;
    setMessages((prev) => [
      ...prev,
      { id: `user-${nextIdRef.current++}`, role: 'user', text: q },
      { id: assistantId, role: 'assistant', text: '', matchedSection: null },
    ]);

    const pageContext = sectionsRef.current
      .map((s) => `- ${s.title} (id: ${s.id})${s.text ? `: ${s.text}` : ''}`)
      .join('\n');

    // Memoria corta: últimos 6 mensajes reales (sin saludo ni errores)
    const history = messages
      .filter((m) => m.id !== 'greeting' && m.text && !m.isError)
      .slice(-6)
      .map((m) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

    const payload = [
      {
        role: 'system',
        content: cfg.systemPrompt
          + (pageContext ? `\n\nSecciones de la página:\n${pageContext}` : ''),
      },
      ...history,
      { role: 'user', content: q },
    ];

    let full = '';
    try {
      if (cfg.streaming) {
        full = await client.chatStream(
          payload,
          (token, cur) => updateAssistantMessage(assistantId, { text: cur }),
        );
      } else {
        full = await client.chat(payload);
        updateAssistantMessage(assistantId, { text: full });
      }
      if (!full) updateAssistantMessage(assistantId, { text: '(respuesta vacía)' });

      const ref = findSectionReference(q, sectionsRef.current)
        || findSectionReference(full, sectionsRef.current);
      if (ref) {
        updateAssistantMessage(assistantId, { matchedSection: ref.section });
        performScroll(ref.section);
      }
      if (onSend) onSend(q, full);
    } catch (err) {
      const msg = err?.message || '';
      setError(
        msg.includes('request failed')
          ? 'No puedo conectar con el modelo. ¿Está encendido el servidor?'
          : msg || 'No se pudo obtener respuesta del modelo.',
      );
      updateAssistantMessage(assistantId, {
        text: 'Lo siento, no pude responder ahora.',
        isError: true,
      });
    } finally {
      setBusy(false);
    }
  }, [input, busy, cfg, messages, performScroll, updateAssistantMessage, onSend]);

  const submit = (e) => {
    if (e) e.preventDefault();
    ask();
  };

  return (
    <div className="lav-root" data-testid="lav-root" role="region" aria-label="Asistente IA">
      {isOpen && (
        <div className="lav-panel">
          <div className="lav-header">
            <span className="lav-title">Asistente</span>
            <button
              type="button"
              className="lav-close"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar asistente"
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

          <div
            ref={bubbleRef}
            className="lav-bubble"
            data-testid="lav-bubble"
            onScroll={handleBubbleScroll}
            style={{ maxHeight: cfg.maxBubbleHeight }}
            aria-live="polite"
          >
            {messages.map((m, idx) => {
              const isLast = idx === messages.length - 1;
              const isUser = m.role === 'user';
              return (
                <div
                  key={m.id}
                  data-testid="lav-message"
                  className={`lav-message ${isUser ? 'lav-message--user' : 'lav-message--bot'}`}
                >
                  {isUser
                    ? m.text
                    : renderResponse(m.text, busy && isLast, m.matchedSection, performScroll)}
                </div>
              );
            })}
          </div>

          <form className="lav-input-row" onSubmit={submit}>
            <label htmlFor="lav-input" className="lav-sr-only">
              Tu pregunta para el asistente
            </label>
            <input
              ref={inputRef}
              id="lav-input"
              className="lav-input"
              data-testid="lav-input"
              value={input}
              placeholder="Ej.: ¿Qué proyectos hiciste?"
              onChange={(e) => setInput(e.target.value)}
              disabled={busy}
            />
            <button
              className="lav-send"
              data-testid="lav-send"
              type="submit"
              disabled={busy || !input.trim()}
            >
              {busy ? '…' : 'Enviar'}
            </button>
          </form>

          {error && (
            <div className="lav-error" data-testid="lav-error" role="alert">{error}</div>
          )}
        </div>
      )}

      <button
        type="button"
        className="lav-toggle"
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? 'Cerrar asistente' : 'Abrir asistente'}
        aria-expanded={isOpen}
      >
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
          <path
            d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.2 3.6a.6.6 0 0 1-1-.46V16A2.5 2.5 0 0 1 4 13.5v-8Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
}

/** Muestra la respuesta y convierte el título de la sección en un link clickeable. */
function renderResponse(text, typing, matchedSection, performScroll) {
  const body = typing && !text ? '…' : displayMarkdown(text) || '…';
  if (!matchedSection) {
    return <span data-testid="lav-response-text">{body}</span>;
  }
  const title = matchedSection.title || '';
  const at = title ? body.toLowerCase().indexOf(title.toLowerCase()) : -1;
  if (at === -1) return <span data-testid="lav-response-text">{body}</span>;
  return (
    <span data-testid="lav-response-text">
      {body.slice(0, at)}
      <button
        type="button"
        className="lav-section-link"
        data-testid="lav-section-link"
        onClick={() => performScroll(matchedSection)}
        title={`Ir a ${title}`}
      >
        {body.slice(at, at + title.length)}
      </button>
      {body.slice(at + title.length)}
    </span>
  );
}