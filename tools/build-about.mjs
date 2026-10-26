// J MEDIA 회사 소개 사이트(홈·서비스·소식·회사 정보) 정적 HTML 생성
// 구성과 비율은 about.daangn.com을 따르고, 색·이미지·폰트는 보리장터 테마(초록·보리색, Pretendard)를 쓴다.
// 사용법: node tools/build-about.mjs  (저장소 루트에서 실행, 결과 파일을 그대로 커밋)
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://jnewmedia.com';
const UTM = 'utm_source=jnewmedia&utm_medium=referral&utm_campaign=about';
const BORIBAY = `https://boribay.com/?${UTM}`;
const PLAY = 'https://play.google.com/store/apps/details?id=com.boribay.app';
const KAKAO_JMEDIA = 'https://open.kakao.com/o/scuvl1wi';
const KAKAO_BORIBAY = 'https://open.kakao.com/o/p6HiJ9Pi';
const PHONE = '010-2846-2011';
const IMG = '/assets/boribay';
const BASIS = '2026년 10월 26일 기준';

// ── 콘텐츠 ────────────────────────────────────────────────
const TOOLS = [
  ['yomiwiki', 'book', '요미위키', 'https://yomiwiki.com/', '농업 거래 지식사전', '농산물 등급·선별, 보관·출하, 농기계 점검과 거래 용어를 현장 기준으로 빠르게 찾아봅니다.'],
  ['scamreader', 'shield', '스캠판독기', 'https://scamreader.com/', '거래 안전 점검', '선입금·계좌 변경·가짜 결제 같은 직거래 위험 신호를 점검하고, 피해 후 대응 순서를 정리합니다.'],
  ['reportools', 'calc', '리포툴스', 'https://www.reportools.com/', '판매 손익 계산', '판매가와 생산·선별·포장·배송비, 수수료와 감모를 넣어 예상 이익과 손익분기 가격을 계산합니다.'],
  ['goatool', 'file', '고아툴', 'https://goatool.com/', '거래 증빙 파일 도구', '농기계 명판·인도 사진과 출하·정산 파일을 브라우저 안에서 점검하고 증빙 목록과 파일명을 정리합니다.'],
  ['occultworldcup', 'scale', '농사월드컵', 'https://occultworldcup.com/', '품종·산지·농기계 비교', '감자 품종, 사과 산지, 중고 트랙터와 농기계를 질문에 답하며 비교하고 내 거래 기준을 만듭니다.'],
  ['policyfundpedia', 'coin', '정책자금 백과', 'https://policyfundpedia.com/', '농업 정책자금 확인', '자금 공고의 대상·용도·배정·대출 심사를 따로 확인하는 기록 도구와 공고 원문 해설을 제공합니다.'],
  ['megapureunasset', 'clip', '메가푸른에셋', 'https://megapureunasset.kr/', '농기계 자산·보험 기록', '농기계 인수 상태, 정비·사고 이력과 보험 확인 사항을 기록하고, 가입 전 질문표와 사고 후 기록표를 씁니다.'],
  ['sumimap', 'pin', '스미맵', 'https://sumimap.com/', '영농폐기물 집하장 찾기', '한국환경공단 공개자료에서 전국 영농폐기물 공동집하장 주소를 지역별로 찾아보고 방문 전 확인할 것을 안내합니다.'],
  ['tripmarking', 'truck', '트립마킹', 'https://tripmarking.com/', '농기계 탁송 견적 비교', '중고 농기계를 옮기기 전에 기계 제원과 상하차 조건을 정리하고, 받은 탁송 견적을 같은 기준으로 비교합니다.'],
];

// 소식: 실제로 있었던 출시·운영 기록만 담는다 (최신순)
const NEWS = [
  {
    slug: 'daum-search-registration', date: '2026.10.26', tag: '운영', img: 'hero-768',
    title: '보리장터 등 10개 서비스, 다음 검색에 등록했습니다',
    summary: '다음 웹마스터도구에 서비스 10곳을 등록하고 사이트맵 수집을 요청했습니다.',
    body: [
      '제이 미디어가 운영하는 보리장터와 농촌 거래 도구 9곳, 모두 10개 서비스를 다음(Daum) 웹마스터도구에 등록했습니다.',
      '각 서비스의 robots.txt에 소유 확인 정보를 넣고, 사이트맵과 첫 화면 수집을 요청했습니다. 네이버와 구글에 이어 다음에서도 서비스를 찾을 수 있도록 하기 위한 작업입니다.',
      '검색 결과에 실제로 반영되기까지는 다음의 수집 일정에 따라 며칠에서 몇 주가 걸릴 수 있습니다.',
    ],
  },
  {
    slug: 'boribay-app-0-11-32', date: '2026.10.21', tag: '출시', img: 'produce-direct-sale-480',
    title: '보리장터 앱 0.11.32를 출시했습니다',
    summary: 'Google Play에서 보리장터 Android 앱 0.11.32를 정식으로 내보냈습니다.',
    body: [
      '보리장터 Android 앱 0.11.32 버전을 Google Play에 정식 출시했습니다.',
      '출시 후 실제 기기에서 앱 실행, 탭 이동, 검색과 필터, 커뮤니티, 채팅 전송, 사진 업로드를 다시 점검했습니다. 사진은 잘리거나 늘어나지 않고 정사각형 틀 안에 원본 전체가 보이도록 했습니다.',
      '앱은 Google Play에서 "보리장터"를 검색하거나 이 사이트의 앱 설치 버튼으로 받을 수 있습니다.',
    ],
  },
  {
    slug: 'boribay-chat-notification', date: '2026.10.18', tag: '업데이트', img: 'humusa-plum-480',
    title: '채팅 알림 전달 과정을 개선했습니다',
    summary: '앱을 꺼 두거나 화면이 꺼진 상태에서도 채팅 알림을 받는지 실제 기기로 확인했습니다.',
    body: [
      '보리장터 채팅 알림이 오는 과정을 실제 기기로 점검하고 서버 쪽 처리를 개선했습니다.',
      '앱을 종료했을 때, 화면이 꺼졌을 때, 절전 상태일 때 모두 채팅 알림을 받는 것과 알림을 누르면 해당 채팅방으로 이동하는 것을 확인했습니다.',
      '서버에서는 알림을 보내기 전 대기 시간을 없애고, 발송 전에 거치는 처리 단계를 줄였습니다.',
    ],
  },
  {
    slug: 'boribay-app-redesign', date: '2026.10.17', tag: '업데이트', img: 'used-cultivator-inspection-480',
    title: '보리장터 앱 화면을 새로 단장했습니다',
    summary: '큰 검색창과 둥근 카드, 하단 탐색 메뉴로 매물을 더 빨리 찾을 수 있게 했습니다.',
    body: [
      '보리장터 Android 앱의 화면을 새로 단장했습니다. 보리장터 고유의 색은 그대로 두고, 매물을 찾고 고르는 흐름을 다듬었습니다.',
      '화면 위쪽에 큰 검색창을 두고, 매물은 둥근 카드로 보여 줍니다. 하단 탐색 메뉴와 가로로 넘기는 필터, 사진 넘겨 보기, 화면 아래 고정된 거래 버튼을 넣었습니다.',
      '검색과 상세 화면에서 목록으로 돌아오는 동작은 실제 기기에서 반복해 재며 속도를 다듬었습니다.',
    ],
  },
  {
    slug: 'boribay-operator-sources', date: '2026.10.15', tag: '운영', img: 'hongro-apple-480',
    title: '보리장터 운영자·출처 정보를 보강했습니다',
    summary: '안내 글의 작성 범위, 자료 날짜, 정정 방법을 서비스 소개에 명시했습니다.',
    body: [
      '보리장터의 서비스·운영자 정보 페이지에 안내 글과 계산 도구를 어떤 기준으로 쓰는지 자세히 적었습니다.',
      '문서 수정일, 자료를 대조한 날, 원자료의 조사·발표일을 구분해 적고, 과거 게시 가격은 실제 결제액이나 현재 시세가 아니라는 점을 밝혔습니다. 계산 도구의 빈칸은 확인된 0원과 구분합니다.',
      '오류나 출처 변경은 고객센터로 제보할 수 있으며, 확인된 변경은 해당 글의 수정 이력에 남깁니다. 제이 미디어가 운영하는 다른 사이트에서 보리장터 자료로 연결할 때는 같은 운영자임을 밝힙니다.',
    ],
  },
];

