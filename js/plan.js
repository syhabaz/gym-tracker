const sh=['Sen','Sel','Rab','Kam','Jum','Sab','Min'],fu=['Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu'];
$('#app').innerHTML=`<h1>Program</h1><p class="mu">Fokus upper body, kaki maintenance. 5 sesi per minggu.</p>
<div class="strip">${fu.map((d,i)=>`<div class="dy ${P[d]?'t':'r'}"><b>${sh[i]}</b>${P[d]?P[d].t:'Rest'}</div>`).join('')}</div>`+
DAYS.map(d=>`<div class="card"><h2>${d} · ${P[d].t}</h2>${P[d].ex.map(e=>`<div class="ln2"><span>${e.n}</span><span class="mu">${e.s} × ${e.lo==e.hi?e.lo:e.lo+'-'+e.hi}${e.u?' '+e.u:''}</span></div>`).join('')}<a class="btn" href="workout.html?d=${d}">Mulai sesi</a></div>`).join('')+
`<div class="card"><h3>Aturan progresi</h3><p>Semua set tembus batas atas rep: naikkan beban 2,5 kg di sesi berikutnya.</p><p>Set terakhir sisakan 0-2 rep.</p><p>Surplus sekitar 300 kkal, protein 1,6-2 g per kg, tidur 7-8 jam.</p></div>`;
