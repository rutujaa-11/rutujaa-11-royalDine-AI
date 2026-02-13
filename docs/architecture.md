# 🏗️ System Architecture – RoyalDine AI

RoyalDine AI uses a modular, scalable architecture based on Flask + MySQL + AI logic.

---

## 🔹 High-Level Flow
User → Chat UI → Flask Backend → Reservation Engine → MySQL  
User ← Response ← Backend ← AI Logic  

---

## 🔹 Components

### Backend
- `app.py`: Main backend server  
- `chatbot.py`: Chat logic  
- `database.py`: DB operations  
- `menu.json`: Compressed menu data  

### Frontend
- HTML / CSS UI  
- JavaScript chatbot widget  

### Logic Modules
- Table allocation  
- Menu compression engine  
- Dietary preference engine  

---

## 🔹 Benefits
- Fast response time  
- Clean modular structure  
- Easily scalable  
