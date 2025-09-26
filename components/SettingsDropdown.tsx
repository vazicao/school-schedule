"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./SettingsDropdown.module.css";
import SvgIcon from "./SvgIcon";

interface SettingsDropdownProps {
  showDaycare: boolean;
  onToggleDaycare: (show: boolean) => void;
}

const SettingsDropdown: React.FC<SettingsDropdownProps> = ({
  showDaycare,
  onToggleDaycare,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.settingsButton} ${isOpen ? styles.active : ""}`}
        aria-label="Подешавања"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <SvgIcon iconId="gear-six" size={24} />
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu} role="menu">
          <div className={styles.dropdownHeader}>Подешавања</div>

          <div className={styles.menuItem} role="menuitem">
            <label className={styles.menuLabel}>
              <input
                type="checkbox"
                checked={showDaycare}
                onChange={(e) => onToggleDaycare(e.target.checked)}
                className={styles.menuCheckbox}
              />
              <span className={styles.checkboxText}>
                Прикажи продужени боравак
              </span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsDropdown;
