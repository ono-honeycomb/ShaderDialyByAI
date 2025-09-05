class Ollama {
  constructor() {
    this.apiUrl = "http://localhost:11434/api";
    this.model = "gemma3"; // 使用するモデルを指定
  }

  async chat(message) {
    const response = await fetch(`${this.apiUrl}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: this.model,
        messages: [{ role: "user", content: message }],
        stream: false,
      }),
    });
    const data = await response.json();
    return data.message.content;
  }
}

const ollamaChat = async (message) => {
  const response = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gemma3", // 使用するモデルを指定
      messages: [{ role: "user", content: message }],
      stream: false,
    }),
  });
  const data = await response.json();
  return data.message.content;
};
