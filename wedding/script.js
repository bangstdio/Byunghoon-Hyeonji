/* ============================================================
   Constants
   ============================================================ */
const WEDDING_DATE = '2026-11-28T12:00:00+09:00';
const WEDDING_VENUE = '현대차·기아 양재사옥';
const SMOOTH_SCROLL_DURATION = 0.8;

/* ============================================================
   Card Data (global — used by nav buttons + section 5)
   ============================================================ */
const S5_CARD_DATA = [
  {
    title: '오시는 길',
    html: `
      <a href="https://naver.me/5z5iEAfa" target="_blank" style="display:block; width:100%; height:250px; background-color:#eaeaea; border-radius:8px; margin-bottom:16px; overflow:hidden; position:relative; text-decoration:none;">
        <!-- 여기에 캡처한 지도 이미지 경로를 넣어주세요. 이미지가 없을 경우 임시 이미지가 표시됩니다. -->
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
      <p style="font-size:13px; color:#5e5d59; line-height:1.6;">지하철: 신분당선 양재시민의숲역 5번 출구 도보 5분<br>
      버스: 양재역 방면 간선버스 이용<br>
      자가용: 내비게이션 "현대차 양재사옥" 검색</p>
    `
  },
  {
    title: '마음 전하실 곳',
    html: `
      <div class="account-group">
        <h4>신랑측</h4>
        <div class="account-item">
          <div class="account-info">
            <span class="account-role">아버지</span> <span class="account-name">OOO</span>
            <div class="account-number">OO은행 000-00-000000</div>
          </div>
          <div class="account-actions">
            <button class="btn-copy" onclick="copyAccount('000000000000')">복사</button>
            <button class="btn-toss" onclick="sendToss('OO', '000000000000')">토스 송금</button>
            <button class="btn-kakao" onclick="sendKakao()">카카오 송금</button>
          </div>
        </div>
        <div class="account-item">
          <div class="account-info">
            <span class="account-role">어머니</span> <span class="account-name">OOO</span>
            <div class="account-number">OO은행 000-00-000000</div>
          </div>
          <div class="account-actions">
            <button class="btn-copy" onclick="copyAccount('000000000000')">복사</button>
            <button class="btn-toss" onclick="sendToss('OO', '000000000000')">토스 송금</button>
            <button class="btn-kakao" onclick="sendKakao()">카카오 송금</button>
          </div>
        </div>
        <div class="account-item">
          <div class="account-info">
            <span class="account-role">신랑</span> <span class="account-name">병훈</span>
            <div class="account-number">국민은행 000-00-0000-000</div>
          </div>
          <div class="account-actions">
            <button onclick="copyAccount('00000000000')">복사</button>
            <button class="btn-toss" onclick="sendToss('국민', '00000000000')">토스 송금</button>
            <button class="btn-kakao" onclick="sendKakao()">카카오 송금</button>
          </div>
        </div>
      </div>

      <div class="account-group">
        <h4>신부측</h4>
        <div class="account-item">
          <div class="account-info">
            <span class="account-role">아버지</span> <span class="account-name">OOO</span>
            <div class="account-number">OO은행 000-00-000000</div>
          </div>
          <div class="account-actions">
            <button class="btn-copy" onclick="copyAccount('000000000000')">복사</button>
            <button class="btn-toss" onclick="sendToss('OO', '000000000000')">토스 송금</button>
            <button class="btn-kakao" onclick="sendKakao()">카카오 송금</button>
          </div>
        </div>
        <div class="account-item">
          <div class="account-info">
            <span class="account-role">어머니</span> <span class="account-name">OOO</span>
            <div class="account-number">OO은행 000-00-000000</div>
          </div>
          <div class="account-actions">
            <button class="btn-copy" onclick="copyAccount('000000000000')">복사</button>
            <button class="btn-toss" onclick="sendToss('OO', '000000000000')">토스 송금</button>
            <button class="btn-kakao" onclick="sendKakao()">카카오 송금</button>
          </div>
        </div>
        <div class="account-item">
          <div class="account-info">
            <span class="account-role">신부</span> <span class="account-name">현지</span>
            <div class="account-number">신한은행 000-000-000000</div>
          </div>
          <div class="account-actions">
            <button class="btn-copy" onclick="copyAccount('000000000000')">복사</button>
            <button class="btn-toss" onclick="sendToss('신한', '000000000000')">토스 송금</button>
            <button class="btn-kakao" onclick="sendKakao()">카카오 송금</button>
          </div>
        </div>
      </div>
    `
  },
  {
    title: '식사 안내',
    html: `<p>예식 후 같은 건물 내 연회장에서 식사가 진행됩니다.</p>
           <p>식사 시간: 예식 종료 후 ~ 오후 2시<br>
           장소: 현대차·기아 양재사옥 B1 연회홀</p>`
  },
  {
    title: '주차 안내',
    html: `<p>양재사옥 지하 주차장을 이용하실 수 있습니다.</p>
           <p>입구: 헌릉로 12 정문 진입 후 B1 안내 따라 이동<br>
           요금: 예식 당일 무료 제공 예정<br>
           주차 도우미: 현장 안내 예정</p>`
  },
  {
    title: '방명록',
    html: `<p>방명록 기능은 추후 업데이트 예정입니다 💌</p>`
  },
  {
    title: '결혼식 컨셉',
    html: `<p>두 사람이 함께 걸어온 시간을 담아, 따뜻하고 소박한 분위기의 예식을 준비했습니다.</p>
           <p>컨셉: 가든 모던 (Garden Modern)<br>
           컬러: 아이보리, 테라코타, 그린<br>
           플로럴: 계절 꽃 중심 내추럴 스타일</p>`
  },
];

