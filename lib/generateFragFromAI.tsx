// import { getOllamaResponse } from './ollama';
import { fetchOllama } from './ollama-fetch';

interface responseFromAI {
  title: string;
  theme: string;
  feeling: string;
  description: string;
  dateTime: string;
  tags: string[];
  fragCode: string;
  // vertCode: string;
}

// const oolamaFormatStructure = {
//   type: 'object',
//   properties: {
//     title: {
//       type: 'string',
//     },
//     theme: {
//       type: 'string',
//     },
//     feeling: {
//       type: 'string',
//     },
//     description: {
//       type: 'string',
//     },
//     date: {
//       type: 'string',
//     },
//     time: {
//       type: 'string',
//     },
//     tags: {
//       type: 'array',
//       items: {
//         type: 'string',
//       },
//       fragCode: {
//         type: 'string',
//       },
//       // vertCode: {
//       //   type: "string",
//       // },
//     },
//     required: [
//       'title',
//       'theme',
//       'feeling',
//       'description',
//       'date',
//       'time',
//       'tags',
//       'fragCode',
//       // "vertCode"
//     ],
//   },
// };

interface GetPromptParams {
  referenceCode: string;
}
interface GenerateFragParams {
  referenceCode: string;
}

const getPronpt = (referenceCode: string): string => {
  return `
あなたは優秀でセンスに満ち溢れたシェーダーコード生成AIです。

描くテーマはあなたが考えてください。現在の季節から連想されるテーマや最近のニュースなどを考慮してください。また、テーマはできるだけ日本語にしてください。

今の気分も考慮してください。

${referenceCode}
このコードを参考にして、テーマに沿ったFragment Shaderを生成してください。
https://thebookofshaders.com/ や https://glslsandbox.com/ のサイトも参考にしてください。
`;
};

const generateFrag = async (referenceCode: string): Promise<responseFromAI> => {
  // ローカルollamaを使う場合
  // const response: object = await getOllamaResponse(getPronpt(referenceCode));

  // geminiを使う場合
  const response: responseFromAI = await fetchOllama(getPronpt(referenceCode));

  // geminiを使う場合
  //

  return response;
};

// const correctionCode = async (code, errorMessage) => {
//   const prompt = `
// ${code}
// ${errorMessage}
// 修正したコードを出力してください。
// `;

//   const response = await getOllamaResponse(prompt);
//   return response;
// };

// function extractJsonBlock(text) {
//   const startDelimiter = '```json';
//   const endDelimiter = '```';

//   // 開始デリミタの位置を見つける
//   const startIndex = text.indexOf(startDelimiter);
//   if (startIndex === -1) {
//     console.error('開始デリミタ "```json" が見つかりません。');
//     return null;
//   }

//   // 終了デリミタの位置を見つける
//   const endIndex = text.indexOf(
//     endDelimiter,
//     startIndex + startDelimiter.length
//   );
//   if (endIndex === -1) {
//     console.error('終了デリミタ "```" が見つかりません。');
//     return null;
//   }

//   // デリミタの間のテキストを抽出
//   const jsonString = text
//     .substring(startIndex + startDelimiter.length, endIndex)
//     .trim();

//   // 改行コードを消す
//   jsonString.replace(/(\r\n|\n|\r)/g, '');

//   try {
//     // 抽出した文字列をJSONとしてパース
//     const jsonObject = JSON.parse(jsonString);
//     return jsonObject;
//   } catch (e) {
//     console.error('JSONのパースに失敗しました:', e);
//     return null;
//   }
// }

export { generateFrag };
export type { responseFromAI };
