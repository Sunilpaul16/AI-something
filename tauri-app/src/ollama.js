async function chat() {
  const res = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama3.2",
      messages: [{ role: "user", content: "What is a neural network?" }],
      stream: false,
    }),
  });

  const data = await res.json();
  console.log(data.message.content);
}

chat();
