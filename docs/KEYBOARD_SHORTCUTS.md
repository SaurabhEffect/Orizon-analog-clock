# KEYBOARD SHORTCUTS & CONTROLS

## ⌨️ Keyboard Shortcuts

All keyboard shortcuts are available globally. Press any key below to control ORIZON Clock.

---

## 🎮 Panel Controls

| Key     | Action                 | Description                                         |
| ------- | ---------------------- | --------------------------------------------------- |
| **T**   | Toggle Theme Panel     | Open/close theme selector & builder                 |
| **S**   | Toggle Settings Panel  | Open/close settings (sounds, animations)            |
| **Z**   | Toggle Timezone Panel  | Open/close timezone selector                        |
| **D**   | Toggle Digital Display | Show/hide digital time display                      |
| **F**   | Fullscreen Mode        | Enter/exit fullscreen                               |
| **A**   | Toggle Audio           | Enable/disable all sounds                           |
| **Q**   | Quick Theme Cycle      | Cycle through themes: Dark → Light → Midnight → ... |
| **ESC** | Close All Panels       | Close all open panels                               |

---

## 💡 Smart Toggle Behavior

### Single Press to Open

```
1. Press 'T' → Theme Panel opens
```

### Double Press to Close

```
1. Theme Panel is open
2. Press 'T' again → Theme Panel closes
```

### Switch Panels

```
1. Theme Panel is open
2. Press 'S' → Theme Panel closes, Settings Panel opens
```

### Click Outside to Close

```
1. Any panel is open
2. Click outside (on clock) → All panels close
```

---

## 🖱️ Mouse Controls

### Menu Buttons (Sidebar)

| Button            | Action                      | Hotkey |
| ----------------- | --------------------------- | ------ |
| 🖼️ **Digital**    | Toggle digital time display | D      |
| 🎨 **Theme**      | Open theme panel            | T      |
| ⚙️ **Settings**   | Open settings panel         | S      |
| 🌍 **Timezone**   | Open timezone panel         | Z      |
| 🔊 **Sound**      | Toggle audio on/off         | A      |
| 🖥️ **Fullscreen** | Enter fullscreen mode       | F      |

### Theme Panel Controls

| Action        | Method                                    |
| ------------- | ----------------------------------------- |
| Select Theme  | Click on theme option                     |
| Custom Colors | Click color pickers                       |
| Preset Colors | Click preset buttons (Ocean, Forest, etc) |
| Save Theme    | Click "Save Theme" button                 |
| Export Theme  | Click "Export" to download JSON           |
| Import Theme  | Click "Import" to upload JSON             |
| Reset Theme   | Click "Reset" to defaults                 |

### Timezone Panel Controls

| Action          | Method               |
| --------------- | -------------------- |
| Select Timezone | Choose from dropdown |
| Quick Select    | Click city button    |
| View UTC Offset | Displayed in panel   |

### Settings Panel Controls

| Setting           | Control         |
| ----------------- | --------------- |
| Hourly Chime      | Toggle switch   |
| Tick Sound        | Toggle switch   |
| Show Seconds      | Toggle switch   |
| Smooth Animations | Toggle switch   |
| Reduced Motion    | Toggle switch   |
| Power Saver       | Toggle switch   |
| Volume            | Slider (0-100%) |

---

## 🎯 Workflow Examples

### Example 1: Change Theme

```
1. Press 'T' → Opens Theme Panel
2. Click "Ocean" theme
3. Press 'T' → Theme Panel closes
```

### Example 2: Quick Theme Switch

```
1. Press 'Q' → Changes to next theme
2. Press 'Q' again → Changes to next theme
3. Press 'Q' again → Cycles through themes
```

### Example 3: Custom Theme

```
1. Press 'T' → Opens Theme Panel
2. Click "Custom" theme
3. Click color pickers to customize
4. Click "Save Theme"
5. Press 'T' → Closes with theme saved
```

### Example 4: Change Timezone

```
1. Press 'Z' → Opens Timezone Panel
2. Click "Tokyo" quick button (or select from dropdown)
3. Watch clock update to Tokyo time
4. Press 'ESC' → Close all panels
```

### Example 5: Adjust Sound Settings

```
1. Press 'S' → Opens Settings Panel
2. Toggle "Hourly Chime" on/off
3. Toggle "Tick Sound" on/off
4. Adjust "Volume" slider
5. Press 'ESC' → Close panel
```

---

## 📱 Mobile/Touch Controls

