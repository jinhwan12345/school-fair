// src/data/tips.ts

export const tips = [
  // 새로 추가할 영상들
  {
    id: 1,
    title: "2028 대학입시제도 개편 확정안 핵심사항 6가지",
    youtubeId: "Sbx6MWhC71c",
    description: "2028년 대입 제도 개편의 핵심 6가지 정리",
  },
  {
    id: 2,
    title: "현재 중3(2027 대입) 과연 수능 얼마나 불리할까?",
    youtubeId: "8t7uY_mgJ6s",
    description: "2027 대입을 앞둔 중3 학생들이 수능에서 직면할 변화 분석",
  },
  {
    id: 3,
    title: "국가교육위원회 2028 대입제도개편시안 관련 권고안 분석",
    youtubeId: "mFYIdVjWino",
    description: "2028 대입 개편안에 대한 국가교육위원회 권고안 해설",
  },
  {
    id: 4,
    title: "2022 개정교육과정 완전 정리 해드립니다. 현 고1 부터는 꼭 시청하세요!",
    youtubeId: "HwvJgbQYNkk",
    description: "2022 개정 교육과정의 핵심 포인트 총정리",
  },
  {
    id: 5,
    title: "대학에서 원하는 수행평가 역량은 '이것'이다? 대학이 밝힌 '수행평가'의 '핵심 역량'",
    youtubeId: "nCcigddcq1M",
    description: "대학이 원하는 수행평가 핵심 역량 분석",
  },
  {
    id: 6,
    title: "고등학교 '수상' 중요한가요? 수상이력 생기부에서 효율적으로 작성하는 방법",
    youtubeId: "mKTCIQRRKkY",
    description: "수상이력, 생기부에 효과적으로 기록하는 방법",
  },
];

// 썸네일 자동 생성 함수
export const getTipsWithThumbnail = () => {
  return tips.map((tip) => ({
    ...tip,
    thumbnail: `https://img.youtube.com/vi/${tip.youtubeId}/maxresdefault.jpg`,
  }));
};
