export const DEFAULT_CHAT_MODEL: string = "chat-model";

export type ChatModel = {
  id: string;
  name: string;
  description: string;
};

// Server-side function to get models with environment variables
export function getChatModels(): ChatModel[] {
  return [
    {
      id: "chat-model",
      name: process.env.AZURE_DEPLOYMENT_NAME || "GPT-4o",
      description: "Advanced multimodal model with vision and text capabilities",
    },
    {
      id: "chat-model-reasoning",
      name: process.env.AZURE_DEPLOYMENT_NAME_REASONING || "GPT-4o Reasoning",
      description:
        "Uses advanced chain-of-thought reasoning for complex problems",
    },
  ];
}

// For backward compatibility and client-side usage
// This will use the default names on the client, but server components will use getChatModels()
export const chatModels: ChatModel[] = [
  {
    id: "chat-model",
    name: "GPT-4o",
    description: "Advanced multimodal model with vision and text capabilities",
  },
  {
    id: "chat-model-reasoning",
    name: "GPT-4o Reasoning",
    description:
      "Uses advanced chain-of-thought reasoning for complex problems",
  },
];
