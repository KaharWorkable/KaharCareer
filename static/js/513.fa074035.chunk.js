"use strict";(self.webpackChunkkaharcareer=self.webpackChunkkaharcareer||[]).push([[513],{4513:(t,e,a)=>{a.r(e),a.d(e,{default:()=>o});var r=a(5043),c=a(338),n=a(579);const o=()=>{const[t,e]=(0,r.useState)([]);(0,r.useEffect)((()=>{(async()=>{try{console.log("Fetching experience data...");const t=await(0,c.P_)("experience");console.log("Data fetched:",t),e(t)}catch(t){console.error("Error fetching experience data:",t)}})()}),[]);const a=t=>{const e=t.split(":");return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("span",{className:"font-semibold text-gray-800",children:e[0]}),e[1]?": ".concat(e[1]):""]})};return(0,n.jsxs)("div",{className:"container mx-auto px-4 py-6",children:[(0,n.jsx)("h2",{className:"text-4xl font-bold mb-6 text-center text-gray-800",children:"Work Experience"}),t.length>0?t.map((t=>(0,n.jsxs)("div",{className:"mb-8 bg-white shadow-lg rounded-lg p-6",children:[(0,n.jsx)("h3",{className:"text-2xl font-semibold text-gray-800",children:t.company}),(0,n.jsx)("p",{className:"text-lg italic text-gray-600",children:t.role}),(0,n.jsx)("p",{className:"text-lg text-gray-600",children:t.duration}),(0,n.jsx)("ul",{className:"list-disc ml-6 mt-4 text-gray-700",children:t.details.map(((t,e)=>(0,n.jsx)("li",{className:"text-lg mb-2",children:a(t)},e)))})]},t.id))):(0,n.jsx)("p",{className:"text-lg text-center text-gray-600",children:"Loading..."})]})}},338:(t,e,a)=>{a.d(e,{Nn:()=>l,P_:()=>d,QM:()=>i,lU:()=>s,tI:()=>o});var r=a(915),c=a(5472),n=a(8147);const o=async(t,e)=>{try{const a=(new Date).toISOString();await(0,c.gS)((0,c.rJ)(r.db,t),{...e,created_at:a,updated_at:a})}catch(a){console.error("Error adding document to ".concat(t,":"),a)}},s=async(t,e,a)=>{try{const n=(new Date).toISOString(),o=(0,c.H9)(r.db,t,e);await(0,c.mZ)(o,{...a,updated_at:n})}catch(n){console.error("Error updating document in ".concat(t,":"),n)}},l=async(t,e)=>{try{const a=(0,c.H9)(r.db,t,e);await(0,c.kd)(a)}catch(a){console.error("Error deleting document from ".concat(t,":"),a)}},d=async t=>{try{return(await(0,c.GG)((0,c.rJ)(r.db,t))).docs.map((t=>({id:t.id,...t.data()})))}catch(e){return console.error("Error fetching documents from ".concat(t,":"),e),[]}},i=async(t,e)=>{try{const a=(0,n.KR)(r.IG,"".concat(e,"/").concat(t.name));await(0,n.D)(a,t);const o=await(0,n.qk)(a);return await(0,c.gS)((0,c.rJ)(r.db,e),{url:o,created_at:(new Date).toISOString()}),o}catch(a){throw console.error("Error uploading file:",a),a}}}}]);
//# sourceMappingURL=513.fa074035.chunk.js.map