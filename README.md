# ORIZON Clock v3.2 - Advanced Modular Analog Clock

> **ORIZON** is a sophisticated, fully-featured analog clock application with advanced theming, modular architecture, and rich customization options. Built with vanilla JavaScript using modern component based patterns.

![HTML5](https://img.shields.io/badge/Built%20with-HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Tone.js](https://img.shields.io/badge/Tone.js-Audio-blue?style=for-the-badge)

![Version](https://img.shields.io/badge/version-3.2.0-blue.svg)
![Feature](https://img.shields.io/badge/NEW-Modular_Architecture-gold)
![Feature](https://img.shields.io/badge/Feature-Timezone_Toggle-gold)
![Feature](https://img.shields.io/badge/Feature-Customisation_Hub-gold)
![Feature](https://img.shields.io/badge/Feature-Sound_Effects-gold)
![Feature](https://img.shields.io/badge/Feature-Wake_Lock-purple)
![Design](https://img.shields.io/badge/Design-Nordic_Minimalist-blue)
![Status](https://img.shields.io/badge/Status-Production_Ready-success)

## What's New in v3.2?

### **Modular Architecture**

- **Component-Based Structure** - Each component in its own file
- **Separation of Concerns** - Logic, styling, and utilities separated
- **Utils System** - Centralized utility functions (EventEmitter, StorageManager, TimeUtils, AudioManager)
- **Easy Maintenance** - Update individual components without affecting others
- **Scalability** - Add new features or components easily

### **Key Improvements Over v3.1**

| Feature           | v3.1            | v3.2                          |
| ----------------- | --------------- | ----------------------------- |
| Architecture      | Monolithic      | Modular Components            |
| Code Organization | Single files    | Separate JS/CSS per component |
| UX Enhancement    | Basic           | Smart panel toggle system     |
| Clock Movement    | Fixed animation | Continuous smooth rotation    |
| Panel Management  | Manual          | State-tracked management      |

---

## **Project Structure (v3.2)**

```
ORIZON-Clock-v3.2/
│
├── index.html                 # Main HTML entry point
│
├── components/                # UI Components (Modular)
│   ├── Clock
|   |   ├── Clock.css
|   |   └── Clock.js
│   │
│   ├── ControlPanel
|   |   ├── ControlPanel.css
|   |   └── ControlPanel.js
│   │
│   ├── DateDisplay
|   |   ├── DateDisplay.css
|   |   └── DateDisplay.js
│   │
│   ├── DigitalDisplay
|   |   ├── DigitalDisplay.css
|   |   └── DigitalDisplay.js
│   │
│   ├── SettingsPanel
|   |   ├── SettingsPanel.css
|   |   └── SettingsPanel.js
│   │
│   ├── ThemePanel
|   |   ├── ThemePanel.css
|   |   └── ThemePanel.js
│   │
│   └── TimezonePanel
|       ├── TimezonePanel.css
|       └── TimezonePanel.js
│
├── utils/                        # Utility Classes (Optimized)
│   ├── EventEmitter.js           # Event management
│   ├── StorageManager.js         # Local storage
│   ├── TimeUtils.js              # Time calculations
│   └── AudioManager.js           # Sound management
│
├── styles/                       # Global Styles
│   ├── base-styles.css           # Base styling
│   ├── responsive.css            # Responsive breakpoints
│   └── theme-variables.css       # Dynamic theme system
|
├── js/
|   └── App.js                    # Main JS file
|
├── docs/                         # Documentation
│   ├── COMPONENTS.md             # Component documentation
│   ├── ARCHITECTURE.md           # Architecture guide
│   ├── KEYBOARD_SHORTCUTS.md     # Keyboard guide
│   └── INSTALLATION.md           # Setup instructions
│
├── README.md                  # This file
└── CHANGELOG.md               # Version history
```

---

## **Quick Start**

### Option 1: Direct Browser

```bash
# Simply open index.html in your browser
open index.html
```

### Option 2: Local Server (Recommended)

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Then visit: http://localhost:8000
```

---

## **Features**

### **Theming System**

- 6+ Pre-built Themes (Dark, Light, Midnight, Sunset, Ocean, Forest)
- Custom Theme Builder
- Real-time Color Preview
- Theme Import/Export
- Persistent Theme Storage

### **Clock Display**

- Analog Clock with Smooth Animations
- Digital Time Display (12/24 hour)
- Current Date Display
- Continuous Second Hand Rotation
- Multiple Timezone Support

### **Control Panel**

- Theme Switcher
- Digital Display Toggle
- Timezone Selector
- Settings Manager
- Keyboard Shortcuts (T, S, Z, D, F, A, Q, ESC)

### **Settings**

- Hourly Chime Control
- Tick Sound Toggle
- Seconds Display Toggle
- Smooth Animations Control
- Reduced Motion Mode
- Power Saver Mode
- Volume Control

### **Timezone Management**

- 20+ Pre-configured Cities
- Quick City Selection
- Custom Timezone Support
- UTC Offset Display

### **UX Enhancements**

- Smart Panel Toggle (Press key twice to close)
- Panel State Tracking
- Outside Click Detection
- Cursor Auto-hide After Inactivity
- Wake Lock Support (Prevents Screen Sleep)
- Reduced Motion Accessibility

---

## **Keyboard Shortcuts**

| Key     | Action                 |
| ------- | ---------------------- |
| **T**   | Toggle Theme Panel     |
| **S**   | Toggle Settings Panel  |
| **Z**   | Toggle Timezone Panel  |
| **D**   | Toggle Digital Display |
| **F**   | Fullscreen Mode        |
| **A**   | Toggle Audio           |
| **Q**   | Quick Theme Cycle      |
| **ESC** | Close All Panels       |

Press the same key again to close the panel!

---

## **Themes**

### Pre-built Themes:

- **Dark** - Deep Nord-inspired dark theme
- **Light** - Clean, bright minimal theme
- **Midnight** - Ultra-dark theme for night use
- **Sunset** - Warm, orange/red tones
- **Ocean** - Cool blues and cyans
- **Forest** - Natural greens

### Custom Theme Features:

- 12 Customizable CSS Variables
- Color Picker Interface
- Opacity Control
- Real-time Preview
- Save/Load Custom Themes
- Export to JSON
- Import from JSON

---

## **Technical Stack**

| Layer         | Technology                      |
| ------------- | ------------------------------- |
| **Structure** | HTML5 (Semantic)                |
| **Styling**   | CSS3 (Variables, Grid, Flexbox) |
| **Logic**     | Vanilla JavaScript (ES6+)       |
| **Storage**   | localStorage API                |
| **Audio**     | Web Audio API                   |
| **State**     | Event-Driven Architecture       |

**No External Dependencies** - Pure vanilla implementation!

---

## **Component System**

### Architecture Pattern: **Event-Driven Components**

Each component follows this pattern:

```javascript
class ComponentName {
  constructor(container, eventEmitter) {}
  init() {}
  cacheElements() {}
  setupEventListeners() {}
  update() {}
  destroy() {}
}
```

### Communication Flow:

```
App.js (Main Controller)
    ↓
EventEmitter (Message Bus)
    ↓
All Components (Independent)
```

---

## **Utilities Overview**

### **EventEmitter.js**

- Event management system
- Pub/Sub pattern
- Component communication

### **StorageManager.js**

- localStorage wrapper
- Persistent data storage
- Automatic JSON serialization

### **TimeUtils.js**

- Time calculations
- Timezone handling
- Hand angle calculations

### **AudioManager.js**

- Sound effects
- Volume control
- Audio state management

---

## **Smart UX Features**

### Panel Toggle Logic:

```
User presses 'T' → Theme Panel Opens
User presses 'T' again → Theme Panel Closes
User clicks other button → Current panel closes, new one opens
User clicks outside → All panels close
```

### Second Hand Animation:

- Smooth continuous rotation
- No jump at 59→0 transition
- Works in Power Saver mode too

### State Management:

- Centralized App state
- Panel open/close tracking
- Automatic state persistence

---

## **Version History**

### v3.2 (Current)

- **Modular Architecture** - Component-based structure
- **Enhanced UX** - Smart panel toggle system
- **Optimized Code** - Separated utilities
- **Bug Fixes** - Continuous second hand movement
- **New Docs** - Comprehensive documentation

### v3.1

- World Clock
- Theme system
- Digital display
- Basic controls

### v3.0

- Initial analog clock

---

## **Contributing**

Guidelines for contributors:

1. **Fork** the repository
2. **Create** a feature branch
3. **Follow** existing code patterns
4. **Add** documentation
5. **Test** thoroughly
6. **Submit** pull request

---

## License

**Personal Project - Free to Use**

- ✅ Personal use
- ✅ Educational purposes
- ✅ Modification allowed
- ❌ Commercial redistribution
- ❌ Remove attribution

---

## **What I learnt **

Learnt Following concepts:

- Component-based architecture
- Event-driven programming
- CSS Variables and custom properties
- localStorage API
- Web Audio API
- Responsive design

---

## **Credits**

**ORIZON Clock v3.2**

- Production-ready modular architecture
- Professional component system
- Comprehensive documentation

Built with ❤️ by Saurabh Chauhan.

---

**Made with vanilla JavaScript • No dependencies • Open Source**
