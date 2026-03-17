"use client";

import { useState, useMemo } from "react";

interface CalendarProps {
  selectedDates: string[];
  onToggleDate: (date: string) => void;
}

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

function formatDate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function formatLabel(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const weekday = WEEKDAYS[d.getDay()];
  return `${month}/${day}（${weekday}）`;
}

export { formatLabel };

export default function Calendar({ selectedDates, onToggleDate }: CalendarProps) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const todayStr = formatDate(today.getFullYear(), today.getMonth(), today.getDate());

  const { daysInMonth, startDayOfWeek } = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    return {
      daysInMonth: lastDay.getDate(),
      startDayOfWeek: firstDay.getDay(),
    };
  }, [currentYear, currentMonth]);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const monthLabel = `${currentYear}年${currentMonth + 1}月`;

  return (
    <div className="select-none">
      {/* ヘッダー：月切り替え */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={prevMonth}
          className="p-3 rounded-xl hover:bg-muted transition-colors cursor-pointer text-secondary hover:text-foreground text-xl"
        >
          ←
        </button>
        <span className="text-xl font-bold text-foreground">{monthLabel}</span>
        <button
          type="button"
          onClick={nextMonth}
          className="p-3 rounded-xl hover:bg-muted transition-colors cursor-pointer text-secondary hover:text-foreground text-xl"
        >
          →
        </button>
      </div>

      {/* 曜日ヘッダー */}
      <div className="grid grid-cols-7 mb-2">
        {WEEKDAYS.map((day, i) => (
          <div
            key={day}
            className={`text-center text-base font-semibold py-1 ${
              i === 0 ? "text-danger" : i === 6 ? "text-primary" : "text-secondary"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 日付グリッド */}
      <div className="grid grid-cols-7 gap-1.5">
        {Array.from({ length: startDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = formatDate(currentYear, currentMonth, day);
          const isSelected = selectedDates.includes(dateStr);
          const isPast = dateStr < todayStr;
          const isToday = dateStr === todayStr;
          const dayOfWeek = new Date(currentYear, currentMonth, day).getDay();

          return (
            <button
              key={day}
              type="button"
              disabled={isPast}
              onClick={() => onToggleDate(dateStr)}
              className={`
                aspect-square flex items-center justify-center rounded-xl text-lg font-semibold
                transition-all duration-150 cursor-pointer
                ${isPast
                  ? "text-secondary/30 cursor-not-allowed"
                  : isSelected
                    ? "bg-primary text-white shadow-md scale-110"
                    : isToday
                      ? "bg-primary/10 text-primary hover:bg-primary/20"
                      : dayOfWeek === 0
                        ? "text-danger hover:bg-danger/10"
                        : dayOfWeek === 6
                          ? "text-primary hover:bg-primary/10"
                          : "text-foreground hover:bg-muted"
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      {selectedDates.length > 0 && (
        <p className="text-base text-secondary mt-4 text-center font-medium">
          {selectedDates.length}日選択中
        </p>
      )}
    </div>
  );
}
