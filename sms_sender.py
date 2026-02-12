class SMSSender:

    def send_sms(self, phone: str, message: str):
        print(f"SMS to {phone}: {message}")
        return True
