const yesBtn = document.querySelector('.yes-btn');
const noBtn = document.querySelector('.no-btn');
const question = document.querySelector('.question');
const gif = document.querySelector('.gif');
const buttonPlayground = document.querySelector('.button-playground');
const pageShell = document.getElementById('pageShell');
const letterCard = document.getElementById('letterCard');
const letterMessage = document.getElementById('letterMessage');
const countdownCard = document.getElementById('countdownCard');
const goodbyeScreen = document.getElementById('goodbyeScreen');

const noMessages = [
  {
    text: 'Suy nghĩ kĩ rồi chọn được nhé 🥺',
    gif: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWh1MnRwaDBmN3R3cHZocmc4dzhhY3g1NW1oaGg1YjB3Y2VjaXV0dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WWUSelKQYSRNNYWCNR/giphy.gif'
  },
  {
    text: 'Thiệt hỏ 😢',
    gif: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGZkMXVmZTgzemNsbzE5OWl1aGNjZ3hhY2NkYTc0OHNmMmhuNXgyMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/rDUjFhC3FYJmaJpTEn/giphy.gif'
  },
  {
    text: 'vây sao lại quan tâm mà mò ra được bí mật này hay thế 😭',
    gif: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjJvdWZzYXc1NGJ6aGp1cDE3b2dyNnVzOGN1andkMjVrMmRzeGwwZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3OhXBaoR1tVPW/giphy.gif'
  },
  {
    text: 'Vây thì Thảo Nguyên có câu trả lời rồi ấy nhấn nó một lần nữa nhé, xin lỗi vì làm phiền Thảo Nguyên nhé',
    gif: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGIzN2w4eHA5NHNidGJiYXl6MHA0bDNraDhiYWV4ZGpheXNjNjk4aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OPU6wzx8JrHna/giphy.gif'
  }
];

const MAX_NO_CLICKS = 5;
let noClickCount = 0;
let hasAnsweredYes = false;

// =====================================================
// YES: MỞ BỨC THƯ + HIỆN ĐỒNG HỒ
// =====================================================
yesBtn.addEventListener('click', () => {
  if (hasAnsweredYes) return;
  hasAnsweredYes = true;

  yesBtn.disabled = true;
  noBtn.disabled = true;

  question.classList.add('question-leave');
  letterCard.classList.add('opening');

  setTimeout(() => {
    question.textContent = 'Gửi chít một dòng nhỏ cho tương lai 💌';
    question.classList.remove('question-leave');
    question.classList.add('question-arrive');

    gif.src = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGNhdXh1b252b2F2b2U4cHRlNGkwMDZsajllaGF1cDJyb2p4NXl2YiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/G6N0pDDgDpLjUvNoyQ/giphy.gif';

    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    buttonPlayground.classList.add('answered');

    // Mở bố cục và cho đồng hồ xuất hiện sau hiệu ứng mở thư.
    pageShell.classList.add('opened');
    countdownCard.setAttribute('aria-hidden', 'false');
    letterMessage.classList.add('show');
    burstHearts(18);
  }, 420);
});

// =====================================================
// NO: ĐỔI NỘI DUNG, CHẠY NÚT; LẦN THỨ 5 -> "TẠM BIỆT"
// =====================================================
noBtn.addEventListener('click', () => {
  if (hasAnsweredYes) return;

  noClickCount++;

  if (noClickCount >= MAX_NO_CLICKS) {
    showGoodbyeAndLeave();
    return;
  }

  const message = noMessages[(noClickCount - 1) % noMessages.length];
  question.textContent = message.text;
  gif.src = message.gif;

  moveNoButton();
});

function moveNoButton() {
  const area = buttonPlayground.getBoundingClientRect();
  const button = noBtn.getBoundingClientRect();

  const maxX = Math.max(0, area.width - button.width - 8);
  const maxY = Math.max(0, area.height - button.height - 8);

  const randomX = Math.floor(Math.random() * (maxX + 1));
  const randomY = Math.floor(Math.random() * (maxY + 1));

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
}

