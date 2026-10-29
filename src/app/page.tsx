import ComingSoonPage from "@/components/ComingSoonPage";
import MainHomePage from "@/components/MainHomePage";

/**
 * ✅ 오픈 상태 전환 스위치
 * - true: 메인 페이지에 '서비스 준비 중' 화면 표시
 * - false: 정식 메인 홈페이지(MainHomePage) 표시
 */
const IS_COMING_SOON = true;

export default function Home() {
  if (IS_COMING_SOON) {
    return <ComingSoonPage />;
  }

  return <MainHomePage />;
}
