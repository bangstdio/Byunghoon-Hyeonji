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

  const startPositions = [
    { x: '-130vw', y: '-130vh' }, { x: '-150vw', y: '0' }, { x: '-130vw', y: '130vh' },
    { x: '130vw', y: '-130vh' }, { x: '130vw', y: '130vh' }, { x: '0', y: '150vh' }, { x: '100vw', y: '150vh' }
  ];

  photos.forEach((photo, i) => {
    gsap.set(photo, { x: startPositions[i].x, y: startPositions[i].y });
  });

  const island = document.getElementById('dynamic-island');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.s1-visual',
      start: 'top top',
      end: '+=700vh',
      scrub: 0.3,
      pin: true,
      onUpdate: (self) => {
        const isReady = self.progress >= 0.7;
        const section1 = document.getElementById('section-1');
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
    width: () => window.innerWidth >= 600 ? (window.innerHeight * 0.6 * 0.75) + "px" : (window.innerWidth * 0.36) + "px",
    height: () => window.innerWidth >= 600 ? (window.innerHeight * 0.6) + "px" : (window.innerWidth * 0.36 * 4 / 3) + "px",
    borderRadius: "16px", duration: 5, ease: 'power2.inOut'
  }, 0.5);

  tl.to(titleEl, { opacity: 0, duration: 1.5 }, 3.5);

  photos.forEach((photo, i) => {
    tl.to(photo, { x: 0, y: 0, duration: 5, ease: 'power2.inOut' }, 0.5);
  });

  tl.to(galleryContainer, { y: "-=10vh", duration: 3.5 }, 4.0);

  // ── 메인 사진 클릭 → 전체화면 라이트박스 ─────────────────
  wrapper.addEventListener('click', () => {
    if (!document.getElementById('section-1').classList.contains('is-ready')) return;
    openCollageLightbox(wrapper.querySelector('.s1-main').getAttribute('src'), true);
  });

  // ── 콜라주 호버: 비호버 사진 어둡게 + 클릭 시 라이트박스 ──────────────
  const allCollageEls = [wrapper, ...Array.from(photos)];
  let pendingDimReset = null;

  function applyDim(hoveredEl) {
    if (pendingDimReset !== null) { clearTimeout(pendingDimReset); pendingDimReset = null; }
    allCollageEls.forEach(el => {
      gsap.to(el, {
        filter: el === hoveredEl ? 'brightness(1)' : 'brightness(0.55)',
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
        // photo i ends at PHOTO_POS[i]+1.3 / 16.3 (total duration)
        // photo0 입장은 인트로 트리거 담당이므로 0.08 제거
        snapTo: [0, 0.233, 0.387, 0.54, 0.693, 0.847, 1],
        duration: { min: 0.2, max: 0.5 },
        delay: 0.05,
        ease: "power1.inOut"
      }
    }
  });

  // 사진 간격 2.5 (animation 1.3 + dead scroll 1.2) — total duration 16.3
  const PHOTO_POS = [0, 2.5, 5.0, 7.5, 10.0, 12.5, 15.0];

  // 사진 등장 시퀀스 — photo0는 인트로 트리거 담당이므로 스킵
  photos.forEach((photo, i) => {
    if (i === 0) return;
    mainTl.fromTo(photo,
      { y: initialPhotoY, x: photoOffsets[i].x, rotation: photoOffsets[i].r },
      { y: photoOffsets[i].y, duration: 1.3, ease: "power2.out" },
      PHOTO_POS[i]
    );
  });

  // card0: 인트로 트리거가 y:0으로 세팅한 상태에서 퇴장만 처리
  // fromTo 대신 to를 사용해 초기화 시점에 from 상태가 즉시 렌더링되는 버그 방지
  if (card0) {
    mainTl.to(card0, { y: -400, opacity: 0, duration: 0.8 }, 2.5);
  }

  if (card1) {
    mainTl.fromTo(card1, { y: initialPhotoY, opacity: 0 }, { y: 0, opacity: 1, duration: 1.3, ease: "power2.out" }, 2.5);
    mainTl.to(card1, { y: -400, opacity: 0, duration: 0.8 }, 7.5);
  }

  if (card3) {
    mainTl.fromTo(card3, { y: initialPhotoY, opacity: 0 }, { y: 0, opacity: 1, duration: 1.3, ease: "power2.out" }, 7.5);
    mainTl.to(card3, { y: -400, opacity: 0, duration: 0.8 }, 10.0);
  }

  if (card4) {
    mainTl.fromTo(card4, { y: initialPhotoY, opacity: 0 }, { y: 0, opacity: 1, duration: 1.3, ease: "power2.out" }, 10.0);
    mainTl.to(card4, { y: -400, opacity: 0, duration: 0.8 }, 15.0);
  }

  if (card6) {
    mainTl.fromTo(card6, { y: initialPhotoY, opacity: 0 }, { y: 0, opacity: 1, duration: 1.3, ease: "power2.out" }, 15.0);
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
