/**
 * Application Configuration
 * Centralized configuration for the chatbot application
 * Reads from package.json for consistency
 */

import packageJson from "../package.json";

export const appConfig = {
  name: packageJson.displayName || packageJson.name,
  description: packageJson.description || "AI Chatbot",
  url: "https://chat.vercel.ai",
} as const;

