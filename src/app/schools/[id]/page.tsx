import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { schoolsData } from "@/app/data/schoolsData";
import Header from "@/components/Header";

interface SchoolDetailProps {
  params: {
    id: string;
  };
}

export default function SchoolDetail({ params }: SchoolDetailProps) {
  const { id } = params;
  const school = schoolsData.find((s) => s.id === id);

  if (!school) return notFound();

  // ✅ main.png.png 대응 처리
  const detailImagePath = school.mainImage.endsWith(".png.png")
  ? school.mainImage
  : school.mainImage.replace(".png", ".png.png");

  return (
    <main className="bg-white min-h-screen font-['Noto_Sans_KR'] text-gray-900">
      <Header />

      {/* 상단 타이틀 */}
      <section className="w-full bg-[#2A7DE1] text-white py-3 text-left font-semibold text-sm md:text-base tracking-tight">
        <div className="max-w-[1200px] mx-auto px-6">
          수성구 고등학교 안내 &gt; <span className="font-normal">{school.name}</span>
        </div>
      </section>

      {/* 본문: 로고 + 정보 */}
      <section className="max-w-[1000px] mx-auto flex flex-col md:flex-row items-start justify-start gap-10 py-10 px-6 border-b">
        {/* 로고 */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/3">
          <div className="relative w-[200px] h-[200px] mb-3 border">
            <Image src={school.logo} alt={school.name} fill className="object-contain" />
          </div>
          <h2 className="font-bold text-lg text-[#2A7DE1] mt-2">
            ■ {school.name}
          </h2>
        </div>

        {/* 표 */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm md:text-[15px] w-full md:w-2/3">
          {Object.entries(school.info).map(([label, value]) => (
            <div key={label} className="flex items-start">
              <span className="font-semibold w-[100px] shrink-0 text-gray-700">{label}</span>
              {label === "홈페이지" ? (
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2A7DE1] hover:underline break-all"
                >
                  {value}
                </a>
              ) : (
                <span className="text-gray-700">{value}</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ✅ 상세 이미지 */}
        <section className="max-w-[1000px] mx-auto py-10 px-6 flex flex-col items-center">
        <div className="w-full border rounded-lg overflow-hidden shadow-sm">
            <Image
            src={detailImagePath}
            alt={`${school.name} 상세 이미지`}
            width={1000} // 콘텐츠 영역 폭
            height={0}   // 비율 자동 조정
            sizes="100vw"
            style={{ width: "100%", height: "auto" }} // ✅ 폭 맞추고 높이는 자동
            className="object-cover"
            />
        </div>
        </section>

      {/* 돌아가기 버튼 */}
      <div className="flex justify-center mb-12">
        <Link
          href="/schools_info"
          className="bg-[#2A7DE1] hover:bg-[#1f6bc2] text-white text-sm font-semibold px-6 py-2.5 rounded-md transition-colors"
        >
          ← 학교 목록으로 돌아가기
        </Link>
      </div>

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
