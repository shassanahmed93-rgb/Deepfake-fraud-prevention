import{timingSafeEqual}from'node:crypto';
const key=process.env.SENTINEL_API_KEY;
export function authEnabled(){return process.env.NODE_ENV==='production'}
export function authorize(req){if(!authEnabled())return true;if(!key||key.length<32)return false;const value=req.headers.authorization||'',token=value.startsWith('Bearer ')?value.slice(7):'';const a=Buffer.from(token),b=Buffer.from(key);return a.length===b.length&&timingSafeEqual(a,b)}
export function readiness(){return {auth:authEnabled()?(key&&key.length>=32?'api-key-enabled':'misconfigured'):'development-open',warning:'API key mode is shared-secret access; production identity and tenant authorization still require an identity provider.'}}
