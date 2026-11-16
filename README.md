
# LaundryWallah - Responsive Laundry Services Web Application

A complete, multi-page laundry service web application built with semantic HTML5, modern CSS3 (Flexbox, Media Queries, CSS Variables, keyframe animations, and vendor-prefixed compatibility), and interactive Vanilla JavaScript.

## 📋 Features
- **Authentication Flow (`login.html`):** Split-layout login interface that stores user sessions dynamically via `localStorage`.
- **Interactive Home Page (`laundry.html`):** Features a glassmorphic navbar, animated floating background bubbles, gradient text styling , and a responsive mobile hamburger menu.
- **Service Booking & Live Calculator (`booking.html`):** Displays transparent pricing tiers and turnaround times alongside an interactive form that calculates total costs, express delivery fees, and estimated completion timestamps in real time, complete with a confirmation receipt modal.
- **Dark & Light Mode:** Persistent theme switcher synced across all pages.

## 🛠️ Technologies Used
- **HTML5:** Semantic structure and accessible form controls.
- **CSS3:** Flexbox, Media Queries, CSS Variables (`:root`), `@keyframes` animations, and cross-browser vendor prefixes.
- **JavaScript (ES6+):** DOM manipulation, event handling, `localStorage` session persistence, and real-time cost/date calculations.

## 📂 File Structure
```
├── login.html     # User login page (entry point)
├── login.css      # Login page styles
├── laundry.html   # Main landing page with hero section & mobile menu
├── laundrystyle.css      # Landing page styles, floating bubbles & dark mode
├── booking.html   # Service pricing cards & pickup scheduling form
├── booking.css    # Booking page & confirmation modal styles
├── script.js      # Interactive logic (theme toggle, session, live calculator)
└── README.md      # Project documentation
```
🚀 How to Run

- Keep all HTML, CSS, and JavaScript files in the same root directory.
- Open index.html in Microsoft Edge or launch it using VS Code's Live Server.