const STORIES = [
  { tab: '농산물', icon: 'leaf', title: '제철 농산물을\n가까운 곳에서', text: '같은 지역에서 키운 농산물을 매물로 올리고, 필요한 사람은 동네 단위로 찾아봅니다. 궁금한 점은 채팅으로 판매자에게 바로 묻고, 직접 만나 거래합니다.', img: 'produce-direct-sale', phone: 'm-home', href: `https://boribay.com/?category=PRODUCE&${UTM}`, more: '농산물 매물 보기' },
  { tab: '중고 농기계', icon: 'tractor', title: '직접 보고 점검한 뒤\n거래해요', text: '트랙터와 관리기 같은 중고 농기계는 판매자와 방문 일정을 정해 현장에서 상태를 확인하고 거래합니다. 명판·사용시간·누유를 확인하는 순서도 안내 글로 정리해 두었어요.', img: 'used-machinery-inspection', phone: 'm-tractor', href: `https://boribay.com/?category=MACHINERY&${UTM}`, more: '농기계 매물 보기' },
  { tab: '탁송 업체', icon: 'truck', title: '산 농기계를\n옮기는 일까지', text: '농기계를 옮겨야 할 때는 지역의 탁송 업체를 찾아 연락합니다. 작업기 크기와 상차 조건, 대기료까지 같은 기준으로 견적을 비교하는 방법도 함께 볼 수 있어요.', img: 'machinery-transport', phone: 'm-transport', href: `https://boribay.com/?category=TRANSPORT&${UTM}`, more: '탁송 업체 보기' },
  { tab: '농촌생활 안내', icon: 'book', title: '농사 뒤처리까지\n함께 챙겨요', text: '영농폐기물 처리, 위탁판매, 제철 과일 고르는 법처럼 농촌 생활에 필요한 안내 글을 공식 자료를 확인해 만들고, 커뮤니티에서 이웃과 질문을 나눕니다.', img: 'farm-supplies-disposal', phone: 'm-guides', href: `https://boribay.com/guides?${UTM}`, more: '안내 글 보기' },
];

const STRIP = ['produce-direct-sale', 'used-machinery-inspection', 'hongro-apple', 'machinery-transport', 'humusa-plum', 'used-cultivator-inspection', 'farm-supplies-disposal'];

const NUMS = [
  ['운영 서비스', '보리장터와 농촌 거래 도구', 10, '개'],
  ['지원 언어', '한국어·몽골어 마켓', 2, '개'],
  ['농촌생활 안내 글', '공식 자료를 확인해 만든 무료 안내', 43, '개'],
  ['공동집하장 주소', '한국환경공단 공개자료 기준', 9553, '건'],
];

const PRINCIPLES = [
  ['users', '거래의 주인은 이용자입니다', '보리장터는 판매자와 구매자를 연결할 뿐 개별 거래의 당사자가 아니며, 결제와 배송을 대신하지 않습니다.'],
  ['check', '물건은 현장에서 확인합니다', '특히 농기계는 판매자와 일정을 잡아 직접 보고 점검한 뒤 거래하도록 안내합니다.'],
  ['pin', '위치는 필요한 만큼만', '동네 인증 때 위치를 한 번 사용하고 좌표는 저장하지 않으며, 공개 화면에는 활동 지역만 보입니다.'],
  ['book', '출처와 날짜를 구분합니다', '가격자료와 안내 글은 출처와 확인한 날짜를 나눠 적고, 고친 내용은 수정 이력으로 남깁니다.'],
];

