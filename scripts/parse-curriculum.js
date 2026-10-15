const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const excelPath = path.join(process.cwd(), 'public/curriculum/total_curriculum.xlsx');
if (!fs.existsSync(excelPath)) {
  console.error('File not found:', excelPath);
  process.exit(1);
}

const wb = xlsx.readFile(excelPath, { cellStyles: true });
const ws = wb.Sheets['데이터'];
if (!ws) {
  console.error('Sheet "데이터" not found in total_curriculum.xlsx');
  process.exit(1);
}

const range = xlsx.utils.decode_range(ws['!ref']);
const headerMap = {};
for (let C = range.s.c; C <= range.e.c; ++C) {
  const cell = ws[xlsx.utils.encode_cell({ r: 0, c: C })];
  if (cell && cell.v) headerMap[C] = String(cell.v).trim();
}

const rawData = [];
for (let R = 1; R <= range.e.r; ++R) {
  const rowObj = { _rowIdx: R };
  let hasAnyVal = false;
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const colName = headerMap[C];
    if (!colName) continue;
    const addr = xlsx.utils.encode_cell({ r: R, c: C });
    const cell = ws[addr];
    if (cell && cell.v !== undefined) {
      rowObj[colName] = cell.v;
      hasAnyVal = true;
    }
  }
  if (hasAnyVal && rowObj['학교']) {
    rawData.push(rowObj);
  }
}

const schoolIdMap = {
  '경북고등학교': 'kyungbuk',
  '경신고등학교': 'kyungshin',
  '능인고등학교': 'neungin',
  '대구남산고등학교': 'namsan',
  '대구농업마이스터고등학교': 'daegu-agri-meister',
  '대구여자고등학교': 'daegu-girls',
  '대구중앙고등학교': 'daegu-jungang',
  '대구혜화여자고등학교': 'hyehwa',
  '대륜고등학교': 'daeryun',
  '덕원고등학교': 'deokwon',
  '동문고등학교': 'dongmun',
  '수성고등학교': 'suseong',
  '시지고등학교': 'siji',
  '오성고등학교': 'oseong',
  '영남공업고등학교': 'yeongnam-tech',
  '정화여자고등학교': 'junghwa'
};

