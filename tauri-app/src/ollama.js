async function chat(event) {
  const res = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "jarvis",
      messages: event,
      stream: false,
    }),
  });

  const data = await res.json();
  return data.message.content
}

export default chat;
