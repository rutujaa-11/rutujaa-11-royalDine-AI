class Validator:

    def is_valid_phone(self, phone: str) -> bool:
        return phone.isdigit() and len(phone) == 10

    def is_valid_guests(self, guests: int) -> bool:
        return guests > 0