// 232개 고교 개설 과목의 2022/2015 개정 교육과정 기준 표준 교과군 매핑 테이블
const subjectMap = {
  // 1. 국어
  '공통국어1': '국어', '공통국어2': '국어', '문학': '국어', '화법과 언어': '국어',
  '독서와 작문': '국어', '주제 탐구 독서': '국어', '주제탐구 독서': '국어',
  '주제탐구독서': '국어', '독서 토론과 글쓰기': '국어', '문학과 영상': '국어',
  '언어생활 탐구': '국어', '언어생활과 탐구': '국어', '직무 의사소통': '국어',
  '매체 의사소통': '국어',

  // 2. 수학
  '공통수학1': '수학', '공통수학2': '수학', '통합수학1': '수학', '통합수학Ⅰ': '수학',
  '대수': '수학', '미적분Ⅰ': '수학', '미적분Ⅱ': '수학', '확률과 통계': '수학',
  '기하': '수학', '경제 수학': '수학', '인공지능 수학': '수학', '직무 수학': '수학',
  '전문 수학': '수학', '실용 통계': '수학', '실용통계': '수학', '수학과 문화': '수학',
  '수학과제 탐구': '수학', '고급 대수': '수학', '고급 미적분': '수학', '이산 수학': '수학',

  // 3. 영어
  '공통영어1': '영어', '공통영어2': '영어', '영어Ⅰ': '영어', '영어Ⅱ': '영어',
  '영어 Ⅰ': '영어', '영어 Ⅱ': '영어', '영어 독해와 작문': '영어',
  '영어 발표와 토론': '영어', '미디어 영어': '영어', '세계 문화와 영어': '영어',
  '영미 문학 읽기': '영어', '실생활 영어 회화': '영어', '심화 영어': '영어',
  '심화 영어Ⅰ': '영어', '심화 영어Ⅱ': '영어', '심화 영어 독해Ⅰ': '영어',
  '심화 영어 독해와 작문': '영어', '심화영어독해와작문': '영어', '직무 영어': '영어',

  // 4. 사회 (사회(역사/도덕))
  '통합사회1': '사회', '통합사회2': '사회', '한국사1': '사회', '한국사2': '사회',
  '세계시민과 지리': '사회', '세계 시민과 지리': '사회', '세계사': '사회',
  '사회와 문화': '사회', '현대사회와 윤리': '사회', '윤리와 사상': '사회',
  '정치': '사회', '경제': '사회', '법과 사회': '사회', '한국지리 탐구': '사회',
  '도시의 미래 탐구': '사회', '동아시아 역사 기행': '사회', '동아시아 역사기행': '사회',
  '현대 세계의 변화': '사회', '역사로 탐구하는 현대 세계': '사회',
  '역사로탐구하는현대세계': '사회', '기후변화와 지속가능한 세계': '사회',
  '기후변화와\r\n지속가능한 세계': '사회', '기후변화와지속가능한세계': '사회',
  '사회문제 탐구': '사회', '금융과 경제생활': '사회', '여행지리': '사회',
  '윤리문제 탐구': '사회', '인문학과 윤리': '사회', '한국 사회의 이해': '사회',
  '국제 관계의 이해': '사회', '국제 경제': '사회', '지역 이해': '사회',
  '사회 탐구 방법': '사회', '사회과제 연구': '사회',

  // 5. 과학
  '통합과학1': '과학', '통합과학2': '과학', '과학탐구실험1': '과학',
  '과학탐구실험2': '과학', '물리학': '과학', '화학': '과학', '생명과학': '과학',
  '지구과학': '과학', '역학과 에너지': '과학', '전자기와 양자': '과학',
  '물질과 에너지': '과학', '화학 반응의 세계': '과학', '세포와 물질대사': '과학',
  '생물의 유전': '과학', '지구시스템과학': '과학', '행성우주과학': '과학',
  '융합과학 탐구': '과학', '기후변화와 환경생태': '과학', '기후변화와 환경 생태': '과학',
  '기후변화와환경생태': '과학', '과학의 역사와 문화': '과학', '고급 물리학': '과학',
  '고급 화학': '과학', '고급 생명과학': '과학', '고급 지구과학': '과학',
  '과학과제 연구': '과학', '지구과학 실험': '과학',

  // 6. 체육
  '체육1': '체육', '체육2': '체육', '스포츠 생활1': '체육', '스포츠 생활2': '체육',
  '스포츠 문화': '체육', '스포츠 문화*': '체육', '스포츠문화': '체육',
  '스포츠 과학': '체육', '스포츠 과학*': '체육', '스포츠과학': '체육',
  '기초 체육 전공 실기': '체육',

  // 7. 예술
  '음악': '예술', '미술': '예술', '음악 감상과 비평': '예술', '미술 감상과 비평': '예술',
  '미술 창작': '예술', '음악 연주와 창작': '예술', '음악연주와 창작': '예술',
  '음악연주와창작': '예술', '조형 탐구': '예술', '미술과 매체': '예술',
  '미술사': '예술', '드로잉': '예술', '미술 매체 탐구': '예술', '미술 전공 실기': '예술',
  '미술과 사회': '예술',

  // 8. 기술·가정/정보
  '기술·가정': '기술·가정/정보', '정보': '기술·가정/정보', '인공지능 기초': '기술·가정/정보',
  '로봇과 공학세계': '기술·가정/정보', '창의 공학 설계': '기술·가정/정보',
  '소프트웨어와 생활': '기술·가정/정보', '프로그래밍': '기술·가정/정보',
  '데이터 과학': '기술·가정/정보', '데이터과학': '기술·가정/정보',
  '정보과학': '기술·가정/정보', '생애 설계와 자립': '기술·가정/정보',
  '생활과학 탐구': '기술·가정/정보',

  // 9. 제2외국어/한문
  '일본어': '제2외국어/한문', '중국어': '제2외국어/한문', '심화 일본어': '제2외국어/한문',
  '심화 중국어': '제2외국어/한문', '일본어 회화': '제2외국어/한문',
  '중국어 회화': '제2외국어/한문', '일본 문화': '제2외국어/한문',
  '중국 문화': '제2외국어/한문', '한문': '제2외국어/한문', '언어생활과 한자': '제2외국어/한문',
  '한문 고전 읽기': '제2외국어/한문',

  // 10. 교양
  '인간과 철학': '교양', '인간과 심리': '교양', '인간과 경제활동': '교양',
  '생태와 환경': '교양', '논술': '교양', '보건': '교양', '논리와 사고': '교양',
  '진로와 직업': '교양', '삶과 종교': '교양', '교육의 이해': '교양',
  '창의적 문제 해결 연습': '교양', '창의융합과제연구': '교양',
  '창의융합 과제연구': '교양', '창의융합과제연구(2015)': '교양',
  '자기성장 프로젝트': '교양', '어울림 프로젝트': '교양',

  // 11. 전문교과 (마이스터고 / 특성화고 전공실무 및 전공기초)
  '성공적인 직업 생활': '전문교과', '디지털과 직업 생활': '전문교과',
  '원예': '전문교과', '농업 기계': '전문교과', '농업 기계 운전 작업': '전문교과',
  '채소 재배': '전문교과', '과수 재배': '전문교과', '농업용 기계 설치·정비': '전문교과',
  '시설원예복합환경관리Ⅰ': '전문교과', '시설원예복합환경관리Ⅱ': '전문교과',
  '농촌 체험 상품 개발': '전문교과', '농업용 전기·전자': '전문교과',
  '농업용 전기·전자 스마트 팜 운영 스마트팜기술개발': '전문교과',
  '스마트 팜 운영': '전문교과', '스마트팜기술개발': '전문교과', '시설 원예': '전문교과',
  '조경': '전문교과', '조경 시공': '전문교과', '관광 농업': '전문교과',
  '농업 토목 제도·설계': '전문교과', '조경 설계': '전문교과', '조림': '전문교과',
  '조경 관리': '전문교과', '산림 조성': '전문교과', '바이오기초기술': '전문교과',
  '미생물 배양 기술': '전문교과', '스마트원예프로젝트': '전문교과', '생명 공학 기술': '전문교과',
  '농산물 유통': '전문교과', '농업 창업 일반': '전문교과',
  '식품 가공 기술': '전문교과', '식품 과학': '전문교과', '건강 기능 식품 가공': '전문교과',
  '식품 위생': '전문교과', '식품 품질 관리': '전문교과', '식품 분석': '전문교과',
  'GMP 품질관리실무': '전문교과', '기초 제도': '전문교과', '측량 기초': '전문교과',
  '건축 설계': '전문교과', '토목 시공': '전문교과', '지적': '전문교과',
  '지게차 운전': '전문교과', '굴착기 운전': '전문교과',
  '디자인 제도': '전문교과', '컴퓨터 그래픽': '전문교과', '사무 행정': '전문교과',
  '바이오 기초 화학': '전문교과', '바이오 화학 제품 제조': '전문교과', '화학 분석': '전문교과'
};

