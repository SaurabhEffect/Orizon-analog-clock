# COMPONENTS DOCUMENTATION

## Overview

ORIZON v3.2 uses a **modular component-based architecture**. Each component is self-contained with its own JavaScript logic and CSS styling.

---

## 📦 Component List

### 1. **Clock Component** (`Clock.js` + `Clock.css`)

**Purpose**: Renders the analog clock face with hour, minute, and second hands.

**Key Features**:

- SVG-based clock rendering
- Smooth hand animations
- Continuous second hand rotation
- Timezone support
- Fullscreen compatibility

**Methods**:

```javascript
constructor(container, eventEmitter); // Initialize component
init(); // Cache DOM elements
update(); // Update hand positions
updateHand(hand, angle); // Apply rotation
updateTheme(); // Handle theme changes
destroy(); // Cleanup
```

**Events Listened**:

- `timeUpdate` - Update clock hands
- `themeChanged` - Refresh appearance
- `powerSaverChanged` - Adjust animation
- `fullscreenChanged` - Adapt layout

**CSS Variables Used**:

- `--hour-hand-color`
- `--minute-hand-color`
- `--second-hand-color`
- `--center-dot-color`

---

### 2. **Digital Display Component** (`DigitalDisplay.js` + `DigitalDisplay.css`)

**Purpose**: Shows digital time (HH:MM:SS or HH:MM) alongside the analog clock.

**Key Features**:

- 12/24 hour format toggle
- Real-time updates
- Smooth transitions
- Theme-aware styling

**Methods**:

```javascript
constructor(container, eventEmitter);
init();
update(time); // Update display
toggleFormat(); // Switch 12/24 hour
destroy();
```

**Events Emitted**:

- `digitalToggled` - When display is shown/hidden

---

### 3. **Date Display Component** (`DateDisplay.js` + `DateDisplay.css`)

**Purpose**: Shows current date with formatted text.

**Features**:

- Automatic date updates
- Locale-aware formatting
- Responsive sizing

**Methods**:

```javascript
constructor(container, eventEmitter);
init();
update(date); // Update date display
destroy();
```

---

### 4. **Control Panel Component** (`ControlPanel.js` + `ControlPanel.css`)

**Purpose**: Main sidebar with all control buttons.

**Features**:

- Digital toggle button
- Theme button
- Settings button
- Timezone button
- Fullscreen button
- Sidebar collapse/expand

**Methods**:

```javascript
constructor(container, eventEmitter);
init();
setupEventListeners();
toggleSidebar(); // Show/hide sidebar
attachButtonHandlers();
destroy();
```

**Button Actions**:
| Button | Action | Shortcut |
|--------|--------|----------|
| Digital | Toggle digital display | D |
| Theme | Open theme panel | T |
| Settings | Open settings panel | S |
| Timezone | Open timezone panel | Z |
| Fullscreen | Enter fullscreen | F |

---

### 5. **Theme Panel Component** (`ThemePanel.js` + `ThemePanel.css`)

**Purpose**: Theme selection and custom theme builder.

**Features**:

- 6 pre-built themes
- Custom theme builder
- Color picker interface
- Theme import/export
- Real-time preview

**Methods**:

```javascript
constructor(container, eventEmitter);
init();
toggleVisibility(); // Show/hide panel
applyColorPreset(presetName); // Apply preset
exportTheme(); // Export as JSON
importTheme(); // Import from JSON
saveCustomTheme(); // Save to localStorage
resetCustomTheme(); // Reset to default
destroy();
```

**Available Presets**:

- Ocean (blues)
- Forest (greens)
- Volcano (reds/oranges)
- Lavender (purples)
- Gold (warm tones)
- Neon (high contrast)

---

### 6. **Settings Panel Component** (`SettingsPanel.js` + `SettingsPanel.css`)

**Purpose**: Application settings and preferences.

**Features**:

- Hourly chime toggle
- Tick sound toggle
- Seconds display toggle
- Smooth animations
- Reduced motion mode
- Power saver mode
- Volume control

**Methods**:

```javascript
constructor(container, eventEmitter);
init();
toggleVisibility();
attachEventHandlers();
loadSettings();
saveSettings();
destroy();
```

**Settings Available**:

