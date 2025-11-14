import { useState, useEffect } from 'react';
import '../styles/SettingsMenu.css';
import { soundManager } from '../utils/sounds';

function SettingsMenu({ isOpen, onClose, isAdmin, setIsAdmin }) {
  const [volume, setVolume] = useState(soundManager.volume * 100);
  const [soundEnabled, setSoundEnabled] = useState(soundManager.enabled);
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Sync state when menu opens
  useEffect(() => {
    if (isOpen) {
      setVolume(soundManager.volume * 100);
      setSoundEnabled(soundManager.enabled);
    }
  }, [isOpen]);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    soundManager.setVolume(newVolume / 100);

    // Play a test sound
    if (soundEnabled) {
      soundManager.playClick();
    }
  };

  const handleSoundToggle = () => {
    const newState = soundManager.toggle();
    setSoundEnabled(newState);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    // In a real app, this would trigger i18n language change
  };

  const handleResetProgress = () => {
    setShowResetConfirm(true);
  };

  const confirmResetProgress = () => {
    // Remove all completed stage data and personal bests
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('completed-') || key.startsWith('pb-')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));

    setShowResetConfirm(false);

    // Play click sound
    soundManager.playClick();

    // Close settings and reload to show reset progress
    setTimeout(() => {
      onClose();
      window.location.reload();
    }, 300);
  };

  const cancelResetProgress = () => {
    setShowResetConfirm(false);
  };

  if (!isOpen) return null;

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-menu" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2 className="settings-title">Settings</h2>
          <button className="settings-close" onClick={onClose}>×</button>
        </div>

        <div className="settings-content">
          {/* Mode Section */}
          <div className="settings-section">
            <h3 className="section-title">Mode</h3>

            <div className="setting-item">
              <label className="setting-label">
                <span>{isAdmin ? '🔐 Admin Mode' : '👤 Player Mode'}</span>
                <button
                  className={`toggle-switch ${isAdmin ? 'active' : ''}`}
                  onClick={() => setIsAdmin(!isAdmin)}
                  aria-label="Toggle admin mode"
                >
                  <span className="toggle-slider"></span>
                </button>
              </label>
            </div>
          </div>

          {/* Sound Section */}
          <div className="settings-section">
            <h3 className="section-title">Sound</h3>

            <div className="setting-item">
              <label className="setting-label">
                <span>Enable Sound</span>
                <button
                  className={`toggle-switch ${soundEnabled ? 'active' : ''}`}
                  onClick={handleSoundToggle}
                  aria-label="Toggle sound"
                >
                  <span className="toggle-slider"></span>
                </button>
              </label>
            </div>

            <div className="setting-item">
              <label className="setting-label">
                <span>Volume</span>
                <span className="volume-value">{Math.round(volume)}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                disabled={!soundEnabled}
                className="volume-slider"
                style={{ '--value': `${volume}%` }}
              />
            </div>
          </div>

          {/* Language Section */}
          <div className="settings-section">
            <h3 className="section-title">Language</h3>

            <div className="language-options">
              <button
                className={`language-btn ${language === 'en' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('en')}
              >
                <span className="language-flag">🇺🇸</span>
                <span className="language-name">English</span>
              </button>

              <button
                className={`language-btn ${language === 'zh-tw' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('zh-tw')}
              >
                <span className="language-flag">🇹🇼</span>
                <span className="language-name">繁體中文</span>
              </button>
            </div>
          </div>

          {/* Admin Section - Reset Progress */}
          {isAdmin && (
            <div className="settings-section danger-section">
              <h3 className="section-title">Admin Actions</h3>

              <div className="setting-item">
                <button className="reset-progress-btn" onClick={handleResetProgress}>
                  🗑️ Reset All Progress
                </button>
                <p className="reset-warning">This will clear all completed stages and personal bests</p>
              </div>
            </div>
          )}
        </div>

        {/* Reset Confirmation Modal */}
        {showResetConfirm && (
          <div className="confirm-overlay">
            <div className="confirm-modal">
              <div className="confirm-icon">⚠️</div>
              <h3 className="confirm-title">Reset All Progress?</h3>
              <p className="confirm-text">
                This will permanently delete all completed stages and personal best times.
                This action cannot be undone.
              </p>
              <div className="confirm-actions">
                <button className="confirm-cancel" onClick={cancelResetProgress}>
                  Cancel
                </button>
                <button className="confirm-delete" onClick={confirmResetProgress}>
                  Reset Progress
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingsMenu;
