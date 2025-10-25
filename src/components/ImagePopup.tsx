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
        className="relative w-[90vw] h-[90vh] max-w-[800px] max-h-[600px] bg-transparent"
        onClick={(e) => e.stopPropagation()} // 바깥 클릭 닫힘 방지
      >
        <Image
          src="/curriculum/open-soon.png" // 👈 오픈 예정 이미지 경로
          alt="오픈 예정"
          fill
          className="object-contain"
          priority
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/80 rounded-full p-2 text-lg"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