- 🔔 Hourly Chime (on/off)
- 🔊 Tick Sound (on/off)
- ⏱️ Show Seconds (on/off)
- ✨ Smooth Transitions (on/off)
- 🚶 Reduced Motion (on/off)
- ⚡ Power Saver (on/off)
- 🔊 Volume (0-100%)

---

### 7. **Timezone Panel Component** (`TimezonePanel.js` + `TimezonePanel.css`)

**Purpose**: Timezone selection and world clock.

**Features**:

- 20+ major cities
- Custom timezone support
- UTC offset display
- Quick city selection buttons
- Dropdown selector

**Methods**:

```javascript
constructor(container, eventEmitter);
init();
toggleVisibility();
changeTimezone(timezone); // Switch timezone
updateTimezoneInfo(); // Update display
attachEventHandlers();
destroy();
```

**Quick Cities**:

- New York, London, Tokyo
- Sydney, Dubai, Singapore
- São Paulo, Mexico City
- And more...

---

## 🔄 Component Lifecycle

All components follow this lifecycle:

```
1. constructor()     → Initialize properties
    ↓
2. init()           → Cache elements, setup
    ↓
3. setupEventListeners()  → Bind to events
    ↓
4. update()         → Render initial state
    ↓
5. [Active State]   → Respond to events
    ↓
6. destroy()        → Cleanup on exit
```

---

## 📡 Event Communication

Components communicate through **EventEmitter**:

```javascript
// Emitting events
this.eventEmitter.emit("eventName", data);

// Listening to events
this.eventEmitter.on("eventName", (data) => {
  // Handle event
});
```

**Common Events**:

- `timeUpdate` - Time changed
- `themeChanged` - Theme switched
- `settingChanged` - Setting updated
- `volumeChanged` - Volume adjusted
- `digitalToggled` - Digital display toggled
- `themePanelToggle` - Theme panel open/close
- `closeAllPanels` - Close all panels
- `fullscreenChanged` - Fullscreen mode toggled

---

## 🎯 Integration Points

### How Components Work Together:

```
App.js (Main Controller)
  ├─ EventEmitter (Message Bus)
  │   └─ Connects all components
  │
  ├─ Clock
  │   └─ Receives: timeUpdate, themeChanged
  │   └─ Emits: (none)
  │
  ├─ ControlPanel
  │   └─ Emits: digitalToggled, themePanelToggle, etc.
  │
  ├─ ThemePanel
  │   └─ Receives: themePanelToggle, closeAllPanels
  │   └─ Emits: themeChanged
  │
  ├─ SettingsPanel
  │   └─ Receives: settingsPanelToggle
  │   └─ Emits: settingChanged
  │
  ├─ TimezonePanel
  │   └─ Receives: timezonePanelToggle
  │   └─ Emits: timezoneChanged
  │
  └─ [Other Components...]
```

---

## 🛠️ Creating a New Component

Template for new components:

```javascript
class MyComponent {
  constructor(container, eventEmitter) {
    this.container = container;
    this.eventEmitter = eventEmitter;
    this.isVisible = false;

    this.init();
    this.setupEventListeners();
  }

  init() {
    this.cacheElements();
    this.update();
  }

  cacheElements() {
    // Cache DOM references
  }

  setupEventListeners() {
    this.eventEmitter.on("eventName", () => {
      // Handle event
    });
  }

  update() {
    // Update component display
  }

  destroy() {
    // Cleanup
  }
}
```

---

## 📊 Component Dependencies

```
Clock              → TimeUtils
DigitalDisplay     → TimeUtils
DateDisplay        → (none)
ControlPanel       → (none)
ThemePanel         → StorageManager
SettingsPanel      → StorageManager
TimezonePanel      → TimeUtils
```

All communicate through **EventEmitter**.

---

## ✅ Best Practices

When developing components:

1. **Cache DOM elements** in `init()`
2. **Use event emitter** for communication
3. **Keep state local** within component
4. **Implement destroy()** for cleanup
5. **Use CSS variables** for theming
6. **Add console logs** for debugging
7. **Test independently** from other components
8. **Document methods** with JSDoc comments

---

## 🚀 Performance Tips

- Use requestAnimationFrame for animations
- Cache frequently accessed elements
- Debounce event listeners
- Use event delegation for dynamic content
- Clean up intervals/timers in destroy()
- Minimize DOM queries

---

**Version**: 3.2.0
