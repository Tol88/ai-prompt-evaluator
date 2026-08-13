import { useState } from "react";

export default function PromptForm() {
  const [prompt, setPrompt] = useState("");

  return (
    <>
      <textarea
        rows={8}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Write your prompt..."
        style={{
          width: "100%",
          padding: 15,
          fontSize: 16,
        }}
      />

      <button
        style={{
          marginTop: 20,
          padding: 15,
          fontSize: 18,
        }}
      >
        Evaluate
      </button>
    </>
  );
}