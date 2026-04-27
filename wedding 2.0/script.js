/* ============================================================
   Utilities
   ============================================================ */
function debounce(fn, ms) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

/* ============================================================
   Dark Mode Toggle
   ============================================================ */
(function () {
  const html = document.documentElement;
  const btn = document.getElementById('btn-theme');
  if (!btn) return;

  function syncIcon() {
    const dark = html.classList.contains('dark');
    btn.textContent = dark ? '☀︎' : '🌙';
    btn.setAttribute('aria-label', dark ? '라이트 모드로 전환' : '다크 모드로 전환');
  }

  btn.addEventListener('click', () => {
    const isDark = html.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    syncIcon();
  });

  syncIcon();
})();

/* ============================================================
   Constants
   ============================================================ */
const WEDDING_DATE = '2026-11-28T12:00:00+09:00';
const WEDDING_VENUE = '현대차·기아 양재사옥';
const SMOOTH_SCROLL_DURATION = 0.8;
let lenis;
let islandWasVisible = false;
let islandShown = false;

/* ============================================================
   Card Data
   ============================================================ */
const S5_CARD_DATA = [
  {
    title: '오시는 길',
    html: `
      <a href="https://naver.me/5z5iEAfa" target="_blank" style="display:block; width:100%; height:250px; background-color:#eaeaea; border-radius:8px; margin-bottom:16px; overflow:hidden; position:relative; text-decoration:none;">
        <img src="../photos/map.jpg" alt="현대차 양재사옥 지도" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.src='https://picsum.photos/seed/map/600/400'; this.style.opacity='0.5';">
        <div style="position:absolute; top:0; left:0; width:100%; height:100%; display:flex; align-items:center; justify-content:center; flex-direction:column; color:#333;">
          <span style="padding:8px 16px; background:rgba(255,255,255,0.9); border-radius:4px; font-weight:bold; font-size:14px; box-shadow:0 2px 8px rgba(0,0,0,0.15);">클릭하여 네이버 지도로 보기</span>
        </div>
      </a>
      <p style="font-weight:600; margin-bottom:8px;">현대차·기아 양재사옥</p>
      <p style="font-size:14px; margin-bottom:16px;">서울시 서초구 헌릉로 12</p>
      <div style="display:flex; gap:8px; margin-bottom:16px;">
        <a href="https://naver.me/5z5iEAfa" target="_blank" style="flex:1; padding:10px; text-align:center; background:#03C75A; color:#fff; border-radius:8px; text-decoration:none; font-weight:bold; font-size:14px;">네이버 지도</a>
        <a href="https://kko.to/H5QhQ121G" target="_blank" style="flex:1; padding:10px; text-align:center; background:#FEE500; color:#000; border-radius:8px; text-decoration:none; font-weight:bold; font-size:14px;">카카오맵</a>
      </div>
    `
  },
  {
    title: '마음 전하실 곳',
    html: `<p>신랑 & 신부에게 따뜻한 마음을 전해주세요.</p>`
  },
  { title: '식사 안내', html: `<p>연회장은 지하 1층에 마련되어 있습니다.</p>` },
  { title: '주차 안내', html: `<p>양재사옥 주차장을 무료로 이용하실 수 있습니다.</p>` },
  { title: '방명록', html: `<p>축복의 한마디를 남겨주세요.</p>` },
  { title: '결혼식 컨셉', html: `<p>가든 모던 컨셉의 예식입니다.</p>` }
];

/* ============================================================
   Global Functions
   ============================================================ */
function openCardModal(index) {
  const data = S5_CARD_DATA[index];
  if (!data) return;
  const modal = document.getElementById('s5-modal');
  const body = document.getElementById('s5-modal-body');
  const dim = document.getElementById('s5-dim');
  if (!modal || !body || !dim) return;
  body.innerHTML = `<h3>${data.title}</h3>${data.html}`;
  dim.classList.add('active');
  modal.classList.add('active');
  document.body.classList.add('scroll-locked');
}

function closeCardModal() {
  const modal = document.getElementById('s5-modal');
  const dim = document.getElementById('s5-dim');
  if (!modal || !dim) return;
  dim.classList.remove('active');
  modal.classList.remove('active');
  document.body.classList.remove('scroll-locked');
}

