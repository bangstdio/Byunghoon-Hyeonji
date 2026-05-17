/* ============================================================
   Utilities
   ============================================================ */
function debounce(fn, ms) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

/* ============================================================
   Constants
   ============================================================ */
const WEDDING_DATE = '2026-11-28T12:00:00+09:00';
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
        <img src="photos/s5/info/venue.jpg" alt="현대차 양재사옥 전경" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'">
      </a>
      <p style="font-weight:700; font-size:20px; margin-bottom:4px;">현대차·기아 양재사옥</p>
      <p style="font-weight:500; font-size:18px; margin-bottom:4px;">서울시 서초구 헌릉로 12</p>
      <p style="font-weight:400; margin-bottom:24px; font-size:18px;">"신랑이 매일 출퇴근하는 곳에서 결혼합니다."</p>
      <div style="display:flex; gap:8px; margin-bottom:16px;">
        <a href="https://naver.me/5z5iEAfa" target="_blank" style="flex:1; padding:10px 4px; text-align:center; background:#03C75A; color:#fff; border-radius:8px; text-decoration:none; font-weight:bold; font-size:13px;">네이버 지도</a>
        <a href="https://tmap.life/ae83f03a" target="_blank" style="flex:1; padding:10px 4px; text-align:center; background:#2B86FF; color:#fff; border-radius:8px; text-decoration:none; font-weight:bold; font-size:13px;">TMAP</a>
        <a href="https://kko.to/K7ON9DcgDA" target="_blank" style="flex:1; padding:10px 4px; text-align:center; background:#FEE500; color:#000; border-radius:8px; text-decoration:none; font-weight:bold; font-size:13px;">카카오맵</a>
      </div>
    `
  },
  {
    title: '마음 전하실 곳',
    html: `
      <div class="account-container">
        <!-- 신랑 측 -->
        <div class="account-group">
          <div class="account-group-title">신랑 측</div>
          <div class="account-list">
            <div class="account-item">
              <div class="account-info">
                <span class="account-relation">아버지</span> <span class="account-name">김현수</span>
                <div class="account-number">국민 000000-00-000000</div>
              </div>
              <div class="account-actions">
                <button class="btn-copy" onclick="copyAccount('00000000000000')">복사</button>
                <a href="supertoss://transfer?bank=국민&accountNo=00000000000000" class="btn-toss">토스</a>
              </div>
            </div>
            <div class="account-item">
              <div class="account-info">
                <span class="account-relation">어머니</span> <span class="account-name">정영애</span>
                <div class="account-number">농협 000000-00-000000</div>
              </div>
              <div class="account-actions">
                <button class="btn-copy" onclick="copyAccount('00000000000000')">복사</button>
                <a href="supertoss://transfer?bank=농협&accountNo=00000000000000" class="btn-toss">토스</a>
              </div>
            </div>
            <div class="account-item">
              <div class="account-info">
                <span class="account-relation">신랑</span> <span class="account-name">김병훈</span>
                <div class="account-number">국민 422002-04-108548</div>
              </div>
              <div class="account-actions">
                <button class="btn-copy" onclick="copyAccount('42200204108548')">복사</button>
                <a href="supertoss://send?bank=%EA%B5%AD%EB%AF%BC&accountNo=42200204108548" class="btn-toss">토스</a>
              </div>
            </div>
          </div>
        </div>

        <!-- 신부 측 -->
        <div class="account-group">
          <div class="account-group-title">신부 측</div>
          <div class="account-list">
            <div class="account-item">
              <div class="account-info">
                <span class="account-relation">아버지</span> <span class="account-name">백문기</span>
                <div class="account-number">국민 000000-00-000000</div>
              </div>
              <div class="account-actions">
                <button class="btn-copy" onclick="copyAccount('00000000000000')">복사</button>
                <a href="supertoss://transfer?bank=국민&accountNo=00000000000000" class="btn-toss">토스</a>
              </div>
            </div>
            <div class="account-item">
              <div class="account-info">
                <span class="account-relation">어머니</span> <span class="account-name">김복순</span>
                <div class="account-number">국민 000000-00-000000</div>
              </div>
              <div class="account-actions">
                <button class="btn-copy" onclick="copyAccount('00000000000000')">복사</button>
                <a href="supertoss://transfer?bank=국민&accountNo=00000000000000" class="btn-toss">토스</a>
              </div>
            </div>
            <div class="account-item">
              <div class="account-info">
                <span class="account-relation">신부</span> <span class="account-name">백현지</span>
                <div class="account-number">국민 000000-00-000000</div>
              </div>
              <div class="account-actions">
                <button class="btn-copy" onclick="copyAccount('00000000000000')">복사</button>
                <a href="supertoss://transfer?bank=국민&accountNo=00000000000000" class="btn-toss">토스</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    title: '우리 가족 소개', html: `
    <div class="family-container">

      <div class="family-group">
        <div class="family-group-title">신랑 측 가족</div>
        <div class="family-photo-wrap">
          <img src="photos/s5/info/groom.jpg" alt="신랑 측 가족사진">
        </div>
        <div class="family-member">
          <div class="family-member-name">아버지 김현수</div>
          <div class="family-member-desc">소개글을 입력해주세요.</div>
        </div>
        <div class="family-member">
          <div class="family-member-name">어머니 정영애</div>
          <div class="family-member-desc">소개글을 입력해주세요.</div>
        </div>
        <div class="family-member">
          <div class="family-member-name">형 김아롬누리</div>
          <div class="family-member-desc">소개글을 입력해주세요.</div>
        </div>
        <div class="family-member">
          <div class="family-member-name">형수 양지유</div>
          <div class="family-member-desc">소개글을 입력해주세요.</div>
        </div>
        <div class="family-member">
          <div class="family-member-name">조카 뽁뽁이</div>
          <div class="family-member-desc">소개글을 입력해주세요.</div>
        </div>
      </div>

      <div class="family-group">
        <div class="family-group-title">신부 측 가족</div>
        <div class="family-photo-wrap">
          <img src="photos/s5/info/bride.jpg" alt="신부 측 가족사진">
        </div>
        <div class="family-member">
          <div class="family-member-name">아버지 백문기</div>
          <div class="family-member-desc">소개글을 입력해주세요.</div>
        </div>
        <div class="family-member">
          <div class="family-member-name">어머니 김복순</div>
          <div class="family-member-desc">소개글을 입력해주세요.</div>
        </div>
        <div class="family-member">
          <div class="family-member-name">여동생 백민정</div>
          <div class="family-member-desc">소개글을 입력해주세요.</div>
        </div>
        <div class="family-member">
          <div class="family-member-name">남동생 백성진</div>
          <div class="family-member-desc">소개글을 입력해주세요.</div>
        </div>
      </div>

    </div>
  ` },
  { title: '주차 안내', html: `<p>양재사옥 주차장을 무료로 이용하실 수 있습니다.</p>` },
  { title: '결혼식 사진 업로드', html: `<p>오늘의 아름다운 순간들을 공유해주세요.</p>` },
  { title: '결혼식 플레이리스트', html: `<p>오늘의 예식을 위해 정성껏 선곡했습니다.</p>` }
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
  modal.scrollTop = 0;
  dim.classList.add('active');
  modal.classList.add('active');
  document.body.classList.add('scroll-locked');
  if (lenis) lenis.stop();
}

