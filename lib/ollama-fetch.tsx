// クライアントのみで動く

const apiUrl = 'http://localhost:11434/api';
const model = 'codegemma'; //'codellama'; // gemma3
const role = 'user';
const timeoutSec = 5; // 5秒でタイムアウト
const format = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    theme: {
      type: 'string',
    },
    feeling: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    tags: {
      type: 'array',
      items: {
        type: 'string',
      },
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
    'theme',
    'feeling',
    'description',
    'tags',
    'fragCode',
    // "vertCode"
  ],
};

const fetchOllama = async (message: string) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    // console.log(
    //   timeoutSec + '秒が経過しました。リクエストをキャンセルします。'
    // );
    // controller.abort();
  }, timeoutSec * 1000);

  try {
    const response = await fetch(`${apiUrl}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: model,
        messages: [{ role: role, content: message }],
        stream: false,
        format: format,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId); // タイムアウト処理を無効化

    const data = await response.json();
    // console.log(data);
    try {
      const result = JSON.parse(data.message.content);
      // AIに与えた構造以外のデータも欲しいのを含めてあげる
      result.createdAt = data.created_at;
      return result;
    } catch (e) {
      throw e;
      // return { error: e instanceof Error ? e.message : String(e) };
    }
  } catch (e) {
    throw e;
  }
};

// class Ollama {
//   constructor() {
//     this.apiUrl = 'http://localhost:11434/api';
//     this.model = 'gemma3'; // 使用するモデルを指定
//   }

//   async chat(message) {
//     const response = await fetch(`${this.apiUrl}/chat`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         model: this.model,
//         messages: [{ role: 'user', content: message }],
//         stream: false,
//       }),
//     });
//     const data = await response.json();
//     return data.message.content;
//   }
// }

// const ollamaChat = async (message) => {
//   const response = await fetch('http://localhost:11434/api/chat', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       model: 'gemma3', // 使用するモデルを指定
//       messages: [{ role: 'user', content: message }],
//       stream: false,
//     }),
//   });
//   const data = await response.json();
//   return data.message.content;
// };

export { fetchOllama };
