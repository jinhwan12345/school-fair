"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";

export default function CurriculumPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ 카드뉴스 이미지
  const images = [
    "/curriculum/slide1.png",
    "/curriculum/slide2.png",
    "/curriculum/slide3.png",
    "/curriculum/slide4.png",
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

  // ✅ 슬라이드 이동
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <main className="flex flex-col items-center bg-white text-gray-900 min-h-screen">
      {/* ✅ 헤더 */}
      <Header />

      {/* 타이틀 */}
      <section className="w-full bg-[#2A7DE1] text-white py-4 font-semibold text-lg tracking-tight">
        <div className="max-w-[1200px] mx-auto px-6 text-left">
          수성구 고등학교 교육과정
        </div>
      </section>

      {/* ✅ 본문 콘텐츠 */}
      <section className="max-w-[1200px] w-full px-4 py-12 flex flex-col lg:flex-row justify-between items-start gap-10">
        {/* ✅ 왼쪽 카드뉴스 */}
        <div className="relative flex justify-center items-center w-full lg:w-[620px] h-[620px] bg-gray-100 rounded-lg overflow-hidden shadow">
          <Image
            src={images[currentIndex]}
            alt={`교육과정 카드뉴스 ${currentIndex + 1}`}
            width={620}
            height={620}
            className="object-contain"
          />
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
        <div className="flex justify-between w-full lg:w-[560px] items-start">
            {/* 왼쪽 9개 */}
            <div className="flex flex-col justify-between w-[270px] h-[620px]">
            {schoolsLeft.map((school) => (
                <div
                key={school.eng}
                className="flex items-center justify-between border border-[#969696] rounded-md px-3 h-[60px] bg-white shadow-sm transition"
                style={{ marginBottom: "10px" }}
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
                    className="hover:opacity-70 transition"
                    aria-label="교육과정 다운로드"
                >
                    <Image
                    src="/icons/download_icon.svg"
                    alt="다운로드 아이콘"
                    width={24}
                    height={24}
                    />
                </a>
                </div>
            ))}
            </div>

            {/* 오른쪽 8개 (위쪽 정렬) */}
            <div className="flex flex-col w-[270px] items-stretch">
            {schoolsRight.map((school) => (
                <div
                key={school.eng}
                className="flex items-center justify-between border border-[#969696] rounded-md px-3 h-[60px] bg-white shadow-sm transition"
                style={{ marginBottom: "10px" }}
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
                    className="hover:opacity-70 transition"
                    aria-label="교육과정 다운로드"
                >
                    <Image
                    src="/icons/download_icon.svg"
                    alt="다운로드 아이콘"
                    width={24}
                    height={24}
                    />
                </a>
                </div>
            ))}
            </div>

        </div>
      </section>

      {/* ✅ 푸터 */}
      <footer className="w-full bg-[#2A7DE1] text-white text-xs md:text-sm py-6 mt-auto">
        <div className="max-w-[1200px] mx-auto text-center leading-6 px-4 md:px-6">
          <p>
            [42027] 대구광역시 수성구 달구벌대로 2451(범어동) 범어도서관 5층 대표전화:
            053)668-7311 / 팩스: 053)668-7399
          </p>
          <p className="mt-1">
            COPYRIGHT© SUSEONG FUTURE EDUCATION FOUNDATION. All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
