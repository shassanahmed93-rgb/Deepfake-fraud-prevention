const base=process.env.SENTINEL_URL||'http://127.0.0.1:3000';
async function get(path,options){const r=await fetch(base+path,options),d=await r.json();if(!r.ok)throw Error(path+' '+r.status);return d}
if((await get('/api/health')).status!=='ok')throw Error('health');
const a=await get('/api/analyze',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({content:'Urgent. Keep this secret. Buy gift cards and send a verification code.'})});
if(a.level!=='high'||a.findings.length<3)throw Error('analysis');
if((await get('/api/connectors')).connectors.some(c=>c.status!=='planned'))throw Error('connector state');
console.log('API smoke checks passed; detection quality/security readiness not assessed.');