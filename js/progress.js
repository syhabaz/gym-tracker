const A=all(),names=[...new Set(DAYS.flatMap(d=>P[d].ex.map(e=>e.n)))];let cur=0;
function draw(){const n=names[cur],mine=A.filter(x=>x.e.n==n),t={};
 mine.forEach(x=>{const b=t[x.w];if(!b||x.kg>b.kg||(x.kg==b.kg&&x.r>b.r))t[x.w]=x});
 const ws=Object.keys(t).map(Number).sort((a,b)=>a-b),v=ws.map(k=>t[k].kg),d=v.length?v.at(-1)-v[0]:0;
 const orm=mine.reduce((m,x)=>Math.max(m,x.kg*(1+x.r/30)),0);
 $('#app').innerHTML=`<h1>Progres</h1><div class="chips wrap">${names.map((x,i)=>`<button class="chip ${i==cur?'on':''}" data-n="${i}">${x}</button>`).join('')}</div>`+
 (v.length?`<div class="grid s"><div class="card"><p class="mu">Tertinggi</p><h2>${Math.max(...v)} kg</h2></div><div class="card"><p class="mu">Naik sejak awal</p><h2>${d>0?'+':''}${d} kg</h2></div><div class="card"><p class="mu">Est. 1RM</p><h2>${Math.round(orm)} kg</h2></div></div>
 <div class="card"><h3>Beban tertinggi per minggu</h3>${line(v,ws.map(k=>'M'+k))}</div>`:'<div class="card empty">Belum ada data untuk latihan ini. Isi beban di halaman Latihan.</div>')+
 `<div class="acts"><button class="btn" id="exp">Backup data</button><button class="btn" id="imp">Restore data</button><input type="file" id="file" accept=".json" hidden></div>`}
$('#app').addEventListener('click',e=>{const t=e.target;
 if(t.dataset.n){cur=+t.dataset.n;draw()}
 else if(t.id=='exp'){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(S)],{type:'application/json'}));a.download='iron-log-backup.json';a.click()}
 else if(t.id=='imp')$('#file').click()});
$('#app').addEventListener('change',e=>{if(e.target.id!='file'||!e.target.files[0])return;
 e.target.files[0].text().then(x=>{try{const d=JSON.parse(x);if(d.log&&d.start){localStorage.setItem('gym',JSON.stringify(d));location.reload()}else alert('File backup tidak valid')}catch(_){alert('File backup tidak valid')}})});
draw();