function closeCardModal() {
  const modal = document.getElementById('s5-modal');
  const dim = document.getElementById('s5-dim');
  if (!modal || !dim) return;
  dim.classList.remove('active');
  modal.classList.remove('active');
  document.body.classList.remove('scroll-locked');
  if (lenis) lenis.start();
}

function copyAccount(accountNumber) {
  // 계좌번호에서 하이픈 제거
  const cleanNumber = accountNumber.replace(/-/g, '');

  navigator.clipboard.writeText(cleanNumber).then(() => {
    showToast();
  }).catch(err => {
    console.error('복사 실패:', err);
    // 폴백: prompt 사용 (일부 구형 브라우저 대응)
    window.prompt("계좌번호를 복사해 주세요:", cleanNumber);
  });
}

function showToast() {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

function openCollageLightbox(src, fullscreen = false, thumbEl = null) {
  const lb = document.getElementById('s1-lightbox');
  const dim = document.getElementById('s1-lb-dim');
  const img = document.getElementById('s1-lb-img');
  const loading = document.getElementById('s1-lb-loading');
  const island = document.getElementById('dynamic-island');

  // 다이내믹 아일랜드가 화면에 있으면 위로 퇴장
  islandWasVisible = gsap.getProperty(island, 'yPercent') > -50;
  if (islandWasVisible) {
    gsap.to(island, { yPercent: -200, duration: 0.42, ease: 'power3.inOut' });
  }

  // 이전 로드 취소 및 이미지 숨김
  img.onload = null;
  img.onerror = null;
  img.src = '';
  img.style.display = 'none';

  // 썸네일 비율로 로딩 플레이스홀더 크기 설정
  if (!fullscreen && thumbEl && thumbEl.naturalWidth && thumbEl.naturalHeight) {
    const ratio = thumbEl.naturalWidth / thumbEl.naturalHeight;
    const maxW = Math.min(800, window.innerWidth * 0.88);
    const maxH = window.innerHeight * 0.88;
    let w = maxW, h = w / ratio;
    if (h > maxH) { h = maxH; w = h * ratio; }
    loading.style.width = Math.round(w) + 'px';
    loading.style.height = Math.round(h) + 'px';
  } else {
    loading.style.width = '';
    loading.style.height = '';
  }
  loading.style.display = 'flex';

  function showImage() {
    loading.style.display = 'none';
    img.style.display = 'block';
  }

  img.onload = showImage;
  img.onerror = showImage;
  img.src = src;
  if (img.complete && img.naturalWidth) showImage();

  if (fullscreen) {
    lb.classList.add('s1-lb-fullscreen');
    dim.classList.add('s1-lb-fullscreen');
  }
  dim.classList.add('active');
  lb.classList.add('active');
  if (lenis) lenis.stop();
  document.body.classList.add('scroll-locked');
}

function closeCollageLightbox() {
  const lb = document.getElementById('s1-lightbox');
  const dim = document.getElementById('s1-lb-dim');
  const img = document.getElementById('s1-lb-img');
  const loading = document.getElementById('s1-lb-loading');
  lb.classList.remove('active', 's1-lb-fullscreen');
  dim.classList.remove('active', 's1-lb-fullscreen');
  document.body.classList.remove('scroll-locked');
  if (lenis) lenis.start();
  // 트랜지션 후 상태 초기화
  setTimeout(() => {
    img.onload = null;
    img.onerror = null;
    img.src = '';
    img.style.display = 'none';
    loading.style.display = 'none';
    loading.style.width = '';
    loading.style.height = '';
  }, 450);

  // 다이내믹 아일랜드 관성으로 복귀 (back.out: 살짝 오버슈트 후 안착)
  if (islandWasVisible) {
    gsap.to(document.getElementById('dynamic-island'), {
      yPercent: 0, duration: 0.6, ease: 'back.out(1.4)'
    });
  }
}


/* ============================================================
   Loading Screen
   ============================================================ */
function initLoadingScreen() {
  const screen = document.getElementById('loading-screen');
  const bar = document.getElementById('ls-bar');
  const content = screen ? screen.querySelector('.ls-content') : null;
  if (!screen || !bar || !content) return;

  const MIN_DISPLAY_MS = 5500;   // 최소 표시 시간 (선형 기준)
  const HARD_TIMEOUT_MS = 10000; // 리소스 강제 완료 타임아웃

  let totalWeight = 0;
  let loadedWeight = 0;
  let targetPct = 0;   // 실제 리소스 로딩 진행률
  let displayPct = 0;
  let resourcesDone = false;
  let minTimeDone = false;
  let done = false;
  let startTime = null;

  function tryComplete() {
    if (!done && resourcesDone && minTimeDone) {
      done = true;
      targetPct = 100;
    }
  }

  function markResourcesDone() {
    if (resourcesDone) return;
    resourcesDone = true;
    tryComplete();
  }

  function trackItem(weight, promise) {
    totalWeight += weight;
    Promise.resolve(promise)
      .then(() => onDone(weight))
      .catch(() => onDone(weight));
  }

  function onDone(weight) {
    loadedWeight += weight;
    targetPct = (loadedWeight / totalWeight) * 100;
    if (loadedWeight >= totalWeight) markResourcesDone();
  }

  function imgReady(img) {
    return new Promise(resolve => {
      if (img.complete && img.naturalWidth) return resolve();
      img.addEventListener('load', resolve, { once: true });
      img.addEventListener('error', resolve, { once: true });
    });
  }

  // ── 폰트 최우선 로드 → 완료 시 텍스트 페이드인 ───────────
  const fontPromises = [
    document.fonts.load('bold 1em GowunBatang'),
    document.fonts.load('500 1em Freesentation'),
    document.fonts.load('400 1em Freesentation'),
  ];
  Promise.all(fontPromises)
    .then(() => {
      content.style.transition = 'opacity 0.5s ease';
      content.style.opacity = '1';
    })
    .catch(() => { content.style.opacity = '1'; });

  // 폰트를 진행바에도 반영
  trackItem(2, fontPromises[0]);
  trackItem(2, fontPromises[1]);
  trackItem(1, fontPromises[2]);

  // ── S1 메인 이미지 ────────────────────────────────────────
  const mainImg = document.querySelector('.s1-main');
  if (mainImg) trackItem(4, imgReady(mainImg));

  // ── S1 콜라쥬 (PC 전용 — new Image()로 lazy bypass) ──────
  const isMobile = window.innerWidth <= 768;
  if (!isMobile) {
    document.querySelectorAll('.collage-photo').forEach(imgEl => {
      const src = imgEl.getAttribute('src');
      trackItem(0.3, new Promise(resolve => {
        const tmp = new Image();
        tmp.onload = resolve;
        tmp.onerror = resolve;
        tmp.src = src;
      }));
    });
  }

  // ── S3 영상 (canplaythrough) ──────────────────────────────
  const s3Video = document.querySelector('#section-3 video.s3-photo');
  if (s3Video) {
    trackItem(6, new Promise(resolve => {
      if (s3Video.readyState >= 4) return resolve();
      s3Video.addEventListener('canplaythrough', resolve, { once: true });
      s3Video.addEventListener('error', resolve, { once: true });
    }));
  }

  // ── S3 사진 ───────────────────────────────────────────────
  document.querySelectorAll('#section-3 img.s3-photo').forEach(img => {
    trackItem(1, imgReady(img));
  });

  // ── 최소 표시 8초, 하드 타임아웃 15초 ────────────────────
  setTimeout(() => { minTimeDone = true; tryComplete(); }, MIN_DISPLAY_MS);
  setTimeout(markResourcesDone, HARD_TIMEOUT_MS);

  // ── 진행바 애니메이션 ─────────────────────────────────────
  // 빠른 로딩: 5.5초 선형으로 채움 / 느린 로딩: 실제 진행률 추종
  function tick(now) {
    if (!startTime) startTime = now;
    const elapsed = now - startTime;

    // 5.5초 기준 선형 진행률
    const linearPct = Math.min((elapsed / MIN_DISPLAY_MS) * 100, 100);

    // 실제 로딩이 선형보다 느리면 실제값, 빠르면 선형값
    displayPct = done ? 100 : Math.min(targetPct, linearPct);
    bar.style.width = displayPct.toFixed(2) + '%';

    if (displayPct >= 100) {
      setTimeout(fadeOut, 280);
      return;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  function fadeOut() {
    screen.classList.add('ls-fade-out');
    setTimeout(() => {
      screen.remove();
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    }, 700);
  }
}

/* ============================================================
   Init & Lifecycle
   ============================================================ */

// defer 스크립트(GSAP/Lenis)와 무관하게 즉시 실행 — body 끝에 위치하므로 DOM 준비됨
initLoadingScreen();

// S5 모달 이미지 미리 디코딩 — 카드 클릭 시 즉시 표시되도록
['photos/s5/info/venue.jpg', 'photos/s5/info/groom.jpg', 'photos/s5/info/bride.jpg']
  .forEach(src => { const i = new Image(); i.src = src; });

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
  // 모바일 툴바 show/hide(height만 변하는 resize)를 ScrollTrigger가 무시하도록 설정
  ScrollTrigger.config({ ignoreMobileResize: true });

  // 메인 이미지 + 타이틀 폰트 로드 완료 후 순차 페이드인
  const mainImg = document.querySelector('.s1-main');
  const mainTitle = document.querySelector('.s1-title');
  gsap.set([mainImg, mainTitle], { opacity: 0 });
  Promise.all([
    document.fonts.load('400 1em KCCBangJeonghwan'),
    new Promise(resolve => {
      if (mainImg.complete && mainImg.naturalWidth > 0) resolve();
      else mainImg.addEventListener('load', resolve, { once: true });
    })
  ]).then(() => {
    gsap.set([mainImg, mainTitle], { opacity: 1 });
  });

  initDynamicIsland();
  initCollage();
  initSection2();
  initSection3();
  initSection4();
  initSection5();

  // 화면 회전: 브라우저 레이아웃이 안정된 뒤 GSAP 전체 재계산
  // 기존 resize 디바운스(150ms)가 먼저 실행되고, 450ms 후 한 번 더 refresh해
  // iOS/iPadOS의 느린 회전 완료를 확실히 커버한다
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      if (lenis) lenis.stop();
      ScrollTrigger.refresh(true);
      setTimeout(() => { if (lenis) lenis.start(); }, 150);
    }, 450);
  });
});

