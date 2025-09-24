// .envファイルにAPIキーを保存している場合
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// 環境変数からAPIキーを取得
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
  // 使用するモデルを指定
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = 'Node.jsで非同期処理を扱う方法について教えてください。';

  // テキストを生成
  // const result = await model.generateContent(prompt)
  const response = await model.generateContent({
    model: 'gemini-2.0-flash',
    contents: 'List a few popular cookie recipes.',
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            recipeName: { type: 'string' },
            ingredients: { type: 'array', items: { type: 'string' } },
          },
          required: ['recipeName', 'ingredients'],
        },
      },
    },
  });
  // const response = await result.response;
  const text = response.text();
  console.log(text);
}

export default run;
