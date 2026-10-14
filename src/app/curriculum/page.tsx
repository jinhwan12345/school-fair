"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import curriculumRawData from "@/data/curriculumData.json";

interface SemesterInfo {
  semester: string;
  short: string;
  grade: number;
  term: number;
  value: string;
  isDirect: boolean;
}

interface CurriculumSubject {
  id: string;
  school: string;
  schoolId: string;
  category: string;
  groupBlock: string;
  rawGroup: string;
  standardGroup: string;
  subjectType: string;
  subjectName: string;
  departmentTrack?: string | null;
  defaultCredit: number | null;
  operatingCredit: number | null;
  semesters: SemesterInfo[];
  semesterSummary: string;
}

const curriculumData: CurriculumSubject[] = curriculumRawData as CurriculumSubject[];

// 16개 고등학교 목록 (2026학년도 입학생 기준)
const curriculumSchools = [
  { id: "kyungbuk", name: "경북고등학교" },
  { id: "kyungshin", name: "경신고등학교" },
  { id: "neungin", name: "능인고등학교" },
  { id: "namsan", name: "대구남산고등학교" },
  { id: "daegu-agri-meister", name: "대구농업마이스터고등학교" },
  { id: "daegu-girls", name: "대구여자고등학교" },
  { id: "daegu-jungang", name: "대구중앙고등학교" },
  { id: "hyehwa", name: "대구혜화여자고등학교" },
  { id: "daeryun", name: "대륜고등학교" },
  { id: "deokwon", name: "덕원고등학교" },
  { id: "dongmun", name: "동문고등학교" },
  { id: "suseong", name: "수성고등학교" },
  { id: "siji", name: "시지고등학교" },
  { id: "oseong", name: "오성고등학교" },
  { id: "yeongnam-tech", name: "영남공업고등학교" },
  { id: "junghwa", name: "정화여자고등학교" },
];

// D열 교과(군) 표준 카테고리 목록 (과한 이모지 제거, 깔끔한 텍스트 탭)
const subjectGroups = [
  { key: "전체", name: "전체" },
  { key: "국어", name: "국어" },
  { key: "수학", name: "수학" },
  { key: "영어", name: "영어" },
  { key: "사회", name: "사회(역사/도덕)" },
  { key: "과학", name: "과학" },
  { key: "체육", name: "체육" },
  { key: "예술", name: "예술(음악/미술)" },
  { key: "기술·가정/정보", name: "기술·가정/정보" },
  { key: "제2외국어/한문", name: "제2외국어/한문" },
  { key: "교양", name: "교양" },
  { key: "전문교과", name: "전문교과" },
];

