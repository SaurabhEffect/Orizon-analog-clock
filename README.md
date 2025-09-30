# 🕐 Orizon - Analog Clock v1.0

> A beautiful, real-time analog clock web application

![HTML5](https://img.shields.io/badge/Built%20with-HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

![Clock Demo](https://img.shields.io/badge/Status-Working-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0-blue)

## ✨ Features

- **Real-time Analog Clock**: Smooth moving hour, minute, and second hands
- **Hour Markers**: Clear numbered markers (1-12) positioned accurately
- **Date Display**: Current date with day of the week
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Professional Styling**: Clean gradient background with modern typography
- **Brand Identity**: Orizon logo integrated into the design

## 🚀 Quick Start

1. **Download Files**:

   ```
   v1.0/
   ├── index.html
   ├── style.css
   └── script.js
   ```

2. **Open in Browser**:

   - Simply open `index.html` in any modern web browser
   - No server setup required!

3. **Enjoy**: The clock will start running immediately with real-time updates

## 🛠️ Technical Details

### Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 15+

### Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with flexbox and CSS custom properties
- **Vanilla JavaScript**: ES6+ class-based architecture
- **Google Fonts**: Inter font family for typography

### File Structure

```
v1.0/
├── index.html      (2.3KB) - Main HTML structure
├── style.css       (4.3KB) - All styling and responsive design
└── script.js       (1.8KB) - Core clock functionality
```

## 🎨 Design Features

- **Glassmorphism Effect**: Semi-transparent glass-like appearance
- **Gradient Background**: Beautiful purple-to-blue gradient
- **Smooth Animations**: 0.5s transitions for hour/minute hands, 0.1s for second hand
- **Mobile-First**: Responsive breakpoints at 768px and 480px
- **Typography**: Inter font for clean, modern appearance

## 🔧 How It Works

The clock updates every second using JavaScript's `setInterval()`:

```javascript
// Update clock hands every second
setInterval(() => {
  this.updateClock();
}, 1000);
```

Hand angles are calculated based on current time:

- **Hour Hand**: `(hours % 12) * 30 + minutes * 0.5` degrees
- **Minute Hand**: `minutes * 6 + seconds * 0.1` degrees
- **Second Hand**: `seconds * 6` degrees

## 📱 Responsive Breakpoints

- **Desktop**: 500px+ (Full size clock: 320x320px)
- **Tablet**: 768px and below (Medium size: 280x280px)
- **Mobile**: 480px and below (Compact size: 240x240px)

## 🌟 Coming Soon

This is version 1.0 - the foundation! Future versions will include:

- 🌓 Dark/Light theme toggle
- 🌍 Multiple timezones
- ⏱️ Stopwatch feature
- ⏲️ Timer functionality

## 🤝 Contributing

Found a bug or have a feature request? Feel free to open an issue!

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

**Made with ❤️ by Saurabh**

_Orizon v1.0 - Where time meets elegance_