function openCollageLightbox(src, fullscreen = false) {
  const lb = document.getElementById('s1-lightbox');
  const dim = document.getElementById('s1-lb-dim');
  const island = document.getElementById('dynamic-island');

  // 다이내믹 아일랜드가 화면에 있으면 위로 퇴장
  islandWasVisible = gsap.getProperty(island, 'yPercent') > -50;
  if (islandWasVisible) {
    gsap.to(island, { yPercent: -200, duration: 0.42, ease: 'power3.inOut' });
  }

  document.getElementById('s1-lb-img').src = src;
  if (fullscreen) {
    lb.classList.add('s1-lb-fullscreen');
    dim.classList.add('s1-lb-fullscreen');
  }
  dim.classList.add('active');
  lb.classList.add('active');
  document.body.classList.add('scroll-locked');
}

function closeCollageLightbox() {
  const lb = document.getElementById('s1-lightbox');
  const dim = document.getElementById('s1-lb-dim');
  lb.classList.remove('active', 's1-lb-fullscreen');
  dim.classList.remove('active', 's1-lb-fullscreen');
  document.body.classList.remove('scroll-locked');

  // 다이내믹 아일랜드 관성으로 복귀 (back.out: 살짝 오버슈트 후 안착)
  if (islandWasVisible) {
    gsap.to(document.getElementById('dynamic-island'), {
      yPercent: 0, duration: 0.6, ease: 'back.out(1.4)'
    });
  }
}

window.copyAccount = function (text) {
  navigator.clipboard.writeText(text).then(() => alert('복사되었습니다.'));
};

/* ============================================================
   Init & Lifecycle
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  initDynamicIsland();
  initCollage();
  initSection2();
  initSection3();
  initSection4();
  initSection5();
});

/* ============================================================
   Confetti Fireworks
   ============================================================ */
function launchFireworks() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 55, spread: 70, ticks: 120, zIndex: 9999, gravity: 1.0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 36 * (timeLeft / duration); // 기존 대비 60%로 양 조절

    // 선명한 원색 및 주얼톤 색상 조합 (가독성 향상)
    const vividColors = ['#E63946', '#F4A261', '#FFD700', '#2A9D8F', '#264653', '#6A0572', '#0F52BA'];

    // 좌측 하단에서 중앙 상단으로 쏘아 올림
    confetti({
      ...defaults,
      particleCount,
      origin: { x: 0, y: 0.9 },
      angle: randomInRange(55, 65),
      colors: vividColors
    });
    // 우측 하단에서 중앙 상단으로 쏘아 올림
    confetti({
      ...defaults,
      particleCount,
      origin: { x: 1, y: 0.9 },
      angle: randomInRange(115, 125),
      colors: vividColors
    });
  }, 250);
}

/* ============================================================
   Section Logics
   ============================================================ */

function initDynamicIsland() {
  const island = document.getElementById('dynamic-island');
  gsap.set(island, { xPercent: -50, yPercent: -200, opacity: 0, scale: 0.85 });


  document.getElementById('btn-story').addEventListener('click', () => {
    gsap.to(window, { scrollTo: '#section-3', duration: 1, ease: 'power2.inOut' });
  });
  document.getElementById('btn-location').addEventListener('click', () => openCardModal(0));
  document.getElementById('btn-account').addEventListener('click', () => openCardModal(1));
  document.getElementById('btn-calendar').addEventListener('click', downloadICS);
}