function normalizeGroup(rawGroup, subjectName, row) {
  const g = rawGroup ? String(rawGroup).replace(/[\r\n\s]+/g, ' ').trim() : '';
  const s = subjectName ? String(subjectName).trim() : '';
  const gyo = row && row['교과'] ? String(row['교과']).trim() : '';

  // 1. 전문교과 판별 (마이스터고/특성화고 전공교과)
  if (
    gyo === '전문교과' ||
    g.includes('농림') ||
    g.includes('건축') ||
    g.includes('토목') ||
    g.includes('식품') ||
    g.includes('경영') ||
    g.includes('화학 공업') ||
    g.includes('화학공업') ||
    g.includes('전문공통') ||
    g.includes('전문') ||
    g.includes('문화·예술· 디자인·방송')
  ) {
    return '전문교과';
  }

  // 2. 학교 편성(예술 vs 국어)에 따라 갈리는 과목
  if (s === '문장론' || s === '문학 감상과 비평' || s === '문학과 매체') {
    if (g.includes('예술')) return '예술';
    return '국어';
  }

  // 3. 표준 과목 매핑 테이블 최우선 적용
  if (subjectMap[s]) {
    return subjectMap[s];
  }

  // 4. 신설 과목 또는 기타 과목을 위한 안전한 교과군 판별 (제2외국어 등 오분류 방지)
  if (g.includes('제2외국어') || g.includes('한문') || s.includes('일본어') || s.includes('중국어') || s.includes('한문')) return '제2외국어/한문';
  if (g.includes('국어') && !g.includes('외국어')) return '국어';
  if (g.includes('수학')) return '수학';
  if (g.includes('영어') && !s.includes('영미 문학')) return '영어';
  if (g.includes('사회') || g.includes('역사') || g.includes('도덕')) return '사회';
  if (g.includes('과학') && !s.includes('스포츠') && !s.includes('데이터')) return '과학';
  if (g.includes('체육') || s.includes('스포츠') || s.includes('체육')) return '체육';
  if (g.includes('예술') || g.includes('음악') || g.includes('미술')) return '예술';
  if (g.includes('정보') || g.includes('기술') || g.includes('가정')) return '기술·가정/정보';
  if (g.includes('교양')) return '교양';

  return g || '기타';
}

const semCols = [
  { key: '1학년 1학기', grade: 1, term: 1, short: '1-1', col: 8 },
  { key: '1학년 2학기', grade: 1, term: 2, short: '1-2', col: 9 },
  { key: '2학년 1학기', grade: 2, term: 1, short: '2-1', col: 10 },
  { key: '2학년 2학기', grade: 2, term: 2, short: '2-2', col: 11 },
  { key: '3학년 1학기', grade: 3, term: 1, short: '3-1', col: 12 },
  { key: '3학년 2학기', grade: 3, term: 2, short: '3-2', col: 13 }
];

