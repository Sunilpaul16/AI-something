import { useState } from "react";
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

    const res = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setResponse(data.message);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Chat input:
        <input
          type="text"
          placeholder="Enter your message here"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
      <p>Input: {text}</p>
      <p>Response: {response}</p>
    </form>
  );
}

export default App;
