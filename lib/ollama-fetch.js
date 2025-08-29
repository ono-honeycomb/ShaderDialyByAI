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