/* ============================================================
   Modal — global open / close
   ============================================================ */
function openCardModal(index) {
  const data = S5_CARD_DATA[index];
  if (!data) return;
  const modal = document.getElementById('s5-modal');
  const body  = document.getElementById('s5-modal-body');
  const dim   = document.getElementById('s5-dim');
  if (!modal || !body || !dim) return;
  body.innerHTML = `<h3>${data.title}</h3>${data.html}`;
  dim.classList.add('active');
  modal.classList.add('active');
  document.body.classList.add('scroll-locked');
}

function closeCardModal() {
  const modal = document.getElementById('s5-modal');
  const dim   = document.getElementById('s5-dim');
  if (!modal || !dim) return;
  dim.classList.remove('active');
  modal.classList.remove('active');
  document.body.classList.remove('scroll-locked');
}

/* ============================================================
   Account Actions (Copy, Toss, Kakao)
   ============================================================ */
window.copyAccount = function(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('계좌번호가 복사되었습니다.');
  }).catch(err => {
    console.error('복사 실패:', err);
    alert('복사에 실패했습니다. 직접 복사해주세요.');
  });
};

window.sendToss = function(bank, account) {
  const url = `supertoss://send?bank=${encodeURIComponent(bank)}&accountNo=${account}`;
  window.location.href = url;
};

window.sendKakao = function() {
  // 카카오페이 계좌송금은 일반적인 오픈 딥링크가 제공되지 않습니다.
  // 카카오페이 송금 링크(카카오페이 앱 > 송금 > 송금링크 생성) URL이 필요합니다.
  alert('카카오페이는 개별 송금 링크(URL) 설정이 필요합니다.');
};

/* ============================================================
   Init
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  initDynamicIsland();
  initCollage();
  initSection2();
  initSection3();

});

/* ============================================================
   SECTION 0 — Dynamic Island
   ============================================================ */
function initDynamicIsland() {
  const island = document.getElementById('dynamic-island');

  // 초기 상태: 화면 위쪽 밖, 중앙 정렬 유지
  gsap.set(island, {
    xPercent: -50,   // left:50% 기준으로 자기 너비의 -50% → 수평 중앙
    yPercent: -200,  // 자기 높이의 -200% → 완전히 뷰포트 위로 숨김
    opacity: 0,
    scale: 0.85,
  });

  // 버튼 핸들러
  // 배경 밝기 감지: section-2 상단이 아일랜드 하단(≈60px)에 닿으면 light mode로 전환
  ScrollTrigger.create({
    trigger: '#section-2',
    start: 'top 60px',
    onEnter: () => island.classList.add('di-on-light'),
    onLeaveBack: () => island.classList.remove('di-on-light'),
  });

  document.getElementById('btn-story').addEventListener('click', () => {
    gsap.to(window, {
      scrollTo: '#section-3',
      duration: SMOOTH_SCROLL_DURATION,
      ease: 'power2.inOut',
    });
  });

  document.getElementById('btn-location').addEventListener('click', () => openCardModal(0));
  document.getElementById('btn-account').addEventListener('click', () => openCardModal(1));
  document.getElementById('btn-calendar').addEventListener('click', downloadICS);
}

