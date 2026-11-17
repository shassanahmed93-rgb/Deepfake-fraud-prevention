import test from 'node:test';import assert from 'node:assert/strict';import{analyzeText}from'../server/scoring.js';
test('flags combined urgency, secrecy, payment and credentials transparently',()=>{const r=analyzeText('Urgent, keep this secret, send gift cards and give me your passcode');assert.equal(r.level,'high');assert.ok(r.findings.length>=4);assert.equal(r.score,90)});
test('does not claim a clean message is verified safe',()=>{const r=analyzeText('Hello, see you tomorrow');assert.equal(r.level,'lower');assert.match(r.basis,/not a determination/)});
test('caps analyzed input length',()=>{assert.doesNotThrow(()=>analyzeText('x'.repeat(20000)))});
