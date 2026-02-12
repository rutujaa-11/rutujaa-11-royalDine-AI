# rutujaa-11-royalDine-AI
RoyalDine AI is an intelligent restaurant reservation chatbot system

🍽️ RoyalDine AI – Smart Restaurant Reservation & Management System

RoyalDine AI is an intelligent restaurant reservation chatbot system 
It automates table booking, compresses menu data, and enhances the customer experience using AI-driven logic.

✨ Key Features
🤖 AI Chatbot
🪑 Smart Table Booking
🍽️ Menu & Order Workflow
👥 Customer Management

🛠 Tech Stack

Frontend:
HTML, CSS, JavaScript

Backend:
Python (Flask)

Database:
MySQL

AI / Logic:
Chatbot Engine
Table Allocation Algorithm
Reservation Scheduling Logic

📁 Project Structure
RoyalDine-AI/
│── static/
│── templates/
│── app.py
│── chatbot.py
│── database.py
│── menu.json
│── requirements.txt
│── README.md

⚙️ How to Run the Project
1] Open in Browser:-

cd "C:\Users\DELL\Desktop\Restaurant_Reservation_Bot"

.\run_project.ps1

2] Database:-

USE royal_dine;

SET SESSION group_concat_max_len = 10000;

CREATE OR REPLACE VIEW reservation_summary AS
SELECT 
    IF(o.item_order = 1, r.id, '') AS reservation_id,
    IF(o.item_order = 1, r.name, '') AS name,
    IF(o.item_order = 1, r.phone, '') AS phone,
    IF(o.item_order = 1, r.guests, '') AS guests,
    IF(o.item_order = 1, r.date, '') AS date,
    IF(o.item_order = 1, r.time, '') AS time,
    CONCAT(o.item, ' (₹', o.price, ')') AS ordered_item,
    IF(o.item_order = 1, total_summary.total_price, '') AS total_price
FROM (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY reservation_id ORDER BY id) AS item_order
    FROM orders
) AS o
JOIN reservations r ON r.id = o.reservation_id
JOIN (
    SELECT reservation_id, SUM(price) AS total_price
    FROM orders
    GROUP BY reservation_id
) AS total_summary ON r.id = total_summary.reservation_id
ORDER BY r.id, o.item_order;

SELECT * FROM reservation_summary;
