import { useState } from "react";
import "./App.css";

function App() {
  return (
    <dev>
      <h1>Hello</h1>
      <Form />
    </dev>
  );
}

function Form() {
  const [text, setText] = useState("");

  function handleClick(e) {
    e.preventDefault();
    console.log({ text });
  }
  return (
    <>
      <form method="post" onSubmit={handleClick}></form>
      <label>
        Text input:
        <input
          type="text"
          placeholder="Enter your message here"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </label>
      <button className="ask" type="submit" onClick={handleClick}>
        Submit
      </button>
    </>
  );
}

export default App;