function initCollage() {
  const wrapper = document.querySelector('.s1-main-wrapper');
  const titleEl = document.querySelector('.s1-title');
  const photos = document.querySelectorAll('.collage-photo');
  const galleryContainer = document.querySelector('.s1-gallery-container');

  // 22장 카드 — 카드 클래스에 맞춰 사방에서 날아오는 시작 위치
  // l* (좌측) → 좌측에서, r* (우측) → 우측에서, t* (상단) → 위에서, b* (하단) → 아래에서
  // 같은 방향이라도 약간 다른 깊이/각도로 다양성 확보
  // 시작 위치: 각 카드가 자신의 그리드 위치 방향(화면 밖)에서 날아옴
  // 메인 이미지를 가리지 않도록, 좌측 카드는 좌측에서 / 우측은 우측에서 / 상단은 위에서 / 하단은 아래에서
  // 같은 방향이라도 카드의 그리드 좌표에 맞춰 perpendicular axis를 살짝 변주
  const startPositions = [
    // l1: c1-2 r1 (좌상단) — 위에서, 약간 좌측
    { x: '-25vw', y: '-130vh' },
    // l2: c3 r1-2 (좌측 메인 옆 위) — 왼쪽에서
    { x: '-130vw', y: '-20vh' },
    // l3: c4-5 r1 (메인 바로 위 좌) — 위에서
    { x: '-10vw', y: '-150vh' },
    // l4: c6-7 r1 (메인 바로 위 우) — 위에서
    { x: '10vw', y: '-150vh' },
    // l5: c8 r1-2 (우측 메인 옆 위) — 오른쪽에서
    { x: '130vw', y: '-20vh' },
    // l6: c9-10 r1 (우상단) — 위에서, 약간 우측
    { x: '25vw', y: '-130vh' },
    // l7: c1-2 r2 (좌측 메인 옆 위행) — 왼쪽에서
    { x: '-140vw', y: '-30vh' },
    // r1: c9-10 r2 (우측 메인 옆 위행) — 오른쪽에서
    { x: '140vw', y: '-30vh' },
    // r2: c1 r3-4 (좌측 메인 옆 중앙) — 왼쪽에서
    { x: '-160vw', y: '0' },
    // r3: c2-3 r3 (좌측 메인 옆 중앙) — 왼쪽에서
    { x: '-150vw', y: '0' },
    // r4: c8 r3-4 (우측 메인 옆 중앙) — 오른쪽에서
    { x: '160vw', y: '0' },
    // r5: c9 r4 (우측 정방형 좌) — 오른쪽에서 (row4 위치)
    { x: '150vw', y: '20vh' },
    // r6: c2-3 r4 (좌측 메인 옆 중하) — 왼쪽에서
    { x: '-145vw', y: '20vh' },
    // r7: c9-10 r4 (우측 메인 옆 중하) — 오른쪽에서
    { x: '145vw', y: '20vh' },
    // t1: c1-2 r5 (좌측 메인 옆 아래행) — 왼쪽에서
    { x: '-135vw', y: '40vh' },
    // t2: c3 r5 (좌측 메인 옆 아래) — 왼쪽에서
    { x: '-125vw', y: '40vh' },
    // t3: c8 r5 (우측 메인 옆 아래) — 오른쪽에서
    { x: '125vw', y: '40vh' },
    // t4: c9-10 r5 (우측 메인 옆 아래행) — 오른쪽에서
    { x: '135vw', y: '40vh' },
    // b1: c1-2 r6 (하단 좌) — 아래에서, 약간 좌측
    { x: '-25vw', y: '130vh' },
    // b2: c3-4 r6 (하단 좌중) — 아래에서
    { x: '-10vw', y: '150vh' },
    // b3: c5-7 r6 (메인 바로 아래) — 아래에서
    { x: '0', y: '160vh' },
    // b4: c8-10 r6 (하단 우) — 아래에서, 약간 우측
    { x: '25vw', y: '130vh' }
  ];

  // 각 카드의 그리드 중심에서 메인 이미지까지 거리 기반 시차 딜레이
  // 가까운 카드 먼저(0), 외곽 카드는 최대 0.8 늦게 도착
  const arrivalDelays = [
    0.80, // l1  (c1.5 r1)   — 좌상단 코너
    0.25, // l2  (c3   r1.5) — 좌측 세로
    0.02, // l3  (c5   r1)   — 메인 바로 위
    0.15, // l4  (c7   r1)   — 메인 바로 위
    0.25, // l5  (c8   r1.5) — 우측 상단 세로
    0.80, // l6  (c9.5 r1)   — 우상단 코너
    0.64, // l7  (c1.5 r2)   — 좌측 중상
    0.58, // r1  (c9.5 r2.5) — 우측 세로(new: 2행 span)
    0.72, // r2  (c1   r3.5) — 좌측 중앙 세로
    0.19, // r3  (c2.5 r3)   — 메인 바로 옆
    0.00, // r4  (c8   r3.5) — 메인 바로 옆 (가장 가까운)
    0.37, // r5  (c9   r4)   — 우측 정방형(new)
    0.19, // r6  (c2.5 r4)   — 메인 바로 옆
    0.73, // r7  (c10  r4)   — 우측 정방형(new)
    0.64, // t1  (c1.5 r5)   — 좌측 중하
    0.15, // t2  (c3   r5)   — 메인 바로 옆 아래
    0.15, // t3  (c8   r5)   — 메인 바로 옆 아래
    0.64, // t4  (c9.5 r5)   — 우측 중하
    0.80, // b1  (c1.5 r6)   — 좌하단 코너
    0.15, // b2  (c4   r6)   — 메인 바로 아래
    0.07, // b3  (c6.5 r6)   — 메인 바로 아래 중앙
    0.80, // b4  (c9.5 r6)   — 우하단 코너
  ];

  const isMobile = window.matchMedia('(max-width: 599px)').matches;

  // 모바일: 7장 (l1·l2·l7 / r1·r2·r7 / b3) 만 등장, 좌우·아래에서 날아옴
  const mobilePositions = startPositions.map((p, i) => p);
  mobilePositions[0]  = { x: '-130vw', y: '0' };
  mobilePositions[1]  = { x: '-130vw', y: '8vh' };
  mobilePositions[6]  = { x: '-130vw', y: '-8vh' };
  mobilePositions[7]  = { x: '130vw',  y: '0' };
  mobilePositions[8]  = { x: '130vw',  y: '8vh' };
  mobilePositions[13] = { x: '130vw',  y: '-8vh' };
  mobilePositions[20] = { x: '0',      y: '150vh' };

  const mobileDelays = Array.from({ length: 22 }, () => 0);
  mobileDelays[0]  = 0.20;
  mobileDelays[1]  = 0.10;
  mobileDelays[6]  = 0.30;
  mobileDelays[7]  = 0.20;
  mobileDelays[8]  = 0.10;
  mobileDelays[13] = 0.30;
  mobileDelays[20] = 0.50;

  const activePositions = isMobile ? mobilePositions : startPositions;
  const activeDelays    = isMobile ? mobileDelays    : arrivalDelays;
  const pinEnd          = isMobile ? '+=450vh'       : '+=775vh';

  photos.forEach((photo, i) => {
    const pos = activePositions[i] || { x: '0', y: '150vh' };
    gsap.set(photo, { x: pos.x, y: pos.y });
  });

  const placeholder = document.querySelector('.s1-main-placeholder');
  const island = document.getElementById('dynamic-island');

  const tl = window.__s1Timeline = gsap.timeline({
    scrollTrigger: {
      trigger: '.s1-visual',
      start: 'top top',
      end: pinEnd,
      scrub: 0.3,
      pin: true,
      invalidateOnRefresh: true,
      onRefreshInit: () => {
        // 인라인 스타일 직접 제거 → CSS 자연값(width:100%, height:100dvh)이 시작점이 됨
        wrapper.style.width = '';
        wrapper.style.height = '';
        wrapper.style.borderRadius = '';
        // GSAP transform 캐시도 0,0으로 명시 리셋
        gsap.set(wrapper, { x: 0, y: 0 });
        // title opacity 리셋 (to() 재계산 시 시작값이 0으로 굳지 않도록)
        gsap.set(titleEl, { clearProps: 'opacity' });
      },
      onUpdate: (self) => {
        const isReady = self.progress >= 0.8;
        const section1 = document.getElementById('section-1');

        // 콜라주가 완성 상태를 벗어날 때(위로 스크롤) 모든 호버 효과 강제 초기화
        if (!isReady && section1.classList.contains('is-ready')) {
          resetDim();
        }

        section1.classList.toggle('is-ready', isReady);

        // 다이내믹 아일랜드 표시/숨기기
        if (!islandShown && isReady) {
          islandShown = true;
          gsap.to(island, { yPercent: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.4)' });
        } else if (islandShown && !isReady) {
          islandShown = false;
          gsap.to(island, { yPercent: -200, opacity: 0, scale: 0.85, duration: 0.4, ease: 'power2.in' });
        }
      }
    }
  });

  tl.to(wrapper, {
    width: () => placeholder.getBoundingClientRect().width,
    height: () => placeholder.getBoundingClientRect().height,
    x: () => placeholder.getBoundingClientRect().left,
    y: () => placeholder.getBoundingClientRect().top,
    borderRadius: '16px',
    duration: 5,
    ease: 'power2.inOut',
  }, 0.5);
  // 타이틀: cqw 단위라 width 축소와 함께 자동으로 작아짐, 완성 전에 페이드 아웃
  tl.to(titleEl, { opacity: 0, duration: 1.5 }, 3.5);

  photos.forEach((photo, i) => {
    const delay = activeDelays[i] ?? 0;
    const pos = activePositions[i] || { x: '0', y: '150vh' };
    tl.fromTo(photo,
      { x: pos.x, y: pos.y },
      { x: 0, y: 0, duration: 5, ease: 'power2.inOut' },
      0.5 + delay
    );
  });
  tl.to({}, { duration: 0.675 }, '>');  // 75vh 정지 구간

  // lift 제거 — padding-top: 64px로 다이내믹 아일랜드와의 간격 확보

  // ── 메인 사진 클릭 → 전체화면 라이트박스 ─────────────────
  wrapper.addEventListener('click', () => {
    if (!document.getElementById('section-1').classList.contains('is-ready')) return;
    openCollageLightbox(wrapper.querySelector('.s1-main').getAttribute('src'), true);
  });

  // ── 콜라주 호버: 비호버 사진 어둡게 + 클릭 시 라이트박스 ──────────────
  const allCollageEls = [wrapper, ...Array.from(photos)];
  let pendingDimReset = null;

  function applyDim(hoveredEl) {
    if (!document.getElementById('section-1').classList.contains('is-ready')) return;
    if (pendingDimReset !== null) { clearTimeout(pendingDimReset); pendingDimReset = null; }
    allCollageEls.forEach(el => {
      gsap.to(el, {
        filter: el === hoveredEl ? 'brightness(1)' : 'brightness(0.78)',
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });
  }

  function resetDim() {
    pendingDimReset = setTimeout(() => {
      pendingDimReset = null;
      allCollageEls.forEach(el => {
        gsap.to(el, { filter: 'brightness(1)', duration: 0.9, ease: 'power2.out', overwrite: 'auto' });
      });
    }, 120);
  }

  wrapper.addEventListener('mouseenter', () => {
    if (!document.getElementById('section-1').classList.contains('is-ready')) return;
    applyDim(wrapper);
  });
  wrapper.addEventListener('mouseleave', () => {
    if (!document.getElementById('section-1').classList.contains('is-ready')) return;
    resetDim();
  });

  photos.forEach(photo => {
    photo.addEventListener('mouseenter', () => {
      if (!document.getElementById('section-1').classList.contains('is-ready')) return;
      applyDim(photo);
    });
    photo.addEventListener('mouseleave', () => {
      if (!document.getElementById('section-1').classList.contains('is-ready')) return;
      resetDim();
    });
    photo.addEventListener('click', () => {
      if (!document.getElementById('section-1').classList.contains('is-ready')) return;
      const largeSrc = photo.getAttribute('src').replace('Section 1/', 'Section 1/large/');
      openCollageLightbox(largeSrc);
    });
  });

  // ── 라이트박스 닫기 ───────────────────────────────────────
  document.getElementById('s1-lb-dim').addEventListener('click', closeCollageLightbox);
  document.getElementById('s1-lb-close').addEventListener('click', closeCollageLightbox);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCollageLightbox(); });

  // ── 창 크기 변경 시 FLIP 애니메이션 ──────────────────────
  // 변경 전 위치 저장 → 레이아웃 갱신 → 역방향 offset 적용 → 0으로 스르륵
  window.addEventListener('resize', debounce(() => {
    const isReady = document.getElementById('section-1').classList.contains('is-ready');

    if (!isReady) { ScrollTrigger.refresh(); return; }

    // 1. 갱신 전 사진 위치 캡처
    const prevPhotoRects = Array.from(photos).map(p => p.getBoundingClientRect());

    // 2. 레이아웃 갱신 (wrapper는 scrub + onRefreshInit이 자동 처리)
    ScrollTrigger.refresh();

    // 3. FLIP 동안 스크롤 차단 — overwrite:true가 scrub 트윈을 죽이기 때문에
    //    lenis를 멈춰 scrub 업데이트 충돌을 막고, 완료 후 refresh로 scrub 재등록
    lenis.stop();

    let anyFlip = false;
    Array.from(photos).forEach((photo, i) => {
      const dx = prevPhotoRects[i].left - photo.getBoundingClientRect().left;
      const dy = prevPhotoRects[i].top - photo.getBoundingClientRect().top;
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return;

      anyFlip = true;
      const delay = (activeDelays[i] ?? 0) * 0.08;
      gsap.fromTo(photo,
        { x: dx, y: dy },
        { x: 0, y: 0, duration: 0.8, delay, ease: 'power3.out', overwrite: true }
      );
    });

    // 4. FLIP 최대 소요 시간(0.8s + 최대 stagger ~0.064s) 후 scrub 재등록 + 스크롤 재개
    setTimeout(() => {
      ScrollTrigger.refresh(); // onRefreshInit → 리셋 → invalidate → scrub 재등록
      lenis.start();
    }, anyFlip ? 950 : 0);
  }, 150));
}

function initSection2() {
  const words = document.querySelectorAll('.s2-word');
  ScrollTrigger.create({
    trigger: '.s2-inner',
    start: 'top 90%',
    end: 'top 10%',
    scrub: 0.2,
    onUpdate: (self) => {
      const activeCount = Math.round(self.progress * words.length);
      words.forEach((word, i) => word.classList.toggle('active', i < activeCount));
    }
  });
  // 자동 스크롤 제거 — 섹션3 인트로 트리거가 섹션2→3 전환을 자연스럽게 처리
}

function initSection3() {
  const photos = document.querySelectorAll('.s3-photo');
  const slots = document.querySelectorAll('.s3-text-slot');
  const titleEl = document.querySelector('.s3-sticky-title');
  const cards = document.querySelectorAll('.s3-text-card');
  if (!photos.length || !slots.length) return;

  const photoOffsets = [
    { x: 0, y: 0, r: 0.0 }, { x: 8, y: 28, r: -2.3 }, { x: -3, y: 54, r: 3.7 },
    { x: 12, y: 78, r: -1.1 }, { x: -9, y: 100, r: 2.9 }, { x: 5, y: 120, r: -4.2 }, { x: -14, y: 138, r: 1.6 }
  ];

  const initialPhotoY = window.innerHeight;

  const card0 = document.querySelector('.s3-text-card[data-slot="0"]');
  const card1 = document.querySelector('.s3-text-card[data-slot="1"]');
  const card3 = document.querySelector('.s3-text-card[data-slot="3"]');
  const card4 = document.querySelector('.s3-text-card[data-slot="4"]');
  const card6 = document.querySelector('.s3-text-card[data-slot="6"]');

  // photo0 / titleEl / card0: y 오프셋 없이 DOM 자연 위치(y=0)에 둠
  // → 섹션2 스크롤 시 바로 아래에 붙어서 자연스럽게 올라오는 효과
  gsap.set(Array.from(photos).slice(1), { y: initialPhotoY });
  gsap.set([card1, card3, card4, card6].filter(Boolean), { y: initialPhotoY, opacity: 0 });

  // ── 마스터 타임라인 ────────────────────────────────────────────
  // photo0 / titleEl / card0 입장은 인트로 트리거가 처리 → 메인에서는 제외
  const mainTl = gsap.timeline({
    scrollTrigger: {
      id: 'section3-main',
      trigger: '.s3-text-scroll',
      start: "top 80px",
      end: "bottom 5%",
      scrub: window.matchMedia('(max-width: 599px)').matches ? 0.1 : 0.05,
      snap: {
        snapTo: (value, self) => {
          if (self.direction === -1) return value; // 올라갈 때는 스냅 없이 자유 스크롤
          const points = [0, 0.255, 0.404, 0.553, 0.702, 0.851, 1];
          return points.reduce((p, c) => Math.abs(c - value) < Math.abs(p - value) ? c : p);
        },
        duration: { min: 0.15, max: 0.4 }, // 스냅 애니메이션 속도 상향 (더 빠르게 착 달라붙음)
        delay: 0, // 스크롤 정지 즉시 스냅 시작
        ease: "power1.inOut"
      }
    }
  });

  // 사진 간격 5.25 (animation 3.75 + dead scroll 1.5) — total duration 35.25
  const PHOTO_POS = [0, 5.25, 10.5, 15.75, 21.0, 26.25, 31.5];
  const ANIM_DUR = 3.75;

  // 사진 등장 시퀀스 — photo0는 자연 스크롤로 등장하므로 스킵
  photos.forEach((photo, i) => {
    if (i === 0) return;
    mainTl.fromTo(photo,
      { y: initialPhotoY, x: photoOffsets[i].x, rotation: photoOffsets[i].r },
      { y: photoOffsets[i].y, duration: ANIM_DUR, ease: "power2.out" },
      PHOTO_POS[i]
    );
  });

  if (card0) {
    mainTl.to(card0, { y: -400, opacity: 0, duration: 0.8 }, PHOTO_POS[1]);
  }

  if (card1) {
    mainTl.fromTo(card1, { y: initialPhotoY, opacity: 0 }, { y: 0, opacity: 1, duration: ANIM_DUR, ease: "power2.out" }, PHOTO_POS[1]);
    mainTl.to(card1, { y: -400, opacity: 0, duration: 0.8 }, PHOTO_POS[3]);
  }

  if (card3) {
    mainTl.fromTo(card3, { y: initialPhotoY, opacity: 0 }, { y: 0, opacity: 1, duration: ANIM_DUR, ease: "power2.out" }, PHOTO_POS[3]);
    mainTl.to(card3, { y: -400, opacity: 0, duration: 0.8 }, PHOTO_POS[4]);
  }

  if (card4) {
    mainTl.fromTo(card4, { y: initialPhotoY, opacity: 0 }, { y: 0, opacity: 1, duration: ANIM_DUR, ease: "power2.out" }, PHOTO_POS[4]);
    mainTl.to(card4, { y: -400, opacity: 0, duration: 0.8 }, PHOTO_POS[6]);
  }

  if (card6) {
    mainTl.fromTo(card6, { y: initialPhotoY, opacity: 0 }, { y: 0, opacity: 1, duration: ANIM_DUR, ease: "power2.out" }, PHOTO_POS[6]);
  }
}

function initSection4() {
  // 섹션 3 퇴장 + 섹션 4 입장 애니메이션
  gsap.fromTo(['.s3-sticky-title', '.s3-photo-stack', '.s3-card-stack'],
    { y: 0 },
    { y: '-100vh', scrollTrigger: { trigger: '#section-4', start: 'top bottom', end: 'top top', scrub: true } }
  );

  // 페이지 최하단 스냅포인트 추가: 섹션 3을 다 보고 내려오면 페이지 끝(섹션 4, 5 영역)으로 스냅
  ScrollTrigger.create({
    trigger: '#section-4',
    start: 'top bottom',
    end: () => ScrollTrigger.maxScroll(window),
    snap: {
      snapTo: (value, self) => {
        if (self.direction === -1) return value; // 올라갈 때는 최하단 스냅 방지
        return 1;
      },
      duration: 0.8,
      delay: 0.1,
      ease: "power2.inOut",
      onComplete: (self) => {
        // 스냅이 완료되었을 때 (내려가는 방향인 경우에만) 폭죽 실행
        if (self.direction === 1) {
          launchFireworks();
        }
      }
    }
  });

  const countdownEl = document.getElementById('s4-countdown');
  const target = new Date(WEDDING_DATE);

  function tick() {
    const diff = target - new Date();
    if (diff <= 0) {
      countdownEl.innerHTML = '<p class="s4-dday">오늘입니다 🎉</p>';
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    document.getElementById('cd-days').textContent = String(d).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(h).padStart(2, '0');
    document.getElementById('cd-mins').textContent = String(m).padStart(2, '0');
    document.getElementById('cd-secs').textContent = String(s).padStart(2, '0');
  }
  tick();
  setInterval(tick, 1000);

}

function initSection5() {
  const cards = document.querySelectorAll('.s5-card');
  cards.forEach(card => card.addEventListener('click', () => openCardModal(Number(card.dataset.card))));
  document.getElementById('s5-dim').addEventListener('click', closeCardModal);
  document.getElementById('s5-modal-close').addEventListener('click', closeCardModal);

  // ── Edge Nudge ─────────────────────────────────────────────
  // 마우스가 갤러리 끝 22% 구역에 들어오면 트랙을 해당 방향으로 최대 90px 이동
  const wrap = document.querySelector('.s5-gallery-wrap');
  const track = document.querySelector('.s5-track');

  const nudgeWrap = document.createElement('div');
  nudgeWrap.className = 's5-nudge-wrap';
  track.parentNode.insertBefore(nudgeWrap, track);
  nudgeWrap.appendChild(track);

  const EDGE_ZONE = 0.22;
  const MAX_NUDGE = 90;
  const LERP = 0.12;
  let targetNudge = 0;
  let currentNudge = 0;
  let rafId = null;

  function tick() {
    currentNudge += (targetNudge - currentNudge) * LERP;
    nudgeWrap.style.transform = `translateX(${currentNudge}px)`;
    if (Math.abs(currentNudge - targetNudge) > 0.3) {
      rafId = requestAnimationFrame(tick);
    } else {
      currentNudge = targetNudge;
      nudgeWrap.style.transform = `translateX(${currentNudge}px)`;
      rafId = null;
    }
  }

  function setNudge(x) {
    targetNudge = x;
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  wrap.addEventListener('mousemove', (e) => {
    const rect = wrap.getBoundingClientRect();
    const frac = (e.clientX - rect.left) / rect.width;
    if (frac < EDGE_ZONE) {
      setNudge(((EDGE_ZONE - frac) / EDGE_ZONE) * MAX_NUDGE);
    } else if (frac > 1 - EDGE_ZONE) {
      setNudge(-((frac - (1 - EDGE_ZONE)) / EDGE_ZONE) * MAX_NUDGE);
    } else {
      setNudge(0);
    }
  });

  wrap.addEventListener('mouseleave', () => setNudge(0));
}

function downloadICS() {
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT',
    'SUMMARY:Byunghoon & Hyeonji 결혼식', 'DTSTART:20261128T120000+0900',
    'LOCATION:현대차·기아 양재사옥', 'END:VEVENT', 'END:VCALENDAR'
  ];
  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'wedding.ics';
  a.click();
}


/* ============================================================
   Tweaks Panel — Edit Mode Protocol
   ============================================================ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "cardCount": 22,
  "gap": 1.0,
  "mainScale": 1.0,
  "animSpeed": 1.0
}/*EDITMODE-END*/;

let tweakState = { ...TWEAK_DEFAULTS };

function applyTweaks() {
  const root = document.documentElement;
  root.style.setProperty('--s1-gap', tweakState.gap + 'vh');
  root.style.setProperty('--s1-main-scale', tweakState.mainScale);

  // 카드 개수 — 사용하지 않을 카드는 hidden
  const photos = document.querySelectorAll('.collage-photo');
  photos.forEach((p, i) => {
    p.style.display = i < tweakState.cardCount ? '' : 'none';
  });

  // 애니메이션 속도 — GSAP timeScale로 조절
  if (window.__s1Timeline) window.__s1Timeline.timeScale(tweakState.animSpeed);
}

function persistTweak(key, val) {
  tweakState[key] = val;
  applyTweaks();
  try {
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: val } }, '*');
  } catch (e) { }
}

