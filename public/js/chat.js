// SEND MESSAGE
async function send() {
  const input = document.getElementById("msg");
  const chat = document.getElementById("chat");

  if (!input.value) return;

  const userDiv = document.createElement("div");
  userDiv.className = "message user";
  userDiv.textContent = input.value;
  chat.appendChild(userDiv);

  chat.scrollTop = chat.scrollHeight;

  const typing = document.createElement("div");
  typing.className = "message bot";
  typing.textContent = "GlenAI is typing...";
  chat.appendChild(typing);

  const message = input.value;
  input.value = "";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    typing.textContent = "🤖 GlenAI: " + data.reply;

  } catch (err) {
    typing.textContent = "⚠️ Error connecting to GlenAI";
  }

  chat.scrollTop = chat.scrollHeight;
}

// CLEAR CHAT
function clearChat() {
  const chat = document.getElementById("chat");
  chat.innerHTML = "";

  const botMsg = document.createElement("div");
  botMsg.className = "message bot";
  botMsg.textContent = "🤖 GlenAI: Chat cleared.";
  chat.appendChild(botMsg);
}
