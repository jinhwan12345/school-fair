"use client";

import Image from "next/image";

export default function ImagePopup({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative w-[90vw] max-w-[550px] bg-transparent rounded-xl overflow-hidden shadow-lg"
        onClick={(e) => e.stopPropagation()} // 바깥 클릭 닫힘 방지
      >
        {/* ✅ 팝업 이미지 */}
        <Image
          src="/curriculum/open-soon.png" // 👈 오픈 예정 이미지 경로
          alt="오픈 예정"
          width={550}
          height={650}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
    </div>
  );
}