function initTweaks() {
  const panel = document.getElementById('tweaks-panel');
  const closeBtn = document.getElementById('tw-close');
  if (!panel) return;

  // Hydrate from saved defaults
  document.getElementById('tw-count').value = tweakState.cardCount;
  document.getElementById('tw-count-val').textContent = tweakState.cardCount;
  document.getElementById('tw-gap').value = tweakState.gap;
  document.getElementById('tw-gap-val').textContent = tweakState.gap.toFixed(1) + 'vh';
  document.getElementById('tw-main').value = tweakState.mainScale;
  document.getElementById('tw-main-val').textContent = tweakState.mainScale.toFixed(2) + '×';
  document.getElementById('tw-speed').value = tweakState.animSpeed;
  document.getElementById('tw-speed-val').textContent = tweakState.animSpeed.toFixed(2) + '×';

  // Listen for activate/deactivate from host BEFORE announcing
  window.addEventListener('message', (e) => {
    if (!e.data || !e.data.type) return;
    if (e.data.type === '__activate_edit_mode') panel.hidden = false;
    if (e.data.type === '__deactivate_edit_mode') panel.hidden = true;
  });

  // Announce availability
  try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (e) { }

  closeBtn.addEventListener('click', () => {
    panel.hidden = true;
    try { window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); } catch (e) { }
  });

  // Wire controls
  document.getElementById('tw-count').addEventListener('input', (e) => {
    const v = Number(e.target.value);
    document.getElementById('tw-count-val').textContent = v;
    persistTweak('cardCount', v);
  });
  document.getElementById('tw-gap').addEventListener('input', (e) => {
    const v = Number(e.target.value);
    document.getElementById('tw-gap-val').textContent = v.toFixed(1) + 'vh';
    persistTweak('gap', v);
  });
  document.getElementById('tw-main').addEventListener('input', (e) => {
    const v = Number(e.target.value);
    document.getElementById('tw-main-val').textContent = v.toFixed(2) + '×';
    persistTweak('mainScale', v);
    // ScrollTrigger 재계산 (메인 크기 변경 시)
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  });
  document.getElementById('tw-speed').addEventListener('input', (e) => {
    const v = Number(e.target.value);
    document.getElementById('tw-speed-val').textContent = v.toFixed(2) + '×';
    persistTweak('animSpeed', v);
  });

  applyTweaks();
}

// Init after DOM + GSAP timeline are ready
window.addEventListener('load', () => {
  setTimeout(initTweaks, 100);
});