const schools = [...new Set(rawData.map(r => r['학교']))];
const allParsed = [];

schools.forEach(school => {
  const rows = rawData.filter(r => r['학교'] === school);

  // 선택과목군별 대표 개설학기 수집 (텍스트나 배경색이 없는 학교/과목을 위한 폴백용)
  const electiveGroupSems = {};
  rows.forEach(r => {
    const grp = String(r['교과'] || '').trim();
    const isElective = (r['구분'] && String(r['구분']).includes('선택')) || grp.includes('선택');
    if (isElective && grp) {
      if (!electiveGroupSems[grp]) electiveGroupSems[grp] = {};
      semCols.forEach(sc => {
        const addr = xlsx.utils.encode_cell({ r: r._rowIdx, c: sc.col });
        const cell = ws[addr];
        const hasText = cell && cell.v !== undefined && cell.v !== null && String(cell.v).trim() !== '';
        const hasColor = cell && cell.s && cell.s.patternType === 'solid';
        if (hasText || hasColor) {
          if (!electiveGroupSems[grp][sc.key]) {
            electiveGroupSems[grp][sc.key] = hasText ? String(cell.v).trim() : '선택';
          }
        }
      });
    }
  });

  rows.forEach((r, idx) => {
    const subjectName = String(r['과목'] || r['과목 '] || '').trim();
    const rawGrp = r['(군)'];
    const stdGrp = normalizeGroup(rawGrp, subjectName, r);
    const grp = String(r['교과'] || '').trim();
    const isElective = (r['구분'] && String(r['구분']).includes('선택')) || grp.includes('선택');
    const departmentTrack = r['학과/과정'] ? String(r['학과/과정']).trim() : null;

    // 해당 과목 행의 셀에 텍스트가 있거나 배경색이 있는 학기만 수집
    const directSemesters = [];
    semCols.forEach(sc => {
      const addr = xlsx.utils.encode_cell({ r: r._rowIdx, c: sc.col });
      const cell = ws[addr];
      const hasText = cell && cell.v !== undefined && cell.v !== null && String(cell.v).trim() !== '';
      const hasColor = cell && cell.s && cell.s.patternType === 'solid';

      if (hasText || hasColor) {
        const val = hasText
          ? String(cell.v).trim()
          : (r['운영학점'] != null ? String(r['운영학점']).trim() : (r['기본학점'] != null ? String(r['기본학점']).trim() : '이수'));
        directSemesters.push({
          semester: sc.key,
          short: sc.short,
          grade: sc.grade,
          term: sc.term,
          value: val,
          isDirect: hasText
        });
      }
    });

    // 해당 행에 텍스트나 배경색이 있는 학기가 하나라도 있으면 그 학기들만 채택!
    // 해당 행의 6개 학기 전체에 텍스트도 배경색도 전혀 없는 경우에만(색상 미사용 학교 등) 선택군 학기 상속
    let semesters = [];
    if (directSemesters.length > 0) {
      semesters = directSemesters;
    } else if (isElective && electiveGroupSems[grp]) {
      semCols.forEach(sc => {
        if (electiveGroupSems[grp][sc.key]) {
          semesters.push({
            semester: sc.key,
            short: sc.short,
            grade: sc.grade,
            term: sc.term,
            value: electiveGroupSems[grp][sc.key],
            isDirect: false
          });
        }
      });
    }

    const summaryParts = semesters.map(s => {
      let v = s.value;
      return s.short + (s.isDirect ? '(' + v + ')' : '(선택:' + v + ')');
    });

    allParsed.push({
      id: (schoolIdMap[school] || 'school') + '-' + idx,
      school,
      schoolId: schoolIdMap[school] || school,
      category: r['구분'] || '기타',
      groupBlock: grp,
      rawGroup: rawGrp ? String(rawGrp).replace(/[\r\n\s]+/g, ' ').trim() : stdGrp,
      standardGroup: stdGrp,
      subjectType: r['과목 유형'] || '',
      subjectName,
      departmentTrack,
      defaultCredit: r['기본학점'] != null ? Number(r['기본학점']) : null,
      operatingCredit: r['운영학점'] != null ? Number(r['운영학점']) : null,
      semesters,
      semesterSummary: summaryParts.join(', ') || '이수시기 미지정'
    });
  });
});

const outDir = path.join(process.cwd(), 'src/data');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'curriculumData.json'), JSON.stringify(allParsed, null, 2), 'utf-8');
console.log('Successfully saved', allParsed.length, 'curriculum subject records to src/data/curriculumData.json');
