export interface University {
  name: string;
  eng: string;
  title: string;
  link: string;
  content: string;
}

export const universities: University[] = [
  {
    name: "건국대학교",
    eng: "konkuk",
    title: "2028학년도 입학전형 시행계획",
    link: "https://admission.konkuk.ac.kr/bbs/admission/6282/1201658/artclView.do?layout=unknown",
    content: "건국대학교 입학처에서 발표한 2028학년도 모입학전형 시행계획입니다.수시 및 정시 모집의 전형별 선발 인원, 지원 자격, 전형 방법과 수능 최저학력기준 등 2028학년도 신입생 선발에 대한 전반적인 기준과 주요 안내 사항을 수록하고 있습니다.",
  },
  {
    name: "경북대학교",
    eng: "knu",
    title: "2028학년도 고교 과목 선택 가이드",
    link: "https://ipsi1.knu.ac.kr/notice/view.php?bn=60552&m_type=&nPage=1&f=&s=",
    content: "경북대학교에서 2028학년도 이후 대입을 준비하는 고등학생을 위해 제공하는 고교 과목 선택 가이드입니다. 인문사회, 자연과학, 공학, 의약학 등 주요 단과대학별 전공 연계 핵심과목과 권장과목의 상세 리스트 및 학생부종합전형 평가 시 반영 방안을 수록하고 있습니다.",
  },
  {
    name: "경희대학교",
    eng: "khu",
    title: "2028학년도 자연계열 학문분야의 고등학교 교과 이수 권장과목",
    link: "https://iphak.khu.ac.kr/detail.do?menuurl=hB8GYKGYSI7BBlNJFDXa%2BQ%3D%3D&board_seq=16401&pageNo=1&categoryid=&userpwd=",
    content: "경희대학교 자연계열 모집단위(공과대학, 소프트웨어융합대학, 이과대학, 의·약학계열 등) 진학을 희망하는 학생들을 위한 교과 이수 권장과목 안내입니다. 미적분, 기하, 물리학, 화학, 생명과학 등 전공별 필수 및 권장 과목을 구체적으로 제시합니다.",
  },
  {
    name: "고려대학교",
    eng: "korea",
    title: "2028학년도 자연계열 모집단위별 권장이수과목 안내",
    link: "https://oku.korea.ac.kr/oku/cms/FR_BBS_CON/BoardView.do?pageNo=1&pagePerCnt=10&MENU_ID=750&CONTENTS_NO=1&SITE_NO=2&BOARD_SEQ=5&BBS_SEQ=1727&PWD=&CATE_SEQ=&SEARCH_FLD=&SEARCH=#;",
    content: "고려대학교 2028학년도 자연계열 단과대학 및 학과별 고교 권장이수과목 가이드입니다. 고교학점제 시행 및 2022 개정 교육과정 체제 하에서 학업역량 및 전공적합성을 평가하는 핵심 기준을 명시하고 있습니다.",
  },
  {
    name: "동국대학교",
    eng: "dongguk",
    title: "2028학년도 동국대학교 대학입학전형 시행계획",
    link: "https://ipsi.dongguk.edu/admission/html/counsel/notice.asp#",
    content: "동국대학교 입학처에서 안내하는 2028학년도 대학입학전형 시행계획입니다. 수시 및 정시 모집의 전형별 선발 인원, 지원 자격, 전형 방법과 수능 최저학력기준 등 2028학년도 신입생 선발에 대한 전반적인 기준과 주요 안내 사항을 수록하고 있습니다.",
  },
  {
    name: "부산대학교",
    eng: "pusan",
    title: "2028학년도 입학생 대상 고교 과목 선택 가이드 안내",
    link: "https://go.pusan.ac.kr/college_2016/pages/index.asp?p=50&b=B_1_1&bn=48588&m=read&nPage=1&ct=&con_cate_02=&f=ALL&s=",
    content: "부산대학교 2028학년도 신입생 대상 단과대학별 교과목 선택 가이드입니다. 각 학과 진학에 권장되는 수학, 과학, 사회 등 고교 교과목 이수 권장안과 종합전형 서류평가 시 연계 평가 방식을 상세히 안내합니다.",
  },
  {
    name: "서울과학기술대학교",
    eng: "seoultech",
    title: "2028학년도 모집단위별 이수 권장과목 안내",
    link: "https://admission.seoultech.ac.kr/cms/FR_BBS_CON/BoardView.do?MENU_ID=380&CONTENTS_NO=1&SITE_NO=2&BOARD_SEQ=3&BBS_SEQ=454#;",
    content: "서울과학기술대학교의 공과대학, 정보통신대학, 에너지바이오대학 등 주요 이공계열 모집단위별 이수 권장과목 안내입니다. 이공계 인재 양성을 위한 수학·과학 핵심 교과목 선택 가이드를 제시합니다.",
  },
  {
    name: "서울대학교",
    eng: "snu",
    title: "2028학년도 전공 연계 과목 선택 안내",
    link: "https://admission.snu.ac.kr/undergraduate/notice?md=v&bbsidx=156194",
    content: "서울대학교 2028학년도 전공 연계 핵심권장과목 및 권장과목 안내 자료입니다. 학과별로 지원 자격 또는 학생부종합전형 서류평가에서 권장하는 고교 이수 과목을 구체적으로 제시하며, 고교 교육과정 편성 및 과목 선택의 나침반 역할을 합니다.",
  },
  {
    name: "숙명여자대학교",
    eng: "sookmyung",
    title: "(홍보책자)숙명여자대학교 학과탐색가이드_2025",
    link: "https://www.sookmyung.ac.kr/kr/news/pr-booklet.do?mode=list&article.offset=0",
    content: "숙명여자대학교 학과탐색가이드북입니다. 2025 개정 교육과정의 보통교과 편제에 맞추어 인문, 사회, 자연, 공학계열 각 학과별 특징과 고교 재학 중 이수를 권장하는 교과목 및 진로 로드맵을 체계적으로 수록하고 있습니다.",
  },
  {
    name: "전남대학교",
    eng: "jnu",
    title: "2022 개정 교육과정용 학생부종합전형 모집단위 관련 교과",
    link: "https://admission.jnu.ac.kr/WebApp/web/HOM/COM/Board/board.aspx?boardID=393&bbsMode=view&page=0&key=1807",
    content: "전남대학교 학생부종합전형 지원자를 위한 2022 개정 교육과정 모집단위별 관련 교과 안내입니다. 전공 분야별로 고등학교에서 수강하면 학업 역량 평가에 유리한 권장 이수 과목과 관련 보통교과 목록을 포함합니다.",
  },
  {
    name: "전북대학교",
    eng: "jbnu",
    title: "2028학년도 학생부종합전형 모집단위별 전공참고교과(안)",
    link: "https://enter.jbnu.ac.kr/detail.do?search_key=title&searchNo=&searchtext=&menuurl=69HsiUDd88Yz%2F6q8AbV4%2BA%3D%3D&board_seq=39362&pageNo=1&categoryid=22&value=",
    content: "전북대학교 2028학년도 학생부종합전형 모집단위별 전공참고교과(안) 게시글입니다. 고교학점제 선택과목 편성 시 참고할 수 있도록 학과별로 기초 학업 수행에 필요한 교과군을 안내하고 있습니다.",
  },
  {
    name: "중앙대학교",
    eng: "cau",
    title: "2028학년도 대학입학전형 학문단위별 이수 권장과목 안내(자연계열)",
    link: "https://admission.cau.ac.kr/detail.do?menuurl=bmyV1ovIAzYtqDXLjUSVtw%3D%3D&board_seq=3092&pageNo=2&categoryid=0",
    content: "중앙대학교 자연계열 학문단위별 고교 이수 권장과목 안내 자료입니다. AI학과, 소프트웨어학부, 전자전기공학부, 의학부 등 주요 모집단위의 수학·과학 교과 권장 이수 가이드를 담고 있습니다.",
  },
  {
    name: "충남대학교",
    eng: "cnu",
    title: "2028학년도 학생부종합전형 권장 이수 과목 안내",
    link: "https://ipsi.cnu.ac.kr/_prog/_board/?mode=V&no=2022174&code=notice_faculty&site_dvs_cd=uadm&menu_dvs_cd=0101&skey=&sval=&site_dvs=&post_dvs_cd=&GotoPage=",
    content: "충남대학교 입학본부에서 안내하는 2028학년도 학생부종합전형 대비 권장 이수 과목 가이드입니다. 학과별 핵심과목 및 권장과목의 명칭과 과목 선택 요령을 체계적으로 정리했습니다.",
  },
  {
    name: "충북대학교",
    eng: "cbnu",
    title: "2028학년도 모집단위별 관련 교과 안내",
    link: "https://ipsi.chungbuk.ac.kr/kor/BBSMSTR_000000000001/21872/view.do",
    content: "충북대학교 2028학년도 입시를 위한 단과대학 및 모집단위별 전공 관련 고교 교과목 안내입니다. 학생부종합전형에서 학생의 전공 탐색 노력과 학업 기초소양을 확인하기 위한 과목 목록을 제공합니다.",
  },
  {
    name: "한국외국어대학교",
    eng: "hufs",
    title: "2027학년도 전공 가이드북",
    link: "https://adms.hufs.ac.kr/cms/FrCon/index.do?MENU_ID=340#;",
    content: "한국외국어대학교 입학처에서 발행한 2027학년도 전공 가이드북입니다. 학과별 주요 필요역량, 권장소양, 졸업 후 진로를 안내합니다.",
  },
  {
    name: "단국대학교(죽전캠퍼스)",
    eng: "dankook_jukjeon",
    title: "단국대학교 (죽전캠퍼스) 2028학년도 모집단위별 이수 권장 과목 안내",
    link: "https://ipsi.dankook.ac.kr/jukjeon/notice/list.html?bbsid=juk_info&camp_type=&ctg_cd=&page=1&skey=&keyword=&mode=view&bltn_seq=48350",
    content: "단국대학교 죽전캠퍼스 2028학년도 모집단위별 고교 이수 권장과목 안내 공지입니다. SW융합대학, 공과대학, 사범대학 등 전공별 학업 수행에 기초가 되는 교과목 정보를 제공합니다.",
  },
  {
    name: "단국대학교(천안캠퍼스)",
    eng: "dankook_cheonan",
    title: "단국대학교 (천안캠퍼스) 2028학년도 모집단위별 이수 권장 과목 안내",
    link: "https://ipsi.dankook.ac.kr/cheonan/notice/list.html?bbsid=che_info&camp_type=&ctg_cd=&page=1&skey=&keyword=&mode=view&bltn_seq=48371",
    content: "단국대학교 천안캠퍼스 2028학년도 모집단위별 이수 권장과목 안내 공지입니다. 의예과, 치의예과, 약학과 등 보건의료계열 및 바이오 융합계열 진학을 위한 수학·과학 필수 권장과목을 다룹니다.",
  },
  {
    name: "가톨릭대학교",
    eng: "catholic",
    title: "가톨릭대학교 2027학년도 진로진학가이드북",
    link: "https://ipsi.catholic.ac.kr/detail.do?menuurl=k%2BqZC0HTrql005wmLhNoXA%3D%3D&board_seq=37814&pageNo=1&categoryid=7&userpwd=",
    content: "가톨릭대학교 입학처 발행 2027학년도 진로진학가이드북입니다. 의예과, 간호학과, 인공지능학과, 인문·사회계열 전공별 특징과 학생부종합전형 평가요소, 고교 교육과정 연계 가이드를 상세히 안내합니다.",
  },
  {
    name: "아주대학교",
    eng: "ajou",
    title: "아주대학교 「2028학년도 모집단위별 고등학교 교과 이수 권장 과목」 안내",
    link: "https://www.iajou.ac.kr/notice/view.php?bn=77457&m_type=&nPage=0&f=&s=",
    content: "아주대학교 입학처의 2028학년도 모집단위별 고교 교과 이수 권장과목 안내입니다. 첨단공학, 정보통신, 소프트웨어, 의학, 간호학 등 주요 모집단위별 수학·과학 권장 과목을 제시합니다.",
  },
  {
    name: "연세대학교",
    eng: "yonsei",
    title: "2028학년도 전공연계과목 선택 가이드라인 안내",
    link: "https://admission.yonsei.ac.kr/seoul/admission/html/counsel/notice.asp",
    content: "연세대학교 2028학년도 전공연계과목 선택 가이드라인 안내입니다. 분야별 이수 권장 과목을 상세히 확인할 수 있습니다.",
  },
  {
    name: "국립부경대학교",
    eng: "pknu",
    title: "2027학년도 국립부경대학교 대입전형 가이드북",
    link: "https://iphak.pknu.ac.kr/pknu/board/board.htm?bbsid=notice&ctg_cd=all&ctg_nm=&page=1&skey=&keyword=&con_ctg_cd=&mode=view&code=iphak_help&bltn_seq=1207",
    content: "국립부경대학교 입학처에서 발행한 2027학년도 대입전형 가이드북입니다. 2027학년도에 신설되는 AX혁신대학 안내를 비롯해 평생학습자전형 신설 등 주요 입학전형 변경 사항, 학생부교과 및 학생부종합전형 평가 방법, 학과별 전형 결과 등 대입 준비를 위한 상세 가이드를 제공합니다.",
  },
];
