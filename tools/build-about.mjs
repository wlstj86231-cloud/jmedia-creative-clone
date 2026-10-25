// J MEDIA 회사 소개 사이트(홈·서비스·소식·회사 정보) 정적 HTML 생성
// 구성과 비율은 about.daangn.com을 따르고, 색·이미지는 보리장터 테마를 쓴다.
// 사용법: node tools/build-about.mjs  (저장소 루트에서 실행, 결과 HTML을 그대로 커밋)
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://jnewmedia.com';
const UTM = 'utm_source=jnewmedia&utm_medium=referral&utm_campaign=about';
const BORIBAY = `https://boribay.com/?${UTM}`;
const PLAY = 'https://play.google.com/store/apps/details?id=com.boribay.app';
const KAKAO_JMEDIA = 'https://open.kakao.com/o/scuvl1wi';
const KAKAO_BORIBAY = 'https://open.kakao.com/o/p6HiJ9Pi';
const PHONE = '010-2846-2011';
const IMG = '/assets/boribay';

const TOOLS = [
  ['yomiwiki', '요미위키', 'https://yomiwiki.com/', '농업 거래 지식사전', '농산물 등급·선별, 보관·출하, 농기계 점검과 거래 용어를 현장 기준으로 빠르게 찾아봅니다.'],
  ['scamreader', '스캠판독기', 'https://scamreader.com/', '거래 안전 점검', '농산물 직거래와 중고 농기계 거래의 선입금·계좌 변경·가짜 결제 같은 위험 신호를 점검하고, 피해 후 대응 순서를 정리합니다.'],
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
    slug: 'daum-search-registration', date: '2026.10.26', img: 'hero-768',
    title: '보리장터 등 10개 서비스, 다음 검색에 등록했습니다',
    summary: '다음 웹마스터도구에 서비스 10곳을 등록하고 사이트맵 수집을 요청했습니다.',
    body: [
      '제이 미디어가 운영하는 보리장터와 농촌 거래 도구 9곳, 모두 10개 서비스를 다음(Daum) 웹마스터도구에 등록했습니다.',
      '각 서비스의 robots.txt에 소유 확인 정보를 넣고, 사이트맵과 첫 화면 수집을 요청했습니다. 네이버와 구글에 이어 다음에서도 서비스를 찾을 수 있도록 하기 위한 작업입니다.',
      '검색 결과에 실제로 반영되기까지는 다음의 수집 일정에 따라 며칠에서 몇 주가 걸릴 수 있습니다.',
    ],
  },
  {
    slug: 'boribay-app-0-11-32', date: '2026.10.21', img: 'produce-direct-sale-480',
    title: '보리장터 앱 0.11.32를 출시했습니다',
    summary: 'Google Play에서 보리장터 Android 앱 0.11.32를 정식으로 내보냈습니다.',
    body: [
      '보리장터 Android 앱 0.11.32 버전을 Google Play에 정식 출시했습니다.',
      '출시 후 실제 기기에서 앱 실행, 탭 이동, 검색과 필터, 커뮤니티, 채팅 전송, 사진 업로드를 다시 점검했습니다. 사진은 잘리거나 늘어나지 않고 정사각형 틀 안에 원본 전체가 보이도록 했습니다.',
      '앱은 Google Play에서 "보리장터"를 검색하거나 이 사이트의 앱 설치 버튼으로 받을 수 있습니다.',
    ],
  },
  {
    slug: 'boribay-chat-notification', date: '2026.10.18', img: 'humusa-plum-480',
    title: '채팅 알림 전달 과정을 개선했습니다',
    summary: '앱을 꺼 두거나 화면이 꺼진 상태에서도 채팅 알림을 받는지 실제 기기로 확인했습니다.',
    body: [
      '보리장터 채팅 알림이 오는 과정을 실제 기기로 점검하고 서버 쪽 처리를 개선했습니다.',
      '앱을 종료했을 때, 화면이 꺼졌을 때, 절전 상태일 때 모두 채팅 알림을 받는 것과 알림을 누르면 해당 채팅방으로 이동하는 것을 확인했습니다.',
      '서버에서는 알림을 보내기 전 대기 시간을 없애고, 발송 전에 거치는 처리 단계를 줄였습니다.',
    ],
  },
  {
    slug: 'boribay-app-redesign', date: '2026.10.17', img: 'used-cultivator-inspection-480',
    title: '보리장터 앱 화면을 새로 단장했습니다',
    summary: '큰 검색창과 둥근 카드, 하단 탐색 메뉴로 매물을 더 빨리 찾을 수 있게 했습니다.',
    body: [
      '보리장터 Android 앱의 화면을 새로 단장했습니다. 보리장터 고유의 색은 그대로 두고, 매물을 찾고 고르는 흐름을 다듬었습니다.',
      '화면 위쪽에 큰 검색창을 두고, 매물은 둥근 카드로 보여 줍니다. 하단 탐색 메뉴와 가로로 넘기는 필터, 사진 넘겨 보기, 화면 아래 고정된 거래 버튼을 넣었습니다.',
      '검색과 상세 화면에서 목록으로 돌아오는 동작은 실제 기기에서 반복해 재며 속도를 다듬었습니다.',
    ],
  },
  {
    slug: 'boribay-operator-sources', date: '2026.10.15', img: 'hongro-apple-480',
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
  ['농산물', '제철 농산물을 가까운 곳에서', '같은 지역에서 키운 농산물을 매물로 올리고, 필요한 사람은 동네 단위로 찾아봅니다. 궁금한 점은 채팅으로 판매자에게 바로 묻고, 직접 만나 거래합니다.', 'produce-direct-sale', `https://boribay.com/?category=PRODUCE&${UTM}`, '농산물 매물 보기'],
  ['중고 농기계', '직접 보고 점검한 뒤 거래해요', '트랙터와 관리기 같은 중고 농기계는 판매자와 방문 일정을 정해 현장에서 상태를 확인하고 거래합니다. 농기계 가격자료로 시세 감도 미리 잡을 수 있어요.', 'used-machinery-inspection', `https://boribay.com/?category=MACHINERY&${UTM}`, '농기계 매물 보기'],
  ['탁송 업체', '산 농기계를 옮기는 일까지', '농기계를 옮겨야 할 때는 지역의 탁송 업체를 찾아 연락합니다. 탁송 비용을 미리 따져 볼 수 있는 안내 글도 함께 볼 수 있어요.', 'machinery-transport', `https://boribay.com/?category=TRANSPORT&${UTM}`, '탁송 업체 보기'],
  ['농촌생활 안내', '농사 뒤처리까지 함께 챙겨요', '영농폐기물 처리, 위탁판매, 제철 과일 고르는 법처럼 농촌 생활에 필요한 안내 글을 읽고, 커뮤니티에서 이웃과 질문을 나눕니다.', 'farm-supplies-disposal', `https://boribay.com/guides?${UTM}`, '안내 글 보기'],
];

