"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { schoolsData } from "@/app/data/schoolsData";

function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL에서 전달된 schools 파라미터 파싱
  const initialSchoolsParam = searchParams.get("schools");
  const parsedIds = initialSchoolsParam
    ? initialSchoolsParam
        .split(",")
        .map((s) => s.trim())
        .filter((id) => schoolsData.some((s) => s.id === id))
    : [];

  // 기본적으로 최소 2개 학교가 선택되도록 설정 (파라미터 없으면 앞의 2개 학교)
  const defaultSelection =
    parsedIds.length >= 2
      ? parsedIds.slice(0, 4)
      : parsedIds.length === 1
      ? [
          parsedIds[0],
          schoolsData.find((s) => s.id !== parsedIds[0])?.id || "kyungshin",
        ]
      : [schoolsData[0]?.id || "kyungbuk", schoolsData[1]?.id || "kyungshin"];

  const [selectedIds, setSelectedIds] = useState<string[]>(defaultSelection);

  // URL query 동기화
  useEffect(() => {
    if (parsedIds.length >= 2) {
      setSelectedIds(parsedIds.slice(0, 4));
    }
  }, [initialSchoolsParam]);

  const updateUrl = (ids: string[]) => {
    const params = new URLSearchParams();
    if (ids.length > 0) {
      params.set("schools", ids.join(","));
    }
    router.replace(`/schools/compare?${params.toString()}`);
  };

  // 학교 변경
  const handleSchoolChange = (index: number, newId: string) => {
    if (selectedIds.includes(newId)) {
      alert("이미 비교 목록에 있는 학교입니다.");
      return;
    }
    const next = [...selectedIds];
    next[index] = newId;
    setSelectedIds(next);
    updateUrl(next);
  };

  // 학교 추가
  const handleAddSchool = (newId: string) => {
    if (!newId) return;
    if (selectedIds.includes(newId)) {
      alert("이미 비교 목록에 있는 학교입니다.");
      return;
    }
    if (selectedIds.length >= 4) {
      alert("학교 비교는 최대 4개교까지 가능합니다.");
      return;
    }
    const next = [...selectedIds, newId];
    setSelectedIds(next);
    updateUrl(next);
  };

  // 학교 삭제
  const handleRemoveSchool = (idToRemove: string) => {
    if (selectedIds.length <= 2) {
      alert("학교 비교를 위해 최소 2개 이상의 학교를 유지해주세요.");
      return;
    }
    const next = selectedIds.filter((id) => id !== idToRemove);
    setSelectedIds(next);
    updateUrl(next);
  };

  const selectedSchools = selectedIds
    .map((id) => schoolsData.find((s) => s.id === id))
    .filter(Boolean) as typeof schoolsData;

  const availableSchools = schoolsData.filter(
    (s) => !selectedIds.includes(s.id)
  );

  // 비교 항목 정의
  const comparisonFields = [
    { key: "고교 유형", label: "고교 유형" },
    { key: "설립 구분", label: "설립 구분" },
    { key: "남녀 구분", label: "남녀 구분" },
    { key: "선발 시기", label: "선발 시기" },
    { key: "입학자 선정 유형", label: "입학자 선정" },
    { key: "설립 유형", label: "설립 유형" },
    { key: "설립 일자", label: "설립 일자" },
    { key: "고교 특성화", label: "고교 특성화" },
    { key: "관할 교육청", label: "관할 교육청" },
    { key: "대표 번호", label: "대표 번호" },
    { key: "주소", label: "학교 주소" },
    { key: "홈페이지", label: "홈페이지" },
  ];

  return (
    <main className="bg-[#f8f9fa] min-h-screen font-['Noto_Sans_KR'] text-gray-900 pb-20">
      <Header />

      {/* 상단 브레드크럼 및 타이틀 */}
      <section className="w-full bg-[#2A7DE1] text-white py-4 font-semibold text-base md:text-lg tracking-tight shadow-inner">
        <div className="max-w-[1280px] mx-auto px-6 flex justify-between items-center">
          <div>수성구 고등학교 비교</div>
          <Link
            href="/schools_info"
            className="text-xs md:text-sm bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
          >
            <span>←</span> 학교 목록으로
          </Link>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-8">
        {/* 컨트롤 패널 */}
        <div className="bg-white rounded-2xl p-5 mb-6 border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-[#2A7DE1] font-bold text-sm">
              {selectedSchools.length}
            </span>
            <div>
              <h2 className="font-bold text-gray-800 text-base">
                선택된 학교 비교 ({selectedSchools.length}/4)
              </h2>
              <p className="text-xs text-gray-500">
                원하는 학교를 2개에서 최대 4개까지 선택하여 주요 정보를 한눈에 비교할 수 있습니다.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {selectedSchools.length < 4 && availableSchools.length > 0 && (
              <div className="flex items-center gap-2">
                <select
                  aria-label="비교할 학교 추가 선택"
                  onChange={(e) => {
                    handleAddSchool(e.target.value);
                    e.target.value = "";
                  }}
                  defaultValue=""
                  className="text-xs md:text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white hover:border-[#2A7DE1] focus:outline-none focus:ring-2 focus:ring-[#2A7DE1]/20 transition-all text-gray-700 cursor-pointer"
                >
                  <option value="" disabled>
                    + 비교할 학교 추가
                  </option>
                  {availableSchools.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* 모바일 가로 스크롤 힌트 */}
        <div className="md:hidden text-xs text-gray-500 mb-3 flex items-center gap-1.5 justify-end">
          <svg className="w-4 h-4 text-[#2A7DE1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          <span>좌우로 스크롤하여 비교할 수 있습니다</span>
        </div>

        {/* 비교 테이블 컨테이너 */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table
              className="w-full border-collapse table-fixed"
              style={{ minWidth: `${Math.max(680, 120 + selectedSchools.length * 190)}px` }}
            >
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="w-[110px] min-w-[110px] md:w-[160px] md:min-w-[160px] p-3 md:p-4 text-left font-bold text-xs md:text-sm text-gray-600 bg-gray-100/70 border-r border-gray-200 md:sticky md:left-0 md:z-20">
                    비교 항목
                  </th>
                  {selectedSchools.map((school, idx) => (
                    <th
                      key={school.id}
                      className="min-w-[185px] md:min-w-[210px] p-3 md:p-5 text-center align-top border-r border-gray-200 last:border-r-0 relative"
                      style={{ width: `${(100 - 15) / selectedSchools.length}%` }}
                    >
                      {/* 학교 교체 셀렉트박스 & 삭제 버튼 */}
                      <div className="flex items-center justify-between gap-1.5 mb-3 w-full">
                        <div className="flex-1 min-w-0">
                          <select
                            aria-label={`${school.name} 학교 변경 선택`}
                            value={school.id}
                            onChange={(e) => handleSchoolChange(idx, e.target.value)}
                            className="w-full min-w-0 text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white hover:border-[#2A7DE1] focus:outline-none focus:ring-1 focus:ring-[#2A7DE1] text-gray-700 truncate cursor-pointer shadow-2xs"
                          >
                            {schoolsData.map((s) => (
                              <option
                                key={s.id}
                                value={s.id}
                                disabled={selectedIds.includes(s.id) && s.id !== school.id}
                              >
                                {s.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveSchool(school.id)}
                          className="shrink-0 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full w-6 h-6 flex items-center justify-center transition-colors text-xs"
                          title="비교에서 제거"
                          aria-label={`${school.name} 비교에서 제거`}
                        >
                          ✕
                        </button>
                      </div>

                      {/* 로고 */}
                      <div className="relative w-[80px] h-[80px] mx-auto mb-3">
                        <Image
                          src={school.logo}
                          alt={`${school.name} 로고`}
                          fill
                          className="object-contain"
                        />
                      </div>

                      {/* 학교명 */}
                      <h3 className="font-bold text-base md:text-lg text-[#0f0c57] mb-2">
                        {school.name}
                      </h3>

                      {/* 주요 태그 */}
                      <div className="flex flex-wrap gap-1 justify-center mb-3">
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                          {school.info["고교 유형"]}
                        </span>
                        <span
                          className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${
                            school.info["설립 구분"] === "공립"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-purple-50 text-purple-700 border-purple-200"
                          }`}
                        >
                          {school.info["설립 구분"]}
                        </span>
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border-amber-200">
                          {school.info["남녀 구분"]}
                        </span>
                      </div>

                      {/* 바로가기 버튼들 */}
                      <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        <Link
                          href={`/schools/${school.id}`}
                          className="text-xs bg-[#2A7DE1] hover:bg-blue-600 text-white font-medium px-3 py-1.5 rounded-lg transition-colors text-center shadow-sm"
                        >
                          학교 상세안내
                        </Link>
                        <a
                          href={`/curriculum/${school.id}.pdf`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-1.5 rounded-lg transition-colors text-center border border-gray-200 flex items-center justify-center gap-1"
                        >
                          <span>📄</span> 교육과정 PDF
                        </a>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs md:text-sm">
                {comparisonFields.map((field, rIdx) => (
                  <tr
                    key={field.key}
                    className={`hover:bg-blue-50/30 transition-colors ${
                      rIdx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    }`}
                  >
                    <td className="w-[110px] min-w-[110px] md:w-[160px] md:min-w-[160px] p-3 md:p-4 font-semibold text-gray-700 bg-gray-100/70 border-r border-gray-200 md:sticky md:left-0 md:z-10">
                      {field.label}
                    </td>
                    {selectedSchools.map((school) => {
                      const val = (school.info as Record<string, string>)[field.key] || "-";

                      return (
                        <td
                          key={school.id}
                          className="min-w-[185px] md:min-w-[210px] p-3 md:p-4 text-center border-r border-gray-200 last:border-r-0 text-gray-800"
                        >
                          {field.key === "홈페이지" && val !== "-" ? (
                            <a
                              href={val}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#2A7DE1] hover:underline font-medium inline-flex items-center gap-1 break-all"
                            >
                              <span>홈페이지 바로가기</span>
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          ) : field.key === "대표 번호" && val !== "-" ? (
                            <a
                              href={`tel:${val}`}
                              className="text-gray-800 hover:text-[#2A7DE1] font-medium hover:underline"
                            >
                              {val}
                            </a>
                          ) : field.key === "주소" && val !== "-" ? (
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-gray-700 leading-relaxed text-xs">{val}</span>
                              <a
                                href={`https://map.naver.com/v5/search/${encodeURIComponent(school.name)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[11px] text-[#2A7DE1] hover:underline inline-flex items-center gap-0.5 mt-0.5"
                              >
                                <span>지도에서 찾기</span> ↗
                              </a>
                            </div>
                          ) : field.key === "고교 유형" || field.key === "설립 구분" || field.key === "남녀 구분" ? (
                            <span className="inline-block font-semibold text-gray-900 bg-gray-100 px-2.5 py-0.5 rounded">
                              {val}
                            </span>
                          ) : (
                            <span className="text-gray-700">{val}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 하단 네비게이션 버튼 */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
          <Link
            href="/schools_info"
            className="w-full sm:w-auto text-center bg-gray-800 hover:bg-gray-900 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm"
          >
            ← 학교 목록으로 돌아가기
          </Link>
          <Link
            href="/curriculum"
            className="w-full sm:w-auto text-center bg-[#2A7DE1] hover:bg-blue-600 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm"
          >
            3개년 교육과정 종합 보기 →
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] text-gray-600">
          비교 화면을 불러오는 중입니다...
        </div>
      }
    >
      <CompareContent />
    </Suspense>
  );
}
