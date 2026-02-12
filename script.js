// -------- Book Table ----------
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("reservationForm");
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            const reservation = {
                name: document.getElementById("name").value,
                phone: document.getElementById("phone").value,
                guests: document.getElementById("guests").value,
                date: document.getElementById("date").value,
                time: document.getElementById("time").value
            };

            fetch("http://127.0.0.1:5000/reserve", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reservation)
            })
            .then(res => res.json())
            .then(data => {
                document.getElementById("resultMessage").innerText = data.table_suggestion 
                    ? "✔ Your table is booked!" 
                    : "❌ Could not book table.";
            });
        });
    }

    // -------- Menu ----------
    const menuContainer = document.getElementById("menuContainer");
    if (menuContainer) {
        const menu = [
            { item: "Paneer Butter Masala", price: 250 },
            { item: "Chicken Biryani", price: 300 },
            { item: "Veg Fried Rice", price: 180 },
            { item: "Butter Naan", price: 40 }
        ];

        menu.forEach(dish => {
            const div = document.createElement("div");
            div.className = "menu-item";
            div.innerHTML = `
                <h3>${dish.item}</h3>
                <p>Price: ₹${dish.price}</p>
                <button>Add to Cart</button>
            `;
            div.querySelector("button").addEventListener("click", () => {
                const order = { item: dish.item, price: dish.price, date: new Date().toLocaleString() };
                fetch("http://127.0.0.1:5000/order", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(order)
                })
                .then(res => res.json())
                .then(data => alert("✅ Added to orders!"));
            });
            menuContainer.appendChild(div);
        });
    }
});
