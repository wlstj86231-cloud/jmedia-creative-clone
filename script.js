const header = document.querySelector("[data-header]");
const progress = document.querySelector("[data-progress]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const cursor = document.querySelector("[data-cursor]");
const hero = document.querySelector("[data-hero]");
const mobileStickyCta = document.querySelector(".mobile-sticky-cta");

function updateChrome() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
  if (progress) progress.style.width = `${Math.min(ratio * 100, 100)}%`;
  if (header) header.classList.toggle("is-compact", window.scrollY > 24);
  if (mobileStickyCta) {
    const shouldShow = window.matchMedia("(max-width: 980px)").matches && window.scrollY > window.innerHeight * 0.55;
    mobileStickyCta.classList.toggle("is-visible", shouldShow);
  }
}

window.addEventListener("scroll", updateChrome, { passive: true });
window.addEventListener("resize", updateChrome);
updateChrome();

function markLoaded() {
  document.body.classList.add("is-loaded");
}

if (document.readyState === "loading") {
  window.addEventListener("load", markLoaded, { once: true });
} else {
  markLoaded();
}

menuToggle?.addEventListener("click", () => {
  const isOpen = mobileNav?.classList.toggle("open") || false;
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !mobileNav?.classList.contains("open")) return;
  mobileNav.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${Math.min(index * 80, 420)}ms`);
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const filterButtons = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll("[data-card]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    cards.forEach((card) => {
      const visible = filter === "all" || card.dataset.type === filter;
      card.classList.toggle("is-hidden", !visible);
    });
  });
});

hero?.addEventListener("pointermove", (event) => {
  const rect = hero.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;

  hero.querySelectorAll("[data-depth]").forEach((item) => {
    const depth = Number(item.dataset.depth || 0);
    item.style.translate = `${x * depth}px ${y * depth}px`;
  });
});

hero?.addEventListener("pointerleave", () => {
  hero.querySelectorAll("[data-depth]").forEach((item) => {
    item.style.translate = "0 0";
  });
});

const worldStage = document.querySelector("[data-world-stage]");

worldStage?.addEventListener("pointermove", (event) => {
  const rect = worldStage.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;

  worldStage.querySelectorAll(".world-item").forEach((item, index) => {
    const depth = (index + 1) * 10;
    item.style.translate = `${x * depth}px ${y * depth}px`;
  });
});

worldStage?.addEventListener("pointerleave", () => {
  worldStage.querySelectorAll(".world-item").forEach((item) => {
    item.style.translate = "0 0";
  });
});

if (cursor && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });

  document.querySelectorAll("[data-cursor-label]").forEach((item) => {
    item.addEventListener("pointerenter", () => {
      cursor.textContent = item.dataset.cursorLabel || "VIEW";
      cursor.classList.add("is-active");
    });
    item.addEventListener("pointerleave", () => {
      cursor.classList.remove("is-active");
    });
  });
}

const projectPreview = document.querySelector("[data-project-preview]");
const projectPreviewImage = projectPreview?.querySelector("img");
const projectPreviewLabel = projectPreview?.querySelector("span");
const previewCards = document.querySelectorAll("[data-preview]");
const coarsePointer = window.matchMedia("(pointer: coarse)");

function hideProjectPreview() {
  projectPreview?.classList.remove("is-visible");
}

function clearTapPreviews(exceptCard) {
  previewCards.forEach((card) => {
    if (card !== exceptCard) card.classList.remove("is-tap-preview");
  });
}

if (projectPreview && projectPreviewImage && projectPreviewLabel) {
  previewCards.forEach((card) => {
    card.addEventListener("pointerenter", () => {
      if (coarsePointer.matches) return;
      projectPreviewImage.src = card.dataset.preview;
      projectPreviewLabel.textContent = card.dataset.previewLabel || "Project preview";
      projectPreview.classList.add("is-visible");
    });

    card.addEventListener("pointermove", (event) => {
      if (coarsePointer.matches) return;
      projectPreview.style.left = `${event.clientX}px`;
      projectPreview.style.top = `${event.clientY}px`;
    });

    card.addEventListener("pointerleave", hideProjectPreview);

    card.addEventListener("click", (event) => {
      if (!coarsePointer.matches || card.classList.contains("is-tap-preview")) return;
      event.preventDefault();
      clearTapPreviews(card);
      card.classList.add("is-tap-preview");
    });
  });

  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!coarsePointer.matches || target?.closest("[data-preview]")) return;
    clearTapPreviews();
  });
}

const motionTrack = document.querySelector("[data-motion-track]");
const motionProgress = document.querySelector("[data-motion-progress]");
const motionPrev = document.querySelector("[data-motion-prev]");
const motionNext = document.querySelector("[data-motion-next]");
const motionSection = motionTrack?.closest(".works-motion");
const finePointer = window.matchMedia("(pointer: fine)");
let motionTargetScroll = 0;
let motionFrame = 0;

function updateMotionProgress() {
  if (!motionTrack || !motionProgress) return;
  const maxScroll = motionTrack.scrollWidth - motionTrack.clientWidth;
  const ratio = maxScroll > 0 ? motionTrack.scrollLeft / maxScroll : 0;
  const width = maxScroll > 0 ? 18 + ratio * 82 : 100;
  motionProgress.style.width = `${Math.min(width, 100)}%`;
}

function moveMotionTo(left) {
  if (!motionTrack) return;
  const maxScroll = motionTrack.scrollWidth - motionTrack.clientWidth;
  motionTargetScroll = Math.max(0, Math.min(left, maxScroll));

  if (motionFrame) return;

  const animate = () => {
    const delta = motionTargetScroll - motionTrack.scrollLeft;
    if (Math.abs(delta) < 0.6) {
      motionTrack.scrollLeft = motionTargetScroll;
      motionFrame = 0;
      return;
    }

    motionTrack.scrollLeft += delta * 0.26;
    motionFrame = requestAnimationFrame(animate);
  };

  motionFrame = requestAnimationFrame(animate);
}

function scrollMotion(direction) {
  if (!motionTrack) return;
  const card = motionTrack.querySelector(".motion-card");
  const step = card ? card.getBoundingClientRect().width + 24 : motionTrack.clientWidth * 0.8;
  moveMotionTo(motionTrack.scrollLeft + step * direction);
}

if (motionTrack) {
  let isDragging = false;
  let dragStartX = 0;
  let dragStartScroll = 0;
  let didDrag = false;

  motionTrack.addEventListener("scroll", updateMotionProgress, { passive: true });
  window.addEventListener("resize", updateMotionProgress);
  updateMotionProgress();

  motionPrev?.addEventListener("click", () => scrollMotion(-1));
  motionNext?.addEventListener("click", () => scrollMotion(1));

  if (finePointer.matches && motionSection) {
    motionTrack.classList.add("is-pointer-follow");
    motionSection.addEventListener("pointermove", (event) => {
      const maxScroll = motionTrack.scrollWidth - motionTrack.clientWidth;
      if (maxScroll <= 0) return;
      const rect = motionSection.getBoundingClientRect();
      const ratio = (event.clientX - rect.left) / rect.width;
      moveMotionTo(maxScroll * Math.max(0, Math.min(ratio, 1)));
    });
  }

  motionTrack.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 || finePointer.matches) return;
    isDragging = true;
    didDrag = false;
    dragStartX = event.clientX;
    dragStartScroll = motionTrack.scrollLeft;
    motionTrack.classList.add("is-dragging");
    motionTrack.setPointerCapture(event.pointerId);
  });

  motionTrack.addEventListener("pointermove", (event) => {
    if (!isDragging) return;
    const delta = event.clientX - dragStartX;
    if (Math.abs(delta) > 6) didDrag = true;
    motionTrack.scrollLeft = dragStartScroll - delta;
  });

  function endMotionDrag(event) {
    if (!isDragging) return;
    isDragging = false;
    motionTrack.classList.remove("is-dragging");
    if (motionTrack.hasPointerCapture(event.pointerId)) {
      motionTrack.releasePointerCapture(event.pointerId);
    }
  }

  motionTrack.addEventListener("pointerup", endMotionDrag);
  motionTrack.addEventListener("pointercancel", endMotionDrag);
  motionTrack.addEventListener("click", (event) => {
    if (!didDrag) return;
    event.preventDefault();
    didDrag = false;
  });
}

document.querySelectorAll("[data-path-lab]").forEach((pathLab) => {
  const pathBoard = pathLab.querySelector("[data-path-board]");
  const pathNodes = pathLab.querySelectorAll("[data-path-node]");
  const pathModeButtons = pathLab.querySelectorAll("[data-path-mode]");

  pathModeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.pathMode || "atl";
      pathLab.dataset.mode = mode;
      pathModeButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
    });
  });

  if (!pathBoard) return;

  let isPathDragging = false;
  let pathStartX = 0;
  let pathStartScroll = 0;
  let pathDidDrag = false;

  pathBoard.addEventListener("pointermove", (event) => {
    if (isPathDragging) {
      const delta = event.clientX - pathStartX;
      if (Math.abs(delta) > 6) pathDidDrag = true;
      pathBoard.scrollLeft = pathStartScroll - delta;
      return;
    }

    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rect = pathBoard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    pathNodes.forEach((node) => {
      const depth = Number(node.dataset.depth || 0);
      node.style.translate = `${x * depth}px ${y * depth}px`;
    });
  });

  pathBoard.addEventListener("pointerleave", () => {
    if (isPathDragging) return;
    pathNodes.forEach((node) => {
      node.style.translate = "0 0";
    });
  });

  pathBoard.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    isPathDragging = true;
    pathDidDrag = false;
    pathStartX = event.clientX;
    pathStartScroll = pathBoard.scrollLeft;
    pathBoard.classList.add("is-dragging");
    pathBoard.setPointerCapture(event.pointerId);
  });

  function endPathDrag(event) {
    if (!isPathDragging) return;
    isPathDragging = false;
    pathBoard.classList.remove("is-dragging");
    if (pathBoard.hasPointerCapture(event.pointerId)) {
      pathBoard.releasePointerCapture(event.pointerId);
    }
  }

  pathBoard.addEventListener("pointerup", endPathDrag);
  pathBoard.addEventListener("pointercancel", endPathDrag);
  pathBoard.addEventListener("click", (event) => {
    if (!pathDidDrag) return;
    event.preventDefault();
    pathDidDrag = false;
  });
});

const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");

function setFormStatus(message, type = "idle") {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.dataset.type = type;
}

function getCheckedValues(form, name) {
  return [...form.querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.value);
}

function prepareContactPayload(form) {
  const formData = new FormData(form);
  const name = String(formData.get("from_name") || "").trim();
  const brand = String(formData.get("brand_name") || "").trim();
  const features = getCheckedValues(form, "features");
  const submittedAt = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  const pageUrl = window.location.href;

  const lines = [
    `이름: ${name}`,
    `연락처: ${formData.get("phone") || ""}`,
    `이메일: ${formData.get("reply_to") || ""}`,
    `브랜드명: ${brand}`,
    `벤치마크/참고 사이트: ${formData.get("reference_site") || ""}`,
    `사이트 유형: ${formData.get("site_type") || ""}`,
    `예산 범위: ${formData.get("budget_range") || ""}`,
    `필요 기능: ${features.join(", ") || "미선택"}`,
    `사업 내용: ${formData.get("business_summary") || ""}`,
    `요청사항: ${formData.get("request_detail") || ""}`,
    `접수 시간: ${submittedAt}`,
    `접수 페이지: ${pageUrl}`,
  ];

  const subjectInput = form.querySelector("[data-subject]");
  const messageInput = form.querySelector("[data-message]");
  const submittedAtInput = form.querySelector("[data-submitted-at]");
  const pageUrlInput = form.querySelector("[data-page-url]");

  if (subjectInput) subjectInput.value = `[J Media 상담 요청] ${brand || name || "신규 문의"} / ${name || "이름 미입력"}`;
  if (messageInput) messageInput.value = lines.join("\n");
  if (submittedAtInput) submittedAtInput.value = submittedAt;
  if (pageUrlInput) pageUrlInput.value = pageUrl;
}

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  prepareContactPayload(contactForm);

  const config = window.JMEDIA_EMAILJS_CONFIG || {};
  const ready =
    window.emailjs &&
    config.publicKey &&
    config.serviceId &&
    config.templateId;

  if (!ready) {
    setFormStatus("EmailJS 설정을 확인해야 합니다. publicKey, serviceId, templateId가 필요합니다.", "error");
    return;
  }

  const submitButton = contactForm.querySelector('button[type="submit"]');
  submitButton?.setAttribute("disabled", "true");
  setFormStatus("상담 신청을 전송하는 중입니다.", "pending");

  try {
    await window.emailjs.sendForm(config.serviceId, config.templateId, contactForm, {
      publicKey: config.publicKey,
    });
    contactForm.reset();
    setFormStatus("상담 신청이 전송되었습니다. 확인 후 연락드리겠습니다.", "success");
  } catch (error) {
    console.error(error);
    setFormStatus("전송 중 오류가 발생했습니다. 잠시 후 다시 시도하거나 이메일로 직접 연락해주세요.", "error");
  } finally {
    submitButton?.removeAttribute("disabled");
  }
});
