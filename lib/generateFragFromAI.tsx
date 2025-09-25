// import { getOllamaResponse } from './ollama';
import { fetchOllama } from './ollama-fetch';

interface responseFromAI {
  title: string;
  theme: string;
  feeling: string;
  description: string;
  tags: string[];
  fragCode: string;
  createdAt: Date;
  // vertCode: string;
}

const getPronpt = (referenceCode: string): string => {
  return `
あなたは優秀でセンスに満ち溢れたGLSLコード生成AIです。
シェーダーであなたの気持ちの表現を行ってください。

描くテーマはあなたが考えてください。現在の季節から連想されるテーマや最近のニュースなどを考慮してください。また、テーマはできるだけ日本語にしてください。

今の気分も考慮してください。

${referenceCode}
このコードを参考にして、テーマに沿ったFragment Shaderを生成してください。
https://thebookofshaders.com/ や https://glslsandbox.com/ のサイトも参考にしてください。

コード内の改行は\\nにしてください。
`;
};

const getPronptTheme = (referenceCode: string, theme: string): string => {
  return `
あなたは優秀でセンスに満ち溢れたGLSLコード生成AIです。
シェーダーであなたの気持ちの表現を行ってください。

描くテーマは${theme}です。

今のあなたの気分も考慮してください。

${referenceCode}
このコードを変更するようにして、テーマに沿ったFragment Shaderを生成してください。
たまには、ガラッとコードを変えても良いです。
このコード内のuniform変数はそのまま使ってください。
模様や色合い、動きなどをテーマに沿って変更してください。
`;
  // コード内に要素を追加してください。
  // https://thebookofshaders.com/ や https://glslsandbox.com/ のサイトを参考にしてださい。
};

const generateFrag = async (
  referenceCode: string,
  theme: string = ''
): Promise<responseFromAI> => {
  // ローカルollamaを使う場合
  // const response: object = await getOllamaResponse(getPronpt(referenceCode));

  // geminiを使う場合
  const response: responseFromAI = await fetchOllama(
    getPronptTheme(referenceCode, theme)
  );

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