const STRIP = ['produce-direct-sale', 'used-machinery-inspection', 'hongro-apple', 'machinery-transport', 'humusa-plum', 'used-cultivator-inspection', 'farm-supplies-disposal'];

const CSS = `
:root{--ink:#212124;--ink2:#1a1c20;--sub:#4d5159;--mute:#6b7079;--line:#eaebee;--gray:#868b94;--bg:#fff;--soft:#f7f8fa;--yellow:#f5c02b;--yellow2:#fff4c7;--green:#3d6842;--green2:#e8f2e3;--blue2:#eaf0fb}
*{box-sizing:border-box;margin:0;padding:0}
html{-webkit-text-size-adjust:100%}
body{font-family:-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Malgun Gothic","Noto Sans KR",sans-serif;color:var(--ink);background:var(--bg);line-height:1.6;word-break:keep-all;-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{color:inherit;text-decoration:none}
img{display:block;max-width:100%;height:auto}
.in{max-width:1040px;margin:0 auto;padding:0 20px}
.skip{position:absolute;left:-999px}.skip:focus{left:12px;top:12px;background:#fff;padding:8px 12px;z-index:9}
a:focus-visible{outline:3px solid var(--yellow);outline-offset:3px;border-radius:8px}
header.gnb{position:sticky;top:0;z-index:5;background:rgba(255,255,255,.96)}
header.gnb .in{display:flex;align-items:center;height:68px}
.logo{display:flex;align-items:center;gap:8px;font-weight:800;font-size:20px;letter-spacing:-.03em;color:var(--green);white-space:nowrap}
.logo img{width:28px;height:28px;border-radius:8px}
header.gnb nav{margin-left:auto;display:flex;gap:40px;font-size:16px;font-weight:700}
header.gnb nav a{color:var(--ink)}header.gnb nav a[aria-current]{color:var(--green)}
.pill{display:inline-flex;align-items:center;gap:6px;background:var(--ink);color:#fff;border-radius:999px;padding:12px 20px;font-size:15px;font-weight:700;line-height:1}
.pill:hover{background:#000}.pill.light{background:#fff;color:var(--ink)}
.eyebrow{font-size:18px;font-weight:700;line-height:28px;color:var(--ink2)}
h1{font-size:64px;line-height:84px;font-weight:700;letter-spacing:-.02em}
h2{font-size:42px;line-height:58px;font-weight:700;letter-spacing:-.02em;color:var(--ink2)}
.hero{padding:92px 0 64px}
.media{position:relative;margin:56px auto 0;max-width:1000px;border-radius:24px;overflow:hidden;background:var(--yellow)}
.media img{width:100%;aspect-ratio:16/9;object-fit:cover;object-position:right center}
.media .over{position:absolute;left:56px;top:50%;transform:translateY(-50%);font-size:44px;line-height:60px;font-weight:700;color:var(--ink2);letter-spacing:-.02em}
.intro{padding:120px 0 96px}
.intro p{font-size:28px;line-height:44px;font-weight:700;letter-spacing:-.01em;max-width:960px}
.strip{overflow:hidden;padding-bottom:140px}
.track{display:flex;gap:20px;width:max-content;align-items:center;animation:flow 60s linear infinite}
.track img{border-radius:16px;object-fit:cover;width:270px;height:270px}
.track img:nth-child(odd){width:236px;height:340px}
.track img:nth-child(3n){width:342px;height:212px}
@keyframes flow{to{transform:translateX(-50%)}}
@media (prefers-reduced-motion:reduce){.track{animation:none}}
.sec{padding:120px 0}
.story{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;margin-top:80px}
.story h3{font-size:28px;line-height:40px;font-weight:700;letter-spacing:-.02em}
.story p{margin-top:16px;font-size:16px;line-height:26px;color:var(--sub)}
.story .tag{display:inline-block;font-size:14px;font-weight:700;color:var(--green);background:var(--green2);border-radius:999px;padding:6px 12px;margin-bottom:16px}
.pic{position:relative;border-radius:24px;overflow:hidden}
.pic img{width:100%;aspect-ratio:1/1;object-fit:cover}
.pic .chip{position:absolute;left:20px;bottom:20px;background:rgba(0,0,0,.45);color:#fff;font-size:14px;font-weight:700;border-radius:999px;padding:8px 14px}
.pic .pill{position:absolute;right:20px;bottom:20px}
.two{display:grid;grid-template-columns:380px 1fr;gap:60px;align-items:start}
.two .head{position:sticky;top:120px}
.qlist{display:flex;flex-direction:column;gap:16px}
.q{display:grid;grid-template-columns:96px 1fr;gap:24px;align-items:center;border:1px solid var(--line);border-radius:20px;padding:24px}
.q:hover{border-color:var(--gray)}
.q img{width:96px;height:96px;border-radius:16px;object-fit:cover;object-position:center;background:var(--soft)}
.q b{display:block;font-size:18px;line-height:28px;letter-spacing:-.01em}
.q span{display:block;margin-top:4px;font-size:15px;line-height:24px;color:var(--sub)}
.q small{display:block;margin-top:10px;font-size:14px;color:var(--mute);font-weight:700}
.vision .pic{margin-top:48px}
.vision .pic img{aspect-ratio:16/9}
.vision .pic .pill{right:50%;transform:translateX(50%);bottom:28px}
.nums{display:flex;gap:16px;overflow-x:auto;scrollbar-width:none;padding-bottom:4px}
.nums::-webkit-scrollbar{display:none}
.num{flex:0 0 240px;height:300px;border-radius:24px;padding:28px;display:flex;flex-direction:column;justify-content:space-between}
.num:nth-child(1){background:var(--yellow2)}.num:nth-child(2){background:var(--green2)}.num:nth-child(3){background:var(--blue2)}.num:nth-child(4){background:#fdeee6}
.num span{font-size:16px;font-weight:700}.num strong{font-size:48px;line-height:1.1;letter-spacing:-.02em}
.basis{margin-top:16px;font-size:14px;color:var(--mute)}
.cards2{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:40px}
.card2{border:1px solid var(--line);border-radius:24px;padding:40px;min-height:260px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}
.card2 b{font-size:28px;line-height:40px;letter-spacing:-.02em;max-width:300px}
.card2 .pill{align-self:flex-start}
.card2 img{position:absolute;right:28px;bottom:28px;width:110px;height:110px;border-radius:50%;object-fit:cover}
.newshead{display:flex;align-items:center;justify-content:space-between;gap:20px}
.ncards{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:40px}
.ncard img{border-radius:16px;aspect-ratio:16/10;object-fit:cover;width:100%}
.ncard h3{margin-top:16px;font-size:18px;line-height:28px;font-weight:700}
.ncard:hover h3{text-decoration:underline}
.ncard time,.row time{display:block;margin-top:6px;font-size:14px;color:var(--mute)}
footer{border-top:1px solid var(--line);padding:40px 0 56px;font-size:14px;color:var(--sub)}
footer .top{display:flex;align-items:center;justify-content:space-between;gap:20px}
footer .links{display:flex;flex-wrap:wrap;gap:12px 32px;font-weight:700;color:var(--ink)}
footer .sns{display:flex;gap:16px}footer .sns svg{width:24px;height:24px;fill:var(--ink)}
footer p{margin-top:28px;line-height:24px}footer p+p{margin-top:4px}
.svc-h1{padding:92px 0 40px}
.svc{display:grid;grid-template-columns:1fr 540px;gap:60px;align-items:center;padding:72px 0;border-bottom:1px solid var(--line)}
.svc .ico{width:56px;height:56px;border-radius:16px;background:var(--yellow2);display:grid;place-items:center;font-weight:800;font-size:20px;color:var(--green);margin-bottom:24px}
.svc .ico img{width:40px;height:40px;border-radius:10px}
.svc h2 a:hover{text-decoration:underline}
.svc h2{font-size:28px;line-height:40px}
.svc p{margin-top:12px;font-size:16px;line-height:26px;color:var(--sub);max-width:420px}
.svc .shot{border-radius:20px;overflow:hidden;border:1px solid var(--line)}
.svc .shot img{width:100%;aspect-ratio:540/320;object-fit:cover;object-position:top}
.subs{grid-column:1/-1;display:grid;grid-template-columns:repeat(4,1fr);gap:32px;margin-top:8px}
.subs h3{font-size:18px;line-height:28px}.subs p{margin-top:6px;font-size:15px;line-height:24px}
.list-h{padding:92px 0 40px;text-align:center}
.list{max-width:760px;margin:0 auto;padding-bottom:120px}
.row{display:grid;grid-template-columns:200px 1fr;gap:28px;align-items:center;padding:20px 0}
.row img{border-radius:12px;aspect-ratio:16/9;object-fit:cover;width:100%}
.row h2{font-size:18px;line-height:28px}.row:hover h2{text-decoration:underline}
.row p{margin-top:4px;font-size:15px;line-height:24px;color:var(--sub)}
article.post{max-width:760px;margin:0 auto;padding:92px 0 120px}
article.post h1{font-size:40px;line-height:56px}
article.post .pic{margin-top:40px}article.post .pic img{aspect-ratio:16/9}
article.post .body{margin-top:40px;font-size:17px;line-height:30px;color:#2e3138}
article.post .body p+p{margin-top:20px}
.back{display:inline-flex;margin-top:56px}
dl.info{display:grid;grid-template-columns:200px 1fr;margin-top:40px;border-top:1px solid var(--ink)}
dl.info dt,dl.info dd{padding:20px 0;border-bottom:1px solid var(--line);font-size:16px}dl.info dt{font-weight:700}dl.info dd{color:var(--sub)}
.rules{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:40px}
.rules div{border:1px solid var(--line);border-radius:20px;padding:28px}
.rules b{display:block;font-size:20px;line-height:30px}.rules p{margin-top:8px;font-size:15px;line-height:24px;color:var(--sub)}
.hist{margin-top:40px;border-top:1px solid var(--ink)}
.hist li{list-style:none;display:grid;grid-template-columns:200px 1fr;padding:20px 0;border-bottom:1px solid var(--line);font-size:16px}
.hist time{font-weight:700}.hist span{color:var(--sub)}
.contact{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px}
.contact a{border:1px solid var(--line);border-radius:20px;padding:28px}.contact a:hover{border-color:var(--gray)}
.contact b{display:block;font-size:18px}.contact span{display:block;margin-top:6px;color:var(--sub)}
@supports (animation-timeline:view()){
 .media{max-width:none;margin-left:0;margin-right:0;animation:open linear both;animation-timeline:view();animation-range:cover 10% cover 45%}
 @keyframes open{from{clip-path:inset(0 max(20px,calc((100% - 1000px)/2)) round 24px)}to{clip-path:inset(0 0 round 0)}}
 .media .over{left:max(56px,calc((100% - 1000px)/2 + 56px))}
 .intro p span{color:var(--gray);animation:ink linear both;animation-timeline:view();animation-range:cover 35% cover 50%}
 @keyframes ink{to{color:var(--ink)}}
}
@media (max-width:900px){
 h1{font-size:36px;line-height:48px}h2{font-size:28px;line-height:40px}.eyebrow{font-size:16px}
 header.gnb nav{gap:18px;font-size:15px;white-space:nowrap}header.gnb nav a:last-child{display:none}
 .hero{padding:56px 0 40px}.media{margin-top:32px;border-radius:16px}.media img{aspect-ratio:4/3}.media .over{left:40px;font-size:24px;line-height:34px}
 .intro{padding:72px 0 56px}.intro p{font-size:22px;line-height:34px}
 .strip{padding-bottom:80px}.track img,.track img:nth-child(odd),.track img:nth-child(3n){width:180px;height:200px}
 .sec{padding:80px 0}
 .story,.two,.cards2,.ncards,.rules,.contact,.svc{grid-template-columns:1fr}.story{gap:28px;margin-top:56px}.two{gap:32px}.two .head{position:static}
 .q{grid-template-columns:72px 1fr;gap:16px;padding:18px}.q img{width:72px;height:72px}
 .num{flex-basis:200px;height:240px}.num strong{font-size:40px}
 .card2{padding:28px;min-height:220px}.card2 b{font-size:22px;line-height:32px;max-width:200px}.card2 img{width:80px;height:80px}
 .newshead{flex-direction:column;align-items:flex-start}
 .svc{gap:28px;padding:48px 0}.subs{grid-template-columns:1fr 1fr;gap:20px}
 .row{grid-template-columns:120px 1fr;gap:16px}
 article.post h1{font-size:28px;line-height:40px}
 dl.info,.hist li{grid-template-columns:120px 1fr}
 footer .top{flex-direction:column;align-items:flex-start}
}
@media (min-width:901px){.story:nth-of-type(even) .pic{order:-1}}
@supports not (animation-timeline:view()){@media (max-width:900px){.media{margin:32px 20px 0}}}
`.replace(/\n\s*/g, '');

