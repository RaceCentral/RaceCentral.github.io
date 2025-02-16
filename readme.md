# 🏎️ Racing Schedule 2025

A modern, interactive racing schedule application featuring Formula 1, IndyCar, and NASCAR events with real-time updates, weather forecasts, and news integration.

![Dark Mode Preview](assets/dark-mode.png)
![Light Mode Preview](assets/light-mode.png)

## ⚡ Key Features

- **Live Race Tracking**
  - Real-time countdowns to upcoming races
  - Multiple timezone support
  - Weather forecasts for race locations

- **Series Coverage**
  - Formula 1 Championship
  - IndyCar Series
  - NASCAR Cup Series (Regular Season & Playoffs)

- **Interactive Interface**
  - Dark/Light mode toggle
  - Responsive design for all devices
  - Global search functionality
  - Series-specific filtering

- **Race Information**
  - Detailed event modals
  - Weather integration
  - Social sharing options
  - Past race results

- **News Integration**
  - Live RSS feeds from motorsport.com
  - Series-specific news sections
  - Auto-updating content

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional but recommended for module support). For example, you can use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for VS Code.

### Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/racingsite.git
cd racingsite
```

2. Start a local server:
```bash
python3 -m http.server
# or use Live Server VSCode extension
```

3. Visit `http://localhost:8000` in your browser

## 🛠️ Technical Details

### Built With
- HTML5 & CSS3
- JavaScript (ES6+)
- Bootstrap 5.3.0
- Font Awesome Icons

### APIs Used
- OpenWeatherMap API (weather data)
- RSS2JSON API (news feeds)
- Microsoft Clarity (analytics)

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 💻 Tablets (768px+)
- 🖥️ Desktops (1024px+)
- 📺 Large screens (1440px+)

## 🔧 Configuration

### Weather API
To use your own OpenWeatherMap API key:
```javascript
const WEATHER_API_KEY = 'your-api-key-here';
```

### Analytics
To disable analytics, remove the Clarity script from `index.html`:
```html
<!-- Remove or modify this section -->
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){...})(window, document, "clarity", "script", "your-clarity-key");
</script>
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔮 Future Enhancements

- [ ] Push notifications for race reminders
- [ ] Calendar export functionality
- [ ] Driver and team standings
- [ ] Circuit information and track maps
- [ ] Historical race statistics
- [ ] Qualifying session times
- [ ] Practice session schedules

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

Project Link: [https://github.com/yourusername/racingsite](https://github.com/yourusername/racingsite)

