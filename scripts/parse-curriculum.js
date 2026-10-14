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
  '정화여자고등학교': 'junghwa'
};

function normalizeGroup(rawGroup) {
  if (!rawGroup) return '기타';
  const g = String(rawGroup).replace(/[\r\n\s]+/g, ' ').trim();
  if (g.includes('국어')) return '국어';
  if (g.includes('수학')) return '수학';
  if (g.includes('영어')) return '영어';
  if (g.includes('사회') || g.includes('역사') || g.includes('도덕')) return '사회';
  if (g.includes('과학')) return '과학';
  if (g.includes('체육')) return '체육';
  if (g.includes('예술') || g.includes('음악') || g.includes('미술')) return '예술';
  if (g.includes('제2외국어') || g.includes('한문') || g.includes('일본어') || g.includes('중국어')) return '제2외국어/한문';
  if (g.includes('정보') || g.includes('기술') || g.includes('가정')) return '기술·가정/정보';
  if (g.includes('교양') || g.includes('철학') || g.includes('심리') || g.includes('논술')) return '교양';
  if (g.includes('농림') || g.includes('건축') || g.includes('식품') || g.includes('경영') || g.includes('화학공업')) return '전문교과';
  return g;
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
    const rawGrp = r['(군)'];
    const stdGrp = normalizeGroup(rawGrp);
    const grp = String(r['교과'] || '').trim();
    const isElective = (r['구분'] && String(r['구분']).includes('선택')) || grp.includes('선택');

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
      rawGroup: String(rawGrp || '').replace(/[\r\n\s]+/g, ' ').trim(),
      standardGroup: stdGrp,
      subjectType: r['과목 유형'] || '',
      subjectName: String(r['과목 '] || '').trim(),
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