/* ============================================================
   F-09 — ICS 다운로드 (placeholder, 하단에서 실제 구현으로 교체됨)
   ============================================================ */
function downloadICS() {
  console.log('일정 등록: ICS 다운로드 (추후 구현)');
}

/* ============================================================
   SECTION 1 — 콜라주 스크롤 애니메이션
   ============================================================ */
function initCollage() {
  const wrapper = document.querySelector('.s1-main-wrapper');
  const titleEl = document.querySelector('.s1-title');
  const photos = document.querySelectorAll('.collage-photo');

  // 각 보조 사진의 초기(화면 밖) 위치 — 7장
  const startPositions = [
    { x: '-130vw', y: '-130vh' }, // c1 (좌상단)
    { x: '-150vw', y: '0' }, // c2 (좌중단)
    { x: '-130vw', y: '130vh' }, // c3 (좌하단)
    { x: '130vw', y: '-130vh' }, // c4 (우상단)
    { x: '130vw', y: '130vh' }, // c5 (우하단)
    { x: '0', y: '150vh' }, // c6 (하단중첩)
    { x: '100vw', y: '150vh' }, // c7 (우하단)
  ];

  // 최종 회전값: 똑바로 배치 (0)
  const finalRotations = [0, 0, 0, 0, 0, 0, 0];

  // 초기 위치 세팅 (화면 밖)
  photos.forEach((photo, i) => {
    if (!startPositions[i]) return;
    gsap.set(photo, {
      x: startPositions[i].x,
      y: startPositions[i].y,
      rotation: finalRotations[i],
    });
  });

  // 스크롤 타임라인: SECTION 1 핀 + scrub
  // 전체를 7.5 구간으로 보고 (750vh), 0.5(50vh) 대기 - 5(500vh) 이동 - 2.0(200vh) 동시 애니메이션
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.s1-visual',
      start: 'top top',
      end: '+=450vh',
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true, // 창 크기 변경 시 width/height 값을 재계산합니다.
    },
  });

  // 메인 사진 래퍼: 창 너비에 맞춰 목표 너비와 높이를 픽셀로 변환하여 전달 (var()는 GSAP가 100vw에서 보간하지 못하고 스냅핑됨)
  tl.to(wrapper, {
    width: () => {
      const isDesktop = window.innerWidth >= 600;
      return isDesktop ? (window.innerHeight * 0.6 * 0.75) + "px" : (window.innerWidth * 0.36) + "px";
    },
    height: () => {
      const isDesktop = window.innerWidth >= 600;
      return isDesktop ? (window.innerHeight * 0.6) + "px" : (window.innerWidth * 0.36 * 4 / 3) + "px";
    },
    borderRadius: "16px",
    duration: 5,
    ease: 'power2.inOut',
  }, 0.5); // 0.5 위치(50vh 후)에서 시작

  // 타이틀 페이드아웃: 이동 구간(5)의 2/3 지점부터 페이드아웃
  // 0.5 + 5 * (2/3) ≈ 3.83
  tl.to(titleEl, {
    opacity: 0,
    duration: 1.67,
    ease: 'power2.in',
  }, 3.83);

  // 보조 사진 7장: 타임라인 0.5에서 시작해 duration 5 동안 제자리로 이동
  photos.forEach((photo, i) => {
    if (!startPositions[i]) return;
    tl.to(photo, {
      x: 0,
      y: 0,
      rotation: finalRotations[i],
      duration: 5,
      ease: 'power2.inOut',
    }, 0.5);
  });

  // 마지막 350vh(duration 3.5) 동안: 콜라주 조립 도중인 4.0 시점부터 일찌감치 컨테이너 전체가 올라가고 아일랜드가 내려옴
  const galleryContainer = document.querySelector('.s1-gallery-container');
  tl.to(galleryContainer, {
    y: "-=15vh",
    duration: 3.5,
    ease: "power1.inOut",
  }, 4.0);

  tl.to('#dynamic-island', {
    yPercent: 0,
    opacity: 1,
    scale: 1,
    duration: 3.5,
    ease: "power2.out",
  }, 4.0);
}

