import { pdf } from "@react-pdf/renderer";
import React from "react";
import { type ShiftType } from "./shiftDetection";

export const generateWeeklySchedulePDF = async (
  shift: ShiftType,
  week: number,
  year: number,
  weekDates: Date[],
) => {
  try {
    // Dynamic import to avoid SSR issues
    const { default: WeeklySchedulePDF } = await import(
      "../components/WeeklySchedulePDF"
    );

    const blob = await pdf(
      <WeeklySchedulePDF
        shift={shift}
        week={week}
        year={year}
        weekDates={weekDates}
      />,
    ).toBlob();

    return blob;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF");
  }
};

export const downloadWeeklySchedulePDF = async (
  shift: ShiftType,
  week: number,
  year: number,
  weekDates: Date[],
) => {
  try {
    const blob = await generateWeeklySchedulePDF(shift, week, year, weekDates);

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    const shiftName = shift === "morning" ? "jutarnja" : "popodnevna";
    link.download = `raspored-casova-${shiftName}-smena-nedelja-${week}-${year}.pdf`;

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading PDF:", error);
    throw new Error("Failed to download PDF");
  }
};
