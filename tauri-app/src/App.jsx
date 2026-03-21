import { useState } from "react";
import chat from "./ollama";
import { runTest, insertMessage } from "./db";

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
    runTest();
    console.log("Sending:", text);
    const userMessage = {
      id: Date.now(),
      role: "user",
      content: text,
    };
    insertMessage(userMessage.role, text);
    console.log(insertMessage);
    setText("");
    const newMessages = [...log, userMessage];
    setLog((prev) => [...prev, userMessage]);
    const cleanMessages = newMessages.map(({ role, content }) => ({
      role,
      content,
    }));
    const data = await chat(cleanMessages);
    console.log("Received response:", data);
    const assistantMessage = {
      id: Date.now(),
      role: "assistant",
      content: data,
    };
    insertMessage(assistantMessage.role, data);

    setLog((prev) => [...prev, assistantMessage]);
  }
  return (
    <>
      <ul>
        {log.map((role) => (
          <li key={role.id}>
            <b name="role">{role.role.toUpperCase()}:</b> {role.content}
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
