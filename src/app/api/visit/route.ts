// app/api/visit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

function todayStr() {
  const d = new Date();
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

export async function POST(req: NextRequest) {
  const today = todayStr();

  // 1) 현재 카운터 가져오기 (없어도 error 안 나게 maybeSingle)
  const { data, error } = await supabase
    .from("counter")
    .select("id,total,today,date")
    .eq("id", 1)
    .maybeSingle();

  console.log("supabase select data:", data);
  console.log("supabase select error:", error);

  if (error) {
    // 진짜 에러가 있으면 그대로 보여주자 (디버깅용)
    return NextResponse.json(
      { error: `supabase select error: ${error.message}` },
      { status: 500 }
    );
  }

  let total: number;
  let todayCount: number;
  let date: string;

  // 2) row가 아예 없을 때: 자동으로 생성
  if (!data) {
    total = 260; // 누적 260에서 시작하고 싶으면 여기
    todayCount = 1;
    date = today;

    const { data: inserted, error: insertError } = await supabase
      .from("counter")
      .insert({
        id: 1,
        total,
        today: todayCount,
        date,
      })
      .select()
      .single();

    console.log("supabase insert:", inserted, insertError);

    if (insertError) {
      return NextResponse.json(
        { error: `supabase insert error: ${insertError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      total,
      today: todayCount,
    });
  }

  // 3) row가 있을 때: 날짜 체크 후 증가
  total = data.total ?? 0;
  todayCount = data.today ?? 0;
  date = data.date as string;

  // 날짜 바뀌면 todayCount 리셋
  if (date !== today) {
    todayCount = 0;
    date = today;
  }

  total += 1;
  todayCount += 1;

  const { error: updateError } = await supabase
    .from("counter")
    .update({
      total,
      today: todayCount,
      date,
    })
    .eq("id", 1);

  console.log("supabase update error:", updateError);

  if (updateError) {
    return NextResponse.json(
      { error: `supabase update error: ${updateError.message}` },
      { status: 500 }
    );
  }

  return NextResponse.json({
    total,
    today: todayCount,
  });
}
