import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CopyButton } from "@/app/components/ui";
import ResponseForm from "./ResponseForm";
import type { Event, DateOption, Response, ResponseItem } from "@/lib/database.types";
import type { Metadata } from "next";

// 毎回最新データを取得（キャッシュしない）
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

// OGP: LINEやSNSでシェアしたときにイベント名が表示される
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { data: event } = await supabase
    .from("events")
    .select("title, description")
    .eq("id", id)
    .single();

  if (!event) return { title: "イベントが見つかりません" };

  return {
    title: `${event.title} | カンタン出欠調整`,
    description: event.description || "URLを共有するだけで出欠を集められます",
  };
}

export default async function EventPage({ params }: Props) {
  const { id } = await params;

  const { data: rawEvent } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (!rawEvent) notFound();
  const event: Event = rawEvent;

  const { data: rawDateOptions } = await supabase
    .from("date_options")
    .select("*")
    .eq("event_id", id)
    .order("sort_order");
  const dateOptions: DateOption[] = rawDateOptions || [];

  const { data: rawResponses } = await supabase
    .from("responses")
    .select("*")
    .eq("event_id", id)
    .order("created_at");
  const responses: Response[] = rawResponses || [];

  const responseIds = responses.map((r) => r.id);
  let responseItems: ResponseItem[] = [];
  if (responseIds.length > 0) {
    const { data: rawItems } = await supabase
      .from("response_items")
      .select("*")
      .in("response_id", responseIds);
    responseItems = rawItems || [];
  }

  const itemMap: Record<string, Record<string, string>> = {};
  responseItems.forEach((item) => {
    if (!itemMap[item.response_id]) {
      itemMap[item.response_id] = {};
    }
    itemMap[item.response_id][item.date_option_id] = item.availability;
  });

  const summary: Record<string, Record<string, number>> = {};
  dateOptions.forEach((opt) => {
    summary[opt.id] = { "○": 0, "△": 0, "×": 0 };
  });
  responseItems.forEach((item) => {
    if (summary[item.date_option_id]) {
      summary[item.date_option_id][item.availability] =
        (summary[item.date_option_id][item.availability] || 0) + 1;
    }
  });

  return (
    <div className="min-h-screen bg-background px-5 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* 戻るリンク */}
        <Link
          href="/"
          className="inline-block text-sm text-secondary hover:text-foreground transition-colors"
        >
          ← 新しいイベントを作る
        </Link>

        {/* イベント情報 */}
        <Card className="space-y-4">
          <div className="text-3xl">📅</div>
          <h1 className="text-xl font-bold text-foreground">
            {event.title}
          </h1>
          {event.description && (
            <p className="text-sm text-secondary whitespace-pre-wrap">
              {event.description}
            </p>
          )}
          <CopyButton />
        </Card>

        {/* 出欠表 */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-3">
            出欠表（{responses.length}人が回答済み）
          </h2>
          <ResponseForm
            eventId={event.id}
            dateOptions={dateOptions}
            responses={responses}
            itemMap={itemMap}
            summary={summary}
          />
        </div>
      </div>
    </div>
  );
}