/* ============================================================
   Confetti Fireworks
   ============================================================ */
function launchFireworks() {
  const isMobile = window.matchMedia('(max-width: 599px)').matches;
  const duration = isMobile ? 1.1 * 1000 : 3 * 1000; // 모바일은 약 8발(4회 반복)로 상향
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
  const isMobile = window.matchMedia('(max-width: 599px)').matches;
  if (isMobile) {
    gsap.set(island, { xPercent: -50, yPercent: 0, opacity: 1, scale: 1 });
    islandShown = true;
  } else {
    gsap.set(island, { xPercent: -50, yPercent: -200, opacity: 0, scale: 0.85 });
  }

  // 데스크탑 버튼
  document.getElementById('btn-story').addEventListener('click', () => {
    gsap.to(window, { scrollTo: '#section-3', duration: 1, ease: 'power2.inOut' });
  });
  document.getElementById('btn-location').addEventListener('click', () => openCardModal(0));
  document.getElementById('btn-account').addEventListener('click', () => openCardModal(1));
  document.getElementById('btn-calendar').addEventListener('click', downloadICS);

  // 햄버거 메뉴 (모바일)
  const menuBtn = document.getElementById('btn-menu');
  const menuPanel = document.getElementById('di-menu-panel');
  if (menuBtn && menuPanel) {
    function closeMenu() {
      if (menuPanel.hidden || menuPanel.classList.contains('closing')) return;
      menuBtn.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuPanel.classList.add('closing');
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        menuPanel.hidden = true;
        menuPanel.classList.remove('closing');
      };
      menuPanel.addEventListener('animationend', finish, { once: true });
      setTimeout(finish, 400); // animationend 미발생 시 fallback
    }
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!menuPanel.hidden) {
        closeMenu();
      } else {
        menuPanel.hidden = false;
        menuBtn.classList.add('open');
        menuBtn.setAttribute('aria-expanded', 'true');
      }
    });
    document.addEventListener('click', (e) => {
      if (!menuPanel.hidden && !menuPanel.contains(e.target)) closeMenu();
    });

    document.getElementById('mb-story').addEventListener('click', () => {
      closeMenu();
      gsap.to(window, { scrollTo: '#section-3', duration: 1, ease: 'power2.inOut' });
    });
    document.getElementById('mb-location').addEventListener('click', () => { closeMenu(); openCardModal(0); });
    document.getElementById('mb-account').addEventListener('click', () => { closeMenu(); openCardModal(1); });
    document.getElementById('mb-calendar').addEventListener('click', () => { closeMenu(); downloadICS(); });

    // 스크롤 시 메뉴 닫기
    lenis.on('scroll', ({ velocity }) => {
      if (!menuPanel.hidden && Math.abs(velocity) > 0.5) {
        closeMenu();
      }
    });
  }
}