/* ============================================================
   SECTION 2 — 단어별 텍스트 컬러 전환
   ============================================================ */
function initSection2() {
  const words = document.querySelectorAll('.s2-word');
  if (!words.length) return;

  const total = words.length;

  ScrollTrigger.create({
    trigger: '.s2-inner',
    start: 'top 90%',   // .s2-inner 중앙이 화면 아래 경계보다 25% 더 아래일 때 시작 (화면 진입 전)
    end: 'top 10%',    // .s2-inner 중앙이 화면 아래쪽 25% 지점에 도달할 때 완료
    scrub: 0.2,
    onUpdate: (self) => {
      const progress = self.progress; // 0 → 1
      const activeCount = Math.round(progress * total);
      words.forEach((word, i) => {
        if (i < activeCount) {
          word.classList.add('active');
        } else {
          word.classList.remove('active');
        }
      });
    },
  });
}

/* ============================================================
   SECTION 3 — 우리의 이야기 스크롤 시퀀스
   ============================================================ */
function initSection3() {
  const photos = document.querySelectorAll('.s3-photo');
  const slots = document.querySelectorAll('.s3-text-slot');
  if (!photos.length || !slots.length) return;

  // 사진 스택 오프셋 — 종이 쌓이듯 미세하게 삐뚤게
  // ─────────────────────────────────────────────────────
  // ★ 현재 적용: 옵션 A — x이동 + 미세 회전 조합 (가장 자연스러운 종이 쌓기)
  // ─────────────────────────────────────────────────────
  // 옵션 A: x이동 + y하강(~0.5cm씩) + 미세 회전  (현재 적용)
  //   사진마다 x, y, rotation 조합 — y는 18px(≈0.5cm)씩 증가
  // 옵션 B: 회전만  (x:0, y:0 고정, r만 변화)
  //   { x: 0, y: 0, r: [0, 1.5, -1.0, 0.7, -1.8, 1.2, -0.5] }
  // 옵션 C: 교번 기울기  (x:±9, y:0, r:±2.0 좌우 번갈아)
  //   { x: [0,9,-9,7,-7,8,-8], y: 0, r: [0,2.0,-2.0,1.5,-1.5,1.8,-1.8] }
  // 옵션 D: 뚜렷한 흐트러짐 + 하강  (x:±13, y:18씩, r:±2.5)
  //   { x: [0,13,-11,15,-9,12,-10], y: [0,18,36,54,72,90,108], r: [0,2.5,-2.8,1.8,-2.2,2.6,-2.0] }
  // ─────────────────────────────────────────────────────
  const photoOffsets = [
    { x:  0,   y:   0,  r:  0.0  },  // photo 0: 기준
    { x:  8,   y:  28,  r: -2.3  },  // photo 1
    { x: -3,   y:  54,  r:  3.7  },  // photo 2
    { x: 12,   y:  78,  r: -1.1  },  // photo 3
    { x: -9,   y: 100,  r:  2.9  },  // photo 4
    { x:  5,   y: 120,  r: -4.2  },  // photo 5
    { x: -14,  y: 138,  r:  1.6  },  // photo 6
  ];

  // 모든 사진: 화면 하단 밖에서 시작 + 개별 x/rotation 오프셋 적용
  const initialPhotoY = window.innerHeight;
  photos.forEach((photo, i) => {
    const o = photoOffsets[i] || { x: 0, y: 0, r: 0 };
    gsap.set(photo, { y: initialPhotoY, x: o.x, rotation: o.r });
  });

  // 타이틀 초기 위치: 화면 하단 밖 — 1번 사진과 함께 올라옴
  const titleEl = document.querySelector('.s3-sticky-title');
  if (titleEl) gsap.set(titleEl, { y: window.innerHeight });

  const cards = document.querySelectorAll('.s3-text-card');
  gsap.set(cards, { y: window.innerHeight });

  // 현재 화면에 떠 있는 카드를 추적 — 다음 카드 등장 시 퇴장시킴
  let lastCard = null;

  slots.forEach((slot, i) => {
    const currentPhoto = photos[i];
    const card = document.querySelector(`.s3-text-card[data-slot="${i}"]`);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: slot,
        start: "top 70%",
        end: "bottom 30%",
        scrub: 1,
      }
    });

    // 사진 등장
    if (currentPhoto) {
      tl.to(currentPhoto, { y: photoOffsets[i].y, duration: 2.5, ease: "power2.out" }, 0);
    }

    // 슬롯 0: 타이틀도 사진과 함께 등장
    if (i === 0 && titleEl) {
      tl.to(titleEl, { y: 0, duration: 2.5, ease: "power2.out" }, 0);
    }

    if (card) {
      // 이전에 보이던 카드를 이번 슬롯 진입과 함께 퇴장
      if (lastCard) {
        tl.to(lastCard, { y: -100, opacity: 0, duration: 1.5, ease: "power2.in" }, 0);
      }
      // 현재 카드 등장 (마지막 카드는 섹션4 진입 시 밀려남)
      tl.to(card, { y: 0, duration: 2.5, ease: "power2.out" }, 0);
      lastCard = card;
    }
  });
}

