"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getTipsWithThumbnail } from "@/data/tips";

export default function TipDetailPage() {
  const { id } = useParams();
  const tips = getTipsWithThumbnail();
  const tip = tips.find((t) => t.id === Number(id));

  if (!tip) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen text-gray-700">
        <Header />
        <p className="mt-10">❌ 영상을 찾을 수 없습니다.</p>
        <Link href="/tips" className="text-[#2A7DE1] mt-4 underline">
          목록으로 돌아가기
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-[#f9f9f9] min-h-screen font-['Noto_Sans_KR'] text-gray-900">
      <Header />

      {/* 상단 블루 타이틀 */}
      <section className="w-full bg-[#2A7DE1] text-white py-3 text-left font-semibold text-sm md:text-base tracking-tight">
        <div className="max-w-[1200px] mx-auto px-6">
          대학 입시 관련 TIP &gt;{" "}
          <span className="font-normal">{tip.title}</span>
        </div>
      </section>

      {/* 영상 */}
      <section className="max-w-[900px] mx-auto py-10 px-6 flex flex-col items-center">
        <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${tip.youtubeId}`}
            title={tip.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <h1 className="mt-6 text-xl font-bold text-gray-800 text-center break-keep">
          {tip.title}
        </h1>
        <p className="mt-3 text-gray-600 text-center leading-relaxed break-keep">
          {tip.description}
        </p>

        <Link
          href="/tips"
          className="mt-8 inline-block px-5 py-2 border border-[#2A7DE1] text-[#2A7DE1] rounded-md font-semibold hover:bg-[#2A7DE1] hover:text-white transition-all"
        >
          목록으로 돌아가기
        </Link>
      </section>

      {/* 푸터 */}
      <Footer />
    </main>
  );
}
