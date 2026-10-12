"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { schoolsData } from "@/app/data/schoolsData";

export default function SchoolsInfo() {
  const router = useRouter();
  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);

  // 비교 체크박스 토글
  const toggleSchoolSelection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setSelectedSchools((prev) => {
      if (prev.includes(id)) {
        return prev.filter((sId) => sId !== id);
      }
      if (prev.length >= 4) {
        alert("학교 비교는 최대 4개교까지 선택할 수 있습니다.");
        return prev;
      }
      return [...prev, id];
    });
  };

  // 비교 화면 이동
  const handleCompare = () => {
    if (selectedSchools.length < 2) {
      alert("비교할 학교를 2개 이상 선택해주세요.");
      return;
    }
    router.push(`/schools/compare?schools=${selectedSchools.join(",")}`);
  };

  return (
    <main className="bg-[#f9f9f9] min-h-screen font-['Noto_Sans_KR'] text-gray-900 pb-16">
      <Header />

      {/* 타이틀 */}
      <section className="w-full bg-[#2A7DE1] text-white py-4 font-semibold text-lg tracking-tight">
        <div className="max-w-[1200px] mx-auto px-6 text-left">
          수성구 고등학교 안내
        </div>
      </section>

      {/* 검색결과 및 비교 선택 컨트롤 패널 */}
      <div className="max-w-[1200px] mx-auto px-6 mt-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex flex-wrap items-center gap-3">
            <div className="text-gray-800 font-semibold text-sm md:text-base">
              검색결과{" "}
              <span className="text-[#2A7DE1] font-bold">
                총 {schoolsData.length}건
              </span>
            </div>

            {selectedSchools.length === 0 ? (
              <span className="text-xs text-gray-500">
                각 학교 카드의 <strong>[비교 담기]</strong>를 누르면 최대 4개교까지 비교할 수 있습니다.
              </span>
            ) : (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold bg-blue-100 text-[#2A7DE1] px-2.5 py-1 rounded-full">
                  {selectedSchools.length}개 선택됨 (최대 4개)
                </span>
                {selectedSchools.map((id) => {
                  const school = schoolsData.find((s) => s.id === id);
                  if (!school) return null;
                  return (
                    <span
                      key={id}
                      className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full border border-gray-300"
                    >
                      <span>{school.name}</span>
                      <button
                        type="button"
                        onClick={(e) => toggleSchoolSelection(id, e)}
                        className="hover:text-red-500 text-gray-400 font-bold ml-0.5 text-sm leading-none cursor-pointer"
                        title="선택 해제"
                        aria-label={`${school.name} 선택 해제`}
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setSelectedSchools([])}
                  className="text-xs text-gray-400 hover:text-gray-600 underline ml-1 cursor-pointer"
                >
                  전체 해제
                </button>
              </div>
            )}
          </div>

          {selectedSchools.length > 0 && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleCompare}
                disabled={selectedSchools.length < 2}
                className={`text-xs md:text-sm font-semibold px-5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  selectedSchools.length >= 2
                    ? "bg-[#2A7DE1] hover:bg-blue-600 text-white shadow-sm cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <span>선택 학교 비교하기</span>
                {selectedSchools.length < 2 ? (
                  <span className="text-xs font-normal text-gray-500">
                    (2개 이상 선택)
                  </span>
                ) : (
                  <span>→</span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 카드 리스트 */}
      <section className="max-w-[1200px] mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {schoolsData.map((school) => {
          const isSelected = selectedSchools.includes(school.id);

          return (
            <div
              key={school.id}
              className={`group relative bg-white border rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg ${
                isSelected
                  ? "border-[#2A7DE1] ring-2 ring-[#2A7DE1]/30 bg-blue-50/10"
                  : "border-gray-200 hover:border-[#2A7DE1]"
              }`}
            >
              {/* 비교 체크박스 버튼 */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  type="button"
                  onClick={(e) => toggleSchoolSelection(school.id, e)}
                  aria-label={`${school.name} 비교 선택`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shadow-xs cursor-pointer ${
                    isSelected
                      ? "bg-[#2A7DE1] text-white ring-2 ring-[#2A7DE1]/30"
                      : "bg-white/90 backdrop-blur text-gray-600 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-colors ${
                      isSelected
                        ? "bg-white border-white text-[#2A7DE1]"
                        : "border-gray-400 bg-white"
                    }`}
                  >
                    {isSelected && (
                      <svg
                        className="w-2.5 h-2.5 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                      </svg>
                    )}
                  </span>
                  <span>{isSelected ? "선택됨" : "비교 담기"}</span>
                </button>
              </div>

              {/* 학교 상세 페이지 이동 링크 */}
              <Link
                href={`/schools/${school.id}`}
                className="block p-6"
              >
                {/* 로고 표시 */}
                <div className="flex justify-center mb-4 mt-2">
                  <div className="relative w-[100px] h-[100px]">
                    <Image
                      src={school.logo}
                      alt={`${school.name} 로고`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* 학교 기본 정보 */}
                <h3 className="text-base font-bold mb-1 text-gray-800">
                  {school.name}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">
                    {school.info["고교 유형"]}
                  </span>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium">
                    {school.info["설립 구분"]}
                  </span>
                  <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-medium">
                    {school.info["남녀 구분"]}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-2 truncate">
                  {school.info["주소"]}
                </p>

                {/* 호버 시 강조 애니메이션 */}
                <div
                  className="absolute bottom-0 right-0 w-[60px] h-[60px] bg-[#2A7DE1] 
                             rounded-tl-[50px] flex justify-center items-center 
                             translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 
                             transition-all duration-300 ease-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-white translate-x-0.5 translate-y-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          );
        })}
      </section>

      {/* 리스트 하단 비교하기 버튼 */}
      {selectedSchools.length > 0 && (
        <div className="max-w-[1200px] mx-auto px-6 mb-8 flex justify-center">
          <button
            type="button"
            onClick={handleCompare}
            disabled={selectedSchools.length < 2}
            className={`text-sm md:text-base font-semibold px-8 py-3.5 rounded-xl transition-all flex items-center gap-2 shadow-sm ${
              selectedSchools.length >= 2
                ? "bg-[#2A7DE1] hover:bg-blue-600 text-white cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <span>선택한 {selectedSchools.length}개 학교 정보 비교하기</span>
            {selectedSchools.length < 2 ? (
              <span className="text-xs font-normal text-gray-500">
                (2개 이상 선택 필요)
              </span>
            ) : (
              <span>→</span>
            )}
          </button>
        </div>
      )}

      {/* 푸터 */}
      <Footer />
    </main>
  );
}
