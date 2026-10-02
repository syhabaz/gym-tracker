const q=new URLSearchParams(location.search);
let wk=+q.get('w')||curWeek(),day=P[q.get('d')]?q.get('d'):({1:'Selasa',2:'Selasa',3:'Rabu',4:'Jumat',5:'Jumat',6:'Sabtu',0:'Minggu'})[new Date().getDay()];
function prev(n,w){for(let k=w-1;k>=1;k--){let b=null;
 for(const d of DAYS)P[d].ex.forEach((e,i)=>{if(e.n==n){const s=sets(k,d,i);if(s.length)b=s}});if(b)return b}return null}
function count(){let t=0,n=0;P[day].ex.forEach((e,i)=>{t+=e.s;n+=sets(wk,day,i).length});return[n,t]}
function upd(){const[n,t]=count();$('.pb i').style.width=n/t*100+'%';$('#cnt').textContent=n+' dari '+t+' set tercatat'}
function draw(){const D=P[day],[n,t]=count();
 $('#app').innerHTML=`<h1>${day} · ${D.t}</h1>
<div class="bar2"><button id="pw" aria-label="Minggu sebelumnya">‹</button><b>Minggu ${wk}</b><button id="nw" aria-label="Minggu berikutnya">›</button></div>
<div class="chips">${DAYS.map(d=>`<button class="chip ${d==day?'on':''}" data-d="${d}">${d}</button>`).join('')}</div>
<div class="pb"><i style="width:${n/t*100}%"></i></div><p class="mu" id="cnt">${n} dari ${t} set tercatat</p>`+
 D.ex.map((e,i)=>{const pv=prev(e.n,wk),cur=S.log[K(wk,day,i)]||[];let h='Belum ada data sebelumnya';
  if(pv){const top=Math.max(...pv.map(x=>+x.w)),ok=pv.length>=e.s&&pv.every(x=>+x.r>=e.hi);
   h='Terakhir: '+pv.map(x=>x.w+'×'+x.r).join(', ')+(ok?` · <em>Coba ${top+2.5} kg</em>`:` · tahan ${top} kg, kejar rep`)}
  let r=`<div class="card"><div class="exh"><h3>${e.n}</h3><span class="mu">${e.s} × ${e.lo==e.hi?e.lo:e.lo+'-'+e.hi}${e.u?' '+e.u:''}</span></div><p class="hint">${h}</p>`;
  for(let j=0;j<e.s;j++){const c=cur[j]||{};
   r+=`<div class="set"><span>Set ${j+1}</span><input type="number" inputmode="decimal" step="0.5" placeholder="kg" data-i="${i}" data-j="${j}" data-f="w" value="${c.w??''}" aria-label="Beban set ${j+1}"><input type="number" inputmode="numeric" placeholder="${e.u=='detik'?'detik':'rep'}" data-i="${i}" data-j="${j}" data-f="r" value="${c.r??''}" aria-label="Rep set ${j+1}"></div>`}
  return r+'</div>'}).join('')}
$('#app').addEventListener('click',e=>{const t=e.target;
 if(t.dataset.d){day=t.dataset.d;draw()}else if(t.id=='pw'&&wk>1){wk--;draw()}else if(t.id=='nw'){wk++;draw()}});
$('#app').addEventListener('input',e=>{const t=e.target;if(!t.dataset.f)return;
 const k=K(wk,day,t.dataset.i),a=S.log[k]=S.log[k]||[],j=+t.dataset.j;a[j]=a[j]||{};a[j][t.dataset.f]=t.value;save();upd()});
draw();
