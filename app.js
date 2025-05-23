const chat = document.getElementById("chat");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function appendMessage(text, className) {
  const msg = document.createElement("div");
  msg.className = "message " + className;
  msg.textContent = text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage(message, "user");
  userInput.value = "";
  sendBtn.disabled = true;

  try {
    const response = await fetch(
      "https://backend-1-4s4d.onrender.com/ai-chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      }
    );

    if (!response.ok) {
      appendMessage("❌ Error: " + response.statusText, "bot");
    } else {
      const data = await response.json();
      const reply = data.Response || "⚠️ Respuesta no disponible";
      appendMessage(reply, "bot");
    }
  } catch (error) {
    appendMessage("⚠️ Error de conexión: " + error.message, "bot");
  } finally {
    sendBtn.disabled = false;
    userInput.focus();
  }
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});