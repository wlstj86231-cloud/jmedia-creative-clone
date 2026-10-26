// 제이 미디어 사이트 상호작용: 헤더 그림자, 모바일 메뉴, 등장 효과, 이야기 탭, 숫자 카운트, 소식 넘기기
// 움직임은 transform·opacity만 쓰고, 스크롤 처리는 requestAnimationFrame으로 묶어 저사양 폰에서도 가볍게 돈다.
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 헤더: 조금이라도 내려가면 아래 경계선 표시
  const header = document.querySelector('.gnb');
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { header.classList.toggle('scrolled', scrollY > 4); ticking = false; });
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

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
      if (reduce) { el.textContent = end.toLocaleString('ko-KR'); continue; }
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

  // 이야기 탭: 누르면 바뀌고, 보이는 동안 7초마다 다음 탭으로
  const tabs = document.querySelector('.tabs');
  if (tabs) {
    const btns = [...tabs.querySelectorAll('[role=tab]')];
    const panels = btns.map(b => document.getElementById(b.getAttribute('aria-controls')));
    let cur = 0, timer = 0, visible = false;
    const show = i => {
      cur = (i + btns.length) % btns.length;
      btns.forEach((b, k) => { b.setAttribute('aria-selected', String(k === cur)); b.tabIndex = k === cur ? 0 : -1; });
      panels.forEach((p, k) => p.classList.toggle('active', k === cur));
      restart();
    };
    const restart = () => {
      clearTimeout(timer);
      tabs.classList.remove('run'); void tabs.offsetWidth; tabs.classList.add('run');
      if (visible && !reduce) timer = setTimeout(() => show(cur + 1), 7000);
    };
    btns.forEach((b, i) => {
      b.addEventListener('click', () => show(i));
      b.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { show(cur + 1); btns[cur].focus(); } if (e.key === 'ArrowLeft') { show(cur - 1); btns[cur].focus(); } });
    });
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; restart(); }, { threshold: 0.4 }).observe(tabs.closest('section'));
  }

  // 소식 카드 넘기기
  document.querySelectorAll('[data-rail]').forEach(wrap => {
    const rail = wrap.querySelector('.rail');
    const step = () => (rail.firstElementChild?.getBoundingClientRect().width || 300) + 24;
    wrap.querySelector('[data-prev]').addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: 'smooth' }));
    wrap.querySelector('[data-next]').addEventListener('click', () => rail.scrollBy({ left: step(), behavior: 'smooth' }));
  });
})();
