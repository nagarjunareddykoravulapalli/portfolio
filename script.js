// Pipeline-themed portfolio interactions

// Typed CLI lines for hero
const lines = [
  "deploying nagarjuna.devops:v6.0",
  "running tests: ✅ 120 passed",
  "syncing infra with Terraform...",
  "gitops: applying manifests to AKS..."
];
let li = 0, ch = 0;
const typed = document.getElementById('typed');
function typeLoop(){
  if(!typed) return;
  const line = lines[li];
  if(ch <= line.length){
    typed.textContent = line.substring(0, ch);
    ch++;
    setTimeout(typeLoop, 45);
  } else {
    setTimeout(() => { ch = 0; li = (li + 1) % lines.length; typeLoop(); }, 1200);
  }
}
setTimeout(typeLoop, 600);

// Skill node interactions: show description on click/hover (accessible)
document.querySelectorAll('.skills-pipeline .node').forEach(node => {
  node.addEventListener('click', () => {
    const title = node.textContent.trim();
    const detail = node.dataset.title || "No details";
    alert(title + "\\n\\n" + detail);
  });
  node.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') node.click();
  });
});

// Terminal: click terminal area to run simple commands
document.addEventListener('DOMContentLoaded', () => {
  const term = document.querySelector('.terminal');
  const output = document.getElementById('terminal-output');

  if(!term) return;
  term.addEventListener('click', async () => {
    const cmd = prompt("Enter command (resume/github/linkedin):");
    if(!cmd) return;

    const c = cmd.trim().toLowerCase();
    if(c === 'resume'){
      window.open('assets/nagarjuna_resume.pdf', '_blank');
    } else if(c === 'github'){
      window.open('https://github.com/YOUR_GITHUB', '_blank');
    } else if(c === 'linkedin'){
      window.open('https://www.linkedin.com/in/YOUR_LINKEDIN', '_blank');
    } else {
      const el = document.createElement('div');
      el.textContent = `Unknown command: ${cmd}`;
      output.appendChild(el);
      setTimeout(()=> el.remove(), 3000);
    }
  });
});

// Accessibility: keyboard shortcuts to copy email
document.addEventListener('keydown', (e) => {
  if((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e'){
    navigator.clipboard.writeText('knagarjunareddy60@gmail.com').then(() => {
      alert('Email copied to clipboard: knagarjunareddy60@gmail.com');
    });
  }
});