function showGoodbyeAndLeave() {
  yesBtn.disabled = true;
  noBtn.disabled = true;

  goodbyeScreen.setAttribute('aria-hidden', 'false');
  goodbyeScreen.classList.add('show');

  // Trình duyệt không cho website tự xóa toàn bộ lịch sử duyệt web.
  // location.replace() thay thế trang hiện tại trong history bằng trang đích.
  setTimeout(() => {
    window.location.replace('about:blank');
  }, 1800);
}

// =====================================================
// COUNTDOWN ĐẾN 00:00 NGÀY 06/08/2029 - GIỜ VIỆT NAM
// =====================================================
const targetDate = new Date('2029-08-06T00:00:00+07:00');
const pageOpenedAt = new Date();

const dayMs = 24 * 60 * 60 * 1000;
const hourMs = 60 * 60 * 1000;
const minuteMs = 60 * 1000;
const secondMs = 1000;

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const countdownEl = document.getElementById('countdown');
const headlineEl = document.getElementById('headline');
const reachedMessage = document.getElementById('reachedMessage');
const timelineProgress = document.getElementById('timelineProgress');

function updateNumber(element, value, minLength = 2) {
  const formatted = String(value).padStart(minLength, '0');

  if (element.textContent !== formatted) {
    element.textContent = formatted;
    element.classList.remove('digit-pop');
    void element.offsetWidth;
    element.classList.add('digit-pop');
  }
}

function updateCountdown() {
  const now = new Date();
  const distance = targetDate.getTime() - now.getTime();

  if (distance <= 0) {
    updateNumber(daysEl, 0, 3);
    updateNumber(hoursEl, 0);
    updateNumber(minutesEl, 0);
    updateNumber(secondsEl, 0);

    headlineEl.textContent = '06 · 08 · 2029';
    countdownEl.classList.add('countdown-finished');
    reachedMessage.hidden = false;
    timelineProgress.style.width = '100%';
    return false;
  }

  const days = Math.floor(distance / dayMs);
  const hours = Math.floor((distance % dayMs) / hourMs);
  const minutes = Math.floor((distance % hourMs) / minuteMs);
  const seconds = Math.floor((distance % minuteMs) / secondMs);

  updateNumber(daysEl, days, 3);
  updateNumber(hoursEl, hours);
  updateNumber(minutesEl, minutes);
  updateNumber(secondsEl, seconds);

  const fullRange = targetDate.getTime() - pageOpenedAt.getTime();
  const elapsed = now.getTime() - pageOpenedAt.getTime();
  const progress = fullRange > 0
    ? Math.min(100, Math.max(0, (elapsed / fullRange) * 100))
    : 100;

  timelineProgress.style.width = `${progress}%`;
  return true;
}

updateCountdown();
const countdownTimer = setInterval(() => {
  if (!updateCountdown()) {
    clearInterval(countdownTimer);
  }
}, 1000);

// =====================================================
// HIỆU ỨNG TIM BAY
// =====================================================
function createHeart(extraBurst = false) {
  const heartsContainer = document.querySelector('.hearts');
  const heart = document.createElement('span');
  const hearts = ['❤', '💗', '💕', '💖'];

  heart.className = `heart${extraBurst ? ' burst-heart' : ''}`;
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${14 + Math.random() * 17}px`;
  heart.style.animationDuration = `${extraBurst ? 2.8 + Math.random() * 2 : 5 + Math.random() * 5}s`;
  heart.style.animationDelay = `${Math.random() * 0.35}s`;

  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), extraBurst ? 5200 : 11000);
}

function burstHearts(amount) {
  for (let i = 0; i < amount; i++) {
    setTimeout(() => createHeart(true), i * 55);
  }
}

for (let i = 0; i < 10; i++) {
  setTimeout(createHeart, i * 180);
}

setInterval(() => {
  createHeart();
  if (Math.random() > 0.55) createHeart();
}, 700);
