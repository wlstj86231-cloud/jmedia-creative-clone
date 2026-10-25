// J MEDIA 회사 소개 사이트(홈·서비스·소식·회사) 정적 HTML 생성
// 사용법: node tools/build-about.mjs  (저장소 루트에서 실행, 결과 HTML을 그대로 커밋)
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://jnewmedia.com';
const BASE_DATE = '2026년 10월 26일';
const BORIBAY = 'https://boribay.com/?utm_source=jnewmedia&utm_medium=referral&utm_campaign=about';
const PLAY = 'https://play.google.com/store/apps/details?id=com.boribay.app';
const KAKAO_BORIBAY = 'https://open.kakao.com/o/p6HiJ9Pi';
const KAKAO_JMEDIA = 'https://open.kakao.com/o/scuvl1wi';
const PHONE = '010-2846-2011';

const TOOLS = [
  ['yomiwiki', '요미위키', 'https://yomiwiki.com/', '농업 거래 지식사전', '농산물 등급·선별, 보관·출하, 농기계 점검과 거래 용어를 현장 기준으로 빠르게 찾아봅니다.'],
  ['scamreader', '스캠판독기', 'https://scamreader.com/', '거래 안전 점검', '농산물 직거래와 중고 농기계 거래에서 선입금·계좌 변경·가짜 결제 같은 위험 신호를 점검하고, 피해 후 대응 순서를 정리합니다.'],
  ['reportools', '리포툴스', 'https://www.reportools.com/', '판매 손익 계산', '판매가와 생산·선별·포장·배송비, 수수료와 감모를 넣어 예상 이익과 손익분기 가격을 계산합니다.'],
  ['goatool', '고아툴', 'https://goatool.com/', '거래 증빙 파일 도구', '농기계 명판·인도 사진과 출하·정산 파일을 브라우저 안에서 점검하고 증빙 목록과 파일명을 정리합니다.'],
  ['occultworldcup', '농사월드컵', 'https://occultworldcup.com/', '품종·산지·농기계 비교', '감자 품종, 사과 산지, 중고 트랙터와 농기계를 질문에 답하며 비교하고 내 거래 기준을 만듭니다.'],
  ['policyfundpedia', '정책자금 백과', 'https://policyfundpedia.com/', '농업 정책자금 확인', '자금 공고의 대상·용도·배정·대출 심사를 따로 확인하는 기록 도구와 공고 원문 해설을 제공합니다.'],
  ['megapureunasset', '메가푸른에셋', 'https://megapureunasset.kr/', '농기계 자산·보험 기록', '농기계의 인수 상태, 정비·사고 이력과 보험 확인 사항을 기록하고, 가입 전 질문표와 사고 후 기록표를 함께 씁니다.'],
  ['sumimap', '스미맵', 'https://sumimap.com/', '영농폐기물 집하장 찾기', '한국환경공단 공개자료에서 전국 영농폐기물 공동집하장 주소를 지역별로 찾아보고 방문 전 확인할 것을 안내합니다.'],
  ['tripmarking', '트립마킹', 'https://tripmarking.com/', '농기계 탁송 견적 비교', '중고 농기계를 옮기기 전에 기계 제원과 상하차 조건을 정리하고, 받은 탁송 견적의 비용 항목을 같은 기준으로 비교합니다.'],
];

