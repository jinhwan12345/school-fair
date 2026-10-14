const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const excelPath = path.join(process.cwd(), 'public/curriculum/total_curriculum.xlsx');
if (!fs.existsSync(excelPath)) {
  console.error('File not found:', excelPath);
  process.exit(1);
}

const wb = xlsx.readFile(excelPath);
const ws = wb.Sheets['데이터'];
if (!ws) {
  console.error('Sheet "데이터" not found in total_curriculum.xlsx');
  process.exit(1);
}

const rawData = xlsx.utils.sheet_to_json(ws);

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

function normalizeGroup(rawGroup, subjectName) {
  let g = rawGroup ? String(rawGroup).replace(/[\r\n\s]+/g, ' ').trim() : '';
  const s = subjectName ? String(subjectName).trim() : '';

  if (g.includes('국어') || s.includes('국어') || s.includes('문학') || s.includes('독서') || s.includes('화법') || s.includes('언어') || s.includes('문장론') || s.includes('의사소통')) return '국어';
  if (g.includes('수학') || s.includes('수학') || s.includes('대수') || s.includes('미적분') || s.includes('확률과 통계') || s.includes('기하') || s.includes('통계')) return '수학';
  if (g.includes('영어') || s.includes('영어') || s.includes('영미')) return '영어';
  if (g.includes('사회') || g.includes('역사') || g.includes('도덕') || s.includes('한국사') || s.includes('사회') || s.includes('지리') || s.includes('역사') || s.includes('윤리') || s.includes('경제') || s.includes('정치') || s.includes('세계사')) return '사회';
  if (g.includes('과학') || s.includes('과학') || s.includes('물리') || s.includes('화학') || s.includes('생명') || s.includes('지구') || s.includes('역학과') || s.includes('전자기')) return '과학';
  if (g.includes('체육') || s.includes('체육') || s.includes('스포츠') || s.includes('운동')) return '체육';
  if (g.includes('예술') || g.includes('음악') || g.includes('미술') || s.includes('음악') || s.includes('미술') || s.includes('연극')) return '예술';
  if (g.includes('제2외국어') || g.includes('한문') || s.includes('일본어') || s.includes('중국어') || s.includes('한문') || s.includes('한자')) return '제2외국어/한문';
  if (g.includes('정보') || g.includes('기술') || g.includes('가정') || s.includes('정보') || s.includes('인공지능') || s.includes('프로그래밍') || s.includes('데이터 과학') || s.includes('소프트웨어')) return '기술·가정/정보';
  if (g.includes('교양') || s.includes('철학') || s.includes('심리') || s.includes('논술') || s.includes('생태와 환경') || s.includes('보건') || s.includes('진로') || s.includes('프로젝트') || s.includes('창의융합')) return '교양';
  if (g.includes('농림') || g.includes('건축') || g.includes('식품') || g.includes('경영') || g.includes('화학공업') || g.includes('전문')) return '전문교과';
  return g || '기타';
}

const semCols = [
  { key: '1학년 1학기', grade: 1, term: 1, short: '1-1' },
  { key: '1학년 2학기', grade: 1, term: 2, short: '1-2' },
  { key: '2학년 1학기', grade: 2, term: 1, short: '2-1' },
  { key: '2학년 2학기', grade: 2, term: 2, short: '2-2' },
  { key: '3학년 1학기', grade: 3, term: 1, short: '3-1' },
  { key: '3학년 2학기', grade: 3, term: 2, short: '3-2' }
];

const schools = [...new Set(rawData.map(r => r['학교']))];
const allParsed = [];

schools.forEach(school => {
  const rows = rawData.filter(r => r['학교'] === school);

  const electiveGroupSems = {};
  rows.forEach(r => {
    const grp = String(r['교과'] || '').trim();
    const isElective = (r['구분'] && String(r['구분']).includes('선택')) || grp.includes('선택');
    if (isElective && grp) {
      if (!electiveGroupSems[grp]) electiveGroupSems[grp] = {};
      semCols.forEach(sc => {
        const val = r[sc.key];
        if (val !== undefined && val !== null && String(val).trim() !== '') {
          if (!electiveGroupSems[grp][sc.key]) {
            electiveGroupSems[grp][sc.key] = String(val).trim();
          }
        }
      });
    }
  });

  rows.forEach((r, idx) => {
    const subjectName = String(r['과목'] || r['과목 '] || '').trim();
    const rawGrp = r['(군)'];
    const stdGrp = normalizeGroup(rawGrp, subjectName);
    const grp = String(r['교과'] || '').trim();
    const isElective = (r['구분'] && String(r['구분']).includes('선택')) || grp.includes('선택');
    const departmentTrack = r['학과/과정'] ? String(r['학과/과정']).trim() : null;

    const semesters = [];
    semCols.forEach(sc => {
      const val = r[sc.key];
      if (val !== undefined && val !== null && String(val).trim() !== '') {
        semesters.push({
          semester: sc.key,
          short: sc.short,
          grade: sc.grade,
          term: sc.term,
          value: String(val).trim(),
          isDirect: true
        });
      } else if (isElective && electiveGroupSems[grp] && electiveGroupSems[grp][sc.key]) {
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