const NAV = [['/service/', '서비스'], ['/news/', '소식'], ['/company/', '회사 정보']];
const INSTAGRAM = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM21 8.1c-.1-1.5-.4-2.8-1.5-3.9S17.1 2.8 15.6 2.7C14 2.6 10 2.6 8.4 2.7 6.9 2.8 5.6 3.1 4.5 4.2S3 6.6 2.9 8.1C2.8 9.7 2.8 14.3 2.9 15.9c.1 1.5.4 2.8 1.6 3.9 1.1 1.1 2.4 1.4 3.9 1.5 1.6.1 5.6.1 7.2 0 1.5-.1 2.8-.4 3.9-1.5s1.4-2.4 1.5-3.9c.1-1.6.1-6.2 0-7.8Zm-2 9.6a3 3 0 0 1-1.7 1.7c-1.2.5-4 .4-5.3.4s-4.1.1-5.3-.4a3 3 0 0 1-1.7-1.7c-.5-1.2-.4-4-.4-5.3s-.1-4.1.4-5.3A3 3 0 0 1 6.7 5.4C7.9 4.9 10.7 5 12 5s4.1-.1 5.3.4A3 3 0 0 1 19 7.1c.5 1.2.4 4 .4 5.3s.1 4.1-.4 5.3Z"/></svg>';

