# J MEDIA Next Fix Checklist

Source reviewed: `C:\Users\jangjinseo\Desktop\새 텍스트 문서.txt`
Review date: 2026-05-27

## P0. iPhone 13 mini polish

- [x] 375px width에서 hero 문장과 contact 문장이 흐르지 않게 보정
- [x] 좁은 모바일에서 주요 레이아웃을 viewport 안으로 묶기
- [x] iPhone 13 mini 기준 contact, highlights, FAQ 스크롤 QA
- [x] 모바일 sticky CTA 하단 겹침 방지 여백 확인
- [x] 모바일 메뉴 오픈 시 배경 스크롤 잠금, Escape 닫기, 링크 터치 영역 보강

## P1. 첫인상 비주얼 강화

- [x] `WELCOME TO J MEDIA WORLD`를 더 강한 세계관 카피로 확장
- [x] 히어로 이미지 3개에 브랜드 시그니처 오브젝트 추가
- [x] 섹션 전환 리듬을 컬러/무드로 분리
- [x] `J MEDIA WORLD`를 더 큰 무대형 섹션으로 확장
- [x] 운영 사이트 9개를 orbit/lab 카드 요소로 시각화
- [x] `Click!`, `Hover and find the structure` playful microcopy 정리
- [x] 일부 카드/라벨의 과한 기울기와 겹침 완화

## P2. Portfolio showcase upgrade

- [x] `Featured Work`와 `More Works`를 분리
- [x] 현재 J MEDIA redesign 사이트를 대표 제작물로 크게 노출
- [x] 실제 배포 화면 기준 mockup 교체 준비: WebP 파생본과 OG 대표 이미지 생성
- [x] 각 프로젝트에 `Type/Period/Core Feature` 메타 정보 추가
- [x] 프로젝트명 아래 설명명을 붙여 이해도 강화
- [x] 카드 hover 시 이미지/배경 반응 효과 추가
- [x] 데스크톱 이미지 hover preview 제공
- [x] 모바일 hover 대체 tap preview 제공

## P3. Service and sales clarity

- [x] `Services`, 패키지, 제작 기간, FAQ, Cloudflare 안전 배포 문구 추가
- [x] 패키지별 시작가/가격 힌트 추가 여부 결정
- [x] `원페이지 제작`, `반응형 웹사이트 제작`, `브랜드형 웹페이지` 표현 직접 배치
- [x] 고객 유형별 진입점 명확화
- [x] `AI 개발 워크플로우` 표현을 안전한 제작 워크플로우로 정리
- [x] 완료 후 제공 항목 명시
- [x] 유지보수 가능 범위와 수정 요청 방식 구체화

## P4. Trust, legal, and official feel

- [x] 비밀번호 공유 없음, Cloudflare 초대 방식, 자체 프로젝트 고지 추가
- [x] 개인정보 처리 안내 페이지 추가
- [x] 이용약관/면책 안내 페이지 추가
- [x] 공식 이메일 노출 위치를 `weblaunch.j@gmail.com`으로 통일
- [x] `Studio Brief` 페이지 생성
- [x] `Internal Labs / Owned Products / Style Studies` 구분 강화
- [ ] 커스텀 도메인 연결 후 `pages.dev` 흔적 축소

## P5. Technical quality

- [x] `robots.txt`, `sitemap.xml`, `site.webmanifest`, canonical 기본 세팅
- [x] 이미지 `loading="lazy"` 적용 범위 점검
- [x] WebP 대체 이미지 파이프라인 생성
- [x] OG 대표 이미지 생성
- [x] 시스템 폰트 전략 문서화: 외부 preload 없음
- [ ] Lighthouse 모바일 성능/접근성 실측
- [x] H1/H2/H3 계층, 반복 링크 텍스트, focus-visible 접근성 점검
- [x] hover 중심 인터랙션의 reduced motion/mobile fallback 보강

## P6. Template/productization later

- [x] 프로젝트 데이터를 `project-data.js` 배열로 분리
- [x] 포트폴리오 상세 페이지 `/works/...` 구조 확장 여부 결정 문서화
- [x] 고객 업종별 템플릿으로 재사용 가능한 섹션 구조 추가
- [x] 색상, duration, easing 토큰 CSS 변수로 분리
- [x] 클론 포트폴리오와 실제 제작 서비스 페이지 분리 여부 검토 문서화
