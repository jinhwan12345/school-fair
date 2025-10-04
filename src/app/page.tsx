// src/app/page.tsx
export default function Home() {
  return (
    <main className="flex flex-col items-center bg-white text-gray-900">
      {/* 헤더 */}
      <header className="w-full border-b">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center space-x-2">
            <div className="font-bold text-lg text-blue-700">(재)수성미래교육재단</div>
          </div>
          <nav className="flex space-x-8 text-sm font-semibold">
            <a href="#" className="hover:text-blue-600">관내 고등학교 안내</a>
            <a href="#" className="hover:text-blue-600">관내 고등학교 교육과정</a>
            <a href="#" className="hover:text-blue-600">대학별 입시정보</a>
            <a href="#" className="hover:text-blue-600">대학 입시 관련 TIP</a>
          </nav>
        </div>
      </header>

      {/* 메인 배너 */}
      <section className="w-full bg-gray-100 py-10 border-b">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6">
          <div className="w-[60%] h-[200px] bg-gray-300 flex items-center justify-center text-lg font-medium">
            배너 이미지 영역
          </div>
          <div className="w-[35%] h-[200px] bg-gray-400 flex items-center justify-center text-white font-semibold">
            도시락 배너 영역
          </div>
        </div>
      </section>

      {/* 콘텐츠 본문 */}
      <section className="max-w-[1200px] mx-auto py-12 px-6 grid grid-cols-12 gap-4">
        {/* 좌측 학교 리스트 */}
        <div className="col-span-3 flex flex-col space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 flex items-center justify-center rounded">
              학교 로고 {i + 1}
            </div>
          ))}
        </div>

        {/* 중앙 지도 영역 */}
        <div className="col-span-6 flex justify-center items-center">
          <div className="w-full aspect-square bg-gray-300 flex items-center justify-center text-xl font-bold">
            지도 영역
          </div>
        </div>

        {/* 우측 학교 리스트 */}
        <div className="col-span-3 flex flex-col space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 flex items-center justify-center rounded">
              학교 로고 {i + 7}
            </div>
          ))}
        </div>
      </section>

      {/* 푸터 */}
      <footer className="w-full bg-blue-900 text-white text-sm py-6 mt-8">
        <div className="max-w-[1200px] mx-auto text-center leading-6 px-6">
          <div className="flex justify-center space-x-8 mb-2">
            <span>대구광역시교육청</span>
            <span>교육부</span>
            <span>대구광역시동부교육지원청</span>
            <span>대구광역시의회 교육위원회</span>
          </div>
          <p>[42027] 대구광역시 수성구 달구벌대로 2451(범어동) 범어도서관 5층 대표전화: 053)668-7311 / 팩스: 053)668-7399</p>
          <p className="mt-1">COPYRIGHT © Suseong Future Education Foundation. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}
