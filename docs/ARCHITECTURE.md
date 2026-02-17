# ARCHITECTURE GUIDE - v3.2

## System Overview

ORIZON v3.2 follows a **modular, event-driven architecture** with clear separation of concerns.

---

## Architecture Layers

```
┌─────────────────────────────────────────┐
│         UI Layer (Components)           │
│  Clock | ControlPanel | ThemePanel etc  │
├─────────────────────────────────────────┤
│    Event Communication Layer            │
│          EventEmitter                   │
├─────────────────────────────────────────┤
│      State Management Layer             │
│  App.js (Main Controller)               │
├─────────────────────────────────────────┤
│       Utility Layer                     │
│ TimeUtils | StorageManager | Audio etc  │
├─────────────────────────────────────────┤
│       Platform APIs                     │
│ DOM | localStorage | Web Audio etc      │
└─────────────────────────────────────────┘
```

---

## Data Flow

### Unidirectional Flow:

```
User Action
    ↓
Component emits event
    ↓
EventEmitter broadcasts
    ↓
App.js listens & updates state
    ↓
App.js emits new event
    ↓
Components receive & update
```

**Example**: User clicks Theme button

```
1. User clicks "Theme" button
        ↓
2. ControlPanel emits 'toggleThemePanel'
        ↓
3. EventEmitter broadcasts to App
        ↓
4. App.js receives event
        ↓
5. App updates openPanels state
        ↓
6. App emits 'themePanelToggle'
        ↓
7. ThemePanel receives and shows
```

---

## Component Pattern

Each component follows standard pattern:

```javascript
class ComponentName {
  // ====== INITIALIZATION ======
  constructor(container, eventEmitter) {
    this.container = container;
    this.eventEmitter = eventEmitter;
    this.isVisible = false;

    this.init();
    this.setupEventListeners();
  }

  // ====== SETUP ======
  init() {
    this.cacheElements();
    this.attachEventHandlers();
    this.update();
  }

  cacheElements() {
    // Cache DOM references for performance
  }

  // ====== EVENT HANDLERS ======
  setupEventListeners() {
    // Listen to EventEmitter events
    this.eventEmitter.on("eventName", () => {});
  }

  attachEventHandlers() {
    // Attach DOM event listeners
  }

  // ====== STATE MANAGEMENT ======
  update() {
    // Update component based on state
  }

  // ====== CLEANUP ======
  destroy() {
    // Remove references and cleanup
  }
}
```

---

## EventEmitter Pattern

### Central Message Bus:

```javascript
class EventEmitter {
  on(event, callback)      // Subscribe to event
  off(event, callback)     // Unsubscribe
  emit(event, data)        // Publish event
  removeAllListeners()     // Clear all
}
```

### Usage:

```javascript
// Component 1: Emit
this.eventEmitter.emit("themeChanged", "dark");

// Component 2: Listen
this.eventEmitter.on("themeChanged", (theme) => {
  this.applyTheme(theme);
});
```

**Benefits**:

- Loose coupling between components
- Easy to add new listeners
- No direct dependencies
- Testable

---

## State Management

### Central State in App.js:

```javascript
this.state = {
  currentTheme: "dark",
  timezone: "local",
  digitalVisible: false,
  isFullscreen: false,
  powerSaver: false,
  showSeconds: true,
  reducedMotion: false,
};

this.openPanels = {
  themePanel: false,
  settingsPanel: false,
  timezonePanel: false,
};
```

### State Updates Flow:

```
1. Component emits event
2. App.js receives in event listener
3. App.js updates this.state
4. App.js calls savePreferences()
5. App.js emits update event
6. Components receive & re-render
```

---

## Separation of Concerns

| Layer             | Responsibility                    |
| ----------------- | --------------------------------- |
| **UI Components** | Render display, handle user input |
| **EventEmitter**  | Route messages between components |
| **App.js**        | Manage global state, orchestrate  |
| **Utilities**     | Business logic, API calls         |
| **CSS/HTML**      | Presentation layer                |

---

## Utility Classes

### TimeUtils.js

```javascript
static getCurrentTime(timezone)
static calculateHandAngles(time)
static getTimezoneDisplayName(timezone)
static getTimezoneOffsetString(timezone)
```

### StorageManager.js

```javascript
save(key, value); // Save to localStorage
load(key, defaultValue); // Load from localStorage
remove(key); // Remove from localStorage
clear(); // Clear all
```

### AudioManager.js

```javascript
play(soundType); // Play sound
stop(); // Stop sound
setVolume(volume); // Set volume 0-100
toggleAudio(); // Toggle on/off
```

### EventEmitter.js

```javascript
on(event, callback); // Subscribe
emit(event, data); // Publish
off(event, callback); // Unsubscribe
```

---

## Smart Panel Management

### State Tracking:

