const menuRail = document.getElementById('menuRail');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

function cardStep(){
  const card = menuRail.querySelector('.dish-card');
  return card ? card.getBoundingClientRect().width + 22 : 300;
}
function updateProgress(){
  const max = menuRail.scrollWidth - menuRail.clientWidth;
  const pct = max <= 0 ? 100 : (menuRail.scrollLeft / max) * 82 + 18;
  progressBar.style.width = `${Math.min(100, pct)}%`;
}
prevBtn.addEventListener('click', () => menuRail.scrollBy({left:-cardStep(), behavior:'smooth'}));
nextBtn.addEventListener('click', () => menuRail.scrollBy({left:cardStep(), behavior:'smooth'}));
menuRail.addEventListener('scroll', updateProgress, {passive:true});

let drag = false, startX = 0, startScroll = 0;
menuRail.addEventListener('pointerdown', e => {
  drag = true; startX = e.clientX; startScroll = menuRail.scrollLeft;
  menuRail.setPointerCapture(e.pointerId);
});
menuRail.addEventListener('pointermove', e => {
  if(!drag) return;
  menuRail.scrollLeft = startScroll - (e.clientX - startX);
});
menuRail.addEventListener('pointerup', () => drag = false);
menuRail.addEventListener('pointercancel', () => drag = false);

menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuBtn.setAttribute('aria-expanded','false');
}));

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.nav a').forEach(x => x.classList.remove('active'));
    link.classList.add('active');
  });
});
updateProgress();
