# 🕐 ORIZON - Analog Clock v2.2

> **Immersive audio-visual experience with intelligent wake-lock technology**

![HTML5](https://img.shields.io/badge/Built%20with-HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

![Version](https://img.shields.io/badge/Version-2.2-brightgreen)
![Feature](https://img.shields.io/badge/Feature-Sound_Effects-gold)
![Feature](https://img.shields.io/badge/Feature-Wake_Lock-purple)
![Design](https://img.shields.io/badge/Design-Nordic_Minimalist-blue)
![Status](https://img.shields.io/badge/Status-Production_Ready-success)
![Size](https://img.shields.io/badge/Size-~50KB-orange)

## 🚀 What's New in v2.2

### 🎵 **Professional Sound Effects**

- **Tick Sound System**: Realistic clock tick sounds powered by Tone.js synthesizer
- **MembraneSynth Engine**: Professional-grade audio synthesis for authentic clock sounds
- **Smart Audio Control**: Toggle sound with 'A' key or dedicated sound button
- **Persistent Settings**: Sound preferences automatically saved across sessions
- **User-Initiated Audio**: Complies with modern browser autoplay policies

### 🔒 **Screen Wake Lock Technology**

- **Auto Sleep Prevention**: Screen stays awake during fullscreen mode using Screen Wake Lock API
- **Battery Optimization**: Wake lock only active during fullscreen usage
- **Cross-Browser Support**: Modern browser compatibility with graceful fallbacks
- **Automatic Management**: Wake lock acquired on fullscreen entry, released on exit
- **Console Monitoring**: Clear logging for wake lock status and debugging

### 🖥️ **Enhanced Fullscreen Experience**

- **Intelligent Cursor Management**: Auto-hide cursor after 3 seconds of inactivity
- **Immersive Audio-Visual**: Combined sound effects with fullscreen presentation mode
- **Professional Display Mode**: Perfect for presentations, kiosks, and focus sessions
- **Smart Screen Management**: Prevents unwanted screen sleeping during important displays

## ✨ Complete Feature Set

### 🎨 **4 Beautiful Nordic Themes**

- **🌙 Dark Theme**: Default Nordic palette with cool gray gradients (`#2e3440 → #3b4252`)
- **☀️ Light Theme**: Clean modern design with bright, professional colors
- **🌃 Midnight Theme**: Deep blue atmosphere with golden accent highlights
- **🌅 Sunset Theme**: Warm peach gradients perfect for comfortable viewing

### 🎛️ **Advanced Controls & Audio**

- **Theme Persistence**: Your preferences automatically saved across sessions
- **Auto-Theme**: Automatic theme switching based on time of day
- **Digital Display**: Toggle precise time display with smooth animations
- **Sound Effects**: Realistic tick sounds with professional audio synthesis
- **Settings Panel**: Beautiful glassmorphism settings with visual theme previews
- **Fullscreen Mode**: Immersive experience with wake lock and cursor management

### ⌨️ **Complete Keyboard Shortcuts**

| Shortcut | Function        | Description                       |
| -------- | --------------- | --------------------------------- |
| **D**    | Digital Toggle  | Show/hide digital time display    |
| **T**    | Theme Cycle     | Cycle through all 4 themes        |
| **S**    | Settings Panel  | Open/close settings configuration |
| **F**    | Fullscreen Mode | Enter/exit immersive fullscreen   |
| **A**    | Audio Toggle    | Enable/disable tick sound effects |
| **M**    | Menu Toggle     | Show/hide sidebar controls        |
| **Esc**  | Exit/Close      | Close panels or exit fullscreen   |

_All shortcuts work with both English and Hindi keyboard layouts_

## 🎵 Audio System Deep Dive

### **Tone.js Integration**

ORIZON v2.2 features a professional audio system built on Tone.js, providing:

- **MembraneSynth**: Specialized synthesizer for percussive clock tick sounds
- **Optimized Parameters**:
  - Attack: 0.001s for sharp tick onset
  - Decay: 0.18s for natural sound fade
  - Pitch Decay: 0.02 for realistic tick character
  - 3 Octaves range for rich harmonic content

### **Smart Audio Behavior**

- **User Activation Required**: Audio starts only after user interaction (browser policy compliance)
- **Per-Second Triggering**: Tick sound plays exactly once per second change
- **Performance Optimized**: Minimal CPU usage with efficient audio scheduling
- **Memory Efficient**: Single synthesizer instance with automatic cleanup

### **Audio Controls**

- **Toggle Methods**: 'A' key, sound button, or settings panel
- **Visual Feedback**: Sound button shows active/inactive state with icons
- **Persistent Preference**: Sound setting saved in localStorage
- **Graceful Fallback**: Works seamlessly even if Tone.js fails to load

## 🔒 Screen Wake Lock Implementation

### **Technical Details**

ORIZON v2.2 implements the modern Screen Wake Lock API for professional display usage:

```javascript
// Wake lock acquisition
navigator.wakeLock.request("screen");
// Automatic release on fullscreen exit
wakeLockSentinel.release();
```

### **Smart Management**

- **Fullscreen Activation**: Wake lock acquired automatically when entering fullscreen
- **Automatic Release**: Wake lock released when exiting fullscreen or closing
- **Event Monitoring**: Console logging for debugging and monitoring
- **Error Handling**: Graceful fallback for unsupported browsers

### **Use Case Benefits**

- **Presentations**: Screen won't sleep during important presentations
- **Public Displays**: Kiosks and information displays stay active
- **Focus Sessions**: Uninterrupted time tracking for productivity
- **Digital Signage**: 24/7 display capability without screen timeout

## 🖥️ Enhanced Fullscreen Experience

### **Professional Display Mode**

- **4K Ready**: Scales perfectly from mobile to large displays
- **Cursor Management**: 3-second auto-hide for clean presentation
- **Audio Enhancement**: Tick sounds add professional ambiance
- **Wake Lock Protection**: Screen stays active throughout usage

### **Immersive Features**

- **Smart Scaling**: Clock adapts to optimal viewing size
- **Clean Interface**: All controls hidden for distraction-free experience
- **Quick Access**: Essential controls available via keyboard shortcuts
- **Smooth Transitions**: Elegant enter/exit animations

## 🎯 Perfect Use Cases

### 📊 **Professional Presentations**

Transform your presentations with an immersive time display that includes realistic tick sounds and never sleeps. Perfect for timing presentations, meetings, and conferences.

### 🏢 **Digital Signage & Kiosks**

Ideal for reception areas, conference rooms, and public spaces. The wake lock ensures continuous operation while audio effects add professional ambiance.

### 💼 **Focus & Productivity Sessions**

Create the perfect work environment with gentle tick sounds and a beautiful time display that won't interrupt your flow by sleeping.

### 🎮 **Streaming & Content Creation**

Professional-grade time reference with optional audio feedback, perfect for content creators who need reliable time display during broadcasts.

## 🛠️ Technical Excellence

### **Modern Web APIs**

- **Screen Wake Lock API**: Modern browser screen management
- **Web Audio API**: Professional audio synthesis via Tone.js
- **Fullscreen API**: Cross-browser fullscreen implementation
- **Local Storage API**: Persistent settings management

### **Performance Optimizations**

- **60fps Animations**: GPU-accelerated smooth transitions
- **Efficient Audio**: Single synthesizer instance with smart scheduling
- **Memory Management**: Automatic cleanup and resource management
- **Battery Conscious**: Wake lock only during active fullscreen usage

### **Browser Compatibility**

| Browser          | Wake Lock API   | Audio System | Fullscreen | Overall      |
| ---------------- | --------------- | ------------ | ---------- | ------------ |
| **Chrome 84+**   | Full Support ✅ | Perfect ✅   | Perfect ✅ | Excellent ✅ |
| **Firefox 126+** | Full Support ✅ | Perfect ✅   | Perfect ✅ | Excellent ✅ |
| **Safari 16.4+** | Full Support ✅ | Perfect ✅   | Perfect ✅ | Excellent ✅ |
| **Edge 84+**     | Full Support ✅ | Perfect ✅   | Perfect ✅ | Excellent ✅ |

_Older browsers gracefully degrade with all core features functional_

## 🚀 Quick Start

### **Requirements**

- ✅ Modern web browser with ES6+ support
- ✅ Screen Wake Lock API support (Chrome 84+, Firefox 126+, Safari 16.4+)
- ✅ Web Audio API support (all modern browsers)
- ✅ No internet required after initial load (Tone.js CDN)

### **Installation**

1. **Download**: Get all 3 files (`index.html`, `style.css`, `script.js`)
2. **Place**: Put all files in the same folder
3. **Open**: Double-click `index.html` in any modern browser
4. **Activate Audio**: Click any control to enable audio context
5. **Go Fullscreen**: Press `F` key for full immersive experience!

### **CDN Dependencies**

ORIZON v2.2 uses these external libraries:

- **Tone.js**: `https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js`
- **Font Awesome**: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css`

## ⚡ Pro Usage Tips

### **Audio Best Practices**

```bash
# Enable audio workflow
Click any button → Audio context activated
A → Toggle sound effects on/off
F → Enter fullscreen with audio
Listen → Enjoy realistic tick sounds
```

### **Fullscreen Presentation Mode**

```bash
# Professional presentation setup
F → Enter fullscreen mode
A → Enable tick sounds (if desired)
Wait 3 seconds → Cursor auto-hides
T → Change theme for room lighting
Esc → Quick exit when finished
```

### **Public Display Setup**

- **Always Enable Wake Lock**: Ensures 24/7 operation
- **Audio Considerations**: Enable for ambiance, disable for quiet environments
- **Theme Selection**: Auto-theme for day/night adaptation
- **Fullscreen Recommended**: Maximum visual impact

## 📱 Advanced Features

### **Intelligent Cursor Management**

```javascript
// Auto-hide implementation
manageCursorVisibility() {
    document.body.classList.add('hide-cursor');
    // 3-second timeout with mouse movement detection
}
```

### **Audio System Architecture**

```javascript
// Professional synthesizer setup
new Tone.MembraneSynth({
  pitchDecay: 0.02,
  octaves: 3,
  envelope: {
    attack: 0.001,
    decay: 0.18,
    sustain: 0,
  },
});
```

### **Wake Lock Management**

```javascript
// Smart wake lock acquisition
await navigator.wakeLock.request("screen");
// Automatic cleanup on fullscreen exit
```

## 🎨 Design Philosophy

### **Audio-Visual Harmony**

ORIZON v2.2 creates a perfect balance between visual beauty and auditory feedback, following these principles:

- **Subtle Enhancement**: Audio enhances without overwhelming
- **Visual Priority**: Sound complements the visual experience
- **User Control**: Complete control over audio preferences
- **Professional Quality**: Studio-grade audio synthesis

### **Modern Web Standards**

- **Progressive Enhancement**: Core functionality works everywhere
- **API-First Design**: Leverages modern web capabilities
- **Graceful Degradation**: Fallbacks for older browsers
- **Performance Conscious**: Optimized for all device classes

## 🔧 Advanced Configuration

### **Audio Customization**

The Tone.js synthesizer can be customized by modifying these parameters:

```javascript
this.synth = new Tone.MembraneSynth({
  pitchDecay: 0.02, // Tick pitch fade speed
  octaves: 3, // Harmonic richness
  envelope: {
    attack: 0.001, // Tick onset speed
    decay: 0.18, // Tick fade duration
    sustain: 0, // No sustain for clean ticks
  },
});
```

### **Wake Lock Behavior**

Configure wake lock settings:

- **Acquisition**: Automatic on fullscreen entry
- **Release**: Automatic on fullscreen exit or page close
- **Monitoring**: Console logging for debugging
- **Fallback**: Graceful degradation for unsupported browsers

## 🌟 What Makes ORIZON v2.2 Special

### **Professional Audio Integration**

First analog clock web app to feature professional-grade audio synthesis with realistic tick sounds that enhance focus and productivity.

### **Intelligent Screen Management**

Revolutionary wake lock implementation ensures your time display never sleeps when you need it most - perfect for presentations and public displays.

### **Seamless User Experience**

Audio and wake lock features integrate seamlessly with the existing Nordic design aesthetic, maintaining the minimalist beauty while adding professional functionality.

### **Modern Web Technology**

Showcases cutting-edge web APIs including Screen Wake Lock and Web Audio, pushing the boundaries of what's possible in a web application.

## 🏆 Version Highlights

### **v2.2 Achievement**

- ✅ **Professional Audio System**: Tone.js integration with MembraneSynth
- ✅ **Screen Wake Lock**: Intelligent sleep prevention technology
- ✅ **Enhanced UX**: Audio-visual harmony with smart management
- ✅ **Modern APIs**: Cutting-edge web technology implementation

### **Feature Evolution**

- **v1.0**: Basic analog clock functionality
- **v2.0**: Nordic themes and digital display
- **v2.1**: Fullscreen mode and cursor management
- **v2.2**: Professional audio and wake lock technology

---

## 📄 File Structure

```
Orizon-analog-clock/
├── index.html          # Main application with Tone.js integration (6.3KB)
├── style.css           # Complete styling with audio controls (17.2KB)
├── script.js           # Full functionality with audio & wake lock (24.4KB)
└── README.md           # This comprehensive documentation
```

**Total Package Size**: ~50KB + CDN dependencies  
**Dependencies**: Tone.js (CDN), Font Awesome (CDN)  
**Browser Requirements**: Modern browser with Wake Lock API support

---

## 🎵 Audio Credits

ORIZON v2.2's audio system is powered by:

- **Tone.js**: Web Audio framework by Yotam Mann
- **MembraneSynth**: Optimized for percussive clock tick sounds
- **Custom Synthesis**: Tailored parameters for authentic clock audio

---

**🎉 Experience the future of time visualization with ORIZON v2.2**

_Where Nordic minimalism meets professional audio-visual excellence_

---

## **Made with ❤️ by Saurabh**

_ORIZON v2.2 - The ultimate immersive analog clock experience_
