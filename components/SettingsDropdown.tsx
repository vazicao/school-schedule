'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './SettingsDropdown.module.css';

interface SettingsDropdownProps {
  showDaycare: boolean;
  onToggleDaycare: (show: boolean) => void;
  onDownloadPDF: () => void;
  isGeneratingPDF: boolean;
}

const SettingsDropdown: React.FC<SettingsDropdownProps> = ({
  showDaycare,
  onToggleDaycare,
  onDownloadPDF,
  isGeneratingPDF,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.settingsButton} ${isOpen ? styles.active : ''}`}
        aria-label="Podešavanja"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        ⚙️
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu} role="menu">
          <div className={styles.dropdownHeader}>
            Podešavanja
          </div>

          <button
            className={styles.menuButton}
            onClick={() => {
              onDownloadPDF();
              setIsOpen(false);
            }}
            disabled={isGeneratingPDF}
            role="menuitem"
          >
            <span className={styles.buttonIcon}>📄</span>
            <span className={styles.buttonText}>
              {isGeneratingPDF ? 'Generiše PDF...' : 'Preuzmi PDF'}
            </span>
          </button>

          <div className={styles.menuDivider} />

          <div className={styles.menuItem} role="menuitem">
            <label className={styles.menuLabel}>
              <input
                type="checkbox"
                checked={showDaycare}
                onChange={(e) => onToggleDaycare(e.target.checked)}
                className={styles.menuCheckbox}
              />
              <span className={styles.checkboxText}>Prikaži produženi boravak</span>
            </label>
          </div>

          <div className={styles.menuDivider} />

          <div className={styles.menuInfo}>
            Dodatne opcije će biti dodane uskoro
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsDropdown;