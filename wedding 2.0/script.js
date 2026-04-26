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

  photos.forEach((photo, i) => {
    const pos = startPositions[i] || { x: '0', y: '150vh' };
    gsap.set(photo, { x: pos.x, y: pos.y });
  });

  // 플레이스홀더로 그리드 셀 위치/크기 측정 (래퍼는 이미 풀스크린 CSS 상태)
  const placeholder = document.querySelector('.s1-main-placeholder');
  const rect = placeholder.getBoundingClientRect();

  const island = document.getElementById('dynamic-island');

  const tl = window.__s1Timeline = gsap.timeline({
    scrollTrigger: {
      trigger: '.s1-visual',
      start: 'top top',
      end: '+=700vh',
      scrub: 0.3,
      pin: true,
      onUpdate: (self) => {
        const isReady = self.progress >= 0.7;
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

  // 풀스크린(100vw×100dvh) → 그리드 셀 크기로 width/height 축소 (다운스케일 = 블러 없음)
  tl.to(wrapper, {
    width: rect.width,
    height: rect.height,
    x: rect.left,
    y: rect.top,
    borderRadius: '16px',
    duration: 5,
    ease: 'power2.inOut'
  }, 0.5);
  // 타이틀: cqw 단위라 width 축소와 함께 자동으로 작아짐, 완성 전에 페이드 아웃
  tl.to(titleEl, { opacity: 0, duration: 1.5 }, 3.5);

  photos.forEach((photo, i) => {
    const delay = arrivalDelays[i] ?? 0;
    tl.to(photo, { x: 0, y: 0, duration: 5, ease: 'power2.inOut' }, 0.5 + delay);
  });

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
      scrub: 0.1,
      snap: {
        // duration 3.0, spacing 4.2, total 28.2
        // 각 사진 도착(arrival) + 다음 사진 출발(start) 두 지점씩 snap (photo2 이후)
        // [start, p1_arr, p2_start, p2_arr, p3_start, p3_arr, p4_start, p4_arr, p5_start, p5_arr, p6_start, p6_arr]
        snapTo: [0, 0.255, 0.298, 0.404, 0.447, 0.553, 0.596, 0.702, 0.745, 0.851, 0.894, 1],
        duration: { min: 0.2, max: 0.5 },
        delay: 0.05,
        ease: "power1.inOut"
      }
    }
  });

  // 사진 간격 4.2 (animation 3.0 + dead scroll 1.2) — total duration 28.2
  const PHOTO_POS = [0, 4.2, 8.4, 12.6, 16.8, 21.0, 25.2];

  // 사진 등장 시퀀스 — photo0는 자연 스크롤로 등장하므로 스킵
  photos.forEach((photo, i) => {
    if (i === 0) return;
    mainTl.fromTo(photo,
      { y: initialPhotoY, x: photoOffsets[i].x, rotation: photoOffsets[i].r },
      { y: photoOffsets[i].y, duration: 3.0, ease: "power2.out" },
      PHOTO_POS[i]
    );
  });

  if (card0) {
    mainTl.to(card0, { y: -400, opacity: 0, duration: 0.8 }, 4.2);
  }

  if (card1) {
    mainTl.fromTo(card1, { y: initialPhotoY, opacity: 0 }, { y: 0, opacity: 1, duration: 3.0, ease: "power2.out" }, 4.2);
    mainTl.to(card1, { y: -400, opacity: 0, duration: 0.8 }, 12.6);
  }

  if (card3) {
    mainTl.fromTo(card3, { y: initialPhotoY, opacity: 0 }, { y: 0, opacity: 1, duration: 3.0, ease: "power2.out" }, 12.6);
    mainTl.to(card3, { y: -400, opacity: 0, duration: 0.8 }, 16.8);
  }

  if (card4) {
    mainTl.fromTo(card4, { y: initialPhotoY, opacity: 0 }, { y: 0, opacity: 1, duration: 3.0, ease: "power2.out" }, 16.8);
    mainTl.to(card4, { y: -400, opacity: 0, duration: 0.8 }, 25.2);
  }

  if (card6) {
    mainTl.fromTo(card6, { y: initialPhotoY, opacity: 0 }, { y: 0, opacity: 1, duration: 3.0, ease: "power2.out" }, 25.2);
  }
}

function initSection4() {
  gsap.fromTo(['.s3-sticky-title', '.s3-photo-stack', '.s3-card-stack'],
    { y: 0 },
    { y: '-100vh', scrollTrigger: { trigger: '#section-4', start: 'top bottom', end: 'top top', scrub: true } }
  );

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
  } catch (e) {}
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
  try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (e) {}

  closeBtn.addEventListener('click', () => {
    panel.hidden = true;
    try { window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); } catch (e) {}
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
