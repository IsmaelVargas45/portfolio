export { default, DEFAULT_CONFIG } from "./LlmAvatarAssistant.jsx";
export { createLlmClient, normalizeLlmConfig } from "./llmClient.js";
export { collectSections, findSectionReference, scrollToSection, slugify, slugToTitle } from "./sectionScanner.js";
export { normalize, stripCodeFence, plainMarkdown } from "./utils.js";