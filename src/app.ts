import {
  GoogleGenAI,
  FunctionCallingConfigMode,
  FunctionDeclaration,
  Type,
} from "@google/genai";

import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: API_KEY });

const shaderdialybyai: FunctionDeclaration = {
  name: "shaderdialybyai",
  parametersJsonSchema: {
    type: "object",
    properties: {
      title: {
        type: "string",
      },
      thema: {
        type: "string",
      },
      description: {
        type: "string",
      },
      tags: {
        type: "array",
        items: {
          type: "string",
        },
      },
      fragCode: {
        type: "string",
      },
    },
    required: ["title", "thema", "description", "tags", "fragCode"],
  },
};

async function main() {
  console.log("AI リクエスト ");
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
      あなたは優秀でセンスに満ち溢れたシェーダーコード生成AIです。
      glsl のコードを生成してください。
      描くテーマはあなたが考えてください。現在の季節から連想されるテーマや最近のニュースなどを考慮してください。
      https://thebookofshaders.com/ や https://glslsandbox.com/ のサイトも参考にしてください。
      uniformの宣言でエラーが出るならば、宣言しなくていいです。
    `,
    config: {
      toolConfig: {
        functionCallingConfig: {
          mode: FunctionCallingConfigMode.ANY,
          allowedFunctionNames: [shaderdialybyai.name],
        },
      },
      tools: [{ functionDeclarations: [shaderdialybyai] }],
    },
  });
  console.log(response.functionCalls[0].args.fragCode);
}

main();
