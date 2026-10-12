import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { universities } from "@/data/universities";

interface AdmissionDetailProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return universities.map((u) => ({
    id: u.eng,
  }));
}

export default async function AdmissionDetailPage({
  params,
}: AdmissionDetailProps) {
  const { id } = await params;
  const univ = universities.find((u) => u.eng === id);

  if (!univ) return notFound();

  return (
    <main className="bg-[#f9f9f9] min-h-screen font-['Noto_Sans_KR'] text-gray-900 flex flex-col">
      <Header />

      {/* 상단 블루 타이틀 */}
      <section className="w-full bg-[#2A7DE1] text-white py-3 text-left font-semibold text-sm md:text-base tracking-tight">
        <div className="max-w-[1200px] mx-auto px-6">
          대학별 입시정보 &gt; <span className="font-normal">{univ.title}</span>
        </div>
      </section>

      {/* 본문 (이미지 제외하고 텍스트 및 버튼 배치) */}
      <section className="max-w-[850px] w-full mx-auto py-16 px-6 flex flex-col items-center flex-grow">
        {/* 학교명 배지 */}
        <span className="inline-block bg-blue-50 text-[#2A7DE1] text-xs sm:text-sm font-semibold px-3.5 py-1 rounded-full mb-4 border border-blue-100">
          {univ.name}
        </span>

        {/* 제목 */}
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center leading-snug break-keep">
          {univ.title}
        </h1>

        {/* 내용 */}
        <p className="mt-6 text-gray-600 text-center leading-relaxed text-base sm:text-lg max-w-[750px] whitespace-pre-line break-keep">
          {univ.content}
        </p>

        {/* 버튼 영역 */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-[360px] sm:max-w-none">
          <a
            href={univ.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-44 h-11 inline-flex items-center justify-center bg-[#2A7DE1] text-white rounded-lg font-semibold hover:bg-blue-600 transition-all shadow-sm text-sm sm:text-base"
          >
            대학교 바로가기
          </a>

          <Link
            href="/admission_info"
            className="w-full sm:w-44 h-11 inline-flex items-center justify-center border border-[#2A7DE1] text-[#2A7DE1] rounded-lg font-semibold hover:bg-[#2A7DE1] hover:text-white transition-all text-sm sm:text-base"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </section>

      {/* 푸터 */}
      <Footer />
    </main>
  );
}
