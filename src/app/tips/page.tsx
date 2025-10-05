"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

export default function TipsPage() {
  const videos = [
    {
      id: "1",
      title: "쌈밥, 전쟁을 부르다!!!",
      youtubeId: "abcdEFGH123",
      thumbnail: "https://img.youtube.com/vi/abcdEFGH123/0.jpg",
    },
    {
      id: "2",
      title: "입시 면접 꿀팁 대방출!",
      youtubeId: "ijklMNOP456",
      thumbnail: "https://img.youtube.com/vi/ijklMNOP456/0.jpg",
    },
    {
      id: "3",
      title: "자기소개서, 이렇게 쓰면 합격!",
      youtubeId: "mnopQRST789",
      thumbnail: "https://img.youtube.com/vi/mnopQRST789/0.jpg",
    },
  ];

  return (
    <main className="bg-[#f9f9f9] min-h-screen font-['Noto_Sans_KR'] text-gray-900">
      <Header />

      {/* 상단 블루 타이틀 */}
      <section className="w-full bg-[#2A7DE1] text-white py-3 text-left px-6 font-semibold text-sm md:text-base tracking-tight">
        대학 입시 관련 TIP
      </section>

      {/* 썸네일 리스트 */}
      <section className="max-w-[1200px] mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {videos.map((video) => (
          <Link
            key={video.id}
            href={`/tips/${video.id}`}
            className="group relative block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* 썸네일 이미지 */}
            <div className="relative w-full h-0 pb-[56.25%] overflow-hidden">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110 group-hover:brightness-75"
              />
            </div>

            {/* 오버레이 텍스트 (부드럽게 등장) */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 via-black/30 to-transparent 
                            text-white px-4 py-3 translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 
                            transition-all duration-500 ease-out">
              <p className="text-sm md:text-base font-semibold">{video.title}</p>
            </div>

            {/* 하단 경계선 애니메이션 */}
            <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-[#2A7DE1] group-hover:w-full transition-all duration-500 ease-out" />
          </Link>
        ))}
      </section>
    </main>
  );
}
