// このプロジェクトで使うollamaのセッティング
import { Ollama, ChatRequest, ChatResponse } from 'ollama';

const model = 'codellama';
const role = 'user';
const format = {
  // type: "object",
  properties: {
    title: {
      type: 'string',
    },
    fragCode: {
      type: 'string',
    },
    // vertCode: {
    //   type: "string",
    // },
  },
  required: [
    'title',
    'fragCode',
    // "vertCode"
  ],
};

async function getOllamaResponse(prompt: string): Promise<object> {
  const ollama = new Ollama();

  const response: ChatResponse = await ollama.chat({
    model: model,
    messages: [{ role: role, content: prompt }],
    format: format,
  });

  try {
    return JSON.parse(response.message.content);
  } catch (e) {
    throw e;
    // return { error: e instanceof Error ? e.message : String(e) };
  }
}

export { getOllamaResponse };
