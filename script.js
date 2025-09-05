// === Tech Dots Background ===
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let W, H, dots;

function resize(){
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  const count = Math.min(160, Math.floor((W*H)/18000));
  dots = Array.from({length: count}, () => ({
    x: Math.random()*W,
    y: Math.random()*H,
    vx: (Math.random()-0.5)*0.4,
    vy: (Math.random()-0.5)*0.4,
    r: Math.random()*1.8+0.6
  }));
}
resize();
window.addEventListener('resize', resize);

function tick(){
  ctx.clearRect(0,0,W,H);
  for(let i=0;i<dots.length;i++){
    const a=dots[i];
    a.x+=a.vx; a.y+=a.vy;
    if(a.x<0||a.x>W) a.vx*=-1;
    if(a.y<0||a.y>H) a.vy*=-1;
    for(let j=i+1;j<dots.length;j++){
      const b=dots[j];
      const dx=a.x-b.x, dy=a.y-b.y;
      const d=dx*dx+dy*dy;
      if(d<9000){
        const alpha = 1 - d/9000;
        ctx.strokeStyle = `rgba(0,200,255,${alpha*0.25})`;
        ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
      }
    }
  }
  for(const p of dots){
    ctx.fillStyle = 'rgba(122,92,255,.9)';
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();
  }
  requestAnimationFrame(tick);
}
tick();

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id=a.getAttribute('href');
    if(id.length>1){
      e.preventDefault();
      document.querySelector(id).scrollIntoView({behavior:'smooth'});
    }
  });
});