function page({ path, title, description, body, current, jsonld, preload }) {
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
<link rel="icon" href="${IMG}/borijangteo-logo-v4-64.png" type="image/png">${preload ? `\n${preload}` : ''}
<style>${CSS}</style>${jsonld ? `\n<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ''}
</head>
<body>
<a class="skip" href="#main">본문 바로가기</a>
<header class="gnb"><div class="in"><a class="logo" href="/" aria-label="제이 미디어 홈"><img src="${IMG}/borijangteo-logo-v4-64.png" width="28" height="28" alt="">J MEDIA</a><nav aria-label="주요 메뉴">${nav}<a href="${BORIBAY}">보리장터 ↗</a></nav></div></header>
<main id="main">
${body}
</main>
<footer><div class="in">
<div class="top"><div class="links"><a href="/company/">회사 정보</a><a href="/news/">소식</a><a href="/privacy.html">개인정보처리방침</a><a href="/terms.html">이용약관</a><a href="/services.html">웹 제작 의뢰</a></div><div class="sns"><a href="https://www.instagram.com/boribaydotcom/" aria-label="보리장터 인스타그램">${INSTAGRAM}</a></div></div>
<p>제이 미디어(Media) · 대표 이정우 · 사업자등록번호 456-33-01705 · 고객센터 <a href="tel:${PHONE.replace(/-/g, '')}">${PHONE}</a></p>
<p>© 제이 미디어. 보리장터는 거래를 연결하며 개별 거래의 당사자가 아닙니다.</p>
</div></footer>
</body>
</html>
`;
}

const iso = d => d.replace(/\./g, '-');
const pic = (name, w, alt, attrs = 'loading="lazy" decoding="async"') =>
  `<img src="${IMG}/${name}-960.webp" srcset="${IMG}/${name}-480.webp 480w, ${IMG}/${name}-960.webp 960w" sizes="(max-width:900px) 100vw, ${w}px" width="960" height="720" alt="${alt}" ${attrs}>`;

// 홈 (당근 홈 구성: 히어로 → 소개 문단 → 이미지 띠 → 이야기 → 인터뷰형 목록 → 비전 → 숫자 → 일하는 방식 → 소식)
const intro = ['제이 미디어는 농촌의 가까운 거래에 주목합니다.', ' 같은 지역의 농산물과 중고 농기계를 이웃끼리 사고팔 수 있도록 보리장터를 만들고 있어요.', ' 판매자와 구매자는 직접 보고, 묻고, 확인한 뒤 거래합니다.', ' 거래 전후에 필요한 계산과 확인은 아홉 개의 도구가 함께 돕습니다.'];
const stripImgs = STRIP.map(n => `<img src="${IMG}/${n}-480.webp" width="480" height="360" alt="" loading="lazy" decoding="async">`).join('');
const home = page({
  path: '/', current: '/',
  title: '제이 미디어 | 우리 농촌 가까이, 보리장터',
  description: '제이 미디어는 농산물과 중고 농기계를 같은 지역 사람끼리 사고파는 보리장터와 농촌 거래 도구 9곳을 만들고 운영합니다.',
  preload: `<link rel="preload" as="image" href="${IMG}/hero-1536.webp" imagesrcset="${IMG}/hero-768.webp 768w, ${IMG}/hero-1536.webp 1536w" imagesizes="(max-width:900px) 100vw, 1000px" fetchpriority="high">`,
  jsonld: { '@context': 'https://schema.org', '@type': 'Organization', name: '제이 미디어', alternateName: 'J MEDIA', url: SITE + '/', logo: SITE + '/assets/jmedia-new-logo.jpg', telephone: '+82-10-2846-2011', brand: { '@type': 'Brand', name: '보리장터', url: 'https://boribay.com/' } },
  body: `<section class="hero"><div class="in"><h1>우리 농촌 가까이, 보리장터</h1></div>
<div class="media"><img src="${IMG}/hero-1536.webp" srcset="${IMG}/hero-768.webp 768w, ${IMG}/hero-1536.webp 1536w" sizes="(max-width:900px) 100vw, 1000px" width="1536" height="1024" alt="노란 들판과 비닐하우스, 트랙터와 농산물 상자가 있는 보리장터 일러스트" fetchpriority="high"><p class="over">농산물과 농기계,<br>가까이서 만나요</p></div></section>
<section class="intro"><div class="in"><p>${intro.map(s => `<span>${s}</span>`).join('')}</p></div></section>
<div class="strip" aria-hidden="true"><div class="track">${stripImgs}${stripImgs}</div></div>
<section class="sec" style="padding-top:0"><div class="in">
<p class="eyebrow">보리장터 이야기</p>
<h2>보리장터에서 달라지는 거래</h2>
${STORIES.map(([tag, title, text, img, href, more]) => `<div class="story"><div><span class="tag">${tag}</span><h3>${title}</h3><p>${text}</p></div><div class="pic">${pic(img, 460, '')}<span class="chip">${tag}</span><a class="pill light" href="${href}">${more} →</a></div></div>`).join('\n')}
</div></section>
<section class="sec"><div class="in two">
<div class="head"><p class="eyebrow">거래 전후를 돕는 도구</p><h2>보리장터와 함께<br>운영하는 서비스</h2></div>
<div class="qlist">${TOOLS.map(([key, name, url, kind, text]) => `<a class="q" href="${url}"><img src="/assets/service/${key}.webp" width="1080" height="640" alt="" loading="lazy" decoding="async"><div><b>${kind}, ${name}</b><span>${text}</span><small>사이트 보러 가기 →</small></div></a>`).join('')}</div>
</div></section>
<section class="sec vision"><div class="in">
<h2>농촌의 거래를<br>가까이 잇는 일을 해요</h2>
<div class="pic">${pic('hongro-apple', 1000, '사과 상자와 과수원이 그려진 보리장터 일러스트')}<a class="pill" href="${BORIBAY}">보리장터 둘러보기 →</a></div>
</div></section>
<section class="sec"><div class="in two">
<div class="head"><h2>제이 미디어는<br>조금씩 넓혀 가고 있어요</h2><p class="basis">2026년 10월 기준</p></div>
<div class="nums">
<div class="num"><span>운영 서비스</span><strong>10</strong></div>
<div class="num"><span>지원 언어</span><strong>2</strong></div>
<div class="num"><span>농촌생활 안내 글</span><strong>8</strong></div>
<div class="num"><span>공동집하장 주소</span><strong>9,553</strong></div>
</div>
</div></section>
<section class="sec"><div class="in">
<h2>제이 미디어가 일하는 방식</h2>
<div class="cards2">
<div class="card2"><b>거래는 이용자의 것,<br>정보는 확인한 만큼</b><a class="pill" href="/company/#principles">일하는 방식 보러 가기 →</a><img src="${IMG}/used-machinery-inspection-480.webp" width="480" height="360" alt="" loading="lazy" decoding="async"></div>
<div class="card2"><b>함께할 파트너를<br>찾고 있어요!</b><a class="pill" href="${KAKAO_JMEDIA}">제휴 문의하기 →</a><img src="${IMG}/produce-direct-sale-480.webp" width="480" height="360" alt="" loading="lazy" decoding="async"></div>
</div>
</div></section>
<section class="sec"><div class="in">
<div class="newshead"><h2>제이 미디어의 최근 소식을 확인하세요</h2><a class="pill" href="/news/">소식 보러 가기 →</a></div>
<div class="ncards">${NEWS.slice(0, 3).map(n => `<a class="ncard" href="/news/${n.slug}/"><img src="${IMG}/${n.img}.webp" width="480" height="300" alt="" loading="lazy" decoding="async"><h3>${n.title}</h3><time datetime="${iso(n.date)}">${n.date}</time></a>`).join('')}</div>
</div></section>`,
});

// 서비스 (당근 서비스 페이지 구성: 제목 → 서비스마다 아이콘·이름↗·설명 + 오른쪽 큰 이미지)
const SUBS = [['농산물', '제철 농산물을 같은 지역에서 바로 사고팝니다.'], ['중고 농기계', '방문 일정을 잡아 현장에서 점검한 뒤 거래합니다.'], ['탁송 업체', '농기계를 옮겨 줄 업체를 지역별로 찾습니다.'], ['커뮤니티', '농사와 거래에 관한 질문을 이웃과 나눕니다.']];
const service = page({
  path: '/service/', current: '/service/',
  title: '서비스 | 제이 미디어',
  description: '보리장터와 거래 전후를 돕는 농촌 거래 도구 9곳, 제이 미디어가 운영하는 서비스를 소개합니다.',
  body: `<section class="svc-h1"><div class="in"><h1>우리 농촌 가까이,<br>농촌 거래의 모든 것</h1></div></section>
<section><div class="in">
<div class="svc"><div><div class="ico"><img src="${IMG}/borijangteo-logo-v4-64.png" width="40" height="40" alt=""></div><h2><a href="${BORIBAY}">보리장터 ↗</a></h2><p>지역 농산물과 중고 농기계 매물을 둘러보고, 채팅으로 묻고, 현장에서 확인한 뒤 거래하는 농촌 지역 거래 서비스예요. 웹과 Android 앱에서 쓸 수 있고, 몽골어 마켓도 함께 운영합니다.</p><p><a class="pill" href="${PLAY}" style="margin-top:8px">Google Play에서 앱 받기 →</a></p></div><div class="shot"><img src="/assets/service/boribay.webp" width="1080" height="640" alt="보리장터 웹 첫 화면" fetchpriority="high"></div>
<div class="subs">${SUBS.map(([n, t]) => `<div><h3>${n}</h3><p>${t}</p></div>`).join('')}</div></div>
${TOOLS.map(([key, name, url, kind, text]) => `<div class="svc"><div><div class="ico">${name.slice(0, 1)}</div><h2><a href="${url}">${name} ↗</a></h2><p><b>${kind}.</b> ${text}</p></div><a class="shot" href="${url}" tabindex="-1" aria-hidden="true"><img src="/assets/service/${key}.webp" width="1080" height="640" alt="" loading="lazy" decoding="async"></a></div>`).join('\n')}
</div></section>
<div style="height:80px"></div>`,
});

// 소식 목록 (당근 보도자료 구성: 가운데 제목 → 썸네일·제목·요약·날짜 목록)
const newsList = page({
  path: '/news/', current: '/news/',
  title: '소식 | 제이 미디어',
  description: '보리장터와 제이 미디어 서비스의 출시, 업데이트, 운영 소식입니다.',
  body: `<section class="list-h"><div class="in"><h1 style="font-size:40px;line-height:56px">제이 미디어 소식</h1></div></section>
<section><div class="in"><div class="list">${NEWS.map(n => `<a class="row" href="/news/${n.slug}/"><img src="${IMG}/${n.img}.webp" width="480" height="300" alt="" loading="lazy" decoding="async"><div><h2>${n.title}</h2><p>${n.summary}</p><time datetime="${iso(n.date)}">${n.date}</time></div></a>`).join('')}</div></div></section>`,
});

// 소식 상세
const newsPages = NEWS.map(n => [`news/${n.slug}/index.html`, page({
  path: `/news/${n.slug}/`, current: '/news/',
  title: `${n.title} | 제이 미디어 소식`,
  description: n.summary,
  body: `<div class="in"><article class="post">
<time datetime="${iso(n.date)}">${n.date}</time>
<h1>${n.title}</h1>
<div class="pic"><img src="${IMG}/${n.img}.webp" width="480" height="300" alt=""></div>
<div class="body">${n.body.map(p => `<p>${p}</p>`).join('')}</div>
<a class="pill back" href="/news/">← 소식 목록</a>
</article></div>`,
})]);

// 회사 정보 (당근 IR 자리: 개요 → 일하는 방식 → 연혁 목록 → 문의)
const company = page({
  path: '/company/', current: '/company/',
  title: '회사 정보 | 제이 미디어',
  description: '제이 미디어의 사업자 정보, 일하는 방식, 연혁과 문의 방법입니다.',
  body: `<section class="list-h" style="text-align:left"><div class="in">
<p class="eyebrow">회사 정보</p>
<h1>제이 미디어</h1>
<dl class="info">
<dt>상호</dt><dd>제이 미디어(Media)</dd>
<dt>대표</dt><dd>이정우</dd>
<dt>사업자등록번호</dt><dd>456-33-01705</dd>
<dt>주요 서비스</dt><dd>보리장터(boribay.com), 농촌 거래 도구 9곳</dd>
<dt>고객센터</dt><dd><a href="tel:${PHONE.replace(/-/g, '')}">${PHONE}</a></dd>
</dl>
</div></section>
<section class="sec" id="principles" style="padding-top:40px"><div class="in">
<h2>일하는 방식</h2>
<div class="rules">
<div><b>거래의 주인은 이용자입니다</b><p>보리장터는 판매자와 구매자를 연결할 뿐 개별 거래의 당사자가 아니며, 결제와 배송을 대신하지 않습니다.</p></div>
<div><b>물건은 현장에서 확인합니다</b><p>특히 농기계는 판매자와 일정을 잡아 직접 보고 점검한 뒤 거래하도록 안내합니다.</p></div>
<div><b>위치는 필요한 만큼만</b><p>동네 인증 때 위치를 한 번 사용하고 좌표는 저장하지 않으며, 공개 화면에는 활동 지역만 보입니다.</p></div>
<div><b>출처와 날짜를 구분합니다</b><p>가격자료와 안내 글은 출처와 확인한 날짜를 나눠 적고, 고친 내용은 수정 이력으로 남깁니다.</p></div>
</div>
</div></section>
<section class="sec" style="padding-top:0"><div class="in">
<h2>연혁</h2>
<ol class="hist">
${NEWS.map(n => `<li><time datetime="${iso(n.date)}">${n.date}</time><span>${n.title.replace(/했습니다$/, '')}</span></li>`).join('\n')}
<li><time datetime="2026-05">2026.05</time><span>제이 미디어 웹사이트(jnewmedia.com) 개설</span></li>
</ol>
</div></section>
<section class="sec" id="contact" style="padding-top:0"><div class="in">
<h2>문의</h2>
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
