# INSTALLATION & SETUP GUIDE

Complete step-by-step guide to install and run ORIZON Clock v3.2 on your system.

---

## 📋 Prerequisites

Before installing ORIZON Clock, ensure you have:

- ✅ **Modern Web Browser**

  - Chrome 90+
  - Firefox 88+
  - Safari 14+
  - Edge 90+

- ✅ **Text Editor** (optional, for customization)

  - VSCode
  - Sublime Text
  - Any text editor

- ✅ **Internet Connection** (for first load only)

**No additional software required!** ORIZON Clock works with vanilla HTML/CSS/JavaScript.

---

## 🚀 Quick Start (30 Seconds)

### Method 1: Direct Browser (Fastest)

1. **Download** ORIZON Clock files
2. **Extract** the ZIP file
3. **Double-click** `index.html`
4. **Enjoy!** ⏰

Done! The clock opens in your default browser.

---

## 📥 Installation Methods

### Method A: Direct File Open (Recommended for Local Use)

**Step 1:** Download Files

```bash
# Download all files from GitHub
# Extract to a folder, e.g., ORIZON-Clock-v3.2/
```

**Step 2:** Open in Browser

```bash
# Windows: Double-click index.html
# Mac: Right-click → Open With → Your Browser
# Linux: Double-click index.html or open with browser
```

**Step 3:** That's it! ✅

**Pros:**

- No setup required
- Works offline (after first load)
- All data stored locally
- No server needed

**Cons:**

- Some browsers may have CORS restrictions
- May need to refresh on first load

---

### Method B: Local Server (Recommended for Development)

**Best for:** Testing, development, or if Method A doesn't work

#### Using Python 3 (Easiest)

```bash
# Navigate to ORIZON folder
cd path/to/ORIZON-Clock-v3.2

# Start server (pick one based on Python version)
python -m http.server 8000          # Python 3
python -m SimpleHTTPServer 8000     # Python 2

# Open in browser
# Visit: http://localhost:8000
```

#### Using Node.js

```bash
# Install http-server globally
npm install -g http-server

# Navigate to ORIZON folder
cd path/to/ORIZON-Clock-v3.2

# Start server
http-server

# Visit: http://localhost:8080
```

#### Using PHP

```bash
# Navigate to ORIZON folder
cd path/to/ORIZON-Clock-v3.2

# Start built-in server
php -S localhost:8000

# Visit: http://localhost:8000
```

#### Using Live Server (VSCode Extension)

```bash
# Install "Live Server" extension in VSCode
# Right-click on index.html
# Select "Open with Live Server"
# Browser opens automatically
```

**Pros:**

- Avoids CORS issues
- Better debugging
- Closer to production environment
- Can use browser DevTools better

**Cons:**

- Requires setup
- Need Python/Node.js installed

---

### Method C: GitHub Pages (Web Deployment)

**For:** Hosting online permanently

**Step 1:** Fork Repository

```bash
# Fork ORIZON Clock repository on GitHub
# Navigate to: https://github.com/your-username/ORIZON-Clock
```

**Step 2:** Enable GitHub Pages

```bash
# Go to Settings → Pages
# Select "main" branch
# Save
```

**Step 3:** Access Online

```bash
# Your clock is now available at:
# https://your-username.github.io/ORIZON-Clock
```

**Pros:**

- Accessible from anywhere
- Free hosting
- No maintenance needed
- Automatic updates

---

## 📂 File Structure

Ensure files are organized correctly:

```
ORIZON-Clock-v3.2/
│
├── index.html                 ✅ Main entry point (REQUIRED)
│
├── 📂 components/               ✅ Components
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
├── 📂 utils/                  ✅ Utility files
│   ├── EventEmitter.js
│   ├── StorageManager.js
│   ├── TimeUtils.js
│   └── AudioManager.js
│
├── 📂 styles/                 ✅ Style files
│   ├── base-styles.css
│   ├── theme-variables.css
│   └── responsive.css
|
├── 📂js/
|   └── App.js
|
└── 📂 docs/                   ✅ Documentation (optional)
    ├── README.md
    ├── COMPONENTS.md
    ├── ARCHITECTURE.md
    └── KEYBOARD_SHORTCUTS.md
```

**⚠️ Important:** All files must maintain this exact structure. Paths in `index.html` reference this structure.

---

## 🔍 Verify Installation

After opening the clock:

1. **Check Clock Display** ✅

   - Analog clock should show current time
   - Hands should move smoothly

2. **Test Theme Button** ✅

   - Press 'T' or click Theme button
   - Theme panel should open
   - Click a theme, verify colors change

3. **Test Settings** ✅

   - Press 'S' or click Settings button
   - Toggle options work
   - Changes persist on refresh

4. **Check Console** ✅
   - Press F12 to open DevTools
   - Go to Console tab
   - Should see initialization messages
   - No red errors

If all checks pass, installation is successful! 🎉

---

## 🛠️ Troubleshooting

### Issue 1: Blank Page or "File not found"

**Solution:**

- Check that index.html is in the root folder
- Verify all file paths in index.html are correct
- Use Method B (local server) instead

```bash
# If using Method B:
python -m http.server 8000
# Then visit http://localhost:8000
```

---

### Issue 2: Clock Not Moving

**Solution:**

1. Check browser console (F12) for errors
2. Refresh page (F5)
3. Clear browser cache (Ctrl+Shift+Delete)
4. Try different browser

**Check in Console:**

```javascript
// In DevTools Console, type:
window.app;
// Should show: ClockApp object
```

---

### Issue 3: CORS Error (If running locally)

