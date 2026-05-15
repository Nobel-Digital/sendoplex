import * as React from "react";
import { t } from "../i18n";

export interface HoursProps {
  title?: string;
  hours?: Week;
  holidayHours?: HolidayHour[];
  locale?: string;
}

interface Week extends Record<string, any> {
  monday?: Day;
  tuesday?: Day;
  wednesday?: Day;
  thursday?: Day;
  friday?: Day;
  saturday?: Day;
  sunday?: Day;
}

type Day = {
  isClosed?: boolean;
  openIntervals?: OpenIntervals[];
};

type OpenIntervals = {
  start: string;
  end: string;
};

export type HolidayHour = {
  date?: string;
  isClosed?: boolean;
  openIntervals?: OpenIntervals[];
  name?: string;
  holidayName?: string;
};

const order: (keyof Week)[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

function normalizeTime(t?: string) {
  if (!t) return "";
  if (/^\d{4}$/.test(t)) return `${t.slice(0, 2)}:${t.slice(2)}`;
  return t;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  if (!y || !m || !d) return dateStr;
  return `${d}.${m}.${y}`;
}

const Hours: React.FC<HoursProps> = ({
  title,
  hours,
  holidayHours,
  locale = "et",
}) => {
  const tr = t(locale);

  function formatIntervals(intervals?: OpenIntervals[]) {
    if (!intervals || intervals.length === 0) return tr.hoursClosed;
    return intervals
      .map((i) => `${normalizeTime(i.start)}–${normalizeTime(i.end)}`)
      .join(", ");
  }

  function buildWeeklyLine(hours: Week) {
    const parts: string[] = [];
    let startDay: string | null = null;
    let lastDay: string | null = null;
    let lastValue: string | null = null;

    const flush = () => {
      if (!startDay || !lastValue) return;
      const labels = tr.hoursDays;
      if (startDay === lastDay) {
        parts.push(`${labels[startDay]} ${lastValue}`);
      } else {
        parts.push(`${labels[startDay]}–${labels[lastDay!]} ${lastValue}`);
      }
    };

    order.forEach((dayKey) => {
      const day = hours[dayKey];
      const value = day?.isClosed ? tr.hoursClosed : formatIntervals(day?.openIntervals);
      if (value === lastValue) {
        lastDay = dayKey;
      } else {
        flush();
        startDay = dayKey;
        lastDay = dayKey;
        lastValue = value;
      }
    });
    flush();
    return parts.join(" · ");
  }

  if (!hours && (!holidayHours || holidayHours.length === 0)) return null;

  const weeklyLine = hours ? buildWeeklyLine(hours) : "";
  const holidayLine =
    holidayHours
      ?.filter((h) => h?.date)
      .map((h) => {
        const date = formatDate(h.date);
        const value = h.isClosed ? tr.hoursClosed : formatIntervals(h.openIntervals);
        return `${date} ${value}`;
      })
      .join(" · ") || "";

  return (
    <div className="mt-6 text-sm text-primary leading-relaxed">
      {weeklyLine && (
        <div>
          <span className="font-semibold text-foreground">{title}:</span>{" "}
          <span>{weeklyLine}</span>
        </div>
      )}
      {holidayLine && (
        <div className="mt-1 text-xs text-slate-600">
          <span className="font-semibold text-foreground">{tr.hoursHolidays}:</span>{" "}
          <span>{holidayLine}</span>
        </div>
      )}
    </div>
  );
};

export default Hours;
