# 🤖 AI — Local Chatbot Web App  
A lightweight, self‑hosted AI chat interface built with **Node.js**, **Express**, and a clean HTML frontend.  
This project provides a simple web UI for interacting with an AI model through a backend API route.

---

## 📌 Features
- 🧠 **AI chat interface** (HTML frontend in `/templates/ai-chat.html`)
- 🚀 **Express.js backend** (`app.js`)
- 🔐 **Environment‑based API key loading** using `dotenv`
- 🌐 **Static + template rendering**
- 📦 **Node.js or Python support** (repo includes both `package.json` and `requirements.txt`)
- 🖥️ **Runs locally with no internet after setup** (per GitHub description)

---

## 📁 Project Structure
```
AI/
│
├── templates/
│   └── ai-chat.html        # Main chat UI
│
├── app.js                  # Express backend server
├── package.json            # Node.js dependencies
├── requirements.txt        # Python dependencies (optional)
└── README.md               # Project documentation
```

---

## 🛠️ Tech Stack
| Component | Purpose |
|----------|---------|
| **Node.js + Express** | Backend server |
| **HTML/CSS/JS** | Frontend chat UI |
| **dotenv** | Loads API keys securely |
| **OpenAI API (optional)** | AI responses |
| **Python (optional)** | Alternative environment |

---

## ⚙️ Installation (Node.js)
### 1. Clone the repo
```bash
git clone https://github.com/Mr-A-Hacker/AI
cd AI
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create a `.env` file
```
OPENAI_API_KEY=your_key_here
```

### 4. Start the server
```bash
node app.js
```

### 5. Open in browser
```
http://localhost:3000
```

---

## 🐍 Optional: Python Environment
If you want to run the Python version:

### Install dependencies
```bash
pip install -r requirements.txt
```

*(Note: The repo does not include a Python server file, but the requirements allow future expansion.)*

---

## 🧩 How It Works
### Frontend (`templates/ai-chat.html`)
- Clean chat interface  
- Sends user messages to backend  
- Displays AI responses  

### Backend (`app.js`)
- Loads environment variables  
- Hosts static + template files  
- Handles AI request route  
- Sends responses back to the UI  

Example snippet:
```js
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    // AI logic here
    res.json({ reply: "AI response goes here" });
});
```

---

## 📌 Future Improvements
- Add streaming responses  
- Add conversation history  
- Add multiple AI models  
- Add dark mode UI  
- Add Docker support  

---

## 🤝 Contributing
Pull requests are welcome!  
Feel free to improve the UI, backend logic, or add new features.

---

## ⭐ Support the Project
If you like this project, consider starring the repo — it helps a lot!
