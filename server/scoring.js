const RULES = [
  { id:'urgency', label:'Urgent pressure', points:20, pattern:/\b(urgent|immediately|right now|within (?:the )?hour|today only|act fast)\b/i },
  { id:'secrecy', label:'Secrecy requested', points:20, pattern:/\b(keep (?:this|it) (?:a )?secret|don't tell|do not tell|confidential|between us)\b/i },
  { id:'payment', label:'Payment or gift card request', points:25, pattern:/\b(wire transfer|gift cards?|crypto(?:currency)?|send money|payment|bank transfer)\b/i },
  { id:'credentials', label:'Credentials or access requested', points:25, pattern:/\b(password|passcode|verification code|one[- ]time code|login|credentials|approve (?:the )?(?:sign.?in|login|push))\b/i },
  { id:'authority', label:'Authority or executive impersonation cue', points:12, pattern:/\b(ceo|chief executive|director|your boss|the president|it department|security team|police|tax office)\b/i },
  { id:'channel_shift', label:'Asked to move to another channel', points:12, pattern:/\b(text me|message me|move (?:this|to) (?:to )?(?:whatsapp|telegram|signal)|use my personal|new number)\b/i },
  { id:'link', label:'Link or attachment included', points:8, pattern:/(?:https?:\/\/|www\.|\battachment\b|\bopen the file\b)/i },
  { id:'identity', label:'Identity or voice cannot be verified from text', points:5, pattern:/\b(calling from a new number|new phone|borrowed phone|voice message)\b/i }
];
export function analyzeText(input) {
  const text=String(input??'').slice(0,12000);
  const findings=RULES.filter(rule=>rule.pattern.test(text)).map(({id,label,points})=>({id,label,points}));
  const score=Math.min(100,findings.reduce((sum,item)=>sum+item.points,0));
  return {score,level:score>=60?'high':score>=30?'elevated':'lower',findings,basis:'Transparent keyword and pattern rules; triage only, not a determination of fraud.',recommendedSteps:['Pause payment, credential changes, and requests for sensitive information.','Contact the person through a number or channel already on file, not details in the message.','For money or account access, require a second approver through your normal process.','Preserve the original message in your approved incident process if needed.']};
}
