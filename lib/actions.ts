"use server";

import { supabase } from "./supabase";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// ============================
// イベント作成
// ============================
export async function createEvent(formData: FormData) {
  const title = formData.get("title") as string;
  const description = (formData.get("description") as string) || null;

  const dateLabels: string[] = [];
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("date_") && typeof value === "string" && value.trim()) {
      dateLabels.push(value.trim());
    }
  }

  if (!title.trim()) {
    return { error: "イベント名を入力してください" };
  }
  if (dateLabels.length === 0) {
    return { error: "日程候補を1つ以上入力してください" };
  }

  const { data: event, error: eventError } = await supabase
    .from("events")
    .insert({ title: title.trim(), description })
    .select()
    .single();

  if (eventError || !event) {
    return { error: "イベントの作成に失敗しました" };
  }

  const dateOptions = dateLabels.map((label, index) => ({
    event_id: event.id,
    label,
    sort_order: index,
  }));

  const { error: dateError } = await supabase
    .from("date_options")
    .insert(dateOptions);

  if (dateError) {
    return { error: "日程候補の作成に失敗しました" };
  }

  redirect(`/events/${event.id}`);
}

// ============================
// 回答送信
// ============================
export async function submitResponse(formData: FormData) {
  const eventId = formData.get("event_id") as string;
  const name = formData.get("name") as string;
  const comment = (formData.get("comment") as string) || null;

  if (!name.trim()) {
    return { error: "名前を入力してください" };
  }

  const { data: response, error: responseError } = await supabase
    .from("responses")
    .insert({ event_id: eventId, name: name.trim(), comment })
    .select()
    .single();

  if (responseError || !response) {
    return { error: "回答の送信に失敗しました" };
  }

  const items: { response_id: string; date_option_id: string; availability: string }[] = [];
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("avail_") && typeof value === "string") {
      const dateOptionId = key.replace("avail_", "");
      items.push({
        response_id: response.id,
        date_option_id: dateOptionId,
        availability: value,
      });
    }
  }

  if (items.length > 0) {
    const { error: itemsError } = await supabase
      .from("response_items")
      .insert(items);

    if (itemsError) {
      return { error: "回答アイテムの保存に失敗しました" };
    }
  }

  revalidatePath(`/events/${eventId}`);
  redirect(`/events/${eventId}`);
}
