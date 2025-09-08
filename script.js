
// Galaxy canvas (particles + connections)
const canvas = document.getElementById('galaxy');
const ctx = canvas.getContext('2d');
let W = innerWidth, H = innerHeight, nodes = [];

function resize(){ W = canvas.width = innerWidth; H = canvas.height = innerHeight; initNodes(); }
function rand(a,b){ return a + Math.random()*(b-a); }

function initNodes(){
  nodes = []; const count = Math.min(180, Math.floor((W*H)/22000));
  for(let i=0;i<count;i++){ nodes.push({ x: Math.random()*W, y: Math.random()*H, r: rand(0.6,2), vx: rand(-0.25,0.25), vy: rand(-0.25,0.25) }); }
}

function frame(){
  ctx.clearRect(0,0,W,H);
  // gentle nebula
  const g = ctx.createRadialGradient(W*0.2, H*0.15, 0, W*0.2, H*0.15, W*0.6);
  g.addColorStop(0, 'rgba(138,107,255,0.06)'); g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g; ctx.fillRect(0,0,W,H);

  for(let i=0;i<nodes.length;i++){
    const a = nodes[i]; a.x += a.vx; a.y += a.vy;
    if(a.x<0||a.x>W) a.vx *= -1; if(a.y<0||a.y>H) a.vy *= -1;
    for(let j=i+1;j<nodes.length;j++){
      const b = nodes[j]; const dx = a.x - b.x, dy = a.y - b.y; const d2 = dx*dx + dy*dy;
      if(d2 < 10000){
        const alpha = 1 - d2/10000; ctx.strokeStyle = 'rgba(0,224,255,' + (alpha*0.06) + ')'; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
      }
    }
  }
  for(const p of nodes){ ctx.fillStyle = 'rgba(0,224,255,0.06)'; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill(); ctx.fillStyle = 'rgba(138,107,255,0.9)'; ctx.beginPath(); ctx.arc(p.x,p.y,p.r*0.5,0,Math.PI*2); ctx.fill(); }
  requestAnimationFrame(frame);
}
resize(); frame(); addEventListener('resize', resize);

// typed CLI
const lines = [
  "deploying nagarjuna.devops:v6.0",
  "running tests: ✅ 120 passed",
  "syncing infra with Terraform...",
  "gitops: applying manifests to AKS..."
];
let li=0, ch=0; const typed = document.getElementById('typed');
function typeLoop(){
  const line = lines[li]; if(ch <= line.length){ typed.textContent = line.substring(0,ch); ch++; setTimeout(typeLoop, 40); } else { setTimeout(()=>{ ch=0; li=(li+1)%lines.length; typeLoop(); }, 1100); }
}
setTimeout(typeLoop, 800);

// Skill galaxy planets
const skills = [
  {name:'AWS', detail:'VPC, EC2, EKS, S3, Glue', size:'large', x:12, y:30},
  {name:'Azure', detail:'AKS, ACR, App Insights, Bicep', size:'large', x:78, y:22},
  {name:'Kubernetes', detail:'AKS/EKS, Helm, ArgoCD', size:'large', x:40, y:60},
  {name:'Terraform', detail:'Modules, State, AWS & Azure', size:'medium', x:65, y:68},
  {name:'Docker', detail:'Custom images, Compose', size:'medium', x:22, y:72},
  {name:'Jenkins', detail:'Pipelines, Groovy', size:'small', x:50, y:12},
  {name:'Prometheus', detail:'Metrics, Alerts, Grafana', size:'small', x:85, y:50},
  {name:'SonarQube', detail:'SAST, Quality Gates', size:'small', x:10, y:50}
];

const map = document.getElementById('galaxy-map');
const tooltip = document.createElement('div'); tooltip.className = 'tooltip'; document.body.appendChild(tooltip);

function buildPlanets(){
  map.innerHTML = '';
  const rect = map.getBoundingClientRect();
  skills.forEach(s=>{
    const el = document.createElement('div');
    el.className = 'planet ' + (s.size==='large'?'large':s.size==='medium'?'medium':'small');
    el.textContent = s.name;
    // position by percentage
    el.style.left = `calc(${s.x}% - ${ (s.size==='large'?70: s.size==='medium'?55:40) }px)`;
    el.style.top = `calc(${s.y}% - ${ (s.size==='large'?70: s.size==='medium'?55:40) }px)`;
    el.dataset.detail = s.detail;
    map.appendChild(el);
    // bob animation
    const dx = (Math.random()*2-1)*8, dy = (Math.random()*2-1)*8;
    el.animate([{transform:'translate(0px,0px) scale(1)'},{transform:`translate(${dx}px, ${dy}px) scale(1.03)`},{transform:'translate(0px,0px) scale(1)'}], {duration:5000+Math.random()*4000, iterations:Infinity});
    el.addEventListener('mouseenter', e=>{
      tooltip.style.opacity = '1'; tooltip.textContent = s.detail;
      const r = el.getBoundingClientRect();
      tooltip.style.left = (r.left + r.width/2) + 'px'; tooltip.style.top = (r.top + r.height + 12) + 'px';
    });
    el.addEventListener('mouseleave', ()=> tooltip.style.opacity = '0');
    el.addEventListener('click', ()=> alert(s.name + "\n\n" + s.detail + "\n\n(Replace this with project links or expanded content)"));
  });
}

window.addEventListener('load', ()=>{ buildPlanets(); window.addEventListener('resize', buildPlanets); });

// copy email helper
function copyEmail(){ const email='knagarjunareddy60@gmail.com'; navigator.clipboard.writeText(email).then(()=>{ const c=document.getElementById('copymsg'); c.textContent='Email copied ✔'; setTimeout(()=>c.textContent='',2200); }); }
