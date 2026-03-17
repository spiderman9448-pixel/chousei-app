"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input, Textarea, Card, Calendar, formatLabel } from "@/app/components/ui";
import { createEvent } from "@/lib/actions";

interface DateEntry {
  date: string;
  time: string;
}

export default function NewEventPage() {
  const [dateEntries, setDateEntries] = useState<DateEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedDates = dateEntries.map((e) => e.date);

  const toggleDate = (dateStr: string) => {
    setDateEntries((prev) => {
      if (prev.some((e) => e.date === dateStr)) {
        return prev.filter((e) => e.date !== dateStr);
      }
      return [...prev, { date: dateStr, time: "" }].sort((a, b) =>
        a.date.localeCompare(b.date)
      );
    });
  };

  const updateTime = (dateStr: string, time: string) => {
    setDateEntries((prev) =>
      prev.map((e) => (e.date === dateStr ? { ...e, time } : e))
    );
  };

  const removeDate = (dateStr: string) => {
    setDateEntries((prev) => prev.filter((e) => e.date !== dateStr));
  };

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setError(null);

    dateEntries.forEach((entry, index) => {
      const label = entry.time
        ? `${formatLabel(entry.date)} ${entry.time}`
        : formatLabel(entry.date);
      formData.set(`date_${index}`, label);
    });

    const result = await createEvent(formData);
    if (result?.error) {
      setError(result.error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-5 py-8">
      <div className="max-w-lg mx-auto space-y-6">
        <Link
          href="/"
          className="inline-block text-sm text-secondary hover:text-foreground transition-colors"
        >
          ← 戻る
        </Link>

        <h1 className="text-xl font-bold text-foreground">
          イベントを作成する
        </h1>

        {error && (
          <div className="bg-danger/10 border border-danger/20 text-danger rounded-xl px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <form action={handleSubmit}>
          <div className="space-y-6">
            <Card className="space-y-6">
              <Input
                name="title"
                label="イベント名"
                placeholder="例: 歓迎会の日程調整"
                required
              />
              <Textarea
                name="description"
                label="メモ（任意）"
                placeholder="場所や予算などのメモを入力..."
                rows={3}
              />
            </Card>

            {/* カレンダー */}
            <Card className="space-y-4">
              <label className="text-sm font-semibold text-foreground">
                日程候補をタップで選択
              </label>
              <Calendar
                selectedDates={selectedDates}
                onToggleDate={toggleDate}
              />
            </Card>

            {/* 選択した日程 + 時間入力 */}
            {dateEntries.length > 0 && (
              <Card className="space-y-1">
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  選択した日程（時間は任意）
                </label>
                <div className="space-y-3">
                  {dateEntries.map((entry) => (
                    <div
                      key={entry.date}
                      className="flex items-center gap-3 p-3 rounded-xl bg-muted/50"
                    >
                      <span className="text-sm font-semibold text-foreground shrink-0">
                        {formatLabel(entry.date)}
                      </span>
                      <input
                        type="text"
                        value={entry.time}
                        onChange={(e) => updateTime(entry.date, e.target.value)}
                        placeholder="例: 19:00〜"
                        className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-border bg-white
                          text-sm text-foreground placeholder:text-secondary/50
                          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => removeDate(entry.date)}
                        className="text-secondary hover:text-danger transition-colors cursor-pointer text-base shrink-0 p-1"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full py-3.5"
              disabled={isSubmitting || dateEntries.length === 0}
            >
              {isSubmitting
                ? "作成中..."
                : dateEntries.length === 0
                  ? "日程を選択してください"
                  : `イベントを作成する（${dateEntries.length}日程）`}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
