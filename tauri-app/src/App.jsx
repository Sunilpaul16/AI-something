import { useState } from "react";
import chat from "./ollama";
import "./App.css";

function App() {
  return (
    <div>
      <h1>Hello</h1>
      <Form />
    </div>
  );
}

function Form() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const data = await chat(text);
    console.log("Received response:", data);
    setResponse(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      Chat input:
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button type="submit">Submit</button>
      <p>Response: {response}</p>
    </form>
  );
}

export default App;
