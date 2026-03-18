import express from "express";
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/chat", async (req, res) => {

  const resOllama = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama3.2",
      stream: "false",
      messages: [
        {
          role: "user",
          content: "in 1 line - why is the sky blue?",
        },
      ],
    }),
  });
  const data = await resOllama.json();
  res.json(data)
  console.log(data)
});



app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
