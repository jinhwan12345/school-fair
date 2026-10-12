"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import Header from "@/components/Header"; // ✅ 공통 헤더 불러오기
import Footer from "@/components/Footer"; // ✅ 공통 푸터 불러오기
import { agencies } from "@/app/data/agencyData";



export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname(); // ✅ 현재 경로 확인용
  const [activeSchool, setActiveSchool] = useState<string | null>(null);

  // ✅ 페이지 이동 시 자동 스크롤 애니메이션
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    let animationFrame: number;
    const speed = 1;

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += speed;
      }
      animationFrame = requestAnimationFrame(scroll);
    };
    animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // ✅ 현재 페이지 기반으로 활성화 상태 관리
  useEffect(() => {
    if (pathname.startsWith("/schools/")) {
      const schoolPath = pathname.split("/")[2];
      setActiveSchool(schoolPath);
    } else {
      // 홈으로 돌아오면 초기화
      setActiveSchool(null);
    }
  }, [pathname]);

  // ✅ 버튼 클릭 시 페이지 이동
  const handleClick = (engName: string) => {
    router.push(`/schools/${engName}`);
  };

  const renderSchoolButton = (school: { name: string; engName: string }) => (
    <button
      key={school.engName}
      onClick={() => handleClick(school.engName)}
      className={`flex items-center justify-between border rounded-md px-3 py-2 shadow-sm transition ${
        activeSchool === school.engName
          ? "bg-[#2a7de1] text-white"
          : "bg-white hover:bg-[#f3bd8c] hover:text-white"
      }`}
    >
      <span className="text-sm font-medium">{school.name}</span>
      <Image
        src={`/schools/${school.engName}/logo.png`}
        alt={`${school.name} 로고`}
        width={24}
        height={24}
        className="ml-2"
      />
    </button>
  );

  const schoolsLeft = [
    { name: "경북고등학교", engName: "kyungbuk" },
    { name: "능인고등학교", engName: "neungin" },
    { name: "대구남산고등학교", engName: "namsan" },
    { name: "대구여자고등학교", engName: "daegu-girls" },
    { name: "대구혜화여자고등학교", engName: "hyehwa" },
    { name: "덕원고등학교", engName: "deokwon" },
    { name: "수성고등학교", engName: "suseong" },
    { name: "정화여자고등학교", engName: "junghwa" },
  ];

  const schoolsRight = [
    { name: "경신고등학교", engName: "kyungshin" },
    { name: "영남공업고등학교", engName: "yeongnam-tech" },
    { name: "대구농업마이스터고등학교", engName: "daegu-agri-meister" },
    { name: "대구중앙고등학교", engName: "daegu-jungang" },
    { name: "대륜고등학교", engName: "daeryun" },
    { name: "동문고등학교", engName: "dongmun" },
    { name: "시지고등학교", engName: "siji" },
    { name: "오성고등학교", engName: "oseong" },
  ];

  return (
    <main className="flex flex-col items-center bg-white text-gray-900">
      {/* ✅ 공통 헤더 */}
      <Header />


      {/* ✅ 메인 배너 */}
      <section className="w-full">
        {/* 데스크탑 배너 */}
        <Image
          src="/banner.png"
          alt="수성고교정보 통합 배너"
          width={1920}
          height={400}
          className="hidden sm:block w-full h-auto object-cover"
          priority
        />

        {/* 모바일 배너 */}
        <Image
          src="/banner_mobile.png"
          alt="수성고교정보 통합 모바일 배너"
          width={800}
          height={400}
          className="block sm:hidden w-full h-auto object-cover"
          priority
        />
      </section>



{/* ✅ 학교 카드 + 지도 영역 */}
<section className="max-w-[1200px] mx-auto py-10 px-4 flex flex-col lg:flex-row justify-between items-start gap-10">

  {/* ✅ 중앙 지도 */}
  <div className="flex justify-center items-center bg-gray-100 rounded-md w-full lg:w-[600px] h-auto aspect-square overflow-hidden shadow-sm order-1 lg:order-2">
    <Image
      src="/map.png"
      alt="수성구 고등학교 지도"
      width={600}
      height={600}
      className="object-contain w-full h-full"
      priority
    />
  </div>

  {/* ✅ 왼쪽 학교 리스트 (데스크톱 전용) */}
  <div className="hidden sm:flex flex-col w-full lg:w-[220px] gap-[10px] order-2 lg:order-1">
    {schoolsLeft.slice(0, 8).map((school) => (
      <button
        key={school.engName}
        onClick={() => handleClick(school.engName)}
        className={`flex items-center justify-between border border-[#969696] rounded-md px-3 h-[66.25px] shadow-sm transition-colors duration-200 ${
          activeSchool === school.engName
            ? "bg-[#2a7de1] text-white"
            : "bg-white text-black hover:bg-[#f3bd8c] hover:text-white"
        }`}
      >
        <span className="text-sm font-medium">{school.name}</span>
        <Image
          src={`/schools/${school.engName}/logo.png`}
          alt={`${school.name} 로고`}
          width={24}
          height={24}
          className="ml-2"
        />
      </button>
    ))}
  </div>

  {/* ✅ 오른쪽 학교 리스트 (데스크톱 전용) */}
  <div className="hidden sm:flex flex-col w-full lg:w-[220px] gap-[10px] order-3">
    {schoolsRight.slice(0, 8).map((school) => (
      <button
        key={school.engName}
        onClick={() => handleClick(school.engName)}
        className={`flex items-center justify-between border border-[#969696] rounded-md px-3 h-[66.25px] shadow-sm transition-colors duration-200 ${
          activeSchool === school.engName
            ? "bg-[#2a7de1] text-white"
            : "bg-white text-black hover:bg-[#f3bd8c] hover:text-white"
        }`}
      >
        <span className="text-sm font-medium">{school.name}</span>
        <Image
          src={`/schools/${school.engName}/logo.png`}
          alt={`${school.name} 로고`}
          width={24}
          height={24}
          className="ml-2"
        />
      </button>
    ))}
  </div>

  {/* ✅ 모바일용 2열 리스트 */}
  <div className="grid grid-cols-2 gap-[10px] w-full flex sm:hidden order-3 mt-6">
    {[...schoolsLeft, ...schoolsRight].slice(0, 16).map((school) => (
      <button
        key={school.engName}
        onClick={() => handleClick(school.engName)}
        className={`flex items-center justify-between border border-[#969696] rounded-md px-2 h-[60px] text-xs font-medium shadow-sm transition-colors duration-200 ${
          activeSchool === school.engName
            ? "bg-[#2a7de1] text-white"
            : "bg-white text-black hover:bg-[#f3bd8c] hover:text-white"
        }`}
      >
        <span className="truncate">{school.name}</span>
        <Image
          src={`/schools/${school.engName}/logo.png`}
          alt={`${school.name} 로고`}
          width={20}
          height={20}
          className="ml-1 flex-shrink-0"
        />
      </button>
    ))}
  </div>
</section>



     {/* ✅ 유관기관 슬라이드 */}
      <section className="hidden lg:block w-full py-8">
        <div className="max-w-[1200px] mx-auto overflow-hidden" ref={scrollRef}>
          <div className="flex gap-[30px] items-center w-max">
            {agencies.map((agency) => (
              <a
                key={agency.name}
                href={agency.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-[80px] px-4 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-transform duration-200 hover:scale-105 flex-shrink-0"
                style={{ minWidth: "fit-content" }}
              >
                <Image
                  src={agency.logo}
                  alt={agency.name}
                  width={140}
                  height={80}
                  className="object-contain w-auto h-[60px]"
                  priority
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ 푸터 */}
      <Footer />
    </main>
  );
}
