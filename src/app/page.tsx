import { schools } from "@/data/schools";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* 헤더 */}
      <header className="w-full bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">고입박람회</h1>
      </header>

      {/* 메인 배너 */}
      <section className="flex-1 flex items-center justify-center bg-gray-100 py-20">
        <h2 className="text-3xl font-semibold">
          미래를 준비하는 학생들을 위한 공간
        </h2>
      </section>

      {/* 학교 리스트 (임시) */}
      <section className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {schools.map((schools) => (
          <div key={schools.id} className="p-4 border rounded shadow">
            {schools.name}
          </div>
        ))}
      </section>

      {/* 푸터 */}
      <footer className="w-full bg-gray-800 text-white text-center py-4">
        © 2025 고입박람회
      </footer>
    </main>
  );
}
