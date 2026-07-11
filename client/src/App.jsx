import { useState } from "react";

const API_URL = "http://localhost:8001/api/chat/";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Error: could not reach the server." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>AROL Assistant</h1>
      <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 16, minHeight: 300 }}>
        {messages.map((m, i) => (
          <p key={i}>
            <strong>{m.role === "user" ? "You" : "Assistant"}:</strong> {m.content}
          </p>
        ))}
        {loading && <p><em>Assistant is thinking…</em></p>}
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <input
          style={{ flex: 1, padding: 8 }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask about a machine…"
        />
        <button onClick={sendMessage} disabled={loading}>Send</button>
      </div>
    </div>
  );
}

export default App;