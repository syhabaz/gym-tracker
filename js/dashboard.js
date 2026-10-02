const w=curWeek(),A=all(),vol=k=>A.filter(x=>x.w==k).reduce((a,x)=>a+x.kg*x.r,0);
const done=DAYS.filter(d=>P[d].ex.some((_,i)=>sets(w,d,i).length));
const next=DAYS.find(d=>!done.includes(d));
const ws=[];for(let k=Math.max(1,w-7);k<=w;k++)ws.push(k);
const G=['Dada','Punggung','Bahu','Lengan','Kaki','Core'];
const plan=g=>DAYS.reduce((a,d)=>a+P[d].ex.filter(e=>e.g==g).reduce((b,e)=>b+e.s,0),0);
const did=g=>A.filter(x=>x.w==w&&x.e.g==g).length;
$('#app').innerHTML=`<div class="card hero"><p class="mu">Minggu ${w}</p>
<h1>${next?`Berikutnya: ${next}, ${P[next].t}`:'Semua sesi minggu ini selesai'}</h1>
<a class="btn" href="workout.html${next?'?d='+next:''}">${next?'Mulai latihan':'Lihat catatan'}</a></div>
<div class="grid"><div class="card"><h3>Sesi minggu ini</h3>${ring(done.length,5)}<p class="mu" style="text-align:center">${done.length?done.join(', '):'Belum ada sesi tercatat'}</p></div>
<div class="card"><h3>Volume per minggu</h3><p class="big">${Math.round(vol(w)).toLocaleString('id-ID')} kg</p>${bars(ws.map(vol),ws.map(k=>'M'+k),ws.length-1)}</div></div>
<div class="card"><h3>Set per otot minggu ini</h3>${G.map(g=>{const a=did(g),b=plan(g);return`<div class="gr"><span>${g}</span><div class="tr"><i style="width:${Math.min(a/b*100,100)}%"></i></div><span class="mu">${a}/${b}</span></div>`}).join('')}</div>`;