function initCollage() {
  // 모바일: 풀스크린 메인만 표출, 핀/타임라인 없음
  if (window.matchMedia('(max-width: 599px)').matches) {
    return;
  }

  const wrapper = document.querySelector('.s1-main-wrapper');
  const titleEl = document.querySelector('.s1-title');
  const photos = document.querySelectorAll('.collage-photo');

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

  // 모바일 11장: T1(l1)·T2(l6)·T3(l2) / L1(r1)·L2(l7)·L3(r2) / R1(l3)·R2(t1)·R3(t4) / B1(b1)·B2(b3)
  // 인덱스 → photo class 매핑: 0=l1,1=l2,2=l3,5=l6,6=l7,7=r1,8=r2,14=t1,17=t4,18=b1,20=b3
  const mobilePositions = startPositions.map(p => p);
  mobilePositions[0] = { x: '-20vw', y: '-150vh' }; // T1(l1)  — 위 좌
  mobilePositions[1] = { x: '-20vw', y: '-150vh' }; // T3(l2)  — 위 좌 2
  mobilePositions[2] = { x: '130vw', y: '-20vh' };  // R1(l3)  — 우상
  mobilePositions[5] = { x: '130vw', y: '-130vh' }; // T2(l6)  — 위 우
  mobilePositions[6] = { x: '-130vw', y: '10vh' };   // L2(l7)  — 좌 중
  mobilePositions[7] = { x: '-130vw', y: '-40vh' };  // L1(r1)  — 좌 상
  mobilePositions[8] = { x: '-130vw', y: '40vh' };   // L3(r2)  — 좌 하
  mobilePositions[14] = { x: '130vw', y: '20vh' };   // R2(t1)  — 우 중
  mobilePositions[17] = { x: '130vw', y: '60vh' };   // R3(t4)  — 우 하
  mobilePositions[18] = { x: '-30vw', y: '150vh' };  // B1(b1)  — 아래 좌
  mobilePositions[20] = { x: '20vw', y: '150vh' };  // B2(b3)  — 아래 우

  const mobileDelays = Array.from({ length: 22 }, () => 0);
  mobileDelays[0] = 0.35; // T1
  mobileDelays[1] = 0.25; // T3
  mobileDelays[2] = 0.15; // R1
  mobileDelays[5] = 0.45; // T2
  mobileDelays[6] = 0.20; // L2
  mobileDelays[7] = 0.08; // L1 (메인 옆, 먼저)
  mobileDelays[8] = 0.32; // L3
  mobileDelays[14] = 0.18; // R2
  mobileDelays[17] = 0.38; // R3
  mobileDelays[18] = 0.42; // B1
  mobileDelays[20] = 0.55; // B2 (마지막)

  const activePositions = isMobile ? mobilePositions : startPositions;
  const activeDelays = isMobile ? mobileDelays : arrivalDelays;
  const pinEnd = isMobile ? '+=400vh' : '+=1000vh';

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
      scrub: isMobile ? 0.05 : 0.3,
      pin: true,
      anticipatePin: 1,
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
        const isReady = self.progress >= 0.85;
        const section1 = document.getElementById('section-1');

        if (!isReady && section1.classList.contains('is-ready')) {
          resetDim();
        }

        section1.classList.toggle('is-ready', isReady);

        // 0.68–0.92 구간: 스크롤 진행도에 직접 연동된 점진 등장
        if (!isMobile) {
          const t = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0, 0.7, 0, 1, self.progress));
          gsap.set(island, {
            yPercent: gsap.utils.interpolate(-200, 0, t),
            opacity: t,
            scale: gsap.utils.interpolate(0.85, 1, t),
          });
          islandShown = t >= 1;
        }

        // 0.90–1.00: 데드 스크롤 (묵직한 느낌)
        if (!isMobile && lenis) {
          if (self.progress > 0.9) {
            lenis.options.duration = gsap.utils.mapRange(0.9, 1.0, 1.2, 4.0, self.progress);
          } else {
            lenis.options.duration = 1.2;
          }
        }
      },
      onLeave: () => {
        if (lenis) lenis.options.duration = 1.2;
      },
      onEnterBack: () => {
        if (lenis) lenis.options.duration = 1.2;
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
      { x: 0, y: 0, duration: isMobile ? 3 : 5, ease: 'power2.inOut' },
      0.5 + delay
    );
  });
  tl.to({}, { duration: 2.7 }, '>');  // 약 300vh 정지 구간 (Hold)

  // lift 제거 — padding-top: 64px로 다이내믹 아일랜드와의 간격 확보

  // ── 메인 사진 클릭 → 전체화면 라이트박스 ─────────────────
  wrapper.addEventListener('click', () => {
    if (!document.getElementById('section-1').classList.contains('is-ready')) return;
    const mainImg = wrapper.querySelector('.s1-main');
    openCollageLightbox(mainImg.getAttribute('src'), true, mainImg);
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
      const largeSrc = photo.getAttribute('src').replace('photos/s1/', 'photos/s1/lg/');
      openCollageLightbox(largeSrc, false, photo);
    });
  });

  // ── 라이트박스 닫기 ───────────────────────────────────────
  document.getElementById('s1-lb-dim').addEventListener('click', closeCollageLightbox);
  document.getElementById('s1-lb-close').addEventListener('click', closeCollageLightbox);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCollageLightbox(); });

  // ── 창 크기 변경 시 FLIP 애니메이션 ──────────────────────
  // 변경 전 위치 저장 → 레이아웃 갱신 → 역방향 offset 적용 → 0으로 스르륵
  let _prevResizeWidth = window.innerWidth;
  window.addEventListener('resize', debounce(() => {
    const newWidth = window.innerWidth;
    if (newWidth === _prevResizeWidth) return; // 툴바 show/hide (height만 변화) 무시
    _prevResizeWidth = newWidth;

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
  if (!photos.length || !slots.length) return;

  const photoOffsets = [
    { x: 0, y: 0, r: 0.0 }, { x: 8, y: 28, r: -2.3 }, { x: -3, y: 54, r: 3.7 },
    { x: 12, y: 78, r: -1.1 }, { x: -9, y: 100, r: 2.9 }, { x: 5, y: 120, r: -4.2 }, { x: -14, y: 138, r: 1.6 }
  ];

  // let으로 선언: 화면 회전 시 onRefreshInit에서 재계산
  let initialPhotoY = window.innerHeight;
  const isMobile = window.matchMedia('(max-width: 1023px)').matches;

  const PHOTO_POS = [0, 6, 16, 26, 36, 46, 56];
  const ANIM_DUR = 4.0;
  const MOB_EXIT = 0.6;
  const enterDur = isMobile ? ANIM_DUR - MOB_EXIT : ANIM_DUR;
  const enterOffset = isMobile ? MOB_EXIT : 0;
  // 데스크탑 cardFromState: y를 함수로 → invalidateOnRefresh 시 재평가
  const cardFromState = isMobile ? { opacity: 0, y: 30 } : { y: () => initialPhotoY, opacity: 0 };
  const cardExitY = isMobile ? -30 : -400;

  // 카드들을 data-slot 순서대로 가져오기
  const allCards = [];
  for (let i = 0; i < 7; i++) {
    allCards[i] = document.querySelector(`.s3-text-card[data-slot="${i}"]`);
  }

  // 초기 상태 설정 함수: 리프레시 시 재호출
  const resetS3InitialState = () => {
    initialPhotoY = window.innerHeight;
    gsap.set(allCards.slice(1).filter(Boolean), cardFromState);
    gsap.set(Array.from(photos).slice(1), { y: initialPhotoY });
  };
  resetS3InitialState();

  // ── 마스터 타임라인 ────────────────────────────────────────────
  const mainTl = gsap.timeline({
    scrollTrigger: {
      id: 'section3-main',
      trigger: '#section-3',
      start: "top top",
      end: "bottom bottom",
      scrub: 0.05,
      invalidateOnRefresh: true,
      onRefreshInit: resetS3InitialState
    }
  });

  // 사진 등장 시퀀스 (Photo 0은 자연 등장하므로 1번부터)
  photos.forEach((photo, i) => {
    if (i === 0) return;
    mainTl.fromTo(photo,
      { y: () => initialPhotoY, x: photoOffsets[i].x, rotation: photoOffsets[i].r },
      { y: photoOffsets[i].y, duration: enterDur, ease: "power2.out" },
      PHOTO_POS[i] + enterOffset
    );
  });

  const exitCard = (card, pos) => {
    if (!card) return;
    if (isMobile) {
      mainTl.to(card, { y: cardExitY, opacity: 0, duration: MOB_EXIT }, pos);
    } else {
      mainTl.to(card, { y: cardExitY, duration: ANIM_DUR, ease: "power2.out" }, pos);
      mainTl.to(card, { opacity: 0, duration: ANIM_DUR * 0.4, ease: "power1.in" }, pos);
    }
  };
  const enterCard = (card, pos) => {
    if (!card) return;
    mainTl.fromTo(card,
      cardFromState,
      { y: 0, opacity: 1, duration: enterDur, ease: "power2.out" },
      pos + enterOffset
    );
  };

  // 7개 카드 순차적 등장/퇴장 시퀀스
  allCards.forEach((card, i) => {
    if (i === 0) {
      // 첫 번째 카드는 바로 퇴장만
      exitCard(card, PHOTO_POS[1]);
    } else {
      // 이전 사진이 들어올 때(PHOTO_POS[i]) 입장
      enterCard(card, PHOTO_POS[i]);
      // 다음 사진이 들어올 때(PHOTO_POS[i+1]) 퇴장 (마지막 카드 제외)
      if (i < 6) {
        exitCard(card, PHOTO_POS[i + 1]);
      }
    }
  });
}

function initSection4() {
  // 폭죽 중복 실행 방지 플래그
  let fireworksFired = false;
  const triggerFireworks = () => {
    if (fireworksFired) return;
    fireworksFired = true;
    launchFireworks();
  };

  // 날짜 부분이 화면의 60%(중앙보다 살짝 아래)를 지날 때 폭죽 트리거
  ScrollTrigger.create({
    trigger: '.s4-date',
    start: 'top 60%',
    onEnter: () => triggerFireworks(),
    onLeaveBack: () => {
      fireworksFired = false; // 위로 다시 올라가면 리셋
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
  document.querySelectorAll('.s5-card').forEach(card => {
    card.addEventListener('click', () => openCardModal(Number(card.dataset.card)));
  });
  document.getElementById('s5-dim').addEventListener('click', closeCardModal);
  document.getElementById('s5-modal-close').addEventListener('click', closeCardModal);
}

function downloadICS() {
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT',
    'SUMMARY:김병훈 ♥ 백현지 결혼식', 'DTSTART:20261128T030000Z', 'DTEND:20261128T040000Z',
    'LOCATION:현대차·기아 양재사옥(서울 서초구 헌릉로12)', 'END:VEVENT', 'END:VCALENDAR'
  ];
  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'wedding.ics';
  a.click();
  URL.revokeObjectURL(url);
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
