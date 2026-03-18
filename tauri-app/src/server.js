import express from "express";
import chat from "./ollama";
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/chat", async (req, res) => {
  data = await chat()
  res.json(data)
});


app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