export default function CurriculumPage() {
  // 슬라이드 상태
  const [currentIndex, setCurrentIndex] = useState(0);
  const [, setDirection] = useState<"next" | "prev">("next");

  // 학교 비교 선택 상태 (기본값: 선택 없음)
  const [selectedSchoolIds, setSelectedSchoolIds] = useState<string[]>([]);

  // 교과(군) 선택 필터 (기본: 전체)
  const [selectedGroup, setSelectedGroup] = useState<string>("전체");

  // 학년 필터 (전체 / 1 / 2 / 3)
  const [selectedGrade, setSelectedGrade] = useState<number | "all">("all");

  // 과목 구분 필터 (전체 / 학교지정과목 / 학생선택과목)
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // 과목명 검색어
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // 활성 섹션 탭 (과목 비교 / 카드뉴스 및 다운로드)
  const [activeTab, setActiveTab] = useState<"compare" | "overview">("compare");

  // 카드뉴스 이미지
  const images = [
    "/curriculum/slide1.png",
    "/curriculum/slide2.png",
    "/curriculum/slide3.png",
    "/curriculum/slide4.png",
    "/curriculum/slide5.png",
    "/curriculum/slide6.png",
    "/curriculum/slide7.png",
  ];

  // 기존 PDF 다운로드용 학교 데이터
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

  // 슬라이드 이동
  const nextSlide = () => {
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setDirection("prev");
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // 학교 선택 토글
  const toggleSchoolSelection = (id: string) => {
    setSelectedSchoolIds((prev) => {
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

  // 선택된 학교 객체 목록
  const selectedSchools = useMemo(() => {
    return selectedSchoolIds
      .map((id) => curriculumSchools.find((s) => s.id === id))
      .filter(Boolean) as typeof curriculumSchools;
  }, [selectedSchoolIds]);

  // 필터링된 과목 데이터
  const filteredData = useMemo(() => {
    return curriculumData.filter((item) => {
      // 선택된 학교 여부
      if (!selectedSchoolIds.includes(item.schoolId)) return false;

      // 교과(군) 필터
      if (selectedGroup !== "전체" && item.standardGroup !== selectedGroup) {
        return false;
      }

      // 학년 필터
      if (selectedGrade !== "all") {
        const matchesGrade = item.semesters.some(
          (s) => s.grade === selectedGrade
        );
        if (!matchesGrade) return false;
      }

      // 과목 구분 필터
      if (selectedCategory !== "all") {
        if (selectedCategory === "학교지정" && !item.category.includes("지정")) {
          return false;
        }
        if (selectedCategory === "학생선택" && !item.category.includes("선택")) {
          return false;
        }
      }

      // 검색어 필터
      if (searchKeyword.trim()) {
        const kw = searchKeyword.trim().toLowerCase();
        const nameMatch = item.subjectName.toLowerCase().includes(kw);
        const groupMatch = item.rawGroup.toLowerCase().includes(kw);
        const typeMatch = item.subjectType.toLowerCase().includes(kw);
        const trackMatch = item.departmentTrack?.toLowerCase().includes(kw);
        if (!nameMatch && !groupMatch && !typeMatch && !trackMatch) return false;
      }

      return true;
    });
  }, [
    selectedSchoolIds,
    selectedGroup,
    selectedGrade,
    selectedCategory,
    searchKeyword,
  ]);

  // 교과(군)별 과목 개수 계산 (탭 뱃지용)
  const groupCounts = useMemo(() => {
    const counts: Record<string, number> = { 전체: 0 };
    subjectGroups.forEach((g) => {
      if (g.key !== "전체") counts[g.key] = 0;
    });

    curriculumData.forEach((item) => {
      if (selectedSchoolIds.includes(item.schoolId)) {
        counts["전체"] = (counts["전체"] || 0) + 1;
        if (counts[item.standardGroup] !== undefined) {
          counts[item.standardGroup] += 1;
        }
      }
    });

    return counts;
  }, [selectedSchoolIds]);

  // 현재 표시할 교과(군) 그룹 목록
  const activeGroups = useMemo(() => {
    if (selectedGroup === "전체") {
      return subjectGroups
        .filter((g) => g.key !== "전체")
        .filter((g) => (groupCounts[g.key] || 0) > 0);
    }
    return subjectGroups.filter((g) => g.key === selectedGroup);
  }, [selectedGroup, groupCounts]);

  return (
    <main className="flex flex-col bg-[#f8fafc] text-gray-900 min-h-screen">
      <Header />

      {/* 상단 헤더 타이틀 */}
      <section className="w-full bg-[#2A7DE1] text-white py-6 shadow-xs">
        <div className="max-w-[1240px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold bg-white/20 text-white px-2 py-0.5 rounded">
                  2026학년도 입학생 기준
                </span>
                <span className="text-xs text-blue-100">
                  3개년간 교육과정 편성표
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                수성구 고등학교 교육과정
              </h1>
              <p className="text-blue-100 text-xs md:text-sm mt-1">
                학교별 개설 과목, 교과군(국·수·영 등) 분류 및 이수 학년·학기 상세 비교
              </p>
            </div>

            {/* 상단 탭 전환 버튼 */}
            <div className="inline-flex rounded-lg bg-blue-900/30 p-1 border border-blue-300/30 self-start md:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab("compare")}
                className={`px-4 py-2 rounded-md text-xs md:text-sm font-semibold transition cursor-pointer ${
                  activeTab === "compare"
                    ? "bg-white text-[#2A7DE1] shadow-xs"
                    : "text-white hover:text-blue-100"
                }`}
              >
                학교별 과목 비교
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-2 rounded-md text-xs md:text-sm font-semibold transition cursor-pointer ${
                  activeTab === "overview"
                    ? "bg-white text-[#2A7DE1] shadow-xs"
                    : "text-white hover:text-blue-100"
                }`}
              >
                카드뉴스 및 편제표 다운로드
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 1. 학교별 과목 비교 섹션 */}
      {activeTab === "compare" && (
        <section className="max-w-[1240px] w-full mx-auto px-4 md:px-6 py-7">
          {/* 학교 선택 컨트롤 패널 */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-xs p-5 md:p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-5 bg-[#2A7DE1] rounded-sm"></span>
                <div>
                  <h2 className="text-base md:text-lg font-bold text-gray-900">
                    비교할 고등학교 선택
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    비교할 학교를 선택하세요 (최대 4개교 동시 비교)
                  </p>
                </div>
              </div>

              {/* 선택된 학교 태그 바 */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-semibold bg-blue-50 text-[#2A7DE1] px-2.5 py-1 rounded-full border border-blue-200">
                  {selectedSchools.length}개교 선택
                </span>
                {selectedSchools.map((s) => (
                  <span
                    key={s.id}
                    className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-full border border-gray-300 font-medium"
                  >
                    <span>{s.name}</span>
                    <button
                      type="button"
                      onClick={() => toggleSchoolSelection(s.id)}
                      className="hover:text-red-500 text-gray-400 font-bold leading-none cursor-pointer"
                      title="선택 해제"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {selectedSchools.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedSchoolIds([])}
                    className="text-xs text-gray-400 hover:text-gray-600 underline cursor-pointer ml-1"
                  >
                    초기화
                  </button>
                )}
                {selectedSchools.length === 0 && (
                  <span className="text-xs text-gray-400">
                    아래에서 학교를 클릭하세요
                  </span>
                )}
              </div>
            </div>

            {/* 16개 학교 선택 그리드 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 mt-4">
              {curriculumSchools.map((school) => {
                const isSelected = selectedSchoolIds.includes(school.id);
                return (
                  <button
                    key={school.id}
                    type="button"
                    onClick={() => toggleSchoolSelection(school.id)}
                    className={`flex items-center gap-2 p-2 rounded-lg border text-left transition duration-150 cursor-pointer ${
                      isSelected
                        ? "bg-blue-50/80 border-[#2A7DE1] text-[#2A7DE1] font-bold shadow-2xs ring-1 ring-blue-200"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <div className="relative w-6 h-6 flex-shrink-0 bg-white rounded p-0.5 border border-gray-100">
                      <Image
                        src={`/schools/${school.id}/logo.png`}
                        alt={`${school.name} 로고`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-[11px] truncate flex-1 leading-tight">
                      {school.name}
                    </span>
                    {isSelected && (
                      <span className="w-3.5 h-3.5 rounded-full bg-[#2A7DE1] text-white flex items-center justify-center text-[9px] font-black flex-shrink-0">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 학교 미선택 상태 */}
          {selectedSchools.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500 shadow-xs">
              <h3 className="text-base font-bold text-gray-800">
                비교할 고등학교를 선택해주세요
              </h3>
              <p className="text-xs text-gray-500 mt-1.5">
                상단의 16개 고등학교 중 원하는 학교를 클릭하면 교과군별 편성 과목 및 이수 학기를 실시간으로 비교할 수 있습니다.
              </p>
            </div>
          ) : (
            <>
              {/* 2. 교과(군) 탭 및 상세 필터 */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-xs p-5 md:p-6 mb-6">
                <div className="flex flex-col gap-4">
                  {/* 교과(군) 탭 */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-4 bg-gray-600 rounded-xs"></span>
                        <span className="text-xs md:text-sm font-bold text-gray-800">
                          교과(군) 선택
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        선택 학교 개설 과목:{" "}
                        <strong className="text-[#2A7DE1]">
                          {filteredData.length}개
                        </strong>
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {subjectGroups.map((group) => {
                        const count = groupCounts[group.key] || 0;
                        const isSelected = selectedGroup === group.key;
                        if (group.key !== "전체" && count === 0) return null;

                        return (
                          <button
                            key={group.key}
                            type="button"
                            onClick={() => setSelectedGroup(group.key)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 cursor-pointer ${
                              isSelected
                                ? "bg-[#2A7DE1] text-white shadow-2xs font-bold"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            <span>{group.name}</span>
                            <span
                              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                                isSelected
                                  ? "bg-white/25 text-white"
                                  : "bg-gray-200 text-gray-600"
                              }`}
                            >
                              {count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 세부 필터 (학년, 구분, 과목명 검색) */}
                  <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-3 border-t border-gray-100">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-gray-500 font-medium">필터:</span>
                      {/* 학년 필터 */}
                      <div className="inline-flex rounded-md bg-gray-100 p-0.5 border border-gray-200">
                        <button
                          type="button"
                          onClick={() => setSelectedGrade("all")}
                          className={`px-2 py-1 rounded text-xs font-medium cursor-pointer ${
                            selectedGrade === "all"
                              ? "bg-white text-gray-900 shadow-2xs font-bold"
                              : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          전체 학년
                        </button>
                        {[1, 2, 3].map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setSelectedGrade(g)}
                            className={`px-2 py-1 rounded text-xs font-medium cursor-pointer ${
                              selectedGrade === g
                                ? "bg-white text-gray-900 shadow-2xs font-bold"
                                : "text-gray-600 hover:text-gray-900"
                            }`}
                          >
                            {g}학년
                          </button>
                        ))}
                      </div>

                      {/* 구분 필터 */}
                      <div className="inline-flex rounded-md bg-gray-100 p-0.5 border border-gray-200">
                        <button
                          type="button"
                          onClick={() => setSelectedCategory("all")}
                          className={`px-2 py-1 rounded text-xs font-medium cursor-pointer ${
                            selectedCategory === "all"
                              ? "bg-white text-gray-900 shadow-2xs font-bold"
                              : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          전체 구분
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedCategory("학교지정")}
                          className={`px-2 py-1 rounded text-xs font-medium cursor-pointer ${
                            selectedCategory === "학교지정"
                              ? "bg-white text-[#2A7DE1] shadow-2xs font-bold"
                              : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          학교지정
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedCategory("학생선택")}
                          className={`px-2 py-1 rounded text-xs font-medium cursor-pointer ${
                            selectedCategory === "학생선택"
                              ? "bg-white text-purple-600 shadow-2xs font-bold"
                              : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          학생선택
                        </button>
                      </div>
                    </div>

                    {/* 과목명 검색창 */}
                    <div className="relative min-w-[200px]">
                      <input
                        type="text"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        placeholder="과목명 검색 (예: 미적분, 물리...)"
                        className="w-full text-xs pl-3 pr-7 py-1.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 bg-white"
                      />
                      {searchKeyword && (
                        <button
                          type="button"
                          onClick={() => setSearchKeyword("")}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. 과목 비교 메인 뷰 */}
              <div className="space-y-6">
                {activeGroups.map((group) => {
                  return (
                    <div
                      key={group.key}
                      className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden"
                    >
                      {/* 교과군 헤더 */}
                      <div className="bg-gray-50 px-5 py-3 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#2A7DE1]"></span>
                          <h3 className="font-bold text-gray-900 text-sm md:text-base">
                            {group.name}
                          </h3>
                        </div>
                        <span className="text-xs text-gray-500">
                          개설 {filteredData.filter((d) => d.standardGroup === group.key).length}개 과목
                        </span>
                      </div>

                      {/* 학교별 병렬 열 (Side by Side) */}
                      <div
                        className={`grid divide-y md:divide-y-0 md:divide-x divide-gray-200 ${
                          selectedSchools.length === 1
                            ? "grid-cols-1"
                            : selectedSchools.length === 2
                            ? "grid-cols-1 md:grid-cols-2"
                            : selectedSchools.length === 3
                            ? "grid-cols-1 md:grid-cols-3"
                            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                        }`}
                      >
                        {selectedSchools.map((school) => {
                          const schoolSubjects = filteredData.filter(
                            (item) =>
                              item.schoolId === school.id &&
                              item.standardGroup === group.key
                          );

                          return (
                            <div key={school.id} className="flex flex-col bg-white">
                              {/* 학교 열 헤더 */}
                              <div className="p-3 bg-gray-50/70 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
                                <div className="flex items-center gap-2 min-w-0">
                                  <div className="relative w-5 h-5 flex-shrink-0 bg-white rounded p-0.5 border border-gray-200">
                                    <Image
                                      src={`/schools/${school.id}/logo.png`}
                                      alt={`${school.name} 로고`}
                                      fill
                                      className="object-contain"
                                    />
                                  </div>
                                  <span className="font-bold text-xs text-gray-900 truncate">
                                    {school.name}
                                  </span>
                                </div>
                                <span className="text-[11px] font-semibold text-[#2A7DE1] bg-blue-50 px-2 py-0.5 rounded flex-shrink-0 border border-blue-100">
                                  {schoolSubjects.length}과목
                                </span>
                              </div>

                              {/* 과목 리스트 */}
                              <div className="p-3 space-y-2 flex-1 min-h-[100px]">
                                {schoolSubjects.length === 0 ? (
                                  <div className="h-full min-h-[80px] flex items-center justify-center text-xs text-gray-400 bg-gray-50/40 rounded-lg border border-dashed border-gray-200 p-3 text-center">
                                    개설 과목 없음
                                  </div>
                                ) : (
                                  schoolSubjects.map((subject) => {
                                    const isDesignated = subject.category.includes("지정");

                                    return (
                                      <div
                                        key={subject.id}
                                        className="p-2.5 rounded-lg border border-gray-200 bg-white hover:border-[#2A7DE1]/60 hover:shadow-2xs transition flex flex-col gap-1.5"
                                      >
                                        {/* 1행: 과목명 및 뱃지 */}
                                        <div className="flex items-start justify-between gap-1.5">
                                          <div className="flex flex-col min-w-0">
                                            <span className="font-bold text-xs text-gray-900 leading-snug">
                                              {subject.subjectName}
                                            </span>
                                            {subject.departmentTrack && (
                                              <span className="text-[10px] text-gray-500 truncate">
                                                {subject.departmentTrack}
                                              </span>
                                            )}
                                          </div>
                                          <div className="flex items-center gap-1 flex-shrink-0">
                                            <span
                                              className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                                                isDesignated
                                                  ? "bg-blue-50 text-[#2A7DE1] border border-blue-100"
                                                  : "bg-purple-50 text-purple-700 border border-purple-100"
                                              }`}
                                            >
                                              {isDesignated ? "지정" : "선택"}
                                            </span>
                                            {subject.subjectType && (
                                              <span className="text-[10px] font-normal px-1 py-0.2 rounded bg-gray-100 text-gray-600">
                                                {subject.subjectType}
                                              </span>
                                            )}
                                          </div>
                                        </div>

                                        {/* 2행: 이수 학년 및 학기 */}
                                        <div className="bg-gray-50 p-1.5 rounded border border-gray-100">
                                          <div className="flex flex-wrap gap-1">
                                            {subject.semesters.length > 0 ? (
                                              subject.semesters.map((sem, sIdx) => {
                                                const gradeColor =
                                                  sem.grade === 1
                                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                    : sem.grade === 2
                                                    ? "bg-blue-50 text-[#2A7DE1] border-blue-200"
                                                    : "bg-purple-50 text-purple-700 border-purple-200";

                                                return (
                                                  <span
                                                    key={sIdx}
                                                    className={`inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded border ${gradeColor}`}
                                                  >
                                                    <span>{sem.semester}</span>
                                                    <span className="text-[9px] opacity-80 font-normal">
                                                      ({sem.isDirect ? `${sem.value}학점` : `선택:${sem.value}`})
                                                    </span>
                                                  </span>
                                                );
                                              })
                                            ) : (
                                              <span className="text-[10px] text-gray-400">
                                                {subject.semesterSummary}
                                              </span>
                                            )}
                                          </div>
                                        </div>

                                        {/* 3행: 운영학점 및 편제군 */}
                                        <div className="flex items-center justify-between text-[10px] text-gray-500 pt-0.5">
                                          <span className="truncate max-w-[120px]">
                                            {subject.groupBlock || ""}
                                          </span>
                                          <span className="font-medium text-gray-700 flex-shrink-0">
                                            운영:{" "}
                                            <strong>
                                              {subject.operatingCredit ?? subject.defaultCredit ?? "-"}
                                            </strong>
                                            학점
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  })
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </section>
      )}

      {/* 2. 카드뉴스 및 편제표 다운로드 섹션 */}
      {activeTab === "overview" && (
        <section className="max-w-[1200px] w-full mx-auto px-4 py-12 flex flex-col lg:flex-row justify-between items-start gap-10">
          {/* 카드뉴스 슬라이드 */}
          <div className="relative flex justify-center items-center w-full lg:w-[620px] h-[620px] bg-gray-100 rounded-xl overflow-hidden shadow-xs">
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

            <button
              onClick={prevSlide}
              aria-label="이전 카드뉴스"
              className="absolute left-3 bg-white/80 rounded-full p-2.5 shadow hover:bg-white transition cursor-pointer text-xs"
            >
              ◀
            </button>
            <button
              onClick={nextSlide}
              aria-label="다음 카드뉴스"
              className="absolute right-3 bg-white/80 rounded-full p-2.5 shadow hover:bg-white transition cursor-pointer text-xs"
            >
              ▶
            </button>
          </div>

          {/* 학교별 PDF 및 통합 파일 다운로드 리스트 */}
          <div className="flex flex-col w-full lg:w-[480px] items-center">
            {/* 통합 엑셀 다운로드 */}
            <div className="flex items-center justify-between bg-[#f3bd8c] border border-[#f3bd8c] rounded-xl px-4 h-[60px] shadow-xs transition hover:brightness-105 group w-full mb-[10px]">
              <div className="flex items-center justify-center gap-2 font-bold text-white text-sm text-center">
                통합 3개년 교육과정 편성표 (Excel)
              </div>
              <a
                href="/curriculum/total_curriculum.xlsx"
                download
                aria-label="전체 교육과정 다운로드"
                className="p-1 cursor-pointer"
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

            {/* 학교 목록 */}
            <div className="grid grid-cols-2 gap-[10px] w-full">
              {[...schoolsLeft, ...schoolsRight.filter((s) => s.eng !== "daegu-science")]
                .slice(0, 16)
                .map((school) => (
                  <div
                    key={school.eng}
                    className="flex items-center justify-between border border-gray-300 rounded-xl px-3 h-[60px] bg-white shadow-2xs transition group hover:border-[#2A7DE1]"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Image
                        src={`/schools/${school.eng}/logo.png`}
                        alt={`${school.name} 로고`}
                        width={26}
                        height={26}
                      />
                      <span className="text-xs md:text-sm font-medium truncate">
                        {school.name}
                      </span>
                    </div>
                    <a
                      href={`/curriculum/${school.eng}.pdf`}
                      download
                      aria-label={`${school.name} 교육과정 다운로드`}
                      className="p-1 cursor-pointer"
                    >
                      <Image
                        src="/icons/download_icon.svg"
                        alt="다운로드 아이콘"
                        width={22}
                        height={22}
                        className="transition-colors duration-200 group-hover:brightness-0 group-hover:invert-[0.6] group-hover:sepia group-hover:saturate-[10] group-hover:hue-rotate-[330deg] group-hover:brightness-100"
                      />
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* 푸터 */}
      <Footer className="mt-auto" />
    </main>
  );
}
