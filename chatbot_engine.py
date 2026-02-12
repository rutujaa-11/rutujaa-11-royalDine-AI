def generate_bot_reply(message):
    message = message.lower()

    if "book" in message or "reserve" in message:
        return "Sure! Please provide your name, phone number, date, time, and guest count."

    if "hi" in message or "hello" in message:
        return "Hello! I'm SmartDine AI. I can help you with table reservations."

    return "I didn't understand. Please try again."
