import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { schoolsData } from "@/app/data/schoolsData";
import Header from "@/components/Header";

// ✅ params 타입 명시
interface SchoolDetailProps {
  params: {
    id: string;
  };
}

export default function SchoolDetail({ params }: SchoolDetailProps) {
  const { id } = params;
  const school = schoolsData.find((s) => s.id === id);

  if (!school) return notFound();

  const infoEntries = Object.entries(school.info);

  return (
    <main className="bg-[#f9f9f9] min-h-screen font-['Noto_Sans_KR'] text-gray-900">
      <Header />

      {/* 상단 타이틀 */}
      <section className="w-full bg-[#2A7DE1] text-white py-4 font-semibold text-lg tracking-tight">
        <div className="max-w-[1200px] mx-auto px-6">{school.name}</div>
      </section>

      {/* 메인 콘텐츠 */}
      <section className="max-w-[1200px] mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row items-start gap-10">
          {/* 왼쪽: 학교 대표 이미지 + 로고 */}
          <div className="flex flex-col items-center w-full lg:w-1/2">
            <div className="relative w-full h-[300px] mb-6">
              <Image
                src={school.mainImage}
                alt={`${school.name} 대표 이미지`}
                fill
                className="object-contain rounded-md border"
              />
            </div>

            <div className="relative w-[120px] h-[120px]">
              <Image
                src={school.logo}
                alt={`${school.name} 로고`}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* 오른쪽: 정보 표 */}
          <div className="w-full lg:w-1/2 bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm border-collapse">
              <tbody>
                {infoEntries.map(([key, value], index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="py-3 px-4 font-medium text-gray-700 w-1/3">
                      {key}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ✅ 표 하단 상세 이미지 추가 */}
        <div className="mt-12 w-full flex justify-center">
          <div className="relative w-full max-w-[900px] h-[500px] border rounded-lg overflow-hidden shadow-sm">
            <Image
              src={school.mainImage}
              alt={`${school.name} 상세 이미지`}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* 돌아가기 버튼 */}
        <div className="flex justify-center mt-10">
          <Link
            href="/schools_info"
            className="bg-[#2A7DE1] hover:bg-[#1f6bc2] text-white text-sm font-semibold px-6 py-2.5 rounded-md transition-colors"
          >
            ← 학교 목록으로 돌아가기
          </Link>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="w-full bg-[#2A7DE1] text-white text-xs md:text-sm py-6 mt-8">
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
