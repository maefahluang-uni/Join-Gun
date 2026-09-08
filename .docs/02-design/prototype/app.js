/* Static prototype: sample records and session-only state, no network or storage. */
const activities = [
  {id:'badminton', title:'ตีแบดหลังเลิกเรียน', category:'sport', day:'2026-09-09', time:'17:00', place:'สนามแบดมินตัน', meeting:'พบกันที่ม้านั่งหน้าทางเข้าสนาม', host:'ต้น', joined:4, capacity:8, description:'ชวนขยับตัวหลังเลิกเรียน เล่นคู่สลับกันได้ มือใหม่ก็มาได้ เตรียมรองเท้ากีฬา น้ำดื่ม และไม้แบดของตัวเอง'},
  {id:'study', title:'อ่านหนังสือด้วยกันก่อนสอบ', category:'study', day:'2026-09-09', time:'18:00', place:'ห้องสมุดกลาง', meeting:'พบกันบริเวณโต๊ะอ่านหนังสือกลุ่ม ชั้น 1', host:'แพร', joined:3, capacity:6, description:'มาอ่านหนังสือที่ตั้งใจไว้ด้วยกัน แบ่งช่วงอ่านเงียบและพักคุย เตรียมหนังสือหรือโน้ตที่ต้องการอ่านมาได้เลย'},
  {id:'cafe', title:'พักจากงาน ไปคาเฟ่กัน', category:'cafe', day:'2026-09-10', time:'15:30', place:'คาเฟ่ใกล้มหาวิทยาลัย', meeting:'พบกันที่หน้าประตูทางเข้าร้าน', host:'เมย์', joined:2, capacity:5, description:'ชวนพักระหว่างวัน ทำความรู้จักเพื่อนใหม่ และคุยเรื่องที่สนใจ แต่ละคนเลือกเครื่องดื่มและชำระค่าใช้จ่ายของตัวเอง'},
  {id:'run', title:'วิ่งเบา ๆ รอบสนาม', category:'sport', day:'2026-09-11', time:'17:30', place:'สนามกีฬามหาวิทยาลัย', meeting:'พบกันบริเวณทางเข้าลู่วิ่ง', host:'นนท์', joined:5, capacity:10, description:'เดินวอร์มก่อนแล้วค่อยวิ่งตามจังหวะของตัวเอง ไม่เน้นความเร็ว เตรียมน้ำดื่มและรองเท้าที่ใส่สบาย'}
];
const categories = {all:'ทุกหมวด',sport:'กีฬา',study:'อ่านหนังสือ',cafe:'คาเฟ่'};
const state = {query:'',category:'all',day:'',joined:new Set(),consent:false,busy:false};
const $ = id => document.getElementById(id);
const main = $('main');
let selected = null;
let dialogOpener = null;
const dateLabel = a => `${Number(a.day.slice(-2))} ก.ย. 2569 · ${a.time} น.`;
const count = a => a.joined + Number(state.joined.has(a.id));
const announce = text => { $('announcement').textContent = text; };
const summary = a => `<strong>${a.title}</strong><p>${dateLabel(a)}</p><p>${a.place}</p>`;

