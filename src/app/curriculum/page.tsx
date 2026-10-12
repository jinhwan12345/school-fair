"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CurriculumPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");


  // ✅ 카드뉴스 이미지
  const images = [
    "/curriculum/slide1.png",
    "/curriculum/slide2.png",
    "/curriculum/slide3.png",
    "/curriculum/slide4.png",
    "/curriculum/slide5.png",
    "/curriculum/slide6.png",
    "/curriculum/slide7.png",
    "/curriculum/slide8.png",
    "/curriculum/slide9.png",
    "/curriculum/slide10.png",
    "/curriculum/slide11.png",
  ];

  // ✅ 학교 데이터
  const schoolsLeft = [
    { name: "경북고등학교", eng: "kyungbuk" },
    { name: "능인고등학교", eng: "neungin" },
    { name: "대구남산고등학교", eng: "namsan" },
    { name: "대구여자고등학교", eng: "daegu-girls" },
    { name: "대구혜화여자고등학교", eng: "hyehwa" },
    { name: "덕원고등학교", eng: "deokwon" },
    { name: "수성고등학교", eng: "suseong" },
    { name: "영남공업고등학교", eng: "yeongnam-tech" },
    { name: "정화여자고등학교", eng: "junghwa" },
  ];

  const schoolsRight = [
    { name: "경신고등학교", eng: "kyungshin" },
    { name: "대구과학고등학교", eng: "daegu-science" },
    { name: "대구농업마이스터고등학교", eng: "daegu-agri-meister" },
    { name: "대구중앙고등학교", eng: "daegu-jungang" },
    { name: "대륜고등학교", eng: "daeryun" },
    { name: "동문고등학교", eng: "dongmun" },
    { name: "시지고등학교", eng: "siji" },
    { name: "오성고등학교", eng: "oseong" },
  ];

  // ✅ 슬라이드 이동 함수
  const nextSlide = () => {
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setDirection("prev");
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <main className="flex flex-col items-center bg-white text-gray-900 min-h-screen overflow-hidden">
      {/* ✅ 헤더 */}
      <Header />



      {/* ✅ 타이틀 */}
      <section className="w-full bg-[#2A7DE1] text-white py-4 font-semibold text-lg tracking-tight">
        <div className="max-w-[1200px] mx-auto px-6 text-left">
          수성구 고등학교 교육과정
        </div>
      </section>

      {/* ✅ 본문 콘텐츠 */}
      <section className="max-w-[1200px] w-full px-4 py-12 flex flex-col lg:flex-row justify-between items-start gap-10">
        {/* ✅ 왼쪽 카드뉴스 */}
        <div className="relative flex justify-center items-center w-full lg:w-[620px] h-[620px] bg-gray-100 rounded-lg overflow-hidden shadow">
          {/* ✅ 슬라이드 컨테이너 */}
          <div
            className="flex transition-transform duration-1000 ease-in-out w-full h-full"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {images.map((src, idx) => (
              <div
                key={idx}
                className="relative min-w-full h-full flex justify-center items-center flex-shrink-0"
              >
                <Image
                  src={src}
                  alt={`교육과정 카드뉴스 ${idx + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          {/* 화살표 버튼 */}
          <button
            onClick={prevSlide}
            className="absolute left-3 bg-white/80 rounded-full p-2 shadow hover:bg-white transition"
          >
            ◀
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 bg-white/80 rounded-full p-2 shadow hover:bg-white transition"
          >
            ▶
          </button>
        </div>

        {/* ✅ 오른쪽 학교 리스트 */}
        <div className="flex flex-col w-full lg:w-[480px] items-center">
          {/* 통합 파일 */}
          <div className="flex items-center justify-between bg-[#f3bd8c] border border-[#f3bd8c] rounded-md px-4 h-[60px] shadow-sm transition hover:brightness-105 group w-full mb-[10px]">
            <div className="flex items-center justify-center gap-2 font-bold text-white text-sm text-center">
              통합 3개년 교육과정 편성표
            </div>
            <a
              href="/curriculum/total_curriculum.xlsx"
              download
              aria-label="전체 교육과정 다운로드"
            >
              <Image
                src="/icons/download_icon.svg"
                alt="다운로드 아이콘"
                width={24}
                height={24}
                className="brightness-0 invert-[1] transition duration-200 group-hover:brightness-200"
              />
            </a>
          </div>

          {/* ✅ 학교 16개 (대구과학고 제외) */}
          <div className="grid grid-cols-2 gap-[10px] w-full">
            {[...schoolsLeft, ...schoolsRight.filter((s) => s.eng !== "daegu-science")]
              .slice(0, 16)
              .map((school) => (
                <div
                  key={school.eng}
                  className="flex items-center justify-between border border-[#969696] rounded-md px-3 h-[60px] bg-white shadow-sm transition group"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={`/schools/${school.eng}/logo.png`}
                      alt={`${school.name} 로고`}
                      width={26}
                      height={26}
                    />
                    <span className="text-sm font-medium">{school.name}</span>
                  </div>
                  <a
                    href={`/curriculum/${school.eng}.pdf`}
                    download
                    aria-label="교육과정 다운로드"
                  >
                    <Image
                      src="/icons/download_icon.svg"
                      alt="다운로드 아이콘"
                      width={24}
                      height={24}
                      className="transition-colors duration-200 group-hover:brightness-0 group-hover:invert-[0.6] group-hover:sepia group-hover:saturate-[10] group-hover:hue-rotate-[330deg] group-hover:brightness-100"
                    />
                  </a>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ✅ 푸터 */}
      <Footer className="mt-auto" />
    </main>
  );
}