// ── 아이콘(SVG) ───────────────────────────────────────────
const I = {
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  left: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  ext: '<path d="M7 17 17 7M9 7h8v8"/>',
  pin: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.4"/>',
  chat: '<path d="M4 5.5h16v10H10l-4.5 3.5v-3.5H4z"/><path d="M8.5 9.5h7M8.5 12.5h4"/>',
  check: '<path d="M4 12.5l5 5L20 6.5"/>',
  shield: '<path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v15H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 0 2 2h13v-3"/>',
  calc: '<rect x="5" y="2.5" width="14" height="19" rx="2.5"/><path d="M8.5 7h7M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01M8.5 15h.01M12 15h.01M15.5 15h.01M8.5 18.5h.01M12 18.5h3.5"/>',
  file: '<path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8z"/><path d="M14 3v5h5M9 14l2 2 4-4"/>',
  scale: '<path d="M12 4v16M7 20h10M5 7h14"/><path d="M5 7l-2.5 6a2.5 2.5 0 0 0 5 0zM19 7l-2.5 6a2.5 2.5 0 0 0 5 0z"/>',
  coin: '<circle cx="12" cy="12" r="8.5"/><path d="M14.5 9.5c-.5-.9-1.4-1.3-2.5-1.3-1.5 0-2.6.8-2.6 1.9 0 2.6 5.2 1.4 5.2 4 0 1.1-1.1 1.9-2.6 1.9-1.2 0-2.2-.5-2.7-1.4M12 6.8v1.4M12 15.8v1.4"/>',
  clip: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2.8h6V4M8.5 10h7M8.5 13.5h7M8.5 17h4"/>',
  truck: '<path d="M2.5 6h11v10h-11z"/><path d="M13.5 9.5h4l3 3.5v3h-7"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  leaf: '<path d="M5 19C5 10 11 5 20 5c0 9-6 14-15 14Z"/><path d="M5 19c4-5 7-8 11-10"/>',
  tractor: '<circle cx="7" cy="16" r="3.5"/><circle cx="18" cy="17.5" r="2"/><path d="M3.5 12V6.5H10l2 5.5h6.5l2 3.5M10 6.5V3.5"/>',
  users: '<circle cx="9" cy="8.5" r="3"/><path d="M3.5 19c.6-3 2.8-4.8 5.5-4.8s4.9 1.8 5.5 4.8"/><circle cx="17" cy="9.5" r="2.4"/><path d="M15.8 14.4c2.3.2 4 1.8 4.6 4.6"/>',
  phone: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M10.5 18.5h3"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>',
  call: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
};
const ic = (name, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${I[name]}</svg>`;
const MARK = '<svg class="mark" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="9" fill="#2c5a37"/><path d="M16 26V9.5" stroke="#f2b705" stroke-width="1.8" stroke-linecap="round"/><g fill="#f2b705"><ellipse cx="16" cy="8.2" rx="1.9" ry="3"/><ellipse cx="13.4" cy="12.6" rx="1.8" ry="3" transform="rotate(-38 13.4 12.6)"/><ellipse cx="18.6" cy="12.6" rx="1.8" ry="3" transform="rotate(38 18.6 12.6)"/><ellipse cx="13.4" cy="17.2" rx="1.8" ry="3" transform="rotate(-38 13.4 17.2)"/><ellipse cx="18.6" cy="17.2" rx="1.8" ry="3" transform="rotate(38 18.6 17.2)"/></g></svg>';
const INSTAGRAM = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM21 8.1c-.1-1.5-.4-2.8-1.5-3.9S17.1 2.8 15.6 2.7C14 2.6 10 2.6 8.4 2.7 6.9 2.8 5.6 3.1 4.5 4.2S3 6.6 2.9 8.1C2.8 9.7 2.8 14.3 2.9 15.9c.1 1.5.4 2.8 1.6 3.9 1.1 1.1 2.4 1.4 3.9 1.5 1.6.1 5.6.1 7.2 0 1.5-.1 2.8-.4 3.9-1.5s1.4-2.4 1.5-3.9c.1-1.6.1-6.2 0-7.8Zm-2 9.6a3 3 0 0 1-1.7 1.7c-1.2.5-4 .4-5.3.4s-4.1.1-5.3-.4a3 3 0 0 1-1.7-1.7c-.5-1.2-.4-4-.4-5.3s-.1-4.1.4-5.3A3 3 0 0 1 6.7 5.4C7.9 4.9 10.7 5 12 5s4.1-.1 5.3.4A3 3 0 0 1 19 7.1c.5 1.2.4 4 .4 5.3s.1 4.1-.4 5.3Z"/></svg>';

// ── 스타일 ────────────────────────────────────────────────
const CSS = `
:root{--ink:#191f28;--ink2:#333d4b;--sub:#4e5968;--mute:#6b7684;--line:#e5e8eb;--line2:#f2f4f6;--bg:#fff;--warm:#faf8f2;--green:#2c5a37;--green-d:#1f4228;--green-t:#edf4ea;--gold:#f2b705;--gold-t:#fff6d6;--sand:#f5efe2;--ease:cubic-bezier(.2,.7,.2,1)}
*{box-sizing:border-box;margin:0;padding:0}
html{-webkit-text-size-adjust:100%;scroll-padding-top:88px}
body{font-family:"Pretendard Variable",Pretendard,-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Noto Sans KR","Malgun Gothic",sans-serif;color:var(--ink);background:var(--bg);font-size:17px;line-height:1.65;letter-spacing:-.01em;word-break:keep-all;-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{color:inherit;text-decoration:none}button{font:inherit;color:inherit;background:none;border:0;cursor:pointer}
img{display:block;max-width:100%;height:auto}
.in{max-width:1080px;margin:0 auto;padding:0 24px}
.skip{position:absolute;left:-999px}.skip:focus{left:12px;top:12px;background:#fff;padding:8px 12px;z-index:20;border-radius:8px}
:focus-visible{outline:3px solid var(--gold);outline-offset:3px;border-radius:10px}
.ic{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;flex:none}
.mark{width:32px;height:32px;flex:none}

/* 헤더 */
.gnb{position:sticky;top:0;z-index:10;background:rgba(255,255,255,.92);-webkit-backdrop-filter:saturate(1.6) blur(14px);backdrop-filter:saturate(1.6) blur(14px);box-shadow:0 1px 0 transparent;transition:box-shadow .25s}
.gnb.scrolled{box-shadow:0 1px 0 var(--line)}
.gnb .in{display:flex;align-items:center;height:72px;gap:12px}
.logo{display:flex;align-items:center;gap:10px;font-weight:800;font-size:19px;letter-spacing:-.02em;white-space:nowrap}
.logo small{font-size:13px;font-weight:600;color:var(--mute);letter-spacing:0;margin-left:2px}
.nav{margin-left:auto;display:flex;align-items:center;gap:36px;font-size:16px;font-weight:600}
.nav a{position:relative;color:var(--ink2);transition:color .2s}
.nav a:not(.out)::after{content:"";position:absolute;left:0;right:0;bottom:-6px;height:2px;border-radius:2px;background:var(--green);transform:scaleX(0);transition:transform .25s var(--ease)}
.nav a:hover,.nav a[aria-current]{color:var(--ink)}.nav a:hover::after,.nav a[aria-current]::after{transform:scaleX(1)}
.nav .out{display:inline-flex;align-items:center;gap:4px;border:1px solid var(--line);border-radius:999px;padding:8px 14px;font-size:15px}
.nav .out:hover{border-color:var(--ink)}.nav .out .ic{width:16px;height:16px}
.menu-btn{display:none;margin-left:auto;width:44px;height:44px;border-radius:12px;align-items:center;justify-content:center}

/* 버튼·칩 */
.btn{display:inline-flex;align-items:center;gap:8px;height:52px;padding:0 24px;border-radius:999px;font-size:16px;font-weight:700;transition:transform .2s var(--ease),background .2s,border-color .2s}
.btn .ic{width:18px;height:18px}.btn:hover{transform:translateY(-1px)}
.btn.primary{background:var(--green);color:#fff}.btn.primary:hover{background:var(--green-d)}
.btn.dark{background:var(--ink);color:#fff}.btn.dark:hover{background:#000}
.btn.line{background:#fff;color:var(--ink);border:1px solid var(--line)}.btn.line:hover{border-color:var(--ink)}
.btn.sm{height:44px;padding:0 18px;font-size:15px}
.chip{display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 12px;border-radius:999px;font-size:13px;font-weight:700;background:var(--green-t);color:var(--green)}
.chip.gold{background:var(--gold-t);color:#7a5a00}.chip.gray{background:var(--line2);color:var(--sub)}
.eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:16px;font-weight:700;color:var(--green);margin-bottom:16px}
.eyebrow::before{content:"";width:8px;height:8px;border-radius:50%;background:var(--gold)}
h1{font-size:64px;line-height:1.28;font-weight:700;letter-spacing:-.035em}
h2{font-size:44px;line-height:1.32;font-weight:700;letter-spacing:-.03em}
h3{font-size:28px;line-height:1.42;font-weight:700;letter-spacing:-.025em}
.lead{margin-top:24px;font-size:20px;line-height:1.6;color:var(--sub);max-width:600px}
.sec{padding:140px 0}
.sec.warm{background:var(--warm)}
.js [data-r]{opacity:0;transform:translateY(32px);transition:opacity .9s var(--ease),transform .9s var(--ease)}
.js [data-r].on{opacity:1;transform:none}
.js [data-r="2"]{transition-delay:.12s}.js [data-r="3"]{transition-delay:.24s}

/* 히어로 */
.hero{padding:96px 0 0}
.hero .cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:40px}
.stage{position:relative;margin:72px auto 0;max-width:1032px;height:620px;border-radius:32px;overflow:hidden;background:var(--gold)}
.stage>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:68% 60%}
.stage-copy{position:absolute;left:clamp(32px,6vw,72px);top:72px;font-size:40px;line-height:1.35;font-weight:800;letter-spacing:-.03em;color:var(--green-d)}
.stage-copy small{display:block;margin-top:14px;font-size:18px;font-weight:600;line-height:1.6;color:#4a4a1e;letter-spacing:-.01em}
.phone{position:relative;width:268px;aspect-ratio:9/19;border-radius:44px;background:#111;padding:9px;box-shadow:0 40px 80px -30px rgba(31,66,40,.55),0 0 0 1px rgba(0,0,0,.06)}
.phone::before{content:"";position:absolute;top:18px;left:50%;width:84px;height:24px;margin-left:-42px;border-radius:20px;background:#111;z-index:2}
.phone .scr{height:100%;border-radius:36px;overflow:hidden;background:#fff;padding-top:34px}
.phone img{width:100%;height:100%;object-fit:cover;object-position:top}
.stage .phone{position:absolute;right:clamp(32px,7vw,96px);top:56px}
.float{position:absolute;display:flex;align-items:center;gap:10px;padding:14px 18px;border-radius:18px;background:rgba(255,255,255,.94);box-shadow:0 16px 40px -18px rgba(25,31,40,.35);font-size:15px;font-weight:700;white-space:nowrap}
.float .ic{width:22px;height:22px;color:var(--green)}
.float.f1{left:clamp(32px,6vw,72px);bottom:150px}.float.f2{left:clamp(140px,18vw,240px);bottom:72px}.float.f3{right:clamp(250px,30vw,370px);top:300px}

/* 소개 문단·이미지 띠 */
.intro{padding:160px 0 120px}
.intro p{font-size:32px;line-height:1.6;font-weight:700;letter-spacing:-.025em;max-width:980px}
.strip{overflow:hidden;padding-bottom:160px}
.track{display:flex;align-items:center;gap:20px;width:max-content;animation:flow 70s linear infinite}
.strip:hover .track{animation-play-state:paused}
.track img{flex:none;border-radius:20px;object-fit:cover;width:300px;height:300px}
.track img:nth-child(3n+1){width:260px;height:340px}.track img:nth-child(3n+2){width:380px;height:250px}
@keyframes flow{to{transform:translateX(-50%)}}

/* 이야기(탭) */
.tabs{display:flex;flex-wrap:wrap;gap:8px;margin-top:48px}
.tabs [role=tab]{position:relative;overflow:hidden;height:48px;padding:0 20px;border-radius:999px;background:var(--line2);font-size:16px;font-weight:700;color:var(--sub);transition:background .25s,color .25s}
.tabs [role=tab][aria-selected=true]{background:var(--ink);color:#fff}
.tabs [role=tab]::after{content:"";position:absolute;left:0;bottom:0;height:3px;width:100%;background:var(--gold);transform:scaleX(0);transform-origin:left}
.tabs.run [role=tab][aria-selected=true]::after{animation:prog 7s linear forwards}
@keyframes prog{to{transform:scaleX(1)}}
.panels{display:grid;margin-top:56px}
.panel{grid-area:1/1;display:grid;grid-template-columns:1fr 1.15fr;gap:72px;align-items:center;opacity:0;visibility:hidden;transform:translateY(12px);transition:opacity .5s var(--ease),transform .5s var(--ease),visibility .5s}
.panel.active{opacity:1;visibility:visible;transform:none}
.panel .num{font-size:15px;font-weight:800;color:var(--gold);letter-spacing:.06em}
.panel h3{margin-top:12px;font-size:36px;line-height:1.38;white-space:pre-line}
.panel p{margin-top:20px;font-size:18px;line-height:1.75;color:var(--sub)}
.panel .btn{margin-top:32px}
.visual{position:relative;border-radius:32px;overflow:hidden;aspect-ratio:1/1;background:var(--sand)}
.visual>img{width:100%;height:100%;object-fit:cover}
.visual .phone{position:absolute;right:28px;bottom:-120px;width:220px;border-radius:36px;padding:8px}
.visual .phone .scr{border-radius:29px;padding-top:28px}.visual .phone::before{top:15px;width:66px;height:20px;margin-left:-33px}
.visual .tagchip{position:absolute;left:24px;top:24px;display:inline-flex;align-items:center;gap:8px;height:40px;padding:0 16px;border-radius:999px;background:rgba(255,255,255,.95);font-size:15px;font-weight:700}
.visual .tagchip .ic{width:18px;height:18px;color:var(--green)}

/* 도구 목록 (인터뷰형) */
.two{display:grid;grid-template-columns:360px 1fr;gap:72px;align-items:start}
.two .head{position:sticky;top:120px}
.two .head p{margin-top:20px;color:var(--sub)}
.qlist{display:flex;flex-direction:column;gap:14px}
.q{display:grid;grid-template-columns:64px 1fr 24px;gap:22px;align-items:center;background:#fff;border:1px solid var(--line);border-radius:24px;padding:26px 28px;transition:transform .25s var(--ease),box-shadow .25s,border-color .25s}
.q:hover{transform:translateY(-2px);border-color:transparent;box-shadow:0 18px 40px -22px rgba(25,31,40,.35)}
.tile{width:64px;height:64px;border-radius:18px;display:grid;place-items:center;background:var(--green-t);color:var(--green)}
.tile .ic{width:28px;height:28px}
.q:nth-child(3n+2) .tile{background:var(--gold-t);color:#8a6400}.q:nth-child(3n) .tile{background:var(--sand);color:#6b4f1d}
.q b{display:flex;align-items:center;gap:10px;font-size:19px;line-height:1.4;letter-spacing:-.02em}
.q b span{font-size:13px;font-weight:700;color:var(--green);background:var(--green-t);border-radius:999px;padding:3px 10px;letter-spacing:0}
.q p{margin-top:6px;font-size:15px;line-height:1.65;color:var(--sub)}
.q>.ic{color:var(--mute);transition:transform .25s var(--ease),color .25s}.q:hover>.ic{transform:translateX(3px);color:var(--ink)}

/* 비전 */
.vision .frame{position:relative;margin-top:56px;border-radius:32px;overflow:hidden}
.vision .frame img{width:100%;aspect-ratio:16/8;object-fit:cover}
.vision .frame::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 45%,rgba(16,24,18,.6))}
.vision .cap{position:absolute;left:48px;right:48px;bottom:44px;z-index:1;display:flex;align-items:flex-end;justify-content:space-between;gap:24px;color:#fff}
.vision .cap strong{font-size:30px;line-height:1.4;letter-spacing:-.025em}

/* 숫자 */
.nums{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;margin-right:-24px;padding-right:24px;-webkit-mask-image:linear-gradient(90deg,#000 82%,transparent);mask-image:linear-gradient(90deg,#000 82%,transparent)}
.nums::-webkit-scrollbar{display:none}
.ncard{flex:0 0 260px;height:340px;scroll-snap-align:start;border-radius:28px;padding:30px;display:flex;flex-direction:column}
.ncard:nth-child(1){background:var(--green);color:#fff}.ncard:nth-child(2){background:var(--gold-t)}.ncard:nth-child(3){background:var(--green-t)}.ncard:nth-child(4){background:var(--sand)}
.ncard span{font-size:17px;font-weight:700}.ncard small{display:block;margin-top:6px;font-size:14px;line-height:1.5;opacity:.75}
.ncard strong{margin-top:auto;font-size:60px;line-height:1;font-weight:800;letter-spacing:-.04em;font-variant-numeric:tabular-nums}
.ncard strong em{font-style:normal;font-size:24px;margin-left:4px;letter-spacing:-.02em}
.basis{margin-top:16px;font-size:14px;color:var(--mute)}

/* 일하는 방식·문의 카드 */
.cards2{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:56px}
.card2{position:relative;overflow:hidden;border-radius:28px;padding:44px;min-height:300px;display:flex;flex-direction:column;align-items:flex-start;justify-content:space-between;background:var(--green-t)}
.card2:last-child{background:var(--gold-t)}
.card2 b{font-size:28px;line-height:1.42;letter-spacing:-.025em}.card2 .btn{position:relative;z-index:1}
.card2 img{position:absolute;right:-20px;bottom:-20px;width:200px;height:200px;border-radius:50%;object-fit:cover;border:8px solid rgba(255,255,255,.7)}

/* 소식 레일 */
.newshead{display:flex;align-items:flex-end;justify-content:space-between;gap:24px}
.ctrls{display:flex;align-items:center;gap:8px}
.round{width:44px;height:44px;border-radius:50%;border:1px solid var(--line);display:grid;place-items:center;transition:border-color .2s}
.round:hover{border-color:var(--ink)}.round .ic{width:20px;height:20px}
.rail{display:flex;gap:24px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;margin-top:48px;padding-bottom:8px}
.rail::-webkit-scrollbar{display:none}
.ncard2{flex:0 0 calc((100% - 48px)/3);scroll-snap-align:start}
.thumb{position:relative;border-radius:20px;overflow:hidden;aspect-ratio:16/10;background:var(--sand)}
.thumb img{width:100%;height:100%;object-fit:cover;transition:transform .6s var(--ease)}
.ncard2:hover .thumb img,.row:hover .thumb img{transform:scale(1.04)}
.thumb .chip{position:absolute;left:14px;top:14px}
.ncard2 h3{margin-top:18px;font-size:19px;line-height:1.5}
.ncard2:hover h3{text-decoration:underline;text-underline-offset:3px}
time{display:block;margin-top:8px;font-size:14px;color:var(--mute)}

/* 푸터 */
footer{background:var(--warm);border-top:1px solid var(--line);padding:72px 0 56px;font-size:14px;color:var(--sub)}
footer .logo{color:var(--ink)}
.ftop{display:grid;grid-template-columns:1.4fr repeat(3,1fr);gap:32px}
.ftop .tag{margin-top:14px;line-height:1.7;max-width:280px}
.ftop h4{font-size:14px;font-weight:700;color:var(--ink);margin-bottom:14px}
.ftop ul{list-style:none;display:grid;gap:10px}.ftop li a:hover{color:var(--ink);text-decoration:underline}
.fbot{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;margin-top:56px;padding-top:28px;border-top:1px solid var(--line)}
.fbot p{line-height:1.8}.nw{white-space:nowrap}.sns{display:flex;gap:12px}
.sns a{width:40px;height:40px;border-radius:50%;background:#fff;border:1px solid var(--line);display:grid;place-items:center}
.sns svg{width:20px;height:20px;fill:var(--ink)}

/* 서비스 페이지 */
.page-h{padding:96px 0 72px}
.feature{border-radius:36px;background:var(--warm);padding:56px;display:grid;grid-template-columns:1fr 1.2fr;gap:56px;align-items:center}
.feature .stack{position:relative;padding-bottom:40px}
.browser{border-radius:18px;overflow:hidden;background:#fff;box-shadow:0 30px 60px -30px rgba(25,31,40,.35),0 0 0 1px var(--line)}
.browser .bar{display:flex;align-items:center;gap:6px;height:36px;padding:0 14px;background:#f6f7f9;border-bottom:1px solid var(--line);font-size:12px;color:var(--mute)}
.browser .bar i{width:10px;height:10px;border-radius:50%;background:#dfe2e6}
.browser .bar span{margin-left:10px;padding:3px 12px;border-radius:999px;background:#fff;border:1px solid var(--line)}
.browser img{width:100%;aspect-ratio:1080/640;object-fit:cover;object-position:top}
.feature .phone{position:absolute;right:-12px;bottom:-24px;width:150px;border-radius:28px;padding:6px}
.feature .phone .scr{border-radius:23px;padding-top:20px}.feature .phone::before{top:11px;width:44px;height:14px;margin-left:-22px}
.feats{grid-column:1/-1;display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.feats div{background:#fff;border-radius:22px;padding:24px}
.feats .tile{width:48px;height:48px;border-radius:14px}.feats .tile .ic{width:24px;height:24px}
.feats h3{margin-top:16px;font-size:18px}.feats p{margin-top:6px;font-size:15px;line-height:1.6;color:var(--sub)}
.svc{display:grid;grid-template-columns:1fr 520px;gap:64px;align-items:center;padding:72px 0;border-bottom:1px solid var(--line)}
.svc:last-child{border-bottom:0}
.svc:nth-child(even){grid-template-columns:520px 1fr}.svc:nth-child(even)>a{order:-1}
.svc .tile{margin-bottom:24px}
.svc h2{font-size:30px;line-height:1.4}.svc h2 a{display:inline-flex;align-items:center;gap:6px}.svc h2 a:hover{text-decoration:underline;text-underline-offset:4px}
.svc h2 .ic{width:22px;height:22px;color:var(--mute)}
.svc .chip{margin-top:12px}
.svc p{margin-top:16px;font-size:17px;line-height:1.75;color:var(--sub);max-width:440px}

/* 소식 목록·상세 */
.center{text-align:center}.center .lead{margin-left:auto;margin-right:auto}
.list{max-width:840px;margin:0 auto}
.row{display:grid;grid-template-columns:240px 1fr;gap:32px;align-items:center;padding:28px 0;border-bottom:1px solid var(--line)}
.row:first-child{border-top:1px solid var(--ink)}
.row .chip{margin-bottom:10px}
.row h2{font-size:21px;line-height:1.5}.row:hover h2{text-decoration:underline;text-underline-offset:3px}
.row p{margin-top:6px;font-size:15px;line-height:1.65;color:var(--sub)}
article.post{max-width:760px;margin:0 auto}
.crumb{display:inline-flex;align-items:center;gap:6px;font-size:15px;font-weight:700;color:var(--mute)}
.crumb .ic{width:18px;height:18px}.crumb:hover{color:var(--ink)}
article.post .meta{display:flex;align-items:center;gap:12px;margin-top:40px}
article.post .meta time{margin:0}
article.post h1{margin-top:16px;font-size:44px;line-height:1.38}
article.post .thumb{margin-top:48px;border-radius:28px}
article.post .body{margin-top:48px;font-size:18px;line-height:1.85;color:var(--ink2)}
article.post .body p+p{margin-top:22px}
.more-news{margin-top:120px;padding-top:56px;border-top:1px solid var(--line)}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:32px}

/* 회사 정보 */
.overview{display:grid;grid-template-columns:1.5fr 1fr;gap:24px;margin-top:56px}
dl.info{background:#fff;border:1px solid var(--line);border-radius:28px;padding:12px 36px}
dl.info div{display:grid;grid-template-columns:160px 1fr;padding:20px 0;border-bottom:1px solid var(--line2)}
dl.info div:last-child{border-bottom:0}dl.info dt{font-weight:700}dl.info dd{color:var(--sub)}
.side{border-radius:28px;background:var(--green);color:#fff;padding:36px;display:flex;flex-direction:column;justify-content:space-between;gap:24px}
.side b{font-size:26px;line-height:1.42;letter-spacing:-.025em}.side p{color:rgba(255,255,255,.8);font-size:15px;line-height:1.7}
.rules{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:56px}
.rules div{background:#fff;border-radius:24px;padding:32px;border:1px solid var(--line)}
.rules b{display:block;margin-top:20px;font-size:21px;line-height:1.45}.rules p{margin-top:10px;font-size:16px;line-height:1.7;color:var(--sub)}
.tl{list-style:none;margin-top:56px;position:relative}
.tl::before{content:"";position:absolute;left:7px;top:8px;bottom:8px;width:2px;background:var(--line)}
.tl li{position:relative;display:grid;grid-template-columns:150px 1fr;gap:24px;padding:0 0 36px 44px}
.tl li::before{content:"";box-sizing:border-box;position:absolute;left:0;top:5px;width:16px;height:16px;border-radius:50%;background:#fff;border:4px solid var(--gold)}
.tl time{margin:0;font-size:16px;font-weight:800;color:var(--ink)}.tl span{color:var(--sub)}
.contact{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:56px}
.contact a{display:flex;flex-direction:column;gap:18px;background:#fff;border:1px solid var(--line);border-radius:24px;padding:30px;transition:transform .25s var(--ease),box-shadow .25s}
.contact a:hover{transform:translateY(-2px);box-shadow:0 18px 40px -22px rgba(25,31,40,.35)}
.contact b{font-size:19px}.contact span{color:var(--sub);font-size:15px;margin-top:-10px}

@supports (animation-timeline:view()){
 .stage{max-width:none;margin-left:0;margin-right:0;border-radius:0;animation:open linear both;animation-timeline:view();animation-range:cover 8% cover 42%}
 @keyframes open{from{clip-path:inset(0 max(24px,calc((100% - 1032px)/2)) round 32px)}to{clip-path:inset(0 0 round 0)}}
 .stage-copy,.float.f1,.float.f2{margin-left:max(0px,calc((100vw - 1032px)/2))}
 .stage .phone,.float.f3{margin-right:max(0px,calc((100vw - 1032px)/2))}
 .intro p span{color:#a2a9b3;animation:ink linear both;animation-timeline:view();animation-range:cover 30% cover 48%}
 @keyframes ink{to{color:var(--ink)}}
}
@media (prefers-reduced-motion:reduce){.track,.tabs.run [role=tab][aria-selected=true]::after{animation:none}.js [data-r]{transform:none}}
@media (max-width:960px){
 body{font-size:16px}
 h1{font-size:40px}h2{font-size:30px}h3{font-size:22px}.lead{font-size:17px}
 .in{padding:0 20px}.sec{padding:96px 0}
 .menu-btn{display:inline-flex}
 .nav{position:absolute;left:0;right:0;top:72px;flex-direction:column;align-items:stretch;gap:0;padding:8px 20px 20px;background:#fff;border-bottom:1px solid var(--line);opacity:0;visibility:hidden;transform:translateY(-8px);transition:opacity .2s,transform .2s,visibility .2s}
 .gnb.open .nav{opacity:1;visibility:visible;transform:none}
 .nav a{padding:14px 4px;font-size:17px}.nav a::after{display:none}.nav .out{margin-top:10px;justify-content:center;padding:12px}
 .hero{padding:56px 0 0}.btn{height:50px}
 .stage{height:560px;margin-top:48px;border-radius:24px}
 .stage>img{object-position:72% 50%}
 .stage-copy{left:24px;top:36px;font-size:26px}.stage-copy small{font-size:15px;margin-top:8px}
 .stage .phone{right:50%;margin-right:-110px!important;top:auto;bottom:-150px;width:220px}
 .float{font-size:13px;padding:10px 14px}.float .ic{width:18px;height:18px}.float.f1{left:20px;bottom:auto;top:190px}.float.f2,.float.f3{display:none}
 .intro{padding:96px 0 72px}.intro p{font-size:23px}
 .strip{padding-bottom:96px}.track img,.track img:nth-child(3n+1),.track img:nth-child(3n+2){width:200px;height:220px}
 .panel{grid-template-columns:1fr;gap:36px}.panel h3{font-size:26px}.panel p{font-size:16px}
 .visual .phone{width:170px;right:20px;bottom:-110px}
 .two{grid-template-columns:1fr;gap:40px}.two .head{position:static}
 .q{grid-template-columns:52px 1fr;gap:16px;padding:20px}.q>.ic{display:none}.tile{width:52px;height:52px;border-radius:15px}.q b{font-size:17px;flex-wrap:wrap;gap:6px}
 .vision .frame img{aspect-ratio:4/3}.vision .frame::after{background:linear-gradient(180deg,rgba(0,0,0,0) 18%,rgba(16,24,18,.78))}.vision .cap{left:24px;right:24px;bottom:24px;flex-direction:column;align-items:flex-start}.vision .cap strong{font-size:21px}
 .ncard{flex-basis:220px;height:280px}.ncard strong{font-size:48px}
 .cards2,.grid3,.overview,.rules,.contact,.feature,.svc{grid-template-columns:1fr}
 .card2{padding:32px;min-height:260px}.card2 b{font-size:22px}.card2 img{width:140px;height:140px}
 .newshead{flex-direction:column;align-items:flex-start}.ncard2{flex-basis:78%}
 .ftop{grid-template-columns:1fr 1fr}.ftop>div:first-child{grid-column:1/-1}.fbot{flex-direction:column;align-items:flex-start}
 .page-h{padding:56px 0 48px}.feature{padding:28px;border-radius:28px;gap:32px}.feats{grid-template-columns:1fr 1fr}
 .feats{grid-template-columns:1fr;gap:12px}.feats div{display:grid;grid-template-columns:48px 1fr;column-gap:16px;padding:20px}.feats .tile{grid-row:span 2}.feats h3{margin-top:2px;font-size:17px}.feats p{font-size:14px}
 .feature .phone{width:110px;right:-6px}.svc,.svc:nth-child(even){grid-template-columns:1fr;gap:28px;padding:56px 0}.svc:nth-child(even)>a{order:0}.svc h2{font-size:24px}
 .row{grid-template-columns:110px 1fr;gap:16px;padding:20px 0}.row h2{font-size:17px}.row p{display:none}
 article.post h1{font-size:30px}
 dl.info{padding:4px 22px}dl.info div{grid-template-columns:110px 1fr}
 .tl li{grid-template-columns:1fr;gap:4px}
}
`.replace(/\n\s*/g, '').replace(/\/\*[^*]*\*\//g, '');

const hash = s => createHash('sha1').update(s).digest('hex').slice(0, 8);
const JS = readFileSync(join(ROOT, 'assets/site.js'), 'utf8');
const CSS_V = hash(CSS), JS_V = hash(JS);

// ── 공통 틀 ────────────────────────────────────────────────
const NAV = [['/service/', '서비스'], ['/news/', '소식'], ['/company/', '회사 정보']];
const iso = d => d.replace(/\./g, '-');

function page({ path, title, description, body, current, jsonld, preload = '' }) {
  const url = SITE + path;
  const nav = NAV.map(([href, label]) => `<a href="${href}"${href === current ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="제이 미디어">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/assets/og-jmedia-about.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#ffffff">
<link rel="icon" href="/assets/mark.svg" type="image/svg+xml">
<script>document.documentElement.className='js'</script>
<link rel="stylesheet" href="/assets/fonts/pretendardvariable-dynamic-subset.css">
<link rel="stylesheet" href="/assets/site.css?v=${CSS_V}">${preload}
<script src="/assets/site.js?v=${JS_V}" defer></script>${jsonld ? `\n<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ''}
</head>
<body>
<a class="skip" href="#main">본문 바로가기</a>
<header class="gnb"><div class="in"><a class="logo" href="/" aria-label="제이 미디어 홈">${MARK}J MEDIA<small>제이 미디어</small></a>
<button class="menu-btn" type="button" aria-label="메뉴 열기" aria-expanded="false">${ic('menu')}</button>
<nav class="nav" aria-label="주요 메뉴">${nav}<a class="out" href="${BORIBAY}">보리장터${ic('ext')}</a></nav></div></header>
<main id="main">
${body}
</main>
<footer><div class="in">
<div class="ftop">
<div><a class="logo" href="/">${MARK}J MEDIA</a><p class="tag">농산물과 중고 농기계 지역 거래 서비스, 보리장터를 만드는 제이 미디어입니다.</p></div>
<div><h4>서비스</h4><ul><li><a href="${BORIBAY}">보리장터</a></li><li><a href="${PLAY}">보리장터 앱</a></li><li><a href="/service/">거래 도구 9곳</a></li></ul></div>
<div><h4>회사</h4><ul><li><a href="/company/">회사 정보</a></li><li><a href="/news/">소식</a></li><li><a href="/company/#contact">문의</a></li></ul></div>
<div><h4>안내</h4><ul><li><a href="/privacy.html">개인정보처리방침</a></li><li><a href="/terms.html">이용약관</a></li><li><a href="/services.html">웹 제작 의뢰</a></li></ul></div>
</div>
<div class="fbot"><div><p>제이 미디어(Media) · 대표 이정우 · <span class="nw">사업자등록번호 456-33-01705</span> · <span class="nw">고객센터 <a href="tel:${PHONE.replace(/-/g, '')}">${PHONE}</a></span></p><p>© 제이 미디어. 보리장터는 거래를 연결하며 개별 거래의 당사자가 아닙니다.</p></div>
<div class="sns"><a href="https://www.instagram.com/boribaydotcom/" aria-label="보리장터 인스타그램">${INSTAGRAM}</a></div></div>
</div></footer>
</body>
</html>
`;
}

const lazy = 'loading="lazy" decoding="async"';
const art = (name, alt = '') => `<img src="${IMG}/${name}-960.webp" srcset="${IMG}/${name}-480.webp 480w, ${IMG}/${name}-960.webp 960w" sizes="(max-width:960px) 100vw, 560px" width="960" height="720" alt="${alt}" ${lazy}>`;
const phone = (name, eager = false) => `<div class="phone" aria-hidden="true"><div class="scr"><img src="${IMG}/${name}.webp" width="520" height="1126" alt="" ${eager ? 'decoding="async"' : lazy}></div></div>`;
const newsCard = n => `<a class="ncard2" href="/news/${n.slug}/"><div class="thumb"><img src="${IMG}/${n.img}.webp" width="480" height="300" alt="" ${lazy}><span class="chip ${n.tag === '출시' ? '' : n.tag === '업데이트' ? 'gold' : 'gray'}">${n.tag}</span></div><h3>${n.title}</h3><time datetime="${iso(n.date)}">${n.date}</time></a>`;

// ── 홈 ────────────────────────────────────────────────────
const intro = ['제이 미디어는 농촌의 가까운 거래에 주목합니다.', ' 같은 지역의 농산물과 중고 농기계를 이웃끼리 사고팔 수 있도록 보리장터를 만들고 있어요.', ' 판매자와 구매자는 직접 보고, 묻고, 확인한 뒤 거래합니다.', ' 거래 전후에 필요한 계산과 확인은 아홉 개의 도구가 함께 돕습니다.'];
const stripImgs = STRIP.map(n => `<img src="${IMG}/${n}-480.webp" width="480" height="360" alt="" ${lazy}>`).join('');
const home = page({
  path: '/', current: '/',
  title: '제이 미디어 | 우리 농촌 가까이, 보리장터',
  description: '제이 미디어는 농산물과 중고 농기계를 같은 지역 사람끼리 사고파는 보리장터와 농촌 거래 도구 9곳을 만들고 운영합니다.',
  preload: `\n<link rel="preload" as="image" href="${IMG}/hero-1536.webp" imagesrcset="${IMG}/hero-768.webp 768w, ${IMG}/hero-1536.webp 1536w" imagesizes="(max-width:960px) 100vw, 1032px" fetchpriority="high">`,
  jsonld: { '@context': 'https://schema.org', '@type': 'Organization', name: '제이 미디어', alternateName: 'J MEDIA', url: SITE + '/', logo: SITE + '/assets/mark.svg', telephone: '+82-10-2846-2011', brand: { '@type': 'Brand', name: '보리장터', url: 'https://boribay.com/' } },
  body: `<section class="hero"><div class="in">
<p class="eyebrow">보리장터를 만드는 회사, 제이 미디어</p>
<h1>우리 농촌 가까이,<br>보리장터</h1>
<p class="lead">농산물과 중고 농기계를 같은 지역 사람끼리 직접 보고, 묻고, 확인한 뒤 거래하는 서비스를 만듭니다.</p>
<div class="cta"><a class="btn primary" href="${BORIBAY}">보리장터 둘러보기${ic('arrow')}</a><a class="btn line" href="${PLAY}">${ic('phone')}Google Play에서 앱 받기</a></div>
</div>
<div class="stage">
<img src="${IMG}/hero-1536.webp" srcset="${IMG}/hero-768.webp 768w, ${IMG}/hero-1536.webp 1536w" sizes="(max-width:960px) 100vw, 1032px" width="1536" height="1024" alt="노란 들판과 비닐하우스, 트랙터와 농산물 상자가 있는 보리장터 일러스트" fetchpriority="high">
<p class="stage-copy">이웃과 직접 만나는<br>농촌의 장터<small>가까운 곳의 매물을 둘러보고 채팅으로 거래하세요</small></p>
${phone('m-home', true)}
<div class="float f1">${ic('pin')}우리 동네 매물부터</div>
<div class="float f2">${ic('chat')}채팅으로 바로 문의</div>
<div class="float f3">${ic('check')}현장에서 확인하고 거래</div>
</div></section>
<section class="intro"><div class="in"><p>${intro.map(s => `<span>${s}</span>`).join('')}</p></div></section>
<div class="strip" aria-hidden="true"><div class="track">${stripImgs}${stripImgs}</div></div>
<section class="sec" style="padding-top:0"><div class="in">
<p class="eyebrow" data-r>보리장터 이야기</p>
<h2 data-r>보리장터에서 달라지는 거래</h2>
<div class="tabs" role="tablist" aria-label="보리장터 거래 분야">${STORIES.map((s, i) => `<button type="button" role="tab" id="tab-${i}" aria-controls="panel-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${s.tab}</button>`).join('')}</div>
<div class="panels">${STORIES.map((s, i) => `<div class="panel${i === 0 ? ' active' : ''}" id="panel-${i}" role="tabpanel" aria-labelledby="tab-${i}"><div><p class="num">0${i + 1}</p><h3>${s.title}</h3><p>${s.text}</p><a class="btn dark sm" href="${s.href}">${s.more}${ic('arrow')}</a></div><div class="visual">${art(s.img)}<span class="tagchip">${ic(s.icon)}${s.tab}</span>${phone(s.phone)}</div></div>`).join('')}</div>
</div></section>
<section class="sec warm"><div class="in two">
<div class="head" data-r><p class="eyebrow">거래 전후를 돕는 도구</p><h2>보리장터와 함께<br>운영하는 서비스</h2><p>매물을 고르기 전 확인할 것, 거래 뒤에 남길 것까지. 필요한 일을 서비스마다 나눠 만들었어요.</p></div>
<div class="qlist">${TOOLS.map(([, icon, name, url, kind, text]) => `<a class="q" href="${url}" data-r><span class="tile">${ic(icon)}</span><div><b>${name}<span>${kind}</span></b><p>${text}</p></div>${ic('arrow')}</a>`).join('')}</div>
</div></section>
<section class="sec vision"><div class="in">
<p class="eyebrow" data-r>우리가 꿈꾸는 농촌</p>
<h2 data-r>가까운 곳에서 직접 보고,<br>묻고, 확인하는 거래</h2>
<div class="frame" data-r>${art('hongro-apple', '사과 상자와 과수원이 그려진 보리장터 일러스트')}<div class="cap"><strong>농사짓는 사람과 필요한 사람을<br>같은 동네에서 이어 드려요</strong><a class="btn line sm" href="${BORIBAY}">보리장터 둘러보기${ic('arrow')}</a></div></div>
</div></section>
<section class="sec" style="padding-top:0"><div class="in two">
<div class="head" data-r><p class="eyebrow">숫자로 보는 제이 미디어</p><h2>작게 시작해<br>꾸준히 넓혀 가고 있어요</h2><p class="basis">${BASIS}</p></div>
<div class="nums">${NUMS.map(([label, small, n, unit]) => `<div class="ncard" data-r><span>${label}</span><small>${small}</small><strong><b data-count="${n}">${n.toLocaleString('ko-KR')}</b><em>${unit}</em></strong></div>`).join('')}</div>
</div></section>
<section class="sec warm"><div class="in">
<p class="eyebrow" data-r>제이 미디어가 일하는 방식</p>
<h2 data-r>거래는 이용자의 것,<br>정보는 확인한 만큼</h2>
<div class="cards2">
<div class="card2" data-r><b>보리장터는 어떻게<br>운영되고 있을까요?</b><a class="btn dark sm" href="/company/#principles">일하는 방식 보러 가기${ic('arrow')}</a><img src="${IMG}/used-machinery-inspection-480.webp" width="480" height="360" alt="" ${lazy}></div>
<div class="card2" data-r="2"><b>함께할 파트너를<br>찾고 있어요!</b><a class="btn dark sm" href="${KAKAO_JMEDIA}">제휴 문의하기${ic('arrow')}</a><img src="${IMG}/produce-direct-sale-480.webp" width="480" height="360" alt="" ${lazy}></div>
</div>
</div></section>
<section class="sec"><div class="in" data-rail>
<div class="newshead"><div><p class="eyebrow" data-r>소식</p><h2 data-r>제이 미디어의 최근 소식</h2></div><div class="ctrls"><button class="round" type="button" data-prev aria-label="이전 소식">${ic('left')}</button><button class="round" type="button" data-next aria-label="다음 소식">${ic('arrow')}</button><a class="btn dark sm" href="/news/">소식 보러 가기${ic('arrow')}</a></div></div>
<div class="rail">${NEWS.map(newsCard).join('')}</div>
</div></section>`,
});

// ── 서비스 ────────────────────────────────────────────────
const FEATS = [['leaf', '농산물', '제철 농산물을 같은 지역에서 바로 사고팝니다.'], ['tractor', '중고 농기계', '방문 일정을 잡아 현장에서 점검한 뒤 거래합니다.'], ['truck', '탁송 업체', '농기계를 옮겨 줄 업체를 지역별로 찾습니다.'], ['users', '커뮤니티', '농사와 거래에 관한 질문을 이웃과 나눕니다.']];
const browser = (key, url, eager = false) => `<div class="browser"><div class="bar"><i></i><i></i><i></i><span>${url.replace(/^https:\/\//, '').replace(/\/$/, '')}</span></div><img src="/assets/service/${key}.webp" width="1080" height="640" alt="" ${eager ? 'fetchpriority="high"' : lazy}></div>`;
const service = page({
  path: '/service/', current: '/service/',
  title: '서비스 | 제이 미디어',
  description: '보리장터와 거래 전후를 돕는 농촌 거래 도구 9곳, 제이 미디어가 운영하는 서비스를 소개합니다.',
  body: `<section class="page-h"><div class="in"><p class="eyebrow">서비스</p><h1>우리 농촌 가까이,<br>농촌 거래의 모든 것</h1><p class="lead">매물을 찾는 일부터 가격을 따지고, 위험을 점검하고, 농기계를 옮기는 일까지. 거래 전후에 필요한 일을 서비스마다 나눠 운영합니다.</p></div></section>
<section><div class="in">
<div class="feature">
<div><span class="chip">주력 서비스</span><h2 style="margin-top:16px"><a href="${BORIBAY}">보리장터</a></h2><p class="lead" style="font-size:18px">지역 농산물과 중고 농기계 매물을 둘러보고, 채팅으로 묻고, 현장에서 확인한 뒤 거래하는 농촌 지역 거래 서비스예요. 웹과 Android 앱에서 쓸 수 있고 몽골어 마켓도 함께 운영합니다.</p><div class="cta" style="display:flex;flex-wrap:wrap;gap:10px;margin-top:28px"><a class="btn primary sm" href="${BORIBAY}">보리장터 바로가기${ic('arrow')}</a><a class="btn line sm" href="${PLAY}">${ic('phone')}앱 받기</a></div></div>
<div class="stack">${browser('boribay', 'https://boribay.com/', true)}${phone('m-home')}</div>
<div class="feats">${FEATS.map(([icon, n, t]) => `<div><span class="tile">${ic(icon)}</span><h3>${n}</h3><p>${t}</p></div>`).join('')}</div>
</div>
${TOOLS.map(([key, icon, name, url, kind, text]) => `<div class="svc"><div data-r><span class="tile">${ic(icon)}</span><h2><a href="${url}">${name}${ic('ext')}</a></h2><span class="chip">${kind}</span><p>${text}</p></div><a href="${url}" tabindex="-1" aria-hidden="true" data-r="2">${browser(key, url)}</a></div>`).join('\n')}
</div></section>
<div style="height:96px"></div>`,
});

// ── 소식 ──────────────────────────────────────────────────
const newsList = page({
  path: '/news/', current: '/news/',
  title: '소식 | 제이 미디어',
  description: '보리장터와 제이 미디어 서비스의 출시, 업데이트, 운영 소식입니다.',
  body: `<section class="page-h center"><div class="in"><p class="eyebrow">소식</p><h1>제이 미디어 소식</h1><p class="lead">보리장터와 제이 미디어 서비스에서 실제로 출시하고 바꾼 것들을 기록합니다.</p></div></section>
<section style="padding-bottom:140px"><div class="in"><div class="list">${NEWS.map(n => `<a class="row" href="/news/${n.slug}/" data-r><div class="thumb"><img src="${IMG}/${n.img}.webp" width="480" height="300" alt="" ${lazy}></div><div><span class="chip ${n.tag === '출시' ? '' : n.tag === '업데이트' ? 'gold' : 'gray'}">${n.tag}</span><h2>${n.title}</h2><p>${n.summary}</p><time datetime="${iso(n.date)}">${n.date}</time></div></a>`).join('')}</div></div></section>`,
});

const newsPages = NEWS.map(n => [`news/${n.slug}/index.html`, page({
  path: `/news/${n.slug}/`, current: '/news/',
  title: `${n.title} | 제이 미디어 소식`,
  description: n.summary,
  body: `<section class="page-h" style="padding-bottom:140px"><div class="in"><article class="post">
<a class="crumb" href="/news/">${ic('left')}소식</a>
<div class="meta"><span class="chip ${n.tag === '출시' ? '' : n.tag === '업데이트' ? 'gold' : 'gray'}">${n.tag}</span><time datetime="${iso(n.date)}">${n.date}</time></div>
<h1>${n.title}</h1>
<div class="thumb"><img src="${IMG}/${n.img}.webp" width="480" height="300" alt=""></div>
<div class="body">${n.body.map(p => `<p>${p}</p>`).join('')}</div>
</article>
<div class="more-news"><h2 style="font-size:28px">다른 소식</h2><div class="grid3">${NEWS.filter(x => x !== n).slice(0, 3).map(newsCard).join('')}</div></div>
</div></section>`,
})]);

// ── 회사 정보 ─────────────────────────────────────────────
const company = page({
  path: '/company/', current: '/company/',
  title: '회사 정보 | 제이 미디어',
  description: '제이 미디어의 사업자 정보, 일하는 방식, 연혁과 문의 방법입니다.',
  body: `<section class="page-h"><div class="in">
<p class="eyebrow">회사 정보</p>
<h1>농촌 거래를 잇는<br>제이 미디어</h1>
<p class="lead">농산물과 중고 농기계 지역 거래 서비스 보리장터를 중심으로, 농촌 거래에 필요한 웹 서비스를 만들고 운영합니다.</p>
<div class="overview">
<dl class="info">
<div><dt>상호</dt><dd>제이 미디어(Media)</dd></div>
<div><dt>대표</dt><dd>이정우</dd></div>
<div><dt>사업자등록번호</dt><dd>456-33-01705</dd></div>
<div><dt>주요 서비스</dt><dd>보리장터(boribay.com), 농촌 거래 도구 9곳</dd></div>
<div><dt>고객센터</dt><dd><a href="tel:${PHONE.replace(/-/g, '')}">${PHONE}</a></dd></div>
</dl>
<div class="side"><b>우리 농촌 가까이,<br>보리장터</b><p>지역 농산물과 중고 농기계 매물을 둘러보고, 채팅으로 묻고, 현장에서 확인한 뒤 거래하세요.</p><a class="btn line sm" href="${BORIBAY}" style="align-self:flex-start">보리장터 바로가기${ic('arrow')}</a></div>
</div>
</div></section>
<section class="sec warm" id="principles"><div class="in">
<p class="eyebrow" data-r>일하는 방식</p>
<h2 data-r>거래는 이용자의 것,<br>정보는 확인한 만큼</h2>
<div class="rules">${PRINCIPLES.map(([icon, b, p], i) => `<div data-r="${(i % 2) + 1}"><span class="tile">${ic(icon)}</span><b>${b}</b><p>${p}</p></div>`).join('')}</div>
</div></section>
<section class="sec"><div class="in">
<p class="eyebrow" data-r>연혁</p>
<h2 data-r>걸어온 길</h2>
<ol class="tl">
${NEWS.map(n => `<li data-r><time datetime="${iso(n.date)}">${n.date}</time><span>${n.title.replace(/했습니다$/, '')}</span></li>`).join('\n')}
<li data-r><time datetime="2026-05">2026.05</time><span>제이 미디어 웹사이트(jnewmedia.com) 개설</span></li>
</ol>
</div></section>
<section class="sec warm" id="contact"><div class="in">
<p class="eyebrow" data-r>문의</p>
<h2 data-r>필요한 곳으로 바로 연락하세요</h2>
<div class="contact">
<a href="tel:${PHONE.replace(/-/g, '')}" data-r><span class="tile">${ic('call')}</span><b>고객센터 전화</b><span>${PHONE}</span></a>
<a href="${KAKAO_BORIBAY}" data-r="2"><span class="tile">${ic('chat')}</span><b>보리장터 이용 문의</b><span>카카오톡 오픈채팅</span></a>
<a href="${KAKAO_JMEDIA}" data-r="3"><span class="tile">${ic('users')}</span><b>제휴·제작 문의</b><span>카카오톡 오픈채팅</span></a>
</div>
</div></section>`,
});

// ── 쓰기 ──────────────────────────────────────────────────
const files = [['index.html', home], ['service/index.html', service], ['news/index.html', newsList], ['company/index.html', company], ...newsPages,
  ['assets/site.css', CSS],
  ['assets/mark.svg', MARK.replace('<svg class="mark" ', '<svg xmlns="http://www.w3.org/2000/svg" ')]];
for (const [rel, text] of files) {
  const out = join(ROOT, rel);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, text, 'utf8');
  console.log(rel, Buffer.byteLength(text), 'bytes');
}
