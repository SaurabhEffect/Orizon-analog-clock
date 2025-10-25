// ORIZON Clock v3.2 - Optimized Audio Manager

class AudioManager {
  constructor(eventEmitter) {
    this.eventEmitter = eventEmitter;
    this.synth = null;
    this.chimeSynth = null;
    this.isEnabled = false;
    this.audioContextStarted = false;
    this.volume = 0.5;
    this.isChimeEnabled = false;
    this.isTickEnabled = false;
    this.lastSecond = -1;
    this.lastChimeHour = -1;
    this.tickThrottle = null;
    this.isDestroyed = false;
    this.setupAudio();
  }

  setupAudio() {
    if (typeof Tone === "undefined") {
      console.warn("Tone.js not loaded. Audio features disabled.");
      return;
    }

    try {
      this.synth = new Tone.PluckSynth({
        attackNoise: 1,
        dampening: 4000,
        resonance: 0.7,
      }).toDestination();

      this.chimeSynth = new Tone.MetalSynth({
        frequency: 300,
        envelope: { attack: 0.001, decay: 0.8, release: 0.1 },
        harmonicity: 6.1,
        modulationIndex: 20,
        resonance: 3000,
        octaves: 1.5,
      }).toDestination();

      this.updateVolume();

      console.log("✅ Audio synthesizers initialized");
    } catch (error) {
      console.error("❌ Failed to setup audio:", error);
    }
  }

  async startAudioContext() {
    if (typeof Tone === "undefined" || this.audioContextStarted) {
      return;
    }
    try {
      await Tone.start();
      this.audioContextStarted = true;
      console.log("🔊 Audio context started");
      this.eventEmitter.emit("audioContextReady", true);
    } catch (error) {
      console.error("❌ Failed to start audio context:", error);
      this.eventEmitter.emit("audioContextError", error);
    }
  }

  async toggleAudio() {
    if (!this.audioContextStarted) {
      await this.startAudioContext();
    }
    this.isEnabled = !this.isEnabled;
    this.eventEmitter.emit("audioToggled", this.isEnabled);
    if (this.isEnabled && this.audioContextStarted) {
      this.playChime();
    }
    return this.isEnabled;
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.updateVolume();
    this.eventEmitter.emit("volumeChanged", this.volume);
  }

  updateVolume() {
    if (!this.synth || !this.chimeSynth || typeof Tone === "undefined") {
      return;
    }
    try {
      const dbVolume = Tone.gainToDb(this.volume);
      this.synth.volume.value = dbVolume;
      this.chimeSynth.volume.value = dbVolume;
    } catch (error) {
      console.warn("Failed to update volume:", error);
    }
  }

  setChimeEnabled(enabled) {
    this.isChimeEnabled = Boolean(enabled);
    this.eventEmitter.emit("chimeToggled", this.isChimeEnabled);
  }

  setTickEnabled(enabled) {
    this.isTickEnabled = Boolean(enabled);
    this.eventEmitter.emit("tickToggled", this.isTickEnabled);
  }

  playTick() {
    if (
      !this.isEnabled ||
      !this.isTickEnabled ||
      !this.synth ||
      !this.audioContextStarted ||
      this.isDestroyed
    ) {
      return;
    }
    if (this.tickThrottle) {
      return;
    }
    try {
      this.synth.triggerAttack("C5", Tone.now());
      this.tickThrottle = setTimeout(() => {
        this.tickThrottle = null;
      }, 50);
    } catch (error) {
      console.warn("Failed to play tick sound:", error);
    }
  }

  playChime() {
    if (
      !this.isEnabled ||
      !this.isChimeEnabled ||
      !this.chimeSynth ||
      !this.audioContextStarted ||
      this.isDestroyed
    ) {
      return;
    }
    try {
      this.chimeSynth.triggerAttackRelease("G5", "4n", Tone.now());
      console.log("🔔 Chime played");
    } catch (error) {
      console.warn("Failed to play chime sound:", error);
    }
  }

  handleTimeUpdate(time) {
    if (!time || this.isDestroyed) {
      return;
    }
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    if (minutes === 0 && seconds === 0 && hours !== this.lastChimeHour) {
      this.playChime();
      this.lastChimeHour = hours;
    } else if (minutes !== 0) {
      this.lastChimeHour = -1;
    }
    if (seconds !== this.lastSecond) {
      this.playTick();
      this.lastSecond = seconds;
    }
  }

  getState() {
    return {
      isEnabled: this.isEnabled,
      volume: this.volume,
      isChimeEnabled: this.isChimeEnabled,
      isTickEnabled: this.isTickEnabled,
      audioContextStarted: this.audioContextStarted,
      isDestroyed: this.isDestroyed,
    };
  }

  loadSettings(settings = {}) {
    this.isEnabled = Boolean(settings.isEnabled);
    this.volume =
      typeof settings.volume === "number"
        ? Math.max(0, Math.min(1, settings.volume))
        : 0.5;
    this.isChimeEnabled = Boolean(settings.isChimeEnabled);
    this.isTickEnabled = Boolean(settings.isTickEnabled);

    this.updateVolume();

    console.log("✅ Audio settings loaded:", this.getState());
  }

  mute() {
    if (this.synth && this.chimeSynth && typeof Tone !== "undefined") {
      this.synth.volume.value = -Infinity;
      this.chimeSynth.volume.value = -Infinity;
    }
  }

  unmute() {
    this.updateVolume();
  }

  destroy() {
    console.log("🗑️ Destroying AudioManager...");
    this.isDestroyed = true;
    if (this.tickThrottle) {
      clearTimeout(this.tickThrottle);
      this.tickThrottle = null;
    }
    if (this.synth) {
      try {
        this.synth.dispose();
        this.synth = null;
      } catch (error) {
        console.warn("Error disposing synth:", error);
      }
    }
    if (this.chimeSynth) {
      try {
        this.chimeSynth.dispose();
        this.chimeSynth = null;
      } catch (error) {
        console.warn("Error disposing chimeSynth:", error);
      }
    }
    this.isEnabled = false;
    this.audioContextStarted = false;
    console.log("✅ AudioManager destroyed");
  }
}
