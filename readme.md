# 2025 Racing Schedules 🚗🏁

Welcome to the **2025 Racing Schedules** project! This project is a modern, responsive website that displays racing schedules for various motorsport series—including Formula 1, IndyCar, and NASCAR Cup. It features a sleek dark mode toggle, live countdowns to upcoming events, a global search, integrated news feeds, and even weather forecasts for race events.

## Features ✨

- **Responsive Design:** Works beautifully on desktops, tablets, and mobile devices.
- **Dark Mode Toggle:** Switch between light and dark themes with fun emojis (🌙/☀️).
- **Upcoming Event Countdown:** See real-time updates for the next race event.
- **Interactive Schedule Tabs:** Easily switch between schedules for Formula 1, IndyCar, and NASCAR Cup.
- **Global Search:** Quickly filter events using the search box 🔍.
- **News Section:** Stay updated with the latest motorsport news 📰.
- **Event Detail Modal:** Click on an event to view detailed information and a weather forecast ☄️.
- **RSS News Integration:** Automatically pulls news from Motorsport.com feeds.
- **Weather Forecast:** Uses the OpenWeatherMap API to fetch current weather details.

## Getting Started 🚀

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional but recommended for module support). For example, you can use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for VS Code.

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/2025-racing-schedules.git
   ```

2. **Navigate to the Project Folder:**

   ```bash
   cd 2025-racing-schedules
   ```

3. **Open `index.html` in Your Browser:**

   - Either open the file directly or run a local server (recommended for ES modules):

     ```bash
     npx live-server
     ```

## Project Structure 💁

```
2025-racing-schedules/
├── index.html         # Main HTML file
├── src/
│   ├── js/
│   │   └── data.js    # Module with schedule and event data
│   └── styles/
│       └── main.css   # Custom CSS styling (includes dark mode overrides)
└── README.md          # This file
```

## Customization 🎨

- **Styling:** Modify `src/styles/main.css` to change colors, fonts, or layout.
- **Data:** Update event data in `src/js/data.js` to reflect new schedules or series.
- **APIs:** Replace the OpenWeatherMap API key in the JavaScript if needed.

## Contributing 🤝

Contributions are welcome! If you have suggestions, bug fixes, or improvements, please open an issue or submit a pull request.

## License 📝

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- Thanks to [Bootstrap 5](https://getbootstrap.com/) for providing responsive components.
- Special shoutout to the developers behind the OpenWeatherMap and RSS2JSON APIs.
- Happy racing and enjoy the ride! 🚗🏁

