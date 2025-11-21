// app/api/visit/route.ts
import { NextRequest, NextResponse } from "next/server";

// ⚠️ 서버 메모리에 저장됨 (재시작하면 초기화)
let totalCount = 0;
let todayCount = 0;
let todayDate = "";

function getTodayStr() {
  const now = new Date();
  // 한국 기준으로 맞추고 싶으면 여기서 KST 변환 로직을 추가해도 됨
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export async function POST(req: NextRequest) {
  const todayStr = getTodayStr();

  // 날짜가 바뀌면 todayCount 초기화
  if (todayDate !== todayStr) {
    todayDate = todayStr;
    todayCount = 0;
  }

  // 쿠키에서 마지막 방문 날짜 확인
  const lastVisit = req.cookies.get("lastVisitDate")?.value;

  let counted = false;

  // 오늘 처음 방문한 브라우저라면 카운트 증가
  if (lastVisit !== todayStr) {
    totalCount += 1;
    todayCount += 1;
    counted = true;
  }

  const res = NextResponse.json({
    total: totalCount,
    today: todayCount,
    counted, // 오늘 새로 카운트 되었는지 여부 (디버깅용)
  });

  // 오늘 방문했다는 쿠키 저장 (브라우저별 하루 1회)
  if (counted) {
    res.cookies.set("lastVisitDate", todayStr, {
      maxAge: 60 * 60 * 24, // 1일
      path: "/",
    });
  }

  return res;
}
