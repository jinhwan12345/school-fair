// app/api/visit/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

function todayStr() {
  const d = new Date();
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

export async function POST() {
  const today = todayStr();

  // 1) 현재 카운터 가져오기
  const { data, error } = await supabase
    .from("counter")
    .select("*")
    .eq("id", 1)
    .single();

  if (!data) {
    return NextResponse.json({ error: "counter record missing" });
  }

  let { total, today: todayCount, date } = data;

  // 2) 날짜가 바뀌었으면 리셋
  if (date !== today) {
    todayCount = 0;
  }

  // 3) 누적/일일 카운트 증가
  total += 1;
  todayCount += 1;

  // 4) DB 업데이트
  await supabase
    .from("counter")
    .update({
      total,
      today: todayCount,
      date: today,
    })
    .eq("id", 1);

  // 5) 응답 반환
  return NextResponse.json({
    total,
    today: todayCount,
  });
}
