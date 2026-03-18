import express from "express";
import chat from "./ollama.js";
const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:1420");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/chat", async (req, res) => {
  const text = req.body.text;
  console.log("Received text:", text);

  const data = await chat(text);
  res.json({ message: data });
});


app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});


setInterval(() => { }, 1000);
