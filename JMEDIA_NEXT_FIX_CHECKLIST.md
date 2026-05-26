# J MEDIA Next Fix Checklist

Source reviewed: `C:\Users\jangjinseo\Desktop\새 텍스트 문서.txt`
Review date: 2026-05-27

## P0. iPhone 13 mini polish

- [x] 375px width에서 홈 hero 문장과 contact 문장이 잘리지 않게 보정
- [x] 좁은 모바일에서 주요 레이아웃을 viewport 안으로 묶기
- [ ] iPhone 13 mini 실기기 Safari에서 홈, contact, highlights, FAQ까지 직접 스크롤 QA
- [ ] 모바일 sticky CTA가 하단 콘텐츠와 겹치는지 하단 섹션까지 확인
- [ ] 모바일 메뉴를 열었을 때 배경 스크롤 잠금과 링크 터치 영역 재확인

## P1. 원본급 비주얼 밀도

- [x] 히어로의 `WELCOME TO J MEDIA WORLD`를 더 짧고 강한 세계관 카피로 재검토
- [x] 히어로에 장식 이미지 3개 외에 브랜드 시그니처 오브젝트 추가
- [x] 섹션 전환 중 한 곳은 완전히 다른 컬러/무드로 바꿔 리듬 만들기
- [ ] `J MEDIA WORLD`를 더 큰 무대형 섹션으로 확장
- [x] 운영 사이트 9개를 텍스트 마키가 아니라 orbit/lab 카드 또는 로고형 요소로 시각화
- [x] `Click!`, `Hover and find the structure` 같은 playful microcopy를 더 늘리기
- [x] 일부 카드/라벨을 의도적으로 기울여 정돈된 템플릿 느낌 줄이기

## P2. Portfolio showcase upgrade

- [x] `Featured Work`와 `More Works`를 더 강하게 분리
- [x] 현재 J MEDIA redesign 사이트를 대표작으로 더 크게 노출
- [ ] 실제 배포 화면 기준 desktop/mobile 스크린샷을 생성해서 mockup 이미지를 교체
- [x] 각 프로젝트에 `Client/Type/Year/Period/Core Feature` 메타 정보 추가
- [x] 긴 영문 프로젝트명에는 한글 설명명을 함께 붙이기
- [x] 카드 hover 시 이미지가 더 크게 움직이거나 배경색이 바뀌는 효과 추가
- [ ] 데스크톱에서 이미지 hover preview 또는 fullscreen project view 검토
- [ ] 모바일에서는 hover 대체로 tap/accordion 방식 미리보기 제공

## P3. Service and sales clarity

- [x] `Services`, 패키지, 제작 기간, FAQ, Cloudflare 안전 배포 문구 추가
- [x] 각 패키지에 시작가 또는 가격 힌트 추가 여부 결정
- [x] `홈페이지 제작`, `반응형 웹사이트 제작`, `브랜딩형 홈페이지` 표현을 더 직접적으로 배치
- [x] 고객 유형별 진입을 더 명확히 만들기: 소상공인, 브랜드, 랜딩, 정보/도구형
- [x] `AI 개발 워크플로우`는 저가 느낌이 나지 않게 `빠른 제작 워크플로우`로 안전하게 소개
- [x] 완료 후 제공 항목을 명시: 소스코드, 배포 안내, 도메인 연결, 기본 SEO 파일
- [x] 유지보수 가능 범위와 수정 요청 방식 구체화

## P4. Trust, legal, and official feel

- [x] 비밀번호 공유 없음, Cloudflare 초대 방식, 자체 프로젝트 고지 추가
- [x] 개인정보처리방침 또는 개인정보 수집 안내 별도 페이지 추가
- [x] 이용약관/면책 안내 또는 간단한 납품 범위 고지 추가
- [ ] 공식 이메일 노출 위치 통일: `weblaunch.j@gmail.com` 중심으로 정리할지 결정
- [x] 회사소개서 PDF 또는 `Studio Brief` 문서형 페이지 만들기
- [x] 실제 고객 로고가 없다는 점을 유지하면서 `Internal Labs / Owned Products / Style Studies` 구분 강화
- [ ] 커스텀 도메인 연결 후 `pages.dev` 실험작 느낌 줄이기

## P5. Technical quality

- [x] `robots.txt`, `sitemap.xml`, `site.webmanifest`, canonical 기본 세팅 완료
- [x] 이미지 `loading="lazy"` 적용 범위 점검
- [ ] WebP/AVIF 변환 또는 대체 이미지 파이프라인 검토
- [ ] OG 이미지 전용 강한 대표 이미지 만들기
- [ ] 폰트 preload 또는 로컬 폰트 전략 검토
- [ ] Lighthouse 모바일 성능/접근성 점검
- [ ] H1/H2/H3 계층, 반복 링크 텍스트, focus-visible 접근성 재점검
- [ ] hover 중심 인터랙션의 reduced motion/mobile fallback 최종 점검

## P6. Template/productization later

- [ ] 프로젝트 데이터를 JSON 또는 JS 배열로 분리
- [ ] 포트폴리오 상세 페이지를 `/works/...` 구조로 확장할지 결정
- [ ] 고객 업종별 템플릿으로 재사용 가능한 섹션 구조 정리
- [x] 색상, duration, easing 토큰을 더 명확한 CSS 변수로 분리
- [ ] 클론 포트폴리오와 실제 제작 서비스 페이지를 분리할지 검토
