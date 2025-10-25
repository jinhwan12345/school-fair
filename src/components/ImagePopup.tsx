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

        {/* ✅ 닫기 버튼 위치 수정 */}
        <button
          onClick={onClose}
          className="
            absolute -top-3 -right-3
            bg-white text-gray-800
            rounded-full shadow-md
            hover:bg-gray-200
            transition
            w-8 h-8 flex items-center justify-center
          "
        >
          ✕
        </button>
      </div>
    </div>
  );
}