On mobile devices:

| Action     | Control                  |
| ---------- | ------------------------ |
| Tap Button | Touch on screen          |
| Tap Twice  | Quick double-tap         |
| Swipe      | Not used in this version |
| Long Press | Not used in this version |

**Note**: Keyboard shortcuts work on devices with on-screen keyboards.

---

## ♿ Accessibility Features

### Keyboard Navigation

- All controls accessible via keyboard
- Tab key to navigate (if needed)
- Screen reader compatible HTML

### Reduced Motion Mode

- Disables animations if preferred
- Enables from Settings panel
- Respects system preferences

### High Contrast

- Neon theme for high visibility
- Customizable colors
- Clear text contrast

### Visual Indicators

- Panel open/close feedback
- Button hover states
- Status messages in console

---

## 🎓 Keyboard Shortcut Cheat Sheet

### Remember with Patterns:

**Panel Controls**

- **T**heme (T)
- **S**ettings (S)
- **Z**one (Z)
- **D**igital (D)

**Global Actions**

- **F**ullscreen (F)
- **A**udio (A)
- **Q**uick cycle (Q)
- **ESC**ape close (ESC)

---

## 🔄 Default Shortcuts

These are the default keyboard bindings. Currently not customizable.

To customize, you would need to modify `App.js` in the `setupKeyboardShortcuts()` method:

```javascript
const shortcuts = {
  t: () => this.togglePanel("themePanel"),
  s: () => this.togglePanel("settingsPanel"),
  z: () => this.togglePanel("timezonePanel"),
  d: () => this.toggleDigitalDisplay(),
  f: () => this.toggleFullscreen(),
  a: () => this.toggleSound(),
  q: () => this.quickThemeToggle(),
  Escape: () => this.closeAllPanels(),
};
```

---

## 🎮 Advanced Controls

### Command Line Debug (Browser Console)

```javascript
// Access app instance
window.app;

// Change theme programmatically
window.app.changeTheme("ocean");

// Change timezone
window.app.changeTimezone("Asia/Tokyo");

// Toggle panels
window.app.togglePanel("settingsPanel");

// Close all panels
window.app.closeAllPanels();

// View current state
console.log(window.app.state);

// View open panels
console.log(window.app.openPanels);
```

### Enable Debug Logging

```javascript
// In browser console
window.DEBUG = true;

// All console.logs will show detailed info
```

---

## 🚀 Pro Tips

1. **Fast Theme Switching**

   - Use 'Q' key to quickly cycle through themes
   - Much faster than clicking manually

2. **Quick Timezone Check**

   - Press 'Z' once to see current timezone
   - Press 'Z' again to close
   - Takes 2 seconds!

3. **Audio Control**

   - Press 'A' to mute all sounds at once
   - Then adjust volume in Settings if needed

4. **Fullscreen Productivity**

   - Press 'F' for distraction-free fullscreen
   - Cursor auto-hides after 2 seconds

5. **Combine Shortcuts**
   - Press 'T' then 'Q' to cycle custom themes
   - Press 'S' then adjust volume and settings
   - Press 'ESC' to reset everything

---

## ⚠️ Known Limitations

### Keyboard Shortcuts

- Cannot be customized (future feature)
- Case-insensitive (lowercase preferred)
- Don't work if focused on input field
- Browser shortcuts take precedence

### Conflicts

- Some browsers may override shortcuts
- Firefox: Check keyboard preferences
- Chrome: Check extension conflicts
- Safari: Check accessibility settings

---

## 🐛 Troubleshooting

### Shortcuts Not Working

**Check:**

1. Is focus on an input field? Click elsewhere.
2. Is an extension blocking shortcuts?
3. Try browser's default F11 for fullscreen if F fails
4. Check browser console for errors

**Solution:**

1. Click on the clock area (not on buttons)
2. Try again
3. Disable conflicting extensions
4. Use the GUI buttons instead

### Panel Not Closing

**Try:**

1. Press the shortcut again (should close)
2. Click outside the panel
3. Press ESC
4. Refresh page (F5)

---

## 📞 Support

For keyboard shortcut issues:

1. Check this document
2. Open browser console (F12)
3. Check for error messages
4. Report on GitHub

---

## 🔐 Accessibility Notes

- All controls work without mouse
- Keyboard shortcuts are standard keys
- No modifier keys needed (Ctrl, Alt, etc)
- Works on most keyboards worldwide

---

**Version**: 3.2.0
