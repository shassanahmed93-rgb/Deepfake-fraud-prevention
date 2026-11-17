import{timingSafeEqual}from'node:crypto';
const enabled=()=>process.env.NODE_ENV==='production';
export function authorize(req){if(!enabled())return true;const secret=process.env.SENTINEL_API_KEY||'';const header=req.headers.authorization||'';const token=header.startsWith('Bearer ')?header.slice(7):'';if(secret.length<32)return false;const a=Buffer.from(token),b=Buffer.from(secret);return a.length===b.length&&timingSafeEqual(a,b)}
export function readiness(){return {auth:enabled()?(process.env.SENTINEL_API_KEY?.length>=32?'api-key-enabled':'misconfigured'):'development-open'}}
