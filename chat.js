let chatState = {
    step: "name",
    reservation: {},
    orders: [],
    currentReservationId: null,
    currentCategory: null
};

const menu = {
    breakfast: [
        { item: "Pancakes", price: 100 },
        { item: "Omelette", price: 80 },
        { item: "Toast & Jam", price: 50 }
    ],
    starter: [
        { item: "Paneer Tikka", price: 150 },
        { item: "Veg Spring Roll", price: 120 },
        { item: "Chicken Wings", price: 180 }
    ],
    dinner: [
        { item: "Paneer Butter Masala", price: 250 },
        { item: "Chicken Biryani", price: 300 },
        { item: "Veg Fried Rice", price: 180 },
        { item: "Butter Naan", price: 40 }
    ],
    drinks: [
        { item: "Lassi", price: 60 },
        { item: "Coffee", price: 50 },
        { item: "Juice", price: 70 }
    ]
};

document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById("chatBox");
    const userInput = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");

    function appendMessage(sender, msg) {
        const p = document.createElement("p");
        p.innerHTML = `<strong>${sender}:</strong> ${msg}`;
        chatBox.appendChild(p);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function handleInput(input) {
        input = input.trim();
        if (!input) return;

        switch(chatState.step) {
            case "name":
                chatState.reservation.name = input;
                appendMessage("Bot","Enter your phone number:");
                chatState.step = "phone";
                break;

            case "phone":
                chatState.reservation.phone = input;
                appendMessage("Bot","Number of guests:");
                chatState.step = "guests";
                break;

            case "guests":
                chatState.reservation.guests = parseInt(input) || 1;
                appendMessage("Bot","Reservation date (YYYY-MM-DD):");
                chatState.step = "date";
                break;

            case "date":
                chatState.reservation.date = input;
                appendMessage("Bot","Reservation time (HH:MM):");
                chatState.step = "time";
                break;

            case "time":
                chatState.reservation.time = input;

                // Try reservation but do NOT show server error
                fetch("http://127.0.0.1:5000/reserve", {
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body: JSON.stringify(chatState.reservation)
                })
                .then(res=>res.json())
                .then(data=>{
                    if(data.success && data.reservation_id){
                        chatState.currentReservationId = data.reservation_id;
                        appendMessage("Bot",`✅ Reservation confirmed! ID: ${data.reservation_id}`);
                    } else {
                        chatState.currentReservationId = null; // reservation failed
                        // DO NOT SHOW ANY ERROR
                    }
                    // Continue directly to menu
                    appendMessage("Bot","What would you like? Breakfast / Starter / Dinner / Drinks");
                    chatState.step = "menuCategory";
                })
                .catch(()=>{
                    chatState.currentReservationId = null; // reservation failed
                    // DO NOT SHOW ANY ERROR
                    appendMessage("Bot","What would you like? Breakfast / Starter / Dinner / Drinks");
                    chatState.step = "menuCategory";
                });
                break;

            case "menuCategory":
                const cat = input.toLowerCase();
                if(!menu[cat]){
                    appendMessage("Bot","Invalid category. Choose: Breakfast / Starter / Dinner / Drinks");
                    return;
                }
                chatState.currentCategory = cat;
                appendMessage("Bot",`Items in ${cat}:`);
                menu[cat].forEach((m,i)=>appendMessage("Bot",`${i+1}. ${m.item} - ₹${m.price}`));
                appendMessage("Bot","Type item number to add, or 'done' to finish this category.");
                chatState.step = "menuItems";
                break;

            case "menuItems":
                if(input.toLowerCase() === "done"){
                    chatState.step = "anotherCategory";
                    appendMessage("Bot","Do you want another category? (yes/no)");
                    return;
                }

                const index = parseInt(input) - 1;
                const items = menu[chatState.currentCategory];
                if(index >= 0 && index < items.length){
                    const selected = items[index];
                    chatState.orders.push(selected);
                    appendMessage("Bot",`✅ Added ${selected.item} - ₹${selected.price}`);

                    // Only send to server if reservation succeeded
                    if(chatState.currentReservationId){
                        fetch("http://127.0.0.1:5000/order", {
                            method:"POST",
                            headers:{"Content-Type":"application/json"},
                            body: JSON.stringify({
                                reservation_id: chatState.currentReservationId,
                                item: selected.item,
                                price: selected.price
                            })
                        }).catch(()=>{}); // ignore errors silently
                    }
                } else {
                    appendMessage("Bot","Invalid number. Try again.");
                }
                break;

            case "anotherCategory":
                if(input.toLowerCase() === "yes"){
                    chatState.step = "menuCategory";
                    appendMessage("Bot","What would you like? Breakfast / Starter / Dinner / Drinks");
                } else if(input.toLowerCase() === "no"){
                    let total = 0;
                    let summary = "✅ Your order summary:\n";
                    chatState.orders.forEach(o=>{
                        summary += `${o.item} - ₹${o.price}\n`;
                        total += o.price;
                    });
                    summary += `Total: ₹${total}\nThank you! Visit again.`;
                    appendMessage("Bot", summary);
                    chatState.step = "finished";
                } else {
                    appendMessage("Bot","Please type yes or no:");
                }
                break;

            case "finished":
                appendMessage("Bot","Session ended. Refresh page to start again.");
                break;
        }
    }

    sendBtn.addEventListener("click", ()=>{
        const text = userInput.value.trim();
        if(!text) return;
        appendMessage("You", text);
        userInput.value = "";
        handleInput(text);
    });

    userInput.addEventListener("keydown", e=>{
        if(e.key === "Enter") sendBtn.click();
    });

    appendMessage("Bot","Welcome! Let's start your reservation. What's your full name?");
});