// 소식: 실제로 있었던 출시·운영 기록만 담는다 (최신순)
const NEWS = [
  {
    slug: 'daum-search-registration', date: '2026.10.26', tag: '운영',
    title: '보리장터 등 10개 서비스, 다음 검색에 등록했습니다',
    summary: '다음 웹마스터도구에 서비스 10곳을 등록하고 사이트맵 수집을 요청했습니다.',
    body: [
      '제이 미디어가 운영하는 보리장터와 농촌 거래 도구 9곳, 모두 10개 서비스를 다음(Daum) 웹마스터도구에 등록했습니다.',
      '각 서비스의 robots.txt에 소유 확인 정보를 넣고, 사이트맵과 첫 화면 수집을 요청했습니다. 네이버와 구글에 이어 다음에서도 서비스를 찾을 수 있도록 하기 위한 작업입니다.',
      '검색 결과에 실제로 반영되기까지는 다음의 수집 일정에 따라 며칠에서 몇 주가 걸릴 수 있습니다.',
    ],
  },
  {
    slug: 'boribay-app-0-11-32', date: '2026.10.21', tag: '출시',
    title: '보리장터 앱 0.11.32를 출시했습니다',
    summary: 'Google Play에서 보리장터 Android 앱 0.11.32를 정식으로 내보냈습니다.',
    body: [
      '보리장터 Android 앱 0.11.32 버전을 Google Play에 정식 출시했습니다.',
      '출시 후 실제 기기에서 앱 실행, 탭 이동, 검색과 필터, 커뮤니티, 채팅 전송, 사진 업로드를 다시 점검했습니다. 사진은 잘리거나 늘어나지 않고 정사각형 틀 안에 원본 전체가 보이도록 했습니다.',
      '앱은 Google Play에서 "보리장터"를 검색하거나 이 사이트의 앱 설치 버튼으로 받을 수 있습니다.',
    ],
  },
  {
    slug: 'boribay-chat-notification', date: '2026.10.18', tag: '업데이트',
    title: '채팅 알림 전달 과정을 개선했습니다',
    summary: '앱을 꺼 두거나 화면이 꺼진 상태에서도 채팅 알림을 받는지 실제 기기로 확인했습니다.',
    body: [
      '보리장터 채팅 알림이 오는 과정을 실제 기기로 점검하고 서버 쪽 처리를 개선했습니다.',
      '앱을 종료했을 때, 화면이 꺼졌을 때, 절전 상태일 때 모두 채팅 알림을 받는 것과 알림을 누르면 해당 채팅방으로 이동하는 것을 확인했습니다.',
      '서버에서는 알림을 보내기 전 대기 시간을 없애고, 발송 전에 거치는 처리 단계를 줄였습니다.',
    ],
  },
  {
    slug: 'boribay-app-redesign', date: '2026.10.17', tag: '업데이트',
    title: '보리장터 앱 화면을 새로 단장했습니다',
    summary: '큰 검색창과 둥근 카드, 하단 탐색 메뉴로 매물을 더 빨리 찾을 수 있게 했습니다.',
    body: [
      '보리장터 Android 앱의 화면을 새로 단장했습니다. 보리장터 고유의 색은 그대로 두고, 매물을 찾고 고르는 흐름을 다듬었습니다.',
      '화면 위쪽에 큰 검색창을 두고, 매물은 둥근 카드로 보여 줍니다. 하단 탐색 메뉴와 가로로 넘기는 필터, 사진 넘겨 보기, 화면 아래 고정된 거래 버튼을 넣었습니다.',
      '검색과 상세 화면에서 목록으로 돌아오는 동작은 실제 기기에서 반복해 재며 속도를 다듬었습니다.',
    ],
  },
  {
    slug: 'boribay-operator-sources', date: '2026.10.15', tag: '운영',
    title: '보리장터 운영자·출처 정보를 보강했습니다',
    summary: '안내 글의 작성 범위, 자료 날짜, 정정 방법을 서비스 소개에 명시했습니다.',
    body: [
      '보리장터의 서비스·운영자 정보 페이지에 안내 글과 계산 도구를 어떤 기준으로 쓰는지 자세히 적었습니다.',
      '문서 수정일, 자료를 대조한 날, 원자료의 조사·발표일을 구분해 적고, 과거 게시 가격은 실제 결제액이나 현재 시세가 아니라는 점을 밝혔습니다. 계산 도구의 빈칸은 확인된 0원과 구분합니다.',
      '오류나 출처 변경은 고객센터로 제보할 수 있으며, 확인된 변경은 해당 글의 수정 이력에 남깁니다. 제이 미디어가 운영하는 다른 사이트에서 보리장터 자료로 연결할 때는 같은 운영자임을 밝힙니다.',
    ],
  },
];

const ICON = {
  produce: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19C5 10 11 5 20 5c0 9-6 14-15 14Z"/><path d="M5 19c4-5 7-8 11-10"/></svg>',
  machinery: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="7" cy="16" r="3.5"/><circle cx="18" cy="17.5" r="2"/><path d="M3.5 12V6.5H10l2 5.5h6.5l2 3.5"/><path d="M10 6.5V3.5"/></svg>',
  transport: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 6h11v10h-11z"/><path d="M13.5 9.5h4l3 3.5v3h-7"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/></svg>',
  community: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v10H9l-5 4z"/><path d="M8 9h8M8 12h5"/></svg>',
};

