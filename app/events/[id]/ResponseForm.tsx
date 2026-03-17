"use client";

import { useState } from "react";
import { Button, RadioGroup, Badge } from "@/app/components/ui";
import { submitResponse } from "@/lib/actions";
import type { DateOption, Response } from "@/lib/database.types";

interface Props {
  eventId: string;
  dateOptions: DateOption[];
  responses: Response[];
  itemMap: Record<string, Record<string, string>>;
  summary: Record<string, Record<string, number>>;
}

const availabilityOptions = [
  { value: "○", label: "○" },
  { value: "△", label: "△" },
  { value: "×", label: "×" },
];

const availabilityStyle: Record<string, string> = {
  "○": "text-success",
  "△": "text-warning",
  "×": "text-danger",
};

export default function ResponseForm({
  eventId,
  dateOptions,
  responses,
  itemMap,
  summary,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>(
    Object.fromEntries(dateOptions.map((d) => [d.id, "○"]))
  );
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("名前を入力してください");
      return;
    }
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.set("event_id", eventId);
    formData.set("name", name);
    formData.set("comment", comment);
    for (const [dateOptionId, availability] of Object.entries(answers)) {
      formData.set(`avail_${dateOptionId}`, availability);
    }

    const result = await submitResponse(formData);
    if (result?.error) {
      setError(result.error);
      setIsSubmitting(false);
    }
  };

  // 全メンバー名（表示中 + 入力中の自分）
  const allNames = [
    ...responses.map((r) => ({ id: r.id, name: r.name, isMe: false })),
    ...(isEditing ? [{ id: "__me__", name: name || "あなた", isMe: true }] : []),
  ];

  return (
    <div className="space-y-5">
      {error && (
        <div className="bg-danger/10 border border-danger/20 text-danger rounded-xl px-5 py-4 text-base">
          {error}
        </div>
      )}

      {/* 名前入力（編集モード） */}
      {isEditing && (
        <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-5 space-y-4">
          <div>
            <label className="text-base font-semibold text-foreground block mb-2">
              あなたの名前
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="名前を入力"
              autoFocus
              className="w-full px-4 py-3.5 rounded-xl border border-border bg-white
                text-lg text-foreground font-medium
                focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* 縦型出欠テーブル */}
      {(responses.length > 0 || isEditing) && (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full">
            {/* ヘッダー: 日程 | 名前1 | 名前2 | ... | 集計 */}
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-3 text-left text-base font-bold text-foreground sticky left-0 bg-muted min-w-[100px]">
                  日程
                </th>
                {allNames.map((member) => (
                  <th
                    key={member.id}
                    className={`px-3 py-3 text-center text-base font-bold whitespace-nowrap min-w-[56px]
                      ${member.isMe ? "text-primary bg-primary/10" : "text-foreground"}`}
                  >
                    {member.name}
                  </th>
                ))}
                {responses.length > 0 && (
                  <th className="px-3 py-3 text-center text-base font-bold text-secondary min-w-[80px]">
                    集計
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {dateOptions.map((opt) => {
                const s = summary[opt.id];
                return (
                  <tr key={opt.id} className="hover:bg-muted/30">
                    {/* 日程ラベル */}
                    <td className="px-4 py-3 text-base font-semibold text-foreground sticky left-0 bg-white whitespace-nowrap">
                      {opt.label}
                    </td>
                    {/* 各メンバーの回答 */}
                    {allNames.map((member) => {
                      if (member.isMe) {
                        return (
                          <td key={member.id} className="px-1 py-2 text-center bg-primary/5">
                            <RadioGroup
                              name={`inline_${opt.id}`}
                              options={availabilityOptions}
                              value={answers[opt.id] || "○"}
                              onChange={(value) =>
                                setAnswers((prev) => ({ ...prev, [opt.id]: value }))
                              }
                            />
                          </td>
                        );
                      }
                      const avail = itemMap[member.id]?.[opt.id] || "-";
                      return (
                        <td
                          key={member.id}
                          className={`px-3 py-3 text-center text-2xl font-bold ${availabilityStyle[avail] || "text-secondary"}`}
                        >
                          {avail}
                        </td>
                      );
                    })}
                    {/* 集計 */}
                    {responses.length > 0 && (
                      <td className="px-2 py-3 text-center">
                        <div className="flex flex-col items-center gap-1">
                          {s["○"] > 0 && <Badge variant="success">○{s["○"]}</Badge>}
                          {s["△"] > 0 && <Badge variant="warning">△{s["△"]}</Badge>}
                          {s["×"] > 0 && <Badge variant="danger">×{s["×"]}</Badge>}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* 回答がないとき */}
      {responses.length === 0 && !isEditing && (
        <div className="text-center py-10 text-secondary text-lg">
          まだ回答がありません。<br />
          最初に回答してみましょう！
        </div>
      )}

      {/* コメント入力（編集モード） */}
      {isEditing && (
        <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-5">
          <label className="text-base font-semibold text-foreground block mb-2">
            コメント（任意）
          </label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="何かあれば..."
            className="w-full px-4 py-3.5 rounded-xl border border-border bg-white
              text-lg text-foreground
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      )}

      {/* コメント一覧 */}
      {!isEditing && responses.some((r) => r.comment) && (
        <div className="rounded-xl border border-border bg-white p-5 space-y-3">
          <p className="text-lg font-bold text-foreground">💬 コメント</p>
          {responses
            .filter((r) => r.comment)
            .map((r) => (
              <div key={r.id} className="flex gap-3 text-base">
                <span className="font-semibold text-foreground shrink-0">{r.name}</span>
                <span className="text-secondary">{r.comment}</span>
              </div>
            ))}
        </div>
      )}

      {/* ボタン */}
      {!isEditing ? (
        <Button onClick={() => setIsEditing(true)} size="lg" className="w-full text-lg py-5">
          + 自分の出欠を入力する
        </Button>
      ) : (
        <div className="flex gap-3 w-full">
          <Button
            onClick={handleSubmit}
            size="lg"
            className="flex-1 text-lg py-5"
            disabled={isSubmitting}
          >
            {isSubmitting ? "送信中..." : "回答を送信"}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-lg py-5"
            onClick={() => {
              setIsEditing(false);
              setName("");
              setComment("");
              setError(null);
            }}
          >
            キャンセル
          </Button>
        </div>
      )}
    </div>
  );
}
