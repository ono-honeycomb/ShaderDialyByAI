const generateFrag = async (referenceCode) => {
  const prompt = `
  あなたは優秀でセンスに満ち溢れたシェーダーコード生成AIです。
  描くテーマはあなたが考えてください。現在の季節から連想されるテーマや最近のニュースなどを考慮してください。また、テーマは日本語にしてください。
  ${referenceCode}
  この内容を参考にして、テーマに沿ったFragment Shaderを生成してください。
  https://thebookofshaders.com/ や https://glslsandbox.com/ のサイトも参考にしてください。
  出力は必ず以下のフォーマットのjsonで返してください。
  {
  title: "",
  fragCode: "",
  thema: "",
  }
  他の文章は不要です。コード内のコメントも不要です。
`;
  const response = await ollamaChat(prompt);
  return extractJsonBlock(response);
};

const correctionCode = async (code, errorMessage) => {
  const prompt = `
${code}
${errorMessage}
修正したコードを出力してください。
必ず以下のフォーマットのjsonで返してください。
{
  fragCode: "",
}
他の文章は不要です。コード内のコメントも不要です。
  `;

  const response = await ollamaChat(prompt);
  return extractJsonBlock(response);
};

function extractJsonBlock(text) {
  const startDelimiter = "```json";
  const endDelimiter = "```";

  // 開始デリミタの位置を見つける
  const startIndex = text.indexOf(startDelimiter);
  if (startIndex === -1) {
    console.error('開始デリミタ "```json" が見つかりません。');
    return null;
  }

  // 終了デリミタの位置を見つける
  const endIndex = text.indexOf(
    endDelimiter,
    startIndex + startDelimiter.length
  );
  if (endIndex === -1) {
    console.error('終了デリミタ "```" が見つかりません。');
    return null;
  }

  // デリミタの間のテキストを抽出
  const jsonString = text
    .substring(startIndex + startDelimiter.length, endIndex)
    .trim();

  // 改行コードを消す
  jsonString.replace(/(\r\n|\n|\r)/g, "");

  try {
    // 抽出した文字列をJSONとしてパース
    const jsonObject = JSON.parse(jsonString);
    return jsonObject;
  } catch (e) {
    console.error("JSONのパースに失敗しました:", e);
    return null;
  }
}
