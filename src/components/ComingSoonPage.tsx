"use client";

import Image from "next/image";

interface ComingSoonPageProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export default function ComingSoonPage({
  title = "서비스 준비 중입니다",
  subtitle = "대구 수성구 고교 정보 통합 플랫폼",
  description = "수성구 관내 고등학교 정보와 교육과정, 대학별 입시 정보를 보다 정확하고 편리하게 제공하기 위해 시스템을 단장하고 있습니다.\n빠른 시일 내에 더 나은 서비스로 찾아뵙겠습니다.",
}: ComingSoonPageProps) {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#eef5fc] via-[#f8fafc] to-[#e3effd] font-['Noto_Sans_KR'] text-gray-900 flex flex-col justify-between items-center px-4 py-8 sm:px-6 sm:py-12">
      {/* 배경 장식 블롭 (배너 및 오픈 안내 그래픽 톤앤매너 반영) */}
      <div
        className="pointer-events-none absolute -top-28 -left-28 w-96 h-96 rounded-full bg-[#2A7DE1]/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-28 w-[420px] h-[420px] rounded-full bg-[#60a5fa]/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 left-1/4 w-80 h-80 rounded-full bg-[#f3bd8c]/20 blur-3xl"
        aria-hidden="true"
      />

      {/* 상단 여백 밸런서 */}
      <div className="hidden sm:block" />

      {/* 중앙 메인 카드 */}
      <section className="relative z-10 w-full max-w-[680px] bg-white rounded-3xl border border-blue-100/80 shadow-[0_20px_60px_-15px_rgba(42,125,225,0.14)] overflow-hidden my-auto">
        {/* 상단 브랜드 컬러 포인트 바 */}
        <div className="h-2 w-full bg-gradient-to-r from-[#2A7DE1] via-[#4c9aff] to-[#f3bd8c]" />

        {/* 은은한 모눈종이 패턴 배경 (기존 오픈 안내 카드 디자인 반영) */}
        <div
          className="relative px-6 py-12 sm:px-12 sm:py-16 flex flex-col items-center text-center"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(42, 125, 225, 0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(42, 125, 225, 0.035) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        >
          {/* 로고 */}
          <div className="mb-6">
            <Image
              src="/logo.png"
              alt="수성고교정보 통합시스템 로고"
              width={220}
              height={66}
              className="h-11 sm:h-13 w-auto object-contain mx-auto"
              priority
            />
          </div>

          {/* 서브 배지 */}
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/80 text-[#2A7DE1] text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-5 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2A7DE1] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2A7DE1]" />
            </span>
            <span>{subtitle}</span>
          </div>

          {/* 일러스트 아이콘 영역 */}
          <div className="relative my-2 flex items-center justify-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#2A7DE1] to-[#1f6bc2] text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 sm:w-12 sm:h-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
            </div>
            {/* 포인트 데코 배지 */}
            <div className="absolute -bottom-1.5 -right-2 w-8 h-8 rounded-full bg-[#f3bd8c] border-2 border-white flex items-center justify-center text-white shadow-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-[#0f0c57]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          {/* 메인 타이틀 */}
          <h1 className="mt-6 text-2xl sm:text-4xl font-extrabold text-[#0f0c57] tracking-tight break-keep">
            {title}
          </h1>

          {/* 안내 설명 */}
          <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed max-w-[520px] whitespace-pre-line break-keep">
            {description}
          </p>
        </div>
      </section>

      {/* 하단 기관 안내 및 저작권 표기 */}
      <div className="relative z-10 mt-6 text-center text-[11px] sm:text-xs text-gray-500 space-y-1">
        <p>
          [42027] 대구광역시 수성구 달구벌대로 2451(범어동) 범어도서관 5층 대표전화: 053)668-7311
        </p>
        <p className="text-gray-400">
          COPYRIGHT© SUSEONG FUTURE EDUCATION FOUNDATION. All Rights Reserved.
        </p>
      </div>
    </main>
  );
}
