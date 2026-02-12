from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from datetime import datetime

app = Flask(__name__)
CORS(app)

# ---- Connect to MySQL ----
db = mysql.connector.connect(
    host="localhost",
    user="rutuja",       # MySQL user
    password="rutuja",   # MySQL password
    database="royal_dine",
    auth_plugin='mysql_native_password'
)

cursor = db.cursor(dictionary=True)

# ---- Reservation Endpoint ----
@app.route("/reserve", methods=["POST"])
def reserve():
    data = request.json
    try:
        sql = "INSERT INTO reservations (name, phone, guests, date, time) VALUES (%s,%s,%s,%s,%s)"
        cursor.execute(sql, (data["name"], data["phone"], data["guests"], data["date"], data["time"]))
        db.commit()
        return jsonify({"success": True, "reservation_id": cursor.lastrowid})
    except Exception as e:
        print("Reservation Error:", e)
        return jsonify({"success": False}), 200  # frontend handles continuation

# ---- Order Endpoint ----
@app.route("/order", methods=["POST"])
def order():
    data = request.json
    if not data.get("reservation_id"):
        return jsonify({"success": False}), 200
    try:
        sql = "INSERT INTO orders (reservation_id, item, price, order_time) VALUES (%s,%s,%s,%s)"
        cursor.execute(sql, (data["reservation_id"], data["item"], data["price"], datetime.now()))
        db.commit()
        return jsonify({"success": True})
    except Exception as e:
        print("Order Error:", e)
        return jsonify({"success": False}), 200

if __name__ == "__main__":
    app.run(debug=True)
