# Portfolio — Ismael Vargas

Portfolio personal de una sola página, hecho con React. Incluye presentación, sobre mí, tecnologías, proyectos, contacto y un asistente virtual que responde preguntas sobre mí usando un modelo de lenguaje local.

## Tecnologías

- React 19
- Vite
- CSS plano (un archivo por componente, en `src/components/styles/`)
- oxlint para el análisis de código

## Cómo correrlo

Requisitos: Node.js 18 o superior.

```bash
npm install
npm run dev
```

El sitio queda disponible en `http://localhost:5173`.

Para generar la versión de producción:

```bash
npm run build
```

## Chatbot (Asistente virtual)

El chatbot hace `fetch` a una API local compatible con OpenAI (`/v1/chat/completions`) servida por llama.cpp. **Sin ese servidor, el resto del portfolio funciona igual, pero el chat muestra un mensaje de error de conexión.**

1. Levantá el servidor de [llama.cpp](https://github.com/ggml-org/llama.cpp)
   desde la terminal de Ubuntu (WSL):

```bash
   ./llama-cpu-server.sh
```

   Usa el modelo `LFM2.5-350M-Q8_0.gguf` y escucha en el puerto 8080.
   El script no está incluido en este repositorio. Sin el servidor, el chat
   muestra un mensaje de error, pero el resto del sitio funciona igual.
   
2. Por defecto el chatbot apunta a `http://localhost:8080/v1/chat/completions`.
3. Para usar otra URL (por ejemplo, una API desplegada), creá un archivo `.env`
   en la raíz con:

   ```
   VITE_API_URL=https://tu-api.com/v1/chat/completions
   ```

   y reiniciá `npm run dev`. Hay un ejemplo en `.env.example`.

El contexto con el que responde el bot está en `src/components/systemPrompt.txt`.

## Estructura

```
src/
├── components/        # un componente por sección (Navbar, Inicio, AboutMe, ...)
│   ├── styles/        # un CSS por componente
│   └── systemPrompt.txt
└── assets/            # imágenes agrupadas por sección
```

## Contacto

- Correo: ismaaavargaas@gmail.com
- GitHub: [IsmaelVargas45](https://github.com/IsmaelVargas45)
- LinkedIn: [Ismael Vargas](https://www.linkedin.com/in/ismael-vargas-01b7b243b/)