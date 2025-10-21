"use client";

import Image from "next/image";
import Header from "@/components/Header";
import { universities } from "@/data/universities";

export default function AdmissionInfoPage() {
  return (
    <main className="flex flex-col items-center bg-white text-gray-900 min-h-screen">
      <Header />

      <section className="w-full bg-[#2A7DE1] text-white py-4 font-semibold text-lg tracking-tight">
        <div className="max-w-[1200px] mx-auto px-6 text-left">
          대학별 권장과목 안내
        </div>
      </section>

      <section className="max-w-[1200px] w-full px-4 py-12">
        <div className="space-y-4">
          {universities.map((u) => (
            <div
              key={u.eng}
              className="flex items-center justify-between border border-gray-300 rounded-lg px-5 py-3 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={`/universities/${u.eng}.png`}
                  alt={`${u.name} 로고`}
                  width={40}
                  height={40}
                />
                <span className="font-semibold text-gray-800">{u.name}</span>
                <span className="text-gray-600 text-sm">{u.title}</span>
              </div>

              <a
                href={u.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2A7DE1] border border-[#2A7DE1] rounded-full px-3 py-1 text-sm hover:bg-[#2A7DE1] hover:text-white transition"
              >
                바로가기
              </a>
            </div>
          ))}
        </div>
      </section>

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
