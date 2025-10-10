// src/data/tips.ts
export const tips = [
  {
    id: 1,
    title: "내신 자사/특목고는 생기부 특성을 살려야합니다. 관리 꿀팁",
    youtubeId: "vWNMmcjiHz0",
    description: "학교 특성 살리며 생기부 만들고 입시 전략까지 세워보기‼️",
  },
  {
    id: 2,
    title: "지난해 우리 학교 수행평가는 무엇이었을까?",
    youtubeId: "geJgtQNbHgc",
    description: "지난해 우리 학교에서 했던 수행평가 확인하고 등급까지 추정해보기?",
  },
];

// ✅ 썸네일 자동 생성 함수
export const getTipsWithThumbnail = () => {
  return tips.map((tip) => ({
    ...tip,
    thumbnail: `https://img.youtube.com/vi/${tip.youtubeId}/maxresdefault.jpg`,
  }));
};
