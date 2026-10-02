const E=(n,s,lo,hi,g,u)=>({n,s,lo,hi,g,u});
const P={
Selasa:{t:'Push',ex:[E('Bench press',4,8,10,'Dada'),E('Seated shoulder press',3,8,10,'Bahu'),E('Incline dumbbell press',3,10,12,'Dada'),E('Lateral raise',4,12,15,'Bahu'),E('Triceps pushdown',3,10,12,'Lengan')]},
Rabu:{t:'Pull',ex:[E('Chest supported row',4,8,10,'Punggung'),E('Lat pulldown / pull up',3,8,10,'Punggung'),E('Seated cable row',3,10,12,'Punggung'),E('Face pull',3,12,15,'Bahu'),E('Barbell/dumbbell curl',3,10,12,'Lengan')]},
Jumat:{t:'Upper 1',ex:[E('Seated shoulder press',3,8,10,'Bahu'),E('Single-arm lat pulldown',3,10,12,'Punggung','per sisi'),E('Incline dumbbell press',3,10,10,'Dada'),E('Single-arm cable row',3,10,12,'Punggung','per sisi'),E('Curl + triceps extension',3,12,12,'Lengan')]},
Sabtu:{t:'Lower',ex:[E('Squat',3,8,10,'Kaki'),E('Romanian deadlift',3,10,10,'Kaki'),E('Leg curl',2,12,12,'Kaki'),E('Calf raise',3,12,15,'Kaki'),E('Plank / ab wheel',3,30,45,'Core','detik')]},
Minggu:{t:'Upper 2',ex:[E('Incline barbell press',3,8,10,'Dada'),E('T-bar row / chest supported row',3,10,10,'Punggung'),E('Lat pulldown',3,10,12,'Punggung'),E('Lateral raise + curl',3,12,15,'Bahu'),E('Triceps pushdown',3,12,12,'Lengan')]}
};
const DAYS=Object.keys(P),$=s=>document.querySelector(s);
let S=(()=>{try{const d=JSON.parse(localStorage.getItem('gym'));if(d&&d.log)return d}catch(e){}
const d=new Date();d.setDate(d.getDate()-(d.getDay()+6)%7);return{start:d.toISOString().slice(0,10),log:{}}})();
const save=()=>{try{localStorage.setItem('gym',JSON.stringify(S))}catch(e){}};
const curWeek=()=>Math.max(1,Math.floor((Date.now()-new Date(S.start))/6048e5)+1);
const K=(w,d,i)=>w+'|'+d+'|'+i;
const sets=(w,d,i)=>(S.log[K(w,d,i)]||[]).filter(x=>x&&+x.w>0&&+x.r>0);
function all(){const o=[];for(const k in S.log){const[w,d,i]=k.split('|'),e=P[d]&&P[d].ex[i];
 if(e)sets(w,d,i).forEach(x=>o.push({w:+w,d,e,kg:+x.w,r:+x.r}))}return o}

const PG=[['index','Beranda'],['workout','Latihan'],['progress','Progres'],['plan','Program']];
document.body.insertAdjacentHTML('afterbegin',`<nav class="nav"><b class="brand">Iron Log</b>${PG.map(([h,l])=>`<a href="${h}.html" class="${document.body.dataset.p==h?'on':''}">${l}</a>`).join('')}</nav>`);

// Diagram: bar chart, line chart, ring
function bars(v,l,hi){const n=v.length,st=300/n,m=Math.max(...v,1);
 return`<svg viewBox="0 0 300 140" class="chart">`+v.map((x,i)=>{const h=Math.max(x/m*95,2);
 return`<rect x="${i*st+6}" y="${112-h}" width="${st-12}" height="${h}" rx="5" class="b${i==hi?' hi':''}"/><text x="${i*st+st/2}" y="130" text-anchor="middle">${l[i]}</text>`}).join('')+'</svg>'}
function line(p,l){const n=p.length,mx=Math.max(...p),mn=Math.min(...p),r=mx-mn||1,X=i=>n==1?150:25+i*250/(n-1),Y=v=>mn==mx?65:105-(v-mn)/r*70;
 return`<svg viewBox="0 0 300 140" class="chart"><path class="ln" d="M${p.map((v,i)=>X(i)+','+Y(v)).join('L')}"/>`+
 p.map((v,i)=>`<circle class="dot" cx="${X(i)}" cy="${Y(v)}" r="4.5"/><text x="${X(i)}" y="${Y(v)-11}" text-anchor="middle">${v}</text><text x="${X(i)}" y="132" text-anchor="middle">${l[i]}</text>`).join('')+'</svg>'}
const ring=(a,b)=>`<svg viewBox="0 0 120 120" class="ring"><circle class="trk" cx="60" cy="60" r="50"/><circle class="arc" cx="60" cy="60" r="50" stroke-dasharray="${a/b*314} 314" transform="rotate(-90 60 60)"/><text x="60" y="69" text-anchor="middle">${a}/${b}</text></svg>`;
