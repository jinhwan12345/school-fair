// app/api/visit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

function todayStr() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul" }).format(
    new Date()
  );
}

// 1) 조회 전용 (GET): 카운트 증가 없이 현재 통계만 조회
export async function GET() {
  const today = todayStr();

  const { data, error } = await supabase
    .from("counter")
    .select("id,total,today,date")
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      { error: `supabase select error: ${error.message}` },
      { status: 500 }
    );
  }

  if (!data) {
    return NextResponse.json({
      total: 260,
      today: 0,
    });
  }

  // 기준일자가 오늘이 아닌 경우 오늘의 방문자는 0으로 처리
  const isToday = data.date === today;
  return NextResponse.json({
    total: data.total ?? 0,
    today: isToday ? (data.today ?? 0) : 0,
  });
}

// 2) 방문 카운트 증가 (POST): 당일 첫 방문 시에만 호출됨
export async function POST(req: NextRequest) {
  const today = todayStr();

  // 서버 쿠키 체크: 오늘 이미 방문한 쿠키가 있으면 증가 없이 현재 수치만 반환
  const visitedCookie = req.cookies.get("visited_today")?.value;
  if (visitedCookie === today) {
    return GET();
  }

  // 1) 현재 카운터 가져오기
  const { data, error } = await supabase
    .from("counter")
    .select("id,total,today,date")
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      { error: `supabase select error: ${error.message}` },
      { status: 500 }
    );
  }

  let total: number;
  let todayCount: number;
  let date: string;

  // 2) row가 아예 없을 때: 초기 생성
  if (!data) {
    total = 260; // 초기 누적 시작값
    todayCount = 1;
    date = today;

    const { error: insertError } = await supabase
      .from("counter")
      .insert({
        id: 1,
        total,
        today: todayCount,
        date,
      });

    if (insertError) {
      return NextResponse.json(
        { error: `supabase insert error: ${insertError.message}` },
        { status: 500 }
      );
    }

    const res = NextResponse.json({
      total,
      today: todayCount,
    });
    res.cookies.set("visited_today", today, {
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });
    return res;
  }

  // 3) row가 있을 때: 날짜 체크 후 카운트 증가
  total = data.total ?? 0;
  todayCount = data.today ?? 0;
  date = data.date as string;

  // 날짜가 바뀌었으면 오늘 카운트 0으로 초기화
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

  if (updateError) {
    return NextResponse.json(
      { error: `supabase update error: ${updateError.message}` },
      { status: 500 }
    );
  }

  const res = NextResponse.json({
    total,
    today: todayCount,
  });
  res.cookies.set("visited_today", today, {
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });
  return res;
}