function getFilteredActivities() {
  const query = state.query.trim().toLocaleLowerCase('th');
  return activities.filter(a => (state.category === 'all' || a.category === state.category) && (!state.day || a.day === state.day) && `${a.title} ${a.place} ${categories[a.category]}`.toLocaleLowerCase('th').includes(query));
}
function card(a,index) {
  return `<article class="card"><div class="card-top"><h2>${a.title}</h2><span class="activity-number">${String(index+1).padStart(2,'0')}</span></div><span class="badge">${categories[a.category]}</span><p class="meta"><span class="symbol" aria-hidden="true">◷</span>${dateLabel(a)}</p><p class="meta"><span class="symbol" aria-hidden="true">⌖</span>${a.place}</p><div class="card-count"><span>${count(a)}/${a.capacity} คน</span>${state.joined.has(a.id)?'<span class="badge joined">✓ เข้าร่วมแล้ว</span>':`<span class="muted caption">ว่าง ${a.capacity-count(a)} ที่</span>`}</div><div class="seats" aria-hidden="true"><span style="width:${count(a)/a.capacity*100}%"></span></div><a class="button secondary" href="#activity/${a.id}" aria-label="ดูรายละเอียด ${a.title}">ดูรายละเอียด</a></article>`;
}
function renderResults() {
  const items = getFilteredActivities();
  $('result-count').textContent = `${items.length} กิจกรรม · ${categories[state.category]}`;
  $('active-date').textContent = state.day ? `วันที่ ${state.day.split('-').reverse().join('/')}` : 'เลือกกิจกรรมที่ตรงกับเวลาของคุณ';
  $('results').innerHTML = items.length ? items.map(card).join('') : '<div class="card"><h2>ยังไม่พบกิจกรรมที่ตรงกัน</h2><p class="muted">ลองเปลี่ยนคำค้น หมวด หรือวันที่</p><button class="button secondary" data-action="clear">ล้างตัวกรอง</button></div>';
}
function renderFeed() {
  main.innerHTML = `<section><div class="heading"><h1 tabindex="-1">กิจกรรม</h1><p class="muted">หาเพื่อนทำสิ่งที่ชอบไปด้วยกัน</p></div><div class="search"><label for="search">ค้นหากิจกรรม</label><input id="search" type="search" placeholder="ชื่อกิจกรรมหรือสถานที่" autocomplete="off"><button class="button secondary" data-action="filters">ตัวกรอง</button></div><p id="active-date" class="caption muted"></p><div class="result-bar"><span id="result-count" class="caption" role="status"></span><button class="text-button" data-action="clear">ล้างตัวกรอง</button></div><div id="results" class="stack"></div></section>`;
  $('search').value = state.query;
  $('search').addEventListener('input',event => { state.query=event.target.value; renderResults(); });
  renderResults();
}
function renderDetail(a) {
  const joined = state.joined.has(a.id);
  main.innerHTML = `<a class="text-button back" href="#feed">← กลับหน้ากิจกรรม</a><div class="heading"><p class="caption muted">รายละเอียดกิจกรรม</p><h1 tabindex="-1">${a.title}</h1></div><div class="stack"><span class="badge">${categories[a.category]}</span><p>${a.description}</p></div><section class="section stack"><div class="host"><span class="avatar" aria-hidden="true">${a.host.slice(0,1)}</span><div class="stack"><p>จัดโดย ${a.host} <span class="muted caption">· ผู้จัดตัวอย่าง</span></p><span class="badge">✓ ยืนยันอีเมลมหาวิทยาลัยแล้ว</span></div></div><p class="notice">นัดพบในพื้นที่สาธารณะ และตรวจสอบรายละเอียดก่อนเข้าร่วม</p></section><section class="section card"><h2>รายละเอียดนัดหมาย</h2><p class="meta"><span class="symbol" aria-hidden="true">◷</span>${dateLabel(a)}</p><p class="meta"><span class="symbol" aria-hidden="true">⌖</span>${a.place}</p><p>${count(a)}/${a.capacity} คน · ว่าง ${a.capacity-count(a)} ที่</p></section><section class="section stack"><h2>จุดนัดหมาย</h2><div class="map" role="img" aria-label="แผนที่จำลอง จุดนัดหมาย ${a.place} ไม่ใช่แผนที่นำทางจริง"><span class="map-pin" aria-hidden="true">⌖</span><span class="map-label">${a.place}</span><span class="caption muted">แผนที่จำลอง · ไม่ใช่พิกัดจริง</span></div><p>${a.meeting}</p></section><div class="action-bar">${joined?'<p class="success-text">✓ เข้าร่วมแล้ว</p><a class="button secondary" href="#feed">ดูกิจกรรมอื่น</a>':`<p class="caption muted">ยังว่าง ${a.capacity-count(a)} ที่ · พร้อมมาเจอกันไหม?</p><button id="join-button" class="button primary" data-action="join">เข้าร่วมกิจกรรม</button>`}</div>`;
}
function renderSuccess(a) {
  main.innerHTML = `<section class="success-panel"><span class="success-mark" aria-hidden="true">✓</span><h1 tabindex="-1">เข้าร่วมสำเร็จ</h1><p>คุณมีนัดทำกิจกรรมด้วยกันแล้ว</p></section><div class="card"><h2>${a.title}</h2><p>${dateLabel(a)}</p><p>${a.place}</p><p class="muted">${a.meeting}</p><span class="badge joined">✓ เข้าร่วมแล้ว · ${count(a)}/${a.capacity} คน</span></div><div class="section stack"><a class="button primary" href="#activity/${a.id}">ดูรายละเอียดกิจกรรม</a><a class="button secondary" href="#feed">กลับหน้ากิจกรรม</a></div>`;
  announce(`เข้าร่วมสำเร็จ ${a.title}`);
}
function route() {
  const [page,id] = location.hash.slice(1).split('/');
  const activity = activities.find(a=>a.id===id);
  selected=activity || null;
  if (page==='activity' && activity) renderDetail(activity);
  else if (page==='success' && activity && state.joined.has(id)) renderSuccess(activity);
  else renderFeed();
  document.title=`JoinGun · ${main.querySelector('h1').textContent}`;
  main.querySelector('h1').focus({preventScroll:true});
  window.scrollTo(0,0);
}
function openDialog(id) { dialogOpener=document.activeElement; $(id).showModal(); }
function updateConsent() {
  $('consent-new').hidden=state.consent;
  $('consent-existing').hidden=!state.consent;
  $('confirm-join').disabled=state.busy || !(state.consent || $('consent').checked);
  $('consent-hint').textContent=state.consent || $('consent').checked ? 'ยืนยันเพื่อเข้าร่วมกิจกรรมนี้' : 'เลือกความยินยอมก่อนยืนยันเข้าร่วม';
}
function clearFilters() {
  state.query=''; state.category='all'; state.day='';
  renderFeed(); $('search').focus(); announce('ล้างตัวกรองแล้ว');
}
main.addEventListener('click',event=>{
  const action=event.target.closest('[data-action]')?.dataset.action;
  if(action==='clear') clearFilters();
  if(action==='filters') { $('category').value=state.category; $('date').value=state.day; openDialog('filters'); }
  if(action==='join' && selected && !state.joined.has(selected.id)) {
    $('confirm-summary').innerHTML=summary(selected);
    $('consent').checked=false; updateConsent(); openDialog('confirmation');
  }
});
document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>{ if(!state.busy) $(button.dataset.close).close(); }));
document.querySelectorAll('dialog').forEach(dialog=>{
  dialog.addEventListener('cancel',event=>{ if(state.busy) event.preventDefault(); });
  dialog.addEventListener('close',()=>{ if(dialogOpener?.isConnected) dialogOpener.focus(); });
});
$('filter-form').addEventListener('submit',event=>{
  event.preventDefault(); state.category=$('category').value; state.day=$('date').value;
  $('filters').close(); renderResults(); announce(`พบ ${getFilteredActivities().length} กิจกรรม`);
});
$('reset-filters').addEventListener('click',()=>{ $('filters').close(); clearFilters(); });
$('consent').addEventListener('change',updateConsent);
$('change-consent').addEventListener('click',()=>{ state.consent=false; $('consent').checked=false; updateConsent(); $('consent').focus(); });
$('join-form').addEventListener('submit',event=>{
  event.preventDefault();
  if(state.busy || !selected || state.joined.has(selected.id) || !(state.consent || $('consent').checked) || count(selected)>=selected.capacity) return;
  const id=selected.id;
  state.busy=true; updateConsent(); $('confirm-join').textContent='กำลังเข้าร่วม…';
  $('consent').disabled=true; $('change-consent').disabled=true;
  document.querySelectorAll('[data-close="confirmation"]').forEach(button=>{ button.disabled=true; });
  $('join-form').setAttribute('aria-busy','true');
  // Simulated response, not a real reservation or consent audit record.
  setTimeout(()=>{
    state.joined.add(id); state.consent=true; state.busy=false;
    $('consent').disabled=false; $('change-consent').disabled=false;
    document.querySelectorAll('[data-close="confirmation"]').forEach(button=>{ button.disabled=false; });
    $('join-form').removeAttribute('aria-busy'); $('confirm-join').textContent='ยืนยันเข้าร่วม';
    $('confirmation').close(); location.hash=`success/${id}`;
  },350);
});
window.addEventListener('hashchange',()=>{ document.querySelectorAll('dialog[open]').forEach(d=>d.close()); route(); });
route();
