if(!self.define){let e,i={};const r=(r,s)=>(r=new URL(r+".js",s).href,i[r]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=i,document.head.appendChild(e)}else e=r,importScripts(r),i()})).then((()=>{let e=i[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(s,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let o={};const d=e=>r(e,t),l={module:{uri:t},exports:o,require:d};i[t]=Promise.all(s.map((e=>l[e]||d(e)))).then((e=>(n(...e),o)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-p89Bg17Q.js",revision:null},{url:"assets/index-TW2_evNR.css",revision:null},{url:"index.html",revision:"ab595d1977842a69ed7a4212280d6dfb"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"hogwartz-192x192.png",revision:"78ebc16658ab2ec5b5bdc2fb5926772e"},{url:"hogwartz-512x512.png",revision:"405502b6e5a8609b81c8bd6013fd8f86"},{url:"hogwartz-512x512.webp",revision:"d16a5ff34a8d707c53ae0bd31822ca0e"},{url:"manifest.webmanifest",revision:"79758cfe9125db508ab8d870c42954da"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
