document.addEventListener("DOMContentLoaded", () => {
    // ================= 1. DARK / LIGHT MODE TOGGLE =================
    const themeToggleBtn = document.getElementById("theme-toggle");
    const savedTheme = localStorage.getItem("laundrywallah_theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        if (themeToggleBtn) themeToggleBtn.textContent = "☀️";
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");
            themeToggleBtn.textContent = isDark ? "☀️" : "🌙";
            localStorage.setItem("laundrywallah_theme", isDark ? "dark" : "light");
        });
    }

    // ================= 2. USER SESSION & LOGIN HANDLING =================
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const emailInput = document.getElementById("email").value.trim();
            // Extract username before '@' and capitalize first letter
            const rawName = emailInput.split("@")[0] || "Priyanku";
            const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
            
            localStorage.setItem("laundrywallah_user", formattedName);
            window.location.href = "laundry.html";
        });
    }

    // Display logged-in user's name in navbar
    const userDisplayElements = document.querySelectorAll(".user-name");
    const savedUser = localStorage.getItem("laundrywallah_user") || "Priyanka";
    userDisplayElements.forEach((el) => {
        el.textContent = `👤 ${savedUser}`;
    });

    // ================= 3. INTERACTIVE HAMBURGER MENU =================
    const hamburgerBtn = document.querySelector(".hamburger-btn");
    const mobileDropdown = document.querySelector(".mobile-dropdown");

    if (hamburgerBtn && mobileDropdown) {
        hamburgerBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            mobileDropdown.classList.toggle("show-menu");
            hamburgerBtn.classList.toggle("active");
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!mobileDropdown.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                mobileDropdown.classList.remove("show-menu");
                hamburgerBtn.classList.remove("active");
            }
        });
    }

    // ================= 4. LIVE PRICE & COMPLETION TIME CALCULATOR =================
    const bookingForm = document.getElementById("booking-form");
    if (bookingForm) {
        const serviceSelect = document.getElementById("service-type");
        const speedSelect = document.getElementById("delivery-speed");
        const weightInput = document.getElementById("weight");
        const pickupDateInput = document.getElementById("pickup-date");
        const totalDisplay = document.getElementById("live-total");
        const readyTimeDisplay = document.getElementById("live-ready-time");

        // Set default pickup date to today
        const today = new Date().toISOString().split("T")[0];
        pickupDateInput.value = today;
        pickupDateInput.min = today;

        const rates = {
            "wash-fold": { price: 60, hours: 24, unit: "kg" },
            "wash-iron": { price: 90, hours: 36, unit: "kg" },
            "dry-clean": { price: 150, hours: 48, unit: "pieces" },
            "iron-only": { price: 15, hours: 12, unit: "pieces" }
        };

        function updateLiveSummary() {
            const selectedService = serviceSelect.value;
            const speed = speedSelect.value;
            const quantity = parseFloat(weightInput.value) || 1;

            const serviceInfo = rates[selectedService];
            let totalCost = serviceInfo.price * quantity;
            let turnaroundHours = serviceInfo.hours;

            if (speed === "express") {
                totalCost += 80;
                turnaroundHours = 8;
            }

            // Calculate estimated completion date & time
            const pickupDate = new Date(pickupDateInput.value || Date.now());
            pickupDate.setHours(pickupDate.getHours() + turnaroundHours);
            const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            const readyString = pickupDate.toLocaleDateString('en-IN', options);

            totalDisplay.textContent = `₹${totalCost}`;
            readyTimeDisplay.textContent = `${readyString} (${turnaroundHours} hrs)`;
        }

        // Listen for any changes in form inputs
        [serviceSelect, speedSelect, weightInput, pickupDateInput].forEach((input) => {
            input.addEventListener("input", updateLiveSummary);
        });

        // Run calculation immediately on load
        updateLiveSummary();

        // ================= 5. BOOKING CONFIRMATION MODAL =================
        const modal = document.getElementById("confirmation-modal");
        const closeModalBtn = document.getElementById("close-modal");
        const modalSummary = document.getElementById("modal-summary");

        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
            const address = document.getElementById("address").value;
            const timeSlot = document.getElementById("pickup-time").options[document.getElementById("pickup-time").selectedIndex].text;

            modalSummary.innerHTML = `
                <p><strong>Customer:</strong> ${savedUser}</p>
                <p><strong>Service:</strong> ${serviceText}</p>
                <p><strong>Quantity:</strong> ${weightInput.value}</p>
                <p><strong>Pickup Slot:</strong> ${pickupDateInput.value} (${timeSlot})</p>
                <p><strong>Estimated Ready By:</strong> ${readyTimeDisplay.textContent}</p>
                <p><strong>Total Amount:</strong> ${totalDisplay.textContent}</p>
                <p><strong>Address:</strong> ${address}</p>
            `;
            modal.classList.add("show-modal");
        });

        if (closeModalBtn) {
            closeModalBtn.addEventListener("click", () => {
                modal.classList.remove("show-modal");
                bookingForm.reset();
                pickupDateInput.value = today;
                updateLiveSummary();
            });
        }
    }
});