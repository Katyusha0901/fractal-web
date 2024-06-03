import React, { useState } from "react";

export function App() {
  const [givenValue, setGivenValue] = useState<string>("");
  return (
    <div className="App">
      <input onChange={(data) => setGivenValue(data.target.value)}></input>
      <button>Send</button>
    </div>
  );
}