const CSS = `
:root{--ink:#1b2118;--sub:#5a6355;--line:#e6e0d1;--bg:#fffdf7;--soft:#f6f1e3;--green:#2c5532;--green2:#3d6842;--yellow:#f5c02b;--ysoft:#fff4c8}
*{box-sizing:border-box;margin:0;padding:0}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
body{font-family:-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Malgun Gothic","Noto Sans KR",sans-serif;color:var(--ink);background:var(--bg);line-height:1.65;word-break:keep-all;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
img{display:block;max-width:100%;height:auto}
.wrap{max-width:1120px;margin:0 auto;padding:0 20px}
.skip{position:absolute;left:-999px}.skip:focus{left:12px;top:12px;background:#fff;padding:8px 12px;z-index:9}
a:focus-visible{outline:3px solid var(--yellow);outline-offset:3px;border-radius:6px}
header.top{position:sticky;top:0;z-index:5;background:var(--bg);border-bottom:1px solid var(--line)}
header.top .wrap{display:flex;align-items:center;gap:28px;height:64px}
.logo{font-weight:800;font-size:19px;letter-spacing:-.02em}.logo b{color:var(--green2)}
nav.gnb{display:flex;gap:22px;font-size:15px;font-weight:600;color:var(--sub)}
nav.gnb a:hover,nav.gnb a[aria-current]{color:var(--ink)}
.top .cta{margin-left:auto}
.btn{display:inline-flex;align-items:center;gap:8px;border-radius:999px;padding:12px 22px;font-weight:700;font-size:15px;line-height:1.2}
.btn.primary{background:var(--green);color:#fff}.btn.primary:hover{background:#21452a}
.btn.ghost{background:#fff;border:1px solid var(--line)}.btn.ghost:hover{border-color:var(--ink)}
.btn.small{padding:9px 16px;font-size:14px}
main section{padding:96px 0}
.cv{content-visibility:auto;contain-intrinsic-size:auto 800px}
.eyebrow{font-size:14px;font-weight:700;color:var(--green2);letter-spacing:.02em;margin-bottom:14px}
h1{font-size:clamp(38px,7vw,76px);line-height:1.12;letter-spacing:-.035em;font-weight:800}
h2{font-size:clamp(28px,4.4vw,44px);line-height:1.2;letter-spacing:-.03em;font-weight:800}
h3{font-size:22px;line-height:1.35;letter-spacing:-.02em}
.lead{font-size:clamp(17px,2.1vw,20px);color:var(--sub);margin-top:20px;max-width:640px}
.center{text-align:center}.center .lead{margin-left:auto;margin-right:auto}
.actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:32px}.center .actions{justify-content:center}
.hero{padding:88px 0 72px}
.shot{border-radius:24px;overflow:hidden;border:1px solid var(--line);background:#fff;box-shadow:0 20px 50px -30px rgba(27,33,24,.45)}
.hero .shot{margin-top:56px}
.big-text{font-size:clamp(24px,3.6vw,38px);line-height:1.45;letter-spacing:-.025em;font-weight:700;max-width:900px}
.big-text em{font-style:normal;background:linear-gradient(transparent 62%,var(--ysoft) 0)}
.soft{background:var(--soft)}
.story{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;margin-top:72px}
.story:nth-of-type(even) .panel{order:2}
.panel{aspect-ratio:4/3;border-radius:28px;background:var(--ysoft);display:grid;place-items:center;position:relative}
.panel svg{width:34%;height:auto;fill:none;stroke:var(--green);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}
.panel .chip{position:absolute;bottom:22px;left:22px;background:#fff;border-radius:999px;padding:8px 14px;font-size:14px;font-weight:700}
.story p{color:var(--sub);margin-top:14px;font-size:17px}
.more{display:inline-block;margin-top:18px;font-weight:700;color:var(--green2)}.more:hover{text-decoration:underline}
.nums{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:48px}
.num{background:#fff;border:1px solid var(--line);border-radius:22px;padding:28px 24px}
.num strong{display:block;font-size:clamp(34px,4.6vw,48px);letter-spacing:-.03em;line-height:1.1}
.num span{display:block;font-weight:700;margin-top:10px}.num small{display:block;color:var(--sub);font-size:14px;margin-top:4px}
.basis{color:var(--sub);font-size:14px;margin-top:16px}
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:48px}
.card{display:block}
.thumb{aspect-ratio:16/9;border-radius:18px;display:flex;align-items:flex-end;padding:18px;font-weight:800;font-size:15px}
.t-출시{background:var(--green2);color:#fff}.t-업데이트{background:var(--yellow)}.t-운영{background:#e9e3d2}
.card h3{font-size:19px;margin-top:16px}.card:hover h3{text-decoration:underline}
.card p{color:var(--sub);font-size:15px;margin-top:8px}.card time{display:block;color:var(--sub);font-size:14px;margin-top:8px}
.pair{display:grid;grid-template-columns:1fr 1fr;gap:24px}
.pair a{border-radius:24px;padding:40px 36px;min-height:220px;display:flex;flex-direction:column;justify-content:space-between}
.pair a:first-child{background:var(--green);color:#fff}.pair a:last-child{background:var(--ysoft)}
.pair b{font-size:26px;letter-spacing:-.02em}.pair span{font-weight:700}
.head-row{display:flex;align-items:end;justify-content:space-between;gap:20px}
.svc{display:grid;grid-template-columns:96px 1fr 540px;gap:32px;align-items:start;padding:48px 0;border-top:1px solid var(--line)}
.svc .icon{width:96px;height:96px;border-radius:24px;background:var(--ysoft);display:grid;place-items:center;font-weight:800;font-size:28px;color:var(--green)}
.svc h3 a:hover{text-decoration:underline}.svc .kind{color:var(--green2);font-weight:700;font-size:14px;margin-top:6px}
.svc p{color:var(--sub);margin-top:12px}
.svc .shot{border-radius:16px}
.flag{padding-top:24px}.flag .shot{margin:40px 0}
.subs{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.subs div{background:#fff;border:1px solid var(--line);border-radius:20px;padding:24px}
.subs svg{width:36px;height:36px;fill:none;stroke:var(--green);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.subs h3{font-size:18px;margin-top:12px}.subs p{color:var(--sub);font-size:15px;margin-top:6px}
.list{margin-top:40px;border-top:1px solid var(--line)}
.list a{display:grid;grid-template-columns:180px 1fr 110px;gap:24px;align-items:center;padding:28px 0;border-bottom:1px solid var(--line)}
.list .thumb{aspect-ratio:16/10;font-size:14px;padding:14px}
.list h3{font-size:20px}.list a:hover h3{text-decoration:underline}.list p{color:var(--sub);font-size:15px;margin-top:6px}
.list time{color:var(--sub);font-size:14px;text-align:right}
article.post{max-width:720px;margin:0 auto}
article.post time{color:var(--sub);font-size:15px;display:block;margin-top:18px}
article.post .body{margin-top:40px;font-size:18px}article.post .body p+p{margin-top:20px}
.back{display:inline-block;margin-top:56px;font-weight:700;color:var(--green2)}
dl.info{display:grid;grid-template-columns:200px 1fr;margin-top:40px;border-top:1px solid var(--line)}
dl.info dt,dl.info dd{padding:20px 0;border-bottom:1px solid var(--line)}dl.info dt{font-weight:700}dl.info dd{color:var(--sub)}
.rules{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-top:48px}
.rules div{background:#fff;border:1px solid var(--line);border-radius:22px;padding:30px 28px}
.rules b{display:block;font-size:19px;letter-spacing:-.02em}.rules p{color:var(--sub);margin-top:10px}
ol.timeline{list-style:none;margin-top:40px;border-left:2px solid var(--line);padding-left:28px}
ol.timeline li{position:relative;padding-bottom:28px}
ol.timeline li::before{content:"";position:absolute;left:-36px;top:7px;width:14px;height:14px;border-radius:50%;background:var(--yellow);border:2px solid var(--bg)}
ol.timeline time{font-weight:800}ol.timeline p{color:var(--sub)}
.contact{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px}
.contact a{background:#fff;border:1px solid var(--line);border-radius:22px;padding:28px}
.contact a:hover{border-color:var(--ink)}.contact b{display:block;font-size:18px}.contact span{display:block;color:var(--sub);margin-top:8px}
footer{background:#1e3322;color:#d9dfd2;padding:64px 0 48px;font-size:14px}
footer .logo{color:#fff}footer .logo b{color:var(--yellow)}
.f-links{display:flex;flex-wrap:wrap;gap:10px 24px;margin-top:22px;font-weight:600;color:#fff}
.f-links a:hover{text-decoration:underline}
.f-info{margin-top:28px;line-height:1.9}.f-info span+span::before{content:" · "}
.f-copy{margin-top:20px;color:#9fab98}
@media (max-width:900px){
 main section{padding:64px 0}.hero{padding:56px 0 48px}
 .story,.pair,.subs,.rules,.contact{grid-template-columns:1fr}.story{gap:28px;margin-top:56px}.story:nth-of-type(even) .panel{order:0}
 .nums{grid-template-columns:1fr 1fr}.cards{grid-template-columns:1fr}
 .svc{grid-template-columns:64px 1fr;gap:18px}.svc .icon{width:64px;height:64px;font-size:20px;border-radius:18px}.svc .shot{grid-column:1/-1}
 .list a{grid-template-columns:1fr;gap:12px}.list time{text-align:left}
 dl.info{grid-template-columns:1fr}dl.info dt{padding-bottom:0;border-bottom:0}
 .head-row{flex-direction:column;align-items:flex-start}
}
@media (max-width:560px){header.top .wrap{gap:16px}nav.gnb{gap:16px;font-size:14px}.top .cta{display:none}}
`.replace(/\n\s*/g, '');

