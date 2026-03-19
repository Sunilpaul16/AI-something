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
  const [log, setLog] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("Sending:", text);
    const userMessage = {
      id: Date.now(),
      role: "user",
      content: text,
    };
    const newMessages = [...log, userMessage];
    setLog((prev) => [...prev, userMessage]);
    const data = await chat(newMessages);
    console.log("Received response:", data);
    const assistantMessage = {
      id: Date.now(),
      role: "assistant",
      content: data,
    };
    setLog((prev) => [...prev, assistantMessage]);
  }
  return (
    <>
      <ul>
        {log.map((role) => (
          <li key={role.id}>
            <b name="role">{role.role}:</b> {role.content}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        Chat input:
        <input
          type="text"
          name="ask"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
