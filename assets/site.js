// 제이 미디어 사이트 상호작용: 헤더 그림자, 모바일 메뉴, 등장 효과, 사진 릴, 이야기 전환, 숫자 카운트, 소식 넘기기
// 움직임은 transform·opacity만 쓰고, 스크롤 이벤트 대신 IntersectionObserver를 써서 저사양 폰에서도 가볍게 돈다.
(() => {
  // 헤더: 맨 위 표시점이 화면에서 벗어나면 아래 경계선 표시 (스크롤 이벤트 없이)
  const header = document.querySelector('.gnb');
  const top = document.createElement('div');
  top.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:5px';
  top.setAttribute('aria-hidden', 'true');
  document.body.prepend(top);
  new IntersectionObserver(([e]) => header.classList.toggle('scrolled', !e.isIntersecting)).observe(top);

  // 모바일 메뉴
  const toggle = document.querySelector('.menu-btn');
  if (toggle) toggle.addEventListener('click', () => {
    const open = header.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  // 화면에 들어올 때 한 번만 나타나기
  const reveal = new IntersectionObserver(entries => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('on'); reveal.unobserve(e.target); }
  }, { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('[data-r]').forEach(el => reveal.observe(el));

  // 숫자 카운트 (화면에 들어올 때 1.2초 동안)
  const counter = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      counter.unobserve(e.target);
      const el = e.target, end = Number(el.dataset.count);
      const t0 = performance.now();
      const tick = t => {
        const p = Math.min(1, (t - t0) / 1200), v = Math.round(end * (1 - Math.pow(1 - p, 3)));
        el.textContent = v.toLocaleString('ko-KR');
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-count]').forEach(el => counter.observe(el));

  // 첫 화면 사진 릴: 화면 밖으로 나가면 넘김을 멈춘다
  const reel = document.querySelector('.reel');
  if (reel) new IntersectionObserver(([e]) => reel.classList.toggle('off', !e.isIntersecting)).observe(reel);

  // 보리장터 이야기: 화면 가운데를 지나는 단계에 맞춰 사진과 글을 바꾼다 (큰 화면에서만 겹쳐 보임)
  const stories = document.querySelector('[data-stories]');
  if (stories) {
    const items = [...stories.querySelectorAll('.story')];
    const bars = [...stories.querySelectorAll('.st-bar i')];
    const steps = [...stories.querySelectorAll('.st-steps i')];
    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const k = steps.indexOf(e.target);
        items.forEach((it, j) => it.classList.toggle('on', j === k));
        bars.forEach((b, j) => b.classList.toggle('on', j === k));
      }
    }, { rootMargin: '-50% 0px -50% 0px' });
    steps.forEach(s => io.observe(s));
  }

  // 소식 카드 넘기기
  document.querySelectorAll('[data-rail]').forEach(wrap => {
    const rail = wrap.querySelector('.rail');
    const step = () => (rail.firstElementChild?.getBoundingClientRect().width || 300) + 24;
    wrap.querySelector('[data-prev]').addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: 'smooth' }));
    wrap.querySelector('[data-next]').addEventListener('click', () => rail.scrollBy({ left: step(), behavior: 'smooth' }));
  });
})();