**Error Message:** "Access to XMLHttpRequest blocked by CORS policy"

**Solution:** Use Method B (local server)

```bash
# Start local server
python -m http.server 8000
```

---

### Issue 4: Keyboard Shortcuts Not Working

**Possible Causes:**

1. Focus on input field
2. Browser extension blocking
3. Keyboard settings

**Solution:**

1. Click on clock area (not input)
2. Disable browser extensions
3. Use menu buttons instead

---

### Issue 5: Data Not Saving

**Problem:** Settings/themes reset on refresh

**Solution:**

- Check if localStorage is enabled
- Open DevTools → Application → Storage
- Verify localStorage shows ORIZON data

**Enable localStorage:**

- Firefox: Privacy settings
- Chrome: Check site permissions
- Safari: Allow cookies from websites

---

## 🔐 Security Considerations

### Safe to Use Locally?

✅ **YES!** ORIZON Clock is completely safe:

- No external API calls
- No tracking or analytics
- All data stored locally
- Open source code

### Storage Location:

- **Desktop:** Can put anywhere
- **USB Drive:** Fully portable
- **Network Drive:** May be slower
- **Cloud:** Sync between devices (Google Drive, Dropbox)

---

## 🌐 Browser Compatibility

| Browser         | Version | Status        | Notes                      |
| --------------- | ------- | ------------- | -------------------------- |
| Chrome          | 90+     | ✅ Full       | Best performance           |
| Firefox         | 88+     | ✅ Full       | Full support               |
| Safari          | 14+     | ✅ Full       | Some CSS features may vary |
| Edge            | 90+     | ✅ Full       | Chromium-based             |
| Mobile Browsers | Modern  | ✅ Responsive | Touch-friendly             |

---

## 💾 Data Management

### Where is Data Stored?

**On Your Device:**

- **Browser Cache:** HTML/CSS/JS files
- **localStorage:** Settings, themes, preferences
- **No server:** Your data never leaves your device

### Backup Data:

```javascript
// In browser console, to export data:
const data = localStorage.getItem("orizon");
console.log(data);
// Copy the output to a file
```

### Restore Data:

```javascript
// Paste previous data:
localStorage.setItem("orizon", "paste_data_here");
```

---

## ⚙️ Configuration

### Customizing Paths (if needed)

Edit `index.html` if your file structure differs:

```html
<!-- Before: -->
<script src="utils/EventEmitter.js"></script>

<!-- After (if in different folder): -->
<script src="path/to/utils/EventEmitter.js"></script>
```

### Customizing Keyboard Shortcuts

Edit in `App.js`, method `setupKeyboardShortcuts()`:

```javascript
const shortcuts = {
  t: () => this.togglePanel("themePanel"), // Change 't' to different key
  s: () => this.togglePanel("settingsPanel"),
  // ... etc
};
```

---

## 🚀 Advanced Setup

### Using with Version Control (Git)

```bash
# Clone repository
git clone https://github.com/username/ORIZON-Clock-v3.2.git
cd ORIZON-Clock-v3.2

# Make changes
# Commit and push
git add .
git commit -m "Custom changes"
git push origin main
```

### Docker Container (Optional)

```dockerfile
FROM nginx:latest
COPY . /usr/share/nginx/html
EXPOSE 80
```

```bash
# Build and run
docker build -t orizon-clock .
docker run -p 80:80 orizon-clock
```

---

## 📱 Mobile Setup

### On Mobile Devices:

1. **Safari (iOS):**

   - Download files via cloud storage
   - Open index.html
   - Add to Home Screen

2. **Chrome (Android):**

   - Download files via cloud
   - Open index.html in Chrome
   - Add to Home Screen

3. **Local Server (Android):**
   - Install Termux or similar
   - Run Python server
   - Access via local network IP

---

## 🆘 Getting Help

If you encounter issues:

1. **Check Troubleshooting** above
2. **View Documentation** in `docs/` folder
3. **Check Browser Console** (F12)
4. **Report on GitHub** with:
   - Browser & version
   - Error message
   - Steps to reproduce
   - Screenshots (if applicable)

---

## ✅ Installation Checklist

Before considering installation complete:

- ✅ Files downloaded and extracted
- ✅ index.html opens without errors
- ✅ Clock displays current time
- ✅ Analog hands move smoothly
- ✅ Menu buttons respond to clicks
- ✅ Keyboard shortcuts work (press T)
- ✅ Settings persist on refresh
- ✅ No console errors (F12)
- ✅ Theme changes apply correctly
- ✅ Digital display toggle works

---

## 📦 Updating

### To v3.2 from v3.1

1. Backup current version
2. Download v3.2 files
3. Replace all files (except localStorage data)
4. Refresh browser

**No migration needed!** All data is backward compatible.

---

## 🎓 First Steps After Installation

1. **Explore Themes**

   - Press 'T' to open Theme panel
   - Try different themes
   - Create custom theme

2. **Check Settings**

   - Press 'S' to open Settings
   - Enable/disable sounds
   - Adjust volume

3. **Try Timezones**

   - Press 'Z' for Timezone panel
   - Select different cities
   - Watch clock update

4. **Read Docs**
   - Check `KEYBOARD_SHORTCUTS.md`
   - Review `COMPONENTS.md` if developing
   - Understand `ARCHITECTURE.md` for customization

---

## 🎉 You're All Set!

ORIZON Clock is now installed and ready to use!

**Enjoy your advanced analog clock!** ⏰

---

**For Questions:** Check documentation in `docs/` folder  
**Report Issues:** Open GitHub issue with details  
**Contribute:** Fork and create pull request

**Version:** 3.2.0
