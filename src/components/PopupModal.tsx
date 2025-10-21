"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function PopupModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // 오늘 날짜(예: 2025-10-21)
    const today = new Date().toISOString().split("T")[0];

    // localStorage에서 마지막으로 본 날짜 가져오기
    const lastShown = localStorage.getItem("popupLastShown");

    // 오늘 본 적이 없다면 팝업 표시
    if (lastShown !== today) {
      setIsOpen(true);
      localStorage.setItem("popupLastShown", today);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg overflow-hidden shadow-lg max-w-[400px]">
        {/* 닫기 버튼 */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 text-white bg-black/40 hover:bg-black/70 rounded-full w-8 h-8 flex items-center justify-center z-10"
        >
          ✕
        </button>

        {/* 팝업 이미지 클릭 시 설문 링크로 이동 */}
        <a
          href="https://forms.gle/9S729KHYFbtkzsJt9"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/popup.png"
            alt="만족도 조사 참여 안내"
            width={400}
            height={500}
            className="object-contain w-full h-auto"
          />
        </a>
      </div>
    </div>
  );
}