/* ============================================================
   SECTION 4 + 5 + F-09 — 신규 구현
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initSection4();
  initSection5();
});

/* ============================================================
   SECTION 4 — 카운트다운
   ============================================================ */
function initSection4() {
  // 섹션 4가 아래에서 올라올 때 섹션 3의 sticky 요소들을 동일 속도로 위로 밀어냄
  // 마지막 텍스트 카드도 포함하여 마지막 사진과 동일한 속도로 사라지도록 함
  gsap.to(['.s3-sticky-title', '.s3-photo-stack', '.s3-card-stack'], {
    y: '-100vh',
    ease: 'none',
    scrollTrigger: {
      trigger: '#section-4',
      start: 'top bottom',
      end: 'top top',
      scrub: true,
    }
  });

  const target = new Date(WEDDING_DATE);
  const countdownEl = document.getElementById('s4-countdown');
  const suffixEl = document.querySelector('.s4-suffix');
  if (!countdownEl) return;

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
      countdownEl.innerHTML = '<p class="s4-dday">오늘입니다 🎉</p>';
      if (suffixEl) suffixEl.style.display = 'none';
      return;
    }

    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs  = Math.floor((diff % (1000 * 60)) / 1000);

    const dEl = document.getElementById('cd-days');
    const hEl = document.getElementById('cd-hours');
    const mEl = document.getElementById('cd-mins');
    const sEl = document.getElementById('cd-secs');
    if (dEl) dEl.textContent = pad(days);
    if (hEl) hEl.textContent = pad(hours);
    if (mEl) mEl.textContent = pad(mins);
    if (sEl) sEl.textContent = pad(secs);
  }

  tick();
  setInterval(tick, 1000);
}

/* ============================================================
   SECTION 5 — 무한 갤러리 + 카드 모달
   ============================================================ */
function initSection5() {
  const cards    = document.querySelectorAll('.s5-card');
  const dim      = document.getElementById('s5-dim');
  const modal    = document.getElementById('s5-modal');
  const closeBtn = document.getElementById('s5-modal-close');
  if (!cards.length || !dim || !modal) return;

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      openCardModal(Number(card.dataset.card));
    });
  });

  dim.addEventListener('click', closeCardModal);
  closeBtn.addEventListener('click', closeCardModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCardModal();
  });
}

/* ============================================================
   F-09 — ICS 다운로드 (실제 구현 — 위 placeholder를 덮어씀)
   ============================================================ */
function downloadICS() {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Byunghoon & Hyeonji Wedding//KO',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    'SUMMARY:Byunghoon & Hyeonji 결혼식',
    'DTSTART:20261128T120000+0900',
    'DTEND:20261128T130000+0900',
    'LOCATION:현대차·기아 양재사옥',
    'DESCRIPTION:Byunghoon & Hyeonji 결혼식에 초대합니다.',
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'byunghoon-hyeonji-wedding.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