```javascript
// Track which panels are open
this.openPanels = {
  themePanel: false,
  settingsPanel: false,
  timezonePanel: false
};

// Toggle logic
togglePanel(panelName) {
  const isCurrentlyOpen = this.openPanels[panelName];

  if (isCurrentlyOpen) {
    // Close it
    this.openPanels[panelName] = false;
  } else {
    // Close all others
    Object.keys(this.openPanels).forEach(key => {
      this.openPanels[key] = false;
    });
    // Open this one
    this.openPanels[panelName] = true;
  }
}
```

---

## Theming System

### CSS Variables:

```css
:root {
  --bg-primary: linear-gradient(...);
  --text-primary: #eceff4;
  --accent-color: #88c0d0;
  /* ... 30+ more variables ... */
}
```

### Theme Application:

```javascript
applyTheme(themeName) {
  // Remove custom theme vars
  if (themeName !== 'custom') {
    customVars.forEach(v => {
      document.documentElement.style.removeProperty(v);
    });
  }
  // Set theme
  document.documentElement.setAttribute('data-theme', themeName);
}
```

---

## Component Lifecycle

### Initialization:

```
App constructor
  ├─ Create EventEmitter
  ├─ Create StorageManager
  ├─ Create AudioManager
  └─ Create state object

App init()
  ├─ Load preferences
  ├─ Initialize components
  ├─ Setup event listeners
  ├─ Start time updates
  └─ Apply saved theme
```

### Runtime:

```
Time updates every 16ms (60fps)
  ├─ EventEmitter broadcasts 'timeUpdate'
  ├─ Clock receives and updates hands
  ├─ DigitalDisplay updates time
  └─ DateDisplay updates daily
```

### Cleanup:

```
Window unload
  ├─ App.destroy()
  ├─ All components destroy()
  ├─ Save preferences
  └─ Cleanup timers
```

---

## Event Communication Map

```
ControlPanel
  └─ emits: digitalToggled
  └─ emits: themePanelToggle
  └─ emits: settingsPanelToggle
  └─ emits: timezonePanelToggle
  └─ emits: fullscreenToggle
  └─ emits: soundToggle

App.js
  ├─ emits: timeUpdate (60fps)
  ├─ emits: dateUpdate (1 per minute)
  ├─ emits: themeChanged
  ├─ emits: timezoneChanged
  ├─ emits: settingChanged
  ├─ emits: closeAllPanels
  └─ emits: fullscreenChanged

Components
  └─ listen to events
  └─ update their display
```

---

## Performance Considerations

### Optimization Techniques:

1. **Element Caching**

   ```javascript
   // Cache in init()
   this.hand = document.getElementById("secondHand");
   // Reuse in update()
   this.hand.style.transform = `rotate(${angle}deg)`;
   ```

2. **requestAnimationFrame**

   ```javascript
   this.animationFrameId = requestAnimationFrame(update);
   ```

3. **Event Debouncing**

   ```javascript
   debouncedUpdate = debounce(this.update, 100);
   ```

4. **Lazy Loading**
   - Components initialize only when needed

5. **Efficient CSS**
   - CSS variables instead of JS calculations
   - GPU-accelerated transforms

---

## Security Considerations

### Input Validation:

```javascript
// Validate timezone
if (!validTimezones.includes(timezone)) {
  timezone = "local";
}
```

### XSS Prevention:

```javascript
// Never use innerHTML
element.innerHTML = userInput; // WRONG

// Use textContent or setAttribute
element.textContent = userInput; // CORRECT
```

### localStorage Safety:

```javascript
// Validate data before using
const data = JSON.parse(localStorage.getItem("key"));
if (data && typeof data === "object") {
  // Use data
}
```

---

## Testing Strategy

### Unit Testing:

- Test utilities independently
- Test component methods
- Mock EventEmitter

### Integration Testing:

- Test component communication
- Test state management
- Test event flow

### E2E Testing:

- User interaction flows
- Cross-browser compatibility

---

## Design Patterns Used

| Pattern                  | Usage                                              |
| ------------------------ | -------------------------------------------------- |
| **MVC**                  | Model (state), View (components), Controller (App) |
| **Observer**             | EventEmitter for event broadcasting                |
| **Singleton**            | App, EventEmitter, StorageManager                  |
| **Facade**               | Utils classes hide complexity                      |
| **Dependency Injection** | EventEmitter passed to components                  |
| **Factory**              | Component instantiation in App                     |

---

## Scalability

### Adding New Features:

1. **New Component**
   - Create ComponentName.js
   - Create ComponentName.css
   - Follow component pattern
   - Integrate in App.js

2. **New Event**
   - App emits event
   - Components listen
   - State updates

3. **New Setting**
   - Add to this.state
   - Create UI in SettingsPanel
   - Save to localStorage

---

## Performance Metrics

- **Initial Load**: <1 second
- **Animation**: 60 FPS
- **Memory**: ~2-3 MB
- **Bundle Size**: ~50 KB (uncompressed)

---

**Version**: 3.2.0  
**Architect**: Saurabh Chauhan
