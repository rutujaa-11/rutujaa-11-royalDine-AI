import sqlite3
from backend.models.reservation_model import Reservation

class ReservationManager:

    def __init__(self, db_path="database/reservations.db"):
        self.db_path = db_path

    def connect(self):
        return sqlite3.connect(self.db_path)

    def create_reservation(self, reservation: Reservation):
        conn = self.connect()
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO reservations (name, phone, guests, date, time)
            VALUES (?, ?, ?, ?, ?)
        """, (
            reservation.name,
            reservation.phone,
            reservation.guests,
            reservation.date,
            reservation.time
        ))

        conn.commit()
        conn.close()
        return True
