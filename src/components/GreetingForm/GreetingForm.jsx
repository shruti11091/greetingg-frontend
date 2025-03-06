import { useState } from "react";
import "./GreetingForm.css";

export default function GreetingForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const fetchGreeting = async () => {
    if (!name) {
      setMessage("Name is required.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/greet?name=${name}`);
      const data = await response.json();
      setMessage(data.message || data.error);
    } catch (error) {
      setMessage("Error fetching greeting.");
    }
  };

  return (
    <div className="greeting-container">
      <div className="greeting-card">
        <h1 className="title">✨ Greeting App ✨</h1>
        <p className="description">Enter your name and receive a personalized greeting.</p>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
        <button onClick={fetchGreeting} className="greeting-button">
          🎀 Get Greeting 🎀
        </button>
        {message && <p className="greeting-message">{message}</p>}
      </div>
    </div>
  );
}