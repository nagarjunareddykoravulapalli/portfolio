// Typed hero lines
const typedLines = [
  "Building scalable CI/CD pipelines...",
  "Automating infrastructure with Terraform & Bicep...",
  "Deploying apps to AKS & EKS with GitOps...",
  "Observability: Prometheus, Grafana & App Insights..."
];
let li = 0, ch = 0;
const typedEl = document.getElementById('typed');
function typeLoop(){
  if(!typedEl) return;
  const line = typedLines[li];
  if(ch <= line.length){
    typedEl.textContent = line.substring(0, ch);
    ch++;
    setTimeout(typeLoop, 45);
  } else {
    setTimeout(()=>{ ch = 0; li = (li + 1) % typedLines.length; typeLoop(); }, 1000);
  }
}
setTimeout(typeLoop, 400);

// Skill card click opens a modal-like quick detail (simple)
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('click', () => {
    const title = card.dataset.title || card.querySelector('h3')?.textContent;
    const body = card.dataset.body || card.querySelector('.small')?.textContent || '';
    showQuickModal(title, body);
  });
  card.addEventListener('keyup', (e) => { if(e.key === 'Enter') card.click(); });
});

function showQuickModal(title, body){
  // if modal exists remove it
  const existing = document.getElementById('quick-modal');
  if(existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'quick-modal';
  modal.style.position = 'fixed';
  modal.style.inset = '0';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.background = 'rgba(2,6,23,0.5)';
  modal.style.zIndex = 1200;

  const card = document.createElement('div');
  card.style.background = '#fff';
  card.style.color = '#0f172a';
  card.style.padding = '20px';
  card.style.borderRadius = '12px';
  card.style.maxWidth = '520px';
  card.style.boxShadow = '0 20px 50px rgba(2,6,23,0.15)';
  card.innerHTML = `<h3 style="margin-top:0">${title}</h3><p style="color:#475569">${body}</p><div style="text-align:right"><button id="close-modal" style="padding:8px 12px;border-radius:8px;border:none;background:#eef2ff;color:#3730a3;cursor:pointer">Close</button></div>`;
  modal.appendChild(card);
  document.body.appendChild(modal);

  document.getElementById('close-modal').addEventListener('click', ()=> modal.remove());
  modal.addEventListener('click', (e) => { if(e.target === modal) modal.remove(); });
}

// Copy email button
const copyBtn = document.getElementById('copy-email');
if(copyBtn){
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('knagarjunareddy60@gmail.com').then(()=> {
      copyBtn.textContent = 'Copied ✓';
      setTimeout(()=> copyBtn.textContent = 'Copy Email', 1600);
    });
  });
}
