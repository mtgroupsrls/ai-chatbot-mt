import { createAzure } from "@ai-sdk/azure";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { isTestEnvironment } from "../constants";

const azure = createAzure({
  resourceName: process.env.AZURE_RESOURCE_NAME,
  apiKey: process.env.AZURE_API_KEY,
});

export const myProvider = isTestEnvironment
  ? (() => {
      const {
        artifactModel,
        chatModel,
        reasoningModel,
        titleModel,
      } = require("./models.mock");
      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          "chat-model-reasoning": reasoningModel,
          "title-model": titleModel,
          "artifact-model": artifactModel,
        },
      });
    })()
  : customProvider({
      languageModels: {
        "chat-model": azure(process.env.AZURE_DEPLOYMENT_NAME || "gpt-4o"),
        "chat-model-reasoning": wrapLanguageModel({
          model: azure(process.env.AZURE_DEPLOYMENT_NAME_REASONING || "gpt-4o"),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        "title-model": azure(process.env.AZURE_DEPLOYMENT_NAME_TITLE || "gpt-4o-mini"),
        "artifact-model": azure(process.env.AZURE_DEPLOYMENT_NAME_ARTIFACT || "gpt-4o"),
      },
    });
