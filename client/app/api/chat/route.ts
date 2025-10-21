import { google } from '@ai-sdk/google';
import { streamText, UIMessage, convertToModelMessages, tool } from 'ai';
import { z } from 'zod';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google("gemini-2.5-flash"),
    messages: convertToModelMessages(messages),
    tools: {
      weather: tool({
        description: 'OBTENHA O TEMPO EM UM LOCAL (FAHRENHEIT)',
        inputSchema: z.object({
          location: z.string().describe('O local para obter a previsão do tempo'),
        }),
        execute: async ({ location }) => {
          const temperature = Math.round(Math.random() * (90 - 32) + 32);
          return {
            location,
            temperature,
          };
        },
      }),
    },
  });
  return result.toUIMessageStreamResponse();
}