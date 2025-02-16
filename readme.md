# 🏎️ Racing Schedule 2025

A modern web application for tracking motorsport schedules across Formula 1, IndyCar, and NASCAR, featuring live countdowns and weather forecasts.

## 🌟 Features

- **Race Schedules**
  - Formula 1 World Championship
  - IndyCar Series
  - NASCAR Cup Series (Regular Season & Playoffs)
  - Timezone-aware event times
  - Past race results integration

- **UI Features**
  - Elegant dark/light mode
  - Mobile-responsive design
  - Dynamic countdowns to next events
  - Weekend event grouping
  - Global search with highlighting

- **Weather Integration**
  - Uses Weather.gov API
  - Location-based forecasts
  - Race day conditions
  - Hourly breakdowns

- **News Feed**
  - Motorsport.com RSS integration
  - Series-specific news sections
  - Auto-refreshing content

## 🚀 Quick Start

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional but recommended for module support). For example, you can use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for VS Code.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/racingsite.git
cd racingsite
```

2. Start your local server
3. Open `index.html` in your browser

## 💻 Technology Stack

- HTML5/CSS3 with Custom Properties
- JavaScript (ES6+ Modules)
- Bootstrap 5.3.0
- Microsoft Clarity Analytics
- Weather.gov API
- RSS2JSON API for news feeds

## 📱 Responsive Design

- Optimized for all screen sizes
- Collapsible tables on mobile
- Touch-friendly interface
- Adaptive layouts

## 🔄 Data Updates

The schedule data (`data.js`) includes:
- 24 Formula 1 races
- 17 IndyCar events
- 36 NASCAR Cup Series races
- Past season results
- Event coordinates for weather

## 🎨 Customization

The site uses CSS custom properties for easy theming:
```css
:root {
  --primary-color: #e10600;    /* F1 Red */
  --secondary-color: #1e1e1e;  /* Dark Gray */
  --accent-color: #00a19c;     /* Turquoise */
  /* ...other variables... */
}
```

## 🔧 Future Enhancements

- [ ] Add practice/qualifying sessions
- [ ] Calendar export functionality
- [ ] Push notifications
- [ ] Track maps integration
- [ ] Driver/team standings
- [ ] Results database

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

## 📝 License

MIT License - See [LICENSE](LICENSE) file

## 📧 Contact

Create an issue in the repository for any questions or suggestions.