const NAV = [['/service/', '서비스'], ['/news/', '소식'], ['/company/', '회사 정보']];

function page({ path, title, description, body, current, jsonld }) {
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
<meta name="theme-color" content="#2c5532">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<style>${CSS}</style>${jsonld ? `\n<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ''}
</head>
<body>
<a class="skip" href="#main">본문 바로가기</a>
<header class="top"><div class="wrap"><a class="logo" href="/" aria-label="제이 미디어 홈">J <b>MEDIA</b></a><nav class="gnb" aria-label="주요 메뉴">${nav}</nav><a class="btn primary small cta" href="${BORIBAY}">보리장터 바로가기</a></div></header>
<main id="main">
${body}
</main>
<footer><div class="wrap"><a class="logo" href="/">J <b>MEDIA</b></a>
<div class="f-links"><a href="/service/">서비스</a><a href="/news/">소식</a><a href="/company/">회사 정보</a><a href="${BORIBAY}">보리장터</a><a href="https://www.instagram.com/boribaydotcom/">인스타그램</a><a href="/privacy.html">개인정보처리방침</a><a href="/terms.html">이용약관</a><a href="/services.html">웹 제작 의뢰</a></div>
<p class="f-info"><span>제이 미디어(Media)</span><span>대표 이정우</span><span>사업자등록번호 456-33-01705</span><span>고객센터 <a href="tel:${PHONE.replace(/-/g, '')}">${PHONE}</a></span></p>
<p class="f-copy">© 2026 제이 미디어(Media). 보리장터는 거래를 연결하며 개별 거래의 당사자가 아닙니다.</p>
</div></footer>
</body>
</html>
`;
}

const thumb = n => `<div class="thumb t-${n.tag}">${n.tag}</div>`;
const newsCard = n => `<a class="card" href="/news/${n.slug}/">${thumb(n)}<h3>${n.title}</h3><p>${n.summary}</p><time datetime="${n.date.replace(/\./g, '-')}">${n.date}</time></a>`;

const STORIES = [
  ['produce', '농산물', '제철 농산물을 가까운 곳에서', '같은 지역에서 키운 농산물을 매물로 올리고, 필요한 사람은 동네 단위로 찾아봅니다. 궁금한 점은 채팅으로 판매자에게 바로 묻습니다.', 'https://boribay.com/?category=PRODUCE&utm_source=jnewmedia&utm_medium=referral&utm_campaign=about', '농산물 매물 보기'],
  ['machinery', '중고 농기계', '직접 보고 점검한 뒤 거래합니다', '트랙터와 관리기 같은 중고 농기계는 판매자와 방문 일정을 정해 현장에서 상태를 확인하고 거래합니다. 농기계 가격자료로 시세 감도 미리 잡을 수 있습니다.', 'https://boribay.com/?category=MACHINERY&utm_source=jnewmedia&utm_medium=referral&utm_campaign=about', '농기계 매물 보기'],
  ['transport', '탁송 업체', '농기계를 옮길 방법까지', '산 농기계를 옮겨야 할 때는 지역의 탁송 업체를 찾아 연락합니다. 탁송 비용을 미리 따져 볼 수 있는 안내도 함께 제공합니다.', 'https://boribay.com/?category=TRANSPORT&utm_source=jnewmedia&utm_medium=referral&utm_campaign=about', '탁송 업체 보기'],
  ['community', '커뮤니티', '농촌 생활의 질문과 답', '농사와 거래에 관한 질문을 이웃과 나누고, 영농폐기물 처리나 위탁판매 같은 농촌생활 안내 글을 읽을 수 있습니다.', 'https://boribay.com/community?utm_source=jnewmedia&utm_medium=referral&utm_campaign=about', '커뮤니티 둘러보기'],
];

// 홈
const home = page({
  path: '/', current: '/',
  title: '제이 미디어 | 농촌의 거래를 가까이, 보리장터',
  description: '제이 미디어는 농산물과 중고 농기계를 같은 지역 사람끼리 사고파는 보리장터와 농촌 거래 도구 9곳을 만들고 운영합니다.',
  jsonld: { '@context': 'https://schema.org', '@type': 'Organization', name: '제이 미디어', alternateName: 'J MEDIA', url: SITE + '/', logo: SITE + '/assets/jmedia-new-logo.jpg', telephone: '+82-10-2846-2011', brand: { '@type': 'Brand', name: '보리장터', url: 'https://boribay.com/' } },
  body: `<section class="hero"><div class="wrap center">
<p class="eyebrow">제이 미디어</p>
<h1>농촌의 거래를<br>가까이 잇습니다</h1>
<p class="lead">농산물과 중고 농기계를 같은 지역 사람끼리 사고팔 수 있도록, 제이 미디어는 지역 거래 서비스 보리장터를 만들고 있습니다.</p>
<div class="actions"><a class="btn primary" href="${BORIBAY}">보리장터 둘러보기</a><a class="btn ghost" href="${PLAY}">앱 설치하기</a></div>
<div class="shot"><img src="/assets/service/boribay.webp" width="1080" height="640" alt="보리장터 첫 화면. 농산물과 농기계를 가까이서 만나자는 문구와 지역 매물 검색창" fetchpriority="high"></div>
</div></section>
<section class="cv"><div class="wrap">
<p class="eyebrow">우리가 하는 일</p>
<p class="big-text">농사에 필요한 물건과 정보는 생각보다 가까이 있습니다. <em>다만 서로 찾기 어려울 뿐입니다.</em> 제이 미디어는 같은 지역의 판매자와 구매자가 직접 보고, 묻고, 확인한 뒤 거래할 수 있는 길을 만듭니다.</p>
</div></section>
<section class="soft cv"><div class="wrap">
<p class="eyebrow">보리장터에서는</p>
<h2>이렇게 거래합니다</h2>
${STORIES.map(([icon, label, title, text, href, more]) => `<div class="story"><div class="panel">${ICON[icon]}<span class="chip">${label}</span></div><div><h3>${title}</h3><p>${text}</p><a class="more" href="${href}">${more} →</a></div></div>`).join('\n')}
</div></section>
<section class="cv"><div class="wrap">
<p class="eyebrow">숫자로 보는 제이 미디어</p>
<h2>작게, 꾸준히 넓혀 가고 있습니다</h2>
<div class="nums">
<div class="num"><strong>10</strong><span>운영 서비스</span><small>보리장터와 농촌 거래 도구</small></div>
<div class="num"><strong>2</strong><span>지원 언어</span><small>한국어·몽골어 마켓</small></div>
<div class="num"><strong>8</strong><span>농촌생활 안내 글</span><small>보리장터 안내 페이지</small></div>
<div class="num"><strong>9,553</strong><span>공동집하장 주소</span><small>한국환경공단 공개자료 기준</small></div>
</div>
<p class="basis">${BASE_DATE} 기준</p>
</div></section>
<section class="soft cv"><div class="wrap">
<div class="head-row"><h2>제이 미디어 소식</h2><a class="more" href="/news/">소식 더 보기 →</a></div>
<div class="cards">${NEWS.slice(0, 3).map(newsCard).join('')}</div>
</div></section>
<section class="cv"><div class="wrap pair">
<a href="/service/"><b>서비스 전체 보기</b><span>보리장터와 거래 도구 9곳 →</span></a>
<a href="/company/"><b>회사 정보·문의</b><span>사업자 정보와 연락처 →</span></a>
</div></section>`,
});

// 서비스
const SUBS = [
  ['produce', '농산물', '제철 농산물을 같은 지역에서 바로 사고팝니다.'],
  ['machinery', '중고 농기계', '방문 일정을 잡아 현장에서 점검한 뒤 거래합니다.'],
  ['transport', '탁송 업체', '농기계를 옮겨 줄 업체를 지역별로 찾습니다.'],
  ['community', '커뮤니티', '농사와 거래에 관한 질문을 이웃과 나눕니다.'],
];
const service = page({
  path: '/service/', current: '/service/',
  title: '서비스 | 제이 미디어',
  description: '보리장터와 거래 전후를 돕는 농촌 거래 도구 9곳, 제이 미디어가 운영하는 서비스를 소개합니다.',
  body: `<section class="hero"><div class="wrap">
<p class="eyebrow">서비스</p>
<h1>농촌 거래의<br>처음부터 끝까지</h1>
<p class="lead">매물을 찾는 일부터 가격을 따지고, 위험을 점검하고, 농기계를 옮기는 일까지. 거래 전후에 필요한 일을 서비스마다 나눠 운영합니다.</p>
</div></section>
<section class="flag"><div class="wrap">
<p class="eyebrow">주력 서비스</p>
<h2><a href="${BORIBAY}">보리장터</a></h2>
<p class="lead">우리 농촌 가까이. 지역 농산물과 중고 농기계 매물을 둘러보고, 채팅으로 묻고, 현장에서 확인한 뒤 거래합니다. 웹과 Android 앱에서 쓸 수 있고, 몽골어 마켓도 함께 운영합니다.</p>
<div class="actions"><a class="btn primary" href="${BORIBAY}">보리장터 바로가기</a><a class="btn ghost" href="${PLAY}">Google Play에서 앱 받기</a></div>
<div class="shot"><img src="/assets/service/boribay.webp" width="1080" height="640" alt="보리장터 웹 첫 화면" fetchpriority="high"></div>
<div class="subs">${SUBS.map(([icon, name, text]) => `<div>${ICON[icon]}<h3>${name}</h3><p>${text}</p></div>`).join('')}</div>
</div></section>
<section class="cv"><div class="wrap">
<p class="eyebrow">보리장터를 돕는 도구</p>
<h2>거래 전후에 필요한 정보와 계산</h2>
<p class="lead">아래 사이트들도 제이 미디어가 직접 만들고 운영합니다. 보리장터와 같은 운영자가 만든 서비스입니다.</p>
<div style="margin-top:40px">
${TOOLS.map(([key, name, url, kind, text]) => `<div class="svc"><div class="icon" aria-hidden="true">${name.slice(0, 1)}</div><div><h3><a href="${url}">${name}</a></h3><p class="kind">${kind}</p><p>${text}</p><a class="more" href="${url}">바로가기 →</a></div><a class="shot" href="${url}" tabindex="-1" aria-hidden="true"><img src="/assets/service/${key}.webp" width="1080" height="640" alt="" loading="lazy" decoding="async"></a></div>`).join('\n')}
</div>
</div></section>`,
});

// 소식 목록
const newsList = page({
  path: '/news/', current: '/news/',
  title: '소식 | 제이 미디어',
  description: '보리장터와 제이 미디어 서비스의 출시, 업데이트, 운영 소식입니다.',
  body: `<section class="hero"><div class="wrap">
<p class="eyebrow">소식</p>
<h1>제이 미디어 소식</h1>
<p class="lead">보리장터와 제이 미디어 서비스에서 실제로 출시하고 바꾼 것들을 기록합니다.</p>
<div class="list">${NEWS.map(n => `<a href="/news/${n.slug}/">${thumb(n)}<div><h3>${n.title}</h3><p>${n.summary}</p></div><time datetime="${n.date.replace(/\./g, '-')}">${n.date}</time></a>`).join('')}</div>
</div></section>`,
});

// 소식 상세
const newsPages = NEWS.map(n => [`news/${n.slug}/index.html`, page({
  path: `/news/${n.slug}/`, current: '/news/',
  title: `${n.title} | 제이 미디어 소식`,
  description: n.summary,
  body: `<section class="hero"><div class="wrap"><article class="post">
<p class="eyebrow">${n.tag}</p>
<h1 style="font-size:clamp(30px,5vw,46px)">${n.title}</h1>
<time datetime="${n.date.replace(/\./g, '-')}">${n.date}</time>
<div class="body">${n.body.map(p => `<p>${p}</p>`).join('')}</div>
<a class="back" href="/news/">← 소식 목록</a>
</article></div></section>`,
})]);

// 회사 정보
const company = page({
  path: '/company/', current: '/company/',
  title: '회사 정보 | 제이 미디어',
  description: '제이 미디어의 사업자 정보, 일하는 방식, 연혁과 문의 방법입니다.',
  body: `<section class="hero"><div class="wrap">
<p class="eyebrow">회사 정보</p>
<h1>제이 미디어</h1>
<p class="lead">농산물과 중고 농기계 지역 거래 서비스 보리장터를 중심으로, 농촌 거래에 필요한 웹 서비스를 만들고 운영합니다.</p>
<dl class="info">
<dt>상호</dt><dd>제이 미디어(Media)</dd>
<dt>대표</dt><dd>이정우</dd>
<dt>사업자등록번호</dt><dd>456-33-01705</dd>
<dt>주요 서비스</dt><dd>보리장터(boribay.com), 농촌 거래 도구 9곳</dd>
<dt>고객센터</dt><dd><a href="tel:${PHONE.replace(/-/g, '')}">${PHONE}</a></dd>
</dl>
</div></section>
<section class="soft cv"><div class="wrap">
<p class="eyebrow">일하는 방식</p>
<h2>거래는 이용자의 것, 정보는 확인한 만큼</h2>
<div class="rules">
<div><b>거래의 주인은 이용자입니다</b><p>보리장터는 판매자와 구매자를 연결할 뿐 개별 거래의 당사자가 아니며, 결제와 배송을 대신하지 않습니다.</p></div>
<div><b>물건은 현장에서 확인합니다</b><p>특히 농기계는 판매자와 일정을 잡아 직접 보고 점검한 뒤 거래하도록 안내합니다.</p></div>
<div><b>위치는 필요한 만큼만</b><p>동네 인증 때 위치를 한 번 사용하고 좌표는 저장하지 않으며, 공개 화면에는 활동 지역만 보입니다.</p></div>
<div><b>출처와 날짜를 구분합니다</b><p>가격자료와 안내 글은 출처와 확인한 날짜를 나눠 적고, 고친 내용은 수정 이력으로 남깁니다.</p></div>
</div>
</div></section>
<section class="cv"><div class="wrap">
<p class="eyebrow">연혁</p>
<h2>걸어온 길</h2>
<ol class="timeline">
${[...NEWS].reverse().map(n => `<li><time datetime="${n.date.replace(/\./g, '-')}">${n.date}</time><p>${n.title.replace(/했습니다$/, '')}</p></li>`).join('\n')}
</ol>
<p class="basis">2026년 5월 제이 미디어 웹사이트(jnewmedia.com)를 열었습니다.</p>
</div></section>
<section class="soft cv" id="contact"><div class="wrap">
<p class="eyebrow">문의</p>
<h2>필요한 곳으로 바로 연락하세요</h2>
<div class="contact">
<a href="tel:${PHONE.replace(/-/g, '')}"><b>고객센터 전화</b><span>${PHONE}</span></a>
<a href="${KAKAO_BORIBAY}"><b>보리장터 이용 문의</b><span>카카오톡 오픈채팅</span></a>
<a href="${KAKAO_JMEDIA}"><b>제휴·제작 문의</b><span>카카오톡 오픈채팅</span></a>
</div>
</div></section>`,
});

const files = [['index.html', home], ['service/index.html', service], ['news/index.html', newsList], ['company/index.html', company], ...newsPages];
for (const [rel, html] of files) {
  const out = join(ROOT, rel);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html, 'utf8');
  console.log(rel, Buffer.byteLength(html), 'bytes');
}
