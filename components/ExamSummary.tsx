import React, { useState } from "react";
import styles from "./ExamSummary.module.css";
import SvgIcon from "./SvgIcon";
import { type Exam } from "../lib/examData";

interface ExamSummaryProps {
  exams: Exam[];
}

const getExamText = (count: number): string => {
  if (count === 1) return "1 Pismeni Zadatak ove Nedelje";
  if (count < 5) return `${count} Pismena Zadatka ove Nedelje`;
  return `${count} Pismenih Zadataka ove Nedelje`;
};

const ExamSummary: React.FC<ExamSummaryProps> = ({ exams }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.examSummary}>
      {/* Main row - clickable */}
      <div
        className={styles.summaryRow}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <SvgIcon iconId="brain" size={24} />
        <h3>{getExamText(exams.length)}</h3>
        <SvgIcon
          iconId="caret-down"
          size={16}
          className={isExpanded ? styles.chevronUp : styles.chevronDown}
        />
      </div>

      {/* Expanded details */}
      {isExpanded && (
        <div className={styles.examDetails}>
          {exams.map((exam, index) => (
            <p key={index} className="caption-large">
              {exam.subject} - {exam.topic || "Kontrolni zadatak"}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExamSummary;
