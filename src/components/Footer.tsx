interface FooterProps {
  className?: string;
}

export default function Footer({ className = "mt-8" }: FooterProps) {
  return (
    <footer className={`w-full bg-[#2A7DE1] text-white text-xs md:text-sm py-6 ${className}`}>
      <div className="max-w-[1200px] mx-auto text-center leading-6 px-4 md:px-6">
        <p>
          [42027] 대구광역시 수성구 달구벌대로 2451(범어동) 범어도서관 5층 대표전화: 053)668-7311 / 팩스: 053)668-7399
        </p>
        <p className="mt-1">
          COPYRIGHT© SUSEONG FUTURE EDUCATION FOUNDATION. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
