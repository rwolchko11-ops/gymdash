(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=(e,t)=>t.some(t=>e instanceof t),t,n;function r(){return t||=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]}function i(){return n||=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey]}var a=new WeakMap,o=new WeakMap,s=new WeakMap;function c(e){let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener(`success`,i),e.removeEventListener(`error`,a)},i=()=>{t(m(e.result)),r()},a=()=>{n(e.error),r()};e.addEventListener(`success`,i),e.addEventListener(`error`,a)});return s.set(t,e),t}function l(e){if(a.has(e))return;let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener(`complete`,i),e.removeEventListener(`error`,a),e.removeEventListener(`abort`,a)},i=()=>{t(),r()},a=()=>{n(e.error||new DOMException(`AbortError`,`AbortError`)),r()};e.addEventListener(`complete`,i),e.addEventListener(`error`,a),e.addEventListener(`abort`,a)});a.set(e,t)}var u={get(e,t,n){if(e instanceof IDBTransaction){if(t===`done`)return a.get(e);if(t===`store`)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return m(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t===`done`||t===`store`)?!0:t in e}};function d(e){u=e(u)}function f(e){return i().includes(e)?function(...t){return e.apply(h(this),t),m(this.request)}:function(...t){return m(e.apply(h(this),t))}}function p(t){return typeof t==`function`?f(t):(t instanceof IDBTransaction&&l(t),e(t,r())?new Proxy(t,u):t)}function m(e){if(e instanceof IDBRequest)return c(e);if(o.has(e))return o.get(e);let t=p(e);return t!==e&&(o.set(e,t),s.set(t,e)),t}var h=e=>s.get(e);function g(e,t,{blocked:n,upgrade:r,blocking:i,terminated:a}={}){let o=indexedDB.open(e,t),s=m(o);return r&&o.addEventListener(`upgradeneeded`,e=>{r(m(o.result),e.oldVersion,e.newVersion,m(o.transaction),e)}),n&&o.addEventListener(`blocked`,e=>n(e.oldVersion,e.newVersion,e)),s.then(e=>{a&&e.addEventListener(`close`,()=>a()),i&&e.addEventListener(`versionchange`,e=>i(e.oldVersion,e.newVersion,e))}).catch(()=>{}),s}var _=[`get`,`getKey`,`getAll`,`getAllKeys`,`count`],v=[`put`,`add`,`delete`,`clear`],y=new Map;function b(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t==`string`))return;if(y.get(t))return y.get(t);let n=t.replace(/FromIndex$/,``),r=t!==n,i=v.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||_.includes(n)))return;let a=async function(e,...t){let a=this.transaction(e,i?`readwrite`:`readonly`),o=a.store;return r&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),i&&a.done]))[0]};return y.set(t,a),a}d(e=>({...e,get:(t,n,r)=>b(t,n)||e.get(t,n,r),has:(t,n)=>!!b(t,n)||e.has(t,n)}));var ee=[`continue`,`continuePrimaryKey`,`advance`],te={},ne=new WeakMap,re=new WeakMap,ie={get(e,t){if(!ee.includes(t))return e[t];let n=te[t];return n||=te[t]=function(...e){ne.set(this,re.get(this)[t](...e))},n}};async function*ae(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;t=t;let n=new Proxy(t,ie);for(re.set(n,t),s.set(n,h(t));t;)yield n,t=await(ne.get(n)||t.continue()),ne.delete(n)}function oe(t,n){return n===Symbol.asyncIterator&&e(t,[IDBIndex,IDBObjectStore,IDBCursor])||n===`iterate`&&e(t,[IDBIndex,IDBObjectStore])}d(e=>({...e,get(t,n,r){return oe(t,n)?ae:e.get(t,n,r)},has(t,n){return oe(t,n)||e.has(t,n)}}));var se=`gymdash`,ce=1,le;async function ue(){return le||=await g(se,ce,{upgrade(e){e.createObjectStore(`kv`)}}),le}async function x(e){return(await ue()).get(`kv`,e)}async function S(e,t){return(await ue()).put(`kv`,t,e)}async function de(e){return(await ue()).delete(`kv`,e)}var C;(function(e){e.Unimplemented=`UNIMPLEMENTED`,e.Unavailable=`UNAVAILABLE`})(C||={});var w=class extends Error{constructor(e,t,n){super(e),this.message=e,this.code=t,this.data=n}},fe=e=>e?.androidBridge?`android`:e?.webkit?.messageHandlers?.bridge?`ios`:`web`,pe=e=>{let t=e.CapacitorCustomPlatform||null,n=e.Capacitor||{},r=n.Plugins=n.Plugins||{},i=()=>t===null?fe(e):t.name,a=()=>i()!==`web`,o=e=>!!(l.get(e)?.platforms.has(i())||s(e)),s=e=>n.PluginHeaders?.find(t=>t.name===e),c=t=>e.console.error(t),l=new Map;return n.convertFileSrc||=e=>e,n.getPlatform=i,n.handleError=c,n.isNativePlatform=a,n.isPluginAvailable=o,n.registerPlugin=(e,a={})=>{let o=l.get(e);if(o)return console.warn(`Capacitor plugin "${e}" already registered. Cannot register plugins twice.`),o.proxy;let c=i(),u=s(e),d,f=async()=>(!d&&c in a?d=d=typeof a[c]==`function`?await a[c]():a[c]:t!==null&&!d&&`web`in a&&(d=d=typeof a.web==`function`?await a.web():a.web),d),p=(t,r)=>{if(u){let i=u?.methods.find(e=>r===e.name);if(i)return i.rtype===`promise`?t=>n.nativePromise(e,r.toString(),t):(t,i)=>n.nativeCallback(e,r.toString(),t,i);if(t)return t[r]?.bind(t)}else if(t)return t[r]?.bind(t);else throw new w(`"${e}" plugin is not implemented on ${c}`,C.Unimplemented)},m=t=>{let n,r=(...r)=>{let i=f().then(i=>{let a=p(i,t);if(a){let e=a(...r);return n=e?.remove,e}else throw new w(`"${e}.${t}()" is not implemented on ${c}`,C.Unimplemented)});return t===`addListener`&&(i.remove=async()=>n()),i};return r.toString=()=>`${t.toString()}() { [capacitor code] }`,Object.defineProperty(r,`name`,{value:t,writable:!1,configurable:!1}),r},h=m(`addListener`),g=m(`removeListener`),_=(e,t)=>{let n=h({eventName:e},t),r=async()=>{g({eventName:e,callbackId:await n},t)},i=new Promise(e=>n.then(()=>e({remove:r})));return i.remove=async()=>{console.warn(`Using addListener() without 'await' is deprecated.`),await r()},i},v=new Proxy({},{get(e,t){switch(t){case`$$typeof`:return;case`toJSON`:return()=>({});case`addListener`:return u?_:h;case`removeListener`:return g;default:return m(t)}}});return r[e]=v,l.set(e,{name:e,proxy:v,platforms:new Set([...Object.keys(a),...u?[c]:[]])}),v},n.Exception=w,n.DEBUG=!!n.DEBUG,n.isLoggingEnabled=!!n.isLoggingEnabled,n},me=(e=>e.Capacitor=pe(e))(typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{}),T=me.registerPlugin,E=class{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let n=!1;this.listeners[e]||(this.listeners[e]=[],n=!0),this.listeners[e].push(t);let r=this.windowListeners[e];return r&&!r.registered&&this.addWindowListener(r),n&&this.sendRetainedArgumentsForEvent(e),Promise.resolve({remove:async()=>this.removeListener(e,t)})}async removeAllListeners(){this.listeners={};for(let e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,n){let r=this.listeners[e];if(!r){if(n){let n=this.retainedEventArguments[e];n||=[],n.push(t),this.retainedEventArguments[e]=n}return}r.forEach(e=>e(t))}hasListeners(e){return!!this.listeners[e]?.length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:e=>{this.notifyListeners(t,e)}}}unimplemented(e=`not implemented`){return new me.Exception(e,C.Unimplemented)}unavailable(e=`not available`){return new me.Exception(e,C.Unavailable)}async removeListener(e,t){let n=this.listeners[e];if(!n)return;let r=n.indexOf(t);this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){let t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(t=>{this.notifyListeners(e,t)}))}},he=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),ge=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),_e=class extends E{async getCookies(){let e=document.cookie,t={};return e.split(`;`).forEach(e=>{if(e.length<=0)return;let[n,r]=e.replace(/=/,`CAP_COOKIE`).split(`CAP_COOKIE`);n=ge(n).trim(),r=ge(r).trim(),t[n]=r}),t}async setCookie(e){try{let t=he(e.key),n=he(e.value),r=e.expires?`; expires=${e.expires.replace(`expires=`,``)}`:``,i=(e.path||`/`).replace(`path=`,``),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:``;document.cookie=`${t}=${n||``}${r}; path=${i}; ${a};`}catch(e){return Promise.reject(e)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(e){return Promise.reject(e)}}async clearCookies(){try{let e=document.cookie.split(`;`)||[];for(let t of e)document.cookie=t.replace(/^ +/,``).replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}};T(`CapacitorCookies`,{web:()=>new _e});var ve=async e=>new Promise((t,n)=>{let r=new FileReader;r.onload=()=>{let e=r.result;t(e.indexOf(`,`)>=0?e.split(`,`)[1]:e)},r.onerror=e=>n(e),r.readAsDataURL(e)}),ye=(e={})=>{let t=Object.keys(e);return Object.keys(e).map(e=>e.toLocaleLowerCase()).reduce((n,r,i)=>(n[r]=e[t[i]],n),{})},be=(e,t=!0)=>e?Object.entries(e).reduce((e,n)=>{let[r,i]=n,a,o;return Array.isArray(i)?(o=``,i.forEach(e=>{a=t?encodeURIComponent(e):e,o+=`${r}=${a}&`}),o.slice(0,-1)):(a=t?encodeURIComponent(i):i,o=`${r}=${a}`),`${e}&${o}`},``).substr(1):null,xe=(e,t={})=>{let n=Object.assign({method:e.method||`GET`,headers:e.headers},t),r=ye(e.headers)[`content-type`]||``;if(typeof e.data==`string`)n.body=e.data;else if(r.includes(`application/x-www-form-urlencoded`)){let t=new URLSearchParams;for(let[n,r]of Object.entries(e.data||{}))t.set(n,r);n.body=t.toString()}else if(r.includes(`multipart/form-data`)||e.data instanceof FormData){let t=new FormData;if(e.data instanceof FormData)e.data.forEach((e,n)=>{t.append(n,e)});else for(let n of Object.keys(e.data))t.append(n,e.data[n]);n.body=t;let r=new Headers(n.headers);r.delete(`content-type`),n.headers=r}else (r.includes(`application/json`)||typeof e.data==`object`)&&(n.body=JSON.stringify(e.data));return n},Se=class extends E{async request(e){let t=xe(e,e.webFetchExtra),n=be(e.params,e.shouldEncodeUrlParams),r=n?`${e.url}?${n}`:e.url,i=await fetch(r,t),a=i.headers.get(`content-type`)||``,{responseType:o=`text`}=i.ok?e:{};a.includes(`application/json`)&&(o=`json`);let s,c;switch(o){case`arraybuffer`:case`blob`:c=await i.blob(),s=await ve(c);break;case`json`:s=await i.json();break;default:s=await i.text()}let l={};return i.headers.forEach((e,t)=>{l[t]=e}),{data:s,headers:l,status:i.status,url:i.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:`GET`}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:`POST`}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:`PUT`}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:`PATCH`}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:`DELETE`}))}};T(`CapacitorHttp`,{web:()=>new Se});var Ce;(function(e){e.Dark=`DARK`,e.Light=`LIGHT`,e.Default=`DEFAULT`})(Ce||={});var we;(function(e){e.StatusBar=`StatusBar`,e.NavigationBar=`NavigationBar`})(we||={});var Te=class extends E{async setStyle(){this.unavailable(`not available for web`)}async setAnimation(){this.unavailable(`not available for web`)}async show(){this.unavailable(`not available for web`)}async hide(){this.unavailable(`not available for web`)}};T(`SystemBars`,{web:()=>new Te});var Ee=`modulepreload`,De=function(e){return`/gymdash/`+e},Oe={},ke=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=De(t,n),t in Oe)return;Oe[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:Ee,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Ae=T(`Share`,{web:()=>ke(()=>import(`./chunk-web.js`).then(e=>new e.ShareWeb),[])}),je=`v1.19`,D={noir:{name:`Noir`,dark:!0,primary:`#DC2626`,primaryDim:`rgba(220,38,38,0.15)`,accent:`#F59E0B`,bg:`#0A0A0A`,surface:`#171717`,surface2:`#222222`,text:`#FAFAFA`,textMuted:`#A3A3A3`,border:`#2A2A2A`},ocean:{name:`Ocean`,dark:!0,primary:`#0EA5E9`,primaryDim:`rgba(14,165,233,0.15)`,accent:`#14B8A6`,bg:`#040F1A`,surface:`#0C1E2E`,surface2:`#132840`,text:`#F0F9FF`,textMuted:`#7BBFD4`,border:`#1E3448`},forest:{name:`Forest`,dark:!0,primary:`#22C55E`,primaryDim:`rgba(34,197,94,0.15)`,accent:`#84CC16`,bg:`#030F07`,surface:`#0A1F0E`,surface2:`#112914`,text:`#F0FFF4`,textMuted:`#6BBF85`,border:`#1A3D22`},sunset:{name:`Sunset`,dark:!0,primary:`#F97316`,primaryDim:`rgba(249,115,22,0.15)`,accent:`#EC4899`,bg:`#0F0805`,surface:`#1E120A`,surface2:`#2A1A10`,text:`#FFF7ED`,textMuted:`#C4916A`,border:`#3D2415`},midnight:{name:`Midnight`,dark:!0,primary:`#8B5CF6`,primaryDim:`rgba(139,92,246,0.15)`,accent:`#6366F1`,bg:`#05030F`,surface:`#0E0A1E`,surface2:`#160E2A`,text:`#FAF5FF`,textMuted:`#A08DC4`,border:`#231848`},steel:{name:`Steel`,dark:!0,primary:`#3B82F6`,primaryDim:`rgba(59,130,246,0.15)`,accent:`#94A3B8`,bg:`#050810`,surface:`#0D1120`,surface2:`#141A2E`,text:`#F8FAFC`,textMuted:`#7C93B0`,border:`#1E2A42`},clean:{name:`Clean`,dark:!1,primary:`#DC2626`,primaryDim:`rgba(220,38,38,0.12)`,accent:`#D97706`,bg:`#F5F5F5`,surface:`#FFFFFF`,surface2:`#F0F0F0`,text:`#111111`,textMuted:`#737373`,border:`#E5E5E5`},sky:{name:`Sky`,dark:!1,primary:`#0284C7`,primaryDim:`rgba(2,132,199,0.12)`,accent:`#0D9488`,bg:`#F0F9FF`,surface:`#FFFFFF`,surface2:`#E0F2FE`,text:`#0C1A26`,textMuted:`#5A8FAA`,border:`#BAE6FD`}};function Me(e){let t=D[e]||D.noir,n=document.documentElement.style;n.setProperty(`--bg`,t.bg),n.setProperty(`--surface`,t.surface),n.setProperty(`--surface2`,t.surface2),n.setProperty(`--primary`,t.primary),n.setProperty(`--primary-dim`,t.primaryDim),n.setProperty(`--accent`,t.accent),n.setProperty(`--text`,t.text),n.setProperty(`--text-muted`,t.textMuted),n.setProperty(`--border`,t.border),document.querySelector(`meta[name="theme-color"]`)?.setAttribute(`content`,t.primary),localStorage.setItem(`gymdash_theme`,e)}function Ne(){Me(localStorage.getItem(`gymdash_theme`)||`noir`)}function Pe(e){Me(e),document.querySelectorAll(`.theme-swatch`).forEach(t=>{t.classList.toggle(`active`,t.getAttribute(`onclick`)===`setTheme('${e}')`)}),z(`Theme: ${D[e]?.name||e}`)}var O=null;async function k(e,t){document.querySelectorAll(`.page`).forEach(e=>e.classList.remove(`active`)),document.querySelectorAll(`.nav-tab`).forEach(e=>e.classList.remove(`active`)),document.getElementById(`topbarGear`).classList.remove(`active`),document.getElementById(`page-`+e).classList.add(`active`),t.classList.add(`active`),e===`history`&&await H(),e===`progress`&&await gt(),e===`trophies`&&await xt(),e===`goals`&&await Et(),e===`nutrition`&&await Q()}function Fe(){let e=document.getElementById(`topbarGear`);if(e.classList.contains(`active`)){O?k(O.name,O.el):k(`log`,document.querySelector(`.nav-tab`));return}let t=document.querySelector(`.nav-tab.active`),n=document.querySelector(`.page.active`);O=t&&n?{name:n.id.replace(`page-`,``),el:t}:null,document.querySelectorAll(`.page`).forEach(e=>e.classList.remove(`active`)),document.querySelectorAll(`.nav-tab`).forEach(e=>e.classList.remove(`active`)),document.getElementById(`page-settings`).classList.add(`active`),e.classList.add(`active`),q()}var A={Push:[`Bench Press`,`Incline Bench Press`,`Chest Fly`,`Shoulder Press`,`Lateral Raises`,`Tricep Extensions`,`Dips`],Pull:[`Deadlift`,`Rows`,`Lat Pulldown`,`Cable Rows`,`Face Pulls`,`Rear Delt Fly`,`Curls`,`Hammer Curls`],Legs:[`Squat`,`Leg Press`,`Leg Extensions`,`Leg Curls`,`Calf Raises`,`Hip Flex`,`Romanian Deadlift`],Chest:[`Bench Press`,`Incline Bench Press`,`Chest Fly`,`Lower Chest Fly`,`Dips`,`Tricep Extensions`],"Back & Bi's":[`Rows`,`Lat Pulldown`,`Cable Rows`,`Curls`,`Hammer Curls`],Shoulders:[`Shoulder Press`,`Lateral Raises`,`Rear Delt Fly`,`Face Pulls`],Arms:[`Curls`,`Hammer Curls`,`Tricep Extensions`,`Tricep Pushdown`,`Skull Crushers`,`Cable Curls`],"Full Body":[`Squat`,`Bench Press`,`Rows`,`Shoulder Press`,`Romanian Deadlift`,`Pull-Ups`],Core:[`Plank`,`Crunches`,`Leg Raises`,`Russian Twists`,`Ab Wheel`,`Cable Crunches`]},Ie=new Set([`Dips`,`Pull-Ups`,`Push-Ups`,`Chin-Ups`,`Plank`,`Crunches`,`Leg Raises`,`Russian Twists`,`Ab Wheel`,`Burpees`,`Mountain Climbers`]),Le={"Bench Press":`https://exrx.net/WeightExercises/PectoralSternal/BBBenchPress`,"Incline Bench Press":`https://exrx.net/WeightExercises/PectoralClavicular/BBInclineBenchPress`,"Chest Fly":`https://exrx.net/WeightExercises/PectoralSternal/DBFly`,Dips:`https://exrx.net/WeightExercises/PectoralSternal/BWChestDip`,"Push-Ups":`https://exrx.net/WeightExercises/PectoralSternal/BWPushup`,"Shoulder Press":`https://exrx.net/WeightExercises/DeltoidAnterior/DBShoulderPress`,"Lateral Raises":`https://exrx.net/WeightExercises/DeltoidLateral/DBLateralRaise`,"Rear Delt Fly":`https://exrx.net/WeightExercises/DeltoidPosterior/DBRearLateralRaise`,"Face Pulls":`https://exrx.net/WeightExercises/DeltoidPosterior/CBStandingRearDeltRowRope`,Curls:`https://exrx.net/WeightExercises/Biceps/BBCurl`,"Hammer Curls":`https://exrx.net/WeightExercises/Brachioradialis/DBHammerCurl`,"Cable Curls":`https://exrx.net/WeightExercises/Biceps/CBCurl`,"Chin-Ups":`https://exrx.net/WeightExercises/LatissimusDorsi/BWChinUp`,"Pull-Ups":`https://exrx.net/WeightExercises/LatissimusDorsi/BWPullUp`,"Lat Pulldown":`https://exrx.net/WeightExercises/LatissimusDorsi/CBLatPulldown`,Rows:`https://exrx.net/WeightExercises/BackGeneral/CBSeatedRow`,"Tricep Extensions":`https://exrx.net/WeightExercises/Triceps/BBTriExt`,"Tricep Pushdown":`https://exrx.net/WeightExercises/Triceps/CBPushdown`,"Skull Crushers":`https://exrx.net/WeightExercises/Triceps/BBLyingTriExtSC`,Deadlift:`https://exrx.net/WeightExercises/ErectorSpinae/BBDeadlift`,"Romanian Deadlift":`https://exrx.net/WeightExercises/ErectorSpinae/BBStiffLegDeadlift`,Squat:`https://exrx.net/WeightExercises/Quadriceps/BBSquat`,"Leg Press":`https://exrx.net/WeightExercises/Quadriceps/LVSeatedLegPress`,"Leg Extensions":`https://exrx.net/WeightExercises/Quadriceps/LVLegExtension`,"Leg Curls":`https://exrx.net/WeightExercises/Hamstrings/LVLyingLegCurl`,"Calf Raises":`https://exrx.net/WeightExercises/Gastrocnemius/BBStandingCalfRaise`,Crunches:`https://exrx.net/WeightExercises/RectusAbdominis/BWCrunch`,Plank:`https://exrx.net/WeightExercises/RectusAbdominis/BWFrontPlank`,"Russian Twists":`https://exrx.net/WeightExercises/Obliques/BWTwistingCrunch`,"Leg Raises":`https://exrx.net/WeightExercises/HipFlexors/BWHangingLegRaise`,"Ab Wheel":`https://exrx.net/WeightExercises/RectusAbdominis/BWAbWheelRollout`,"Cable Crunches":`https://exrx.net/WeightExercises/RectusAbdominis/CBKneelingCrunch`},Re=[{id:`first_blood`,name:`First Blood`,desc:`Log your first workout`,tier:`bronze`,icon:`<path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>`,check:e=>e.length>=1},{id:`iron_habit`,name:`Iron Habit`,desc:`Complete 10 workouts`,tier:`silver`,icon:`<path d="M8 21h8M12 17v4"/><path d="M7 4H5a2 2 0 0 0-2 2v1a4 4 0 0 0 4 4"/><path d="M17 4h2a2 2 0 0 1 2 2v1a4 4 0 0 1-4 4"/><path d="M7 4h10v8a5 5 0 0 1-10 0V4z"/>`,check:e=>e.length>=10},{id:`centurion`,name:`Centurion`,desc:`Log 100 total workouts`,tier:`gold`,icon:`<rect x="3" y="3" width="18" height="18" rx="3"/><text x="12" y="16" text-anchor="middle" font-family="'Bebas Neue',sans-serif" font-size="10" fill="currentColor" stroke="none">100</text>`,check:e=>e.length>=100},{id:`three_peat`,name:`Three-Peat`,desc:`Hit a 3-week streak`,tier:`bronze`,icon:`<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>`,check:e=>ze(e)>=3},{id:`month_machine`,name:`Month Machine`,desc:`Hit a 4-week streak`,tier:`silver`,icon:`<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>`,check:e=>ze(e)>=4},{id:`relentless`,name:`Relentless`,desc:`Hit a 12-week streak`,tier:`diamond`,icon:`<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`,check:e=>ze(e)>=12},{id:`pr_hunter`,name:`PR Hunter`,desc:`Set a personal record on any lift`,tier:`bronze`,icon:`<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>`,check:e=>e.some(e=>e.sets.some(e=>!e.bodyweight))},{id:`plate_math`,name:`Plate Math`,desc:`Hit 135 lbs on any lift (a full bar)`,tier:`silver`,icon:`<rect x="4" y="9.5" width="3" height="5" rx="1"/><rect x="17" y="9.5" width="3" height="5" rx="1"/><rect x="2" y="11" width="2" height="2" rx="0.5"/><rect x="20" y="11" width="2" height="2" rx="0.5"/><line x1="7" y1="12" x2="17" y2="12"/>`,check:e=>e.some(e=>e.sets.some(e=>e.weight>=135))},{id:`two_plates`,name:`Two Plates`,desc:`Hit 225 lbs on any lift`,tier:`gold`,icon:`<rect x="3" y="8" width="4" height="8" rx="1"/><rect x="17" y="8" width="4" height="8" rx="1"/><rect x="1" y="10" width="2" height="4" rx="0.5"/><rect x="21" y="10" width="2" height="4" rx="0.5"/><line x1="7" y1="12" x2="17" y2="12" stroke-width="2.5"/>`,check:e=>e.some(e=>e.sets.some(e=>e.weight>=225))},{id:`three_plates`,name:`Three Plates`,desc:`Hit 315 lbs on any lift`,tier:`diamond`,icon:`<rect x="3" y="7" width="4" height="10" rx="1"/><rect x="17" y="7" width="4" height="10" rx="1"/><rect x="1" y="9" width="2" height="6" rx="0.5"/><rect x="21" y="9" width="2" height="6" rx="0.5"/><line x1="7" y1="12" x2="17" y2="12" stroke-width="3"/>`,check:e=>e.some(e=>e.sets.some(e=>e.weight>=315))},{id:`grease_the_groove`,name:`Grease the Groove`,desc:`Log 50 total sets in one session`,tier:`silver`,icon:`<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>`,check:e=>e.some(e=>e.sets.length>=50)},{id:`tonnage`,name:`Tonnage`,desc:`Lift 10,000 lbs total volume in one session`,tier:`gold`,icon:`<path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="M13 13l6 6"/>`,check:e=>e.some(e=>e.sets.reduce((e,t)=>e+t.weight*t.reps,0)>=1e4)},{id:`full_split`,name:`Full Split`,desc:`Complete every default routine at least once`,tier:`gold`,icon:`<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>`,check:e=>{let t=new Set(e.flatMap(e=>e.sets.map(e=>e.routine).filter(Boolean)));return Object.keys(A).every(e=>t.has(e))}},{id:`leg_day_lifer`,name:`Leg Day Lifer`,desc:`Complete 10 Legs workouts`,tier:`silver`,icon:`<path d="M8 3H5l3 9-4 9h4l2-4h4l2 4h4l-4-9 3-9h-3l-2 6h-3z"/>`,check:e=>e.filter(e=>e.sets.some(e=>e.routine===`Legs`)).length>=10},{id:`hydrated`,name:`Hydrated`,desc:`Hit your water goal 7 days in a row`,tier:`bronze`,icon:`<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>`,check:(e,t,n,r)=>{let i=(r||{}).waterGoal||8,a=Object.entries(t).sort(([e],[t])=>e<t?-1:1),o=0;for(let[,e]of a)if((e.water||0)>=i){if(o++,o>=7)return!0}else o=0;return!1}},{id:`protein_goal`,name:`Protein Protocol`,desc:`Log protein 14 days in a row`,tier:`silver`,icon:`<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>`,check:(e,t)=>{let n=Object.entries(t).sort(([e],[t])=>e<t?-1:1),r=0;for(let[,e]of n)if((e.protein||0)>0){if(r++,r>=14)return!0}else r=0;return!1}},{id:`creatine_streak`,name:`Loading Phase`,desc:`Log creatine 30 days in a row`,tier:`gold`,icon:`<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`,check:(e,t)=>{let n=Object.entries(t).sort(([e],[t])=>e<t?-1:1),r=0;for(let[,e]of n)if(e.creatine){if(r++,r>=30)return!0}else r=0;return!1}},{id:`weight_logger`,name:`On the Scale`,desc:`Log your body weight 10 times`,tier:`bronze`,icon:`<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>`,check:(e,t)=>Object.values(t).filter(e=>e.weight!==null&&e.weight!==void 0).length>=10},{id:`sleep_champ`,name:`Sleep Champion`,desc:`Log 8+ hours of sleep 7 times`,tier:`silver`,icon:`<path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="9" x2="12" y2="2"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/><line x1="23" y1="22" x2="1" y2="22"/><polyline points="16 5 12 9 8 5"/>`,check:(e,t)=>Object.values(t).filter(e=>(e.sleep||0)>=8).length>=7},{id:`supplement_king`,name:`Supplement King`,desc:`Hit water goal + protein + creatine on the same day, 7 times`,tier:`diamond`,icon:`<path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>`,check:(e,t,n,r)=>{let i=(r||{}).waterGoal||8;return Object.values(t).filter(e=>(e.water||0)>=i&&(e.protein||0)>0&&e.creatine).length>=7}},{id:`goal_setter`,name:`Goal Setter`,desc:`Set your first lift goal`,tier:`bronze`,icon:`<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>`,check:(e,t,n)=>(n||[]).length>=1},{id:`bullseye`,name:`Bullseye`,desc:`Hit the target weight on any lift goal`,tier:`gold`,icon:`<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21" y1="3" x2="15" y2="9"/><polyline points="17 3 21 3 21 7"/>`,check:(e,t,n)=>(n||[]).some(e=>wt(e.exercise)>=e.targetWeight)},{id:`hat_trick`,name:`Hat Trick`,desc:`Achieve 3 lift goals`,tier:`diamond`,icon:`<path d="M8 21h8M12 17v4"/><path d="M7 4H5a2 2 0 0 0-2 2v1a4 4 0 0 0 4 4"/><path d="M17 4h2a2 2 0 0 1 2 2v1a4 4 0 0 1-4 4"/><path d="M7 4h10v8a5 5 0 0 1-10 0V4z"/><text x="12" y="14" text-anchor="middle" font-family="monospace" font-size="6.5" fill="currentColor" stroke="none">3×3</text>`,check:(e,t,n)=>(n||[]).filter(e=>wt(e.exercise)>=e.targetWeight).length>=3}];function ze(e){if(!e.length)return 0;let t=[...new Set(e.map(e=>{let t=F(e.date),n=new Date(t.getFullYear(),0,1);return t.getFullYear()+`-`+Math.ceil(((t-n)/864e5+n.getDay()+1)/7)}))].sort(),n=1,r=1;for(let e=1;e<t.length;e++){let[i,a]=t[e-1].split(`-`).map(Number),[o,s]=t[e].split(`-`).map(Number);i===o&&s===a+1||o===i+1&&a>=52&&s===1?(n++,r=Math.max(r,n)):n=1}return r}async function Be(){let{workouts:e}=await j(),t=await X(),n=await G(),r=await Z();return Re.map(i=>({...i,earned:i.check(e,t,n,r)}))}async function j(){let e=await x(`gymdash_workouts`)||[],t=await x(`gymdash_routines`)||A,n=!1;return Object.entries(A).forEach(([e,r])=>{t[e]||(t[e]=r,n=!0)}),n&&await N(t),{workouts:e,routines:t}}async function M(e){await S(`gymdash_workouts`,e)}async function N(e){await S(`gymdash_routines`,e)}async function Ve(){await S(`gymdash_session`,{sets:I,routine:L,date:P(new Date)})}async function He(){await de(`gymdash_session`)}function Ue(e){let t=new Date(e),n=t.getDay(),r=new Date(t);r.setDate(t.getDate()-n),r.setHours(0,0,0,0);let i=new Date(r);return i.setDate(r.getDate()+6),i.setHours(23,59,59,999),{mon:r,sun:i}}function P(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`}function F(e){if(!e)return null;if(e.includes(`/`)){let[t,n,r]=e.split(`/`);return new Date(+r,t-1,+n)}let[t,n,r]=e.split(`-`);return new Date(+t,n-1,+r)}async function We(){let{workouts:e}=await j(),{mon:t,sun:n}=Ue(new Date);return e.filter(e=>{let r=F(e.date);return r>=t&&r<=n}).length}async function Ge(){let{workouts:e}=await j();if(!e.length)return 0;let t=0,n=new Date,{mon:r,sun:i}=Ue(n);e.filter(e=>{let t=F(e.date);return t>=r&&t<=i}).length<4&&(n=new Date(r),n.setDate(r.getDate()-1));for(let r=0;r<52;r++){let{mon:r,sun:i}=Ue(n);if(e.filter(e=>{let t=F(e.date);return t>=r&&t<=i}).length>=4)t++,n=new Date(r),n.setDate(r.getDate()-1);else break}return t}async function Ke(){let{workouts:e}=await j(),t=null;return e.forEach(e=>{e.sets.forEach(e=>{(!t||e.weight>t.weight)&&(t={exercise:e.exercise,weight:e.weight})})}),t}async function qe(){let{workouts:e}=await j(),t={},n=[...e].sort((e,t)=>F(e.date)-F(t.date)),r={};return n.forEach(e=>{e.sets.forEach(e=>{e.bodyweight||(!t[e.exercise]||e.weight>t[e.exercise].max)&&(t[e.exercise]={max:e.weight,prev:t[e.exercise]?.max||null})});let n={};e.sets.forEach(e=>{e.bodyweight||(!n[e.exercise]||e.weight>n[e.exercise])&&(n[e.exercise]=e.weight)}),Object.entries(n).forEach(([e,t])=>{r[e]||(r[e]=[]),r[e].push(t)})}),Object.entries(t).map(([e,{max:t}])=>{let n=r[e]||[],i=n[n.length-1]||0,a=n[n.length-2]||null;return{exercise:e,max:t,trend:a===null?null:i-a,sessionHistory:n}}).sort((e,t)=>t.max-e.max)}async function Je(){let{workouts:e}=await j(),t={};return e.forEach(e=>{e.sets.forEach(e=>{if(e.bodyweight||!e.weight||!e.reps)return;let n=e.weight*(1+e.reps/30);(!t[e.exercise]||n>t[e.exercise].orm)&&(t[e.exercise]={orm:n,weight:e.weight,reps:e.reps})})}),Object.entries(t).map(([e,{orm:t,weight:n,reps:r}])=>({exercise:e,orm:Math.round(t),weight:n,reps:r})).sort((e,t)=>t.orm-e.orm)}async function Ye(){let{workouts:e}=await j(),t={},n=new Date;n.setHours(0,0,0,0),e.forEach(e=>{let r=n-F(e.date),i=Math.floor(r/(7*864e5));if(i<0||i>=12)return;let a=i,o=e.sets.reduce((e,t)=>e+(!t.bodyweight&&t.weight&&t.reps?t.weight*t.reps:0),0);t[a]=(t[a]||0)+o});let r=[];for(let e=11;e>=0;e--){n.getTime()-(e+1)*7*864e5+864e5;let i=e===0?`This wk`:`${e}w ago`;r.push({label:i,value:t[e]||0,weeksAgo:e})}return r}function Xe(){return Date.now().toString(36)+Math.random().toString(36).slice(2)}var I=[],L=null,Ze=new Set,Qe={1:`Chest`,2:`Legs`,3:`Back & Bi's`,5:`Shoulders`};async function $e(){let e=new Date().getDay(),t=await x(`gymdash_session`)||null,n=P(new Date);t&&t.date===n?(I=t.sets||[],L=t.routine||Qe[e]||null):(t&&await He(),I=[],L=Qe[e]||null),await R()}async function R(){let{routines:e}=await j(),t=document.getElementById(`page-log`),n=await Ke(),r=n?`${n.exercise.split(` `).pop()} PR`:`Top PR`,i=n?`${n.weight}`:`—`;t.innerHTML=`
    <div class="stat-row">
      <div class="stat-chip">
        <div class="stat-value">${await We()}</div>
        <div class="stat-label">This Week</div>
      </div>
      <div class="stat-chip">
        <div class="stat-value">${await Ge()}</div>
        <div class="stat-label">Streak (wks)</div>
      </div>
      <div class="stat-chip">
        <div class="stat-value">${i}</div>
        <div class="stat-label">${r}</div>
      </div>
    </div>

    <div class="card">
      <div class="card-label">Routine</div>
      <div class="pill-row" id="routinePills">
        ${Object.keys(e).map(e=>`
          <div class="pill ${e===L?`active`:``}" data-routine="${e}" onclick="selectRoutine(this.dataset.routine)">${e}</div>
        `).join(``)}
      </div>
    </div>

    <div class="card">
      <div class="card-label">Exercise</div>
      <select class="select-field" id="exerciseSelect" onchange="onExerciseChange(this)">
        ${L?``:`<option value="" disabled selected>Select a routine first...</option>`}
        ${(e[L]||[]).map(e=>`<option value="${e}">${e}</option>`).join(``)}
        <option value="__custom__">+ Add Custom...</option>
      </select>
      <a id="formLinkBtn" href="" target="_blank" rel="noopener noreferrer" class="form-link-btn" style="display:none">&#9432; Form Guide</a>
      <div id="customInputRow" style="display:none" class="custom-input-row">
        <input class="custom-input" id="customExName" placeholder="Exercise name..." />
      </div>
      <div class="input-row">
        <div id="weightGroup">
          <input class="input-field" id="inputWeight" placeholder="0" type="number" min="0" inputmode="decimal" />
          <span class="input-label">lbs</span>
        </div>
        <div>
          <input class="input-field" id="inputReps" placeholder="0" type="number" min="1" inputmode="numeric" />
          <span class="input-label">reps</span>
        </div>
        <div>
          <input class="input-field" id="inputSets" placeholder="1" type="number" min="1" inputmode="numeric" value="1" />
          <span class="input-label">sets</span>
        </div>
      </div>
      <button class="btn-primary" onclick="addSet()">+ Add Set</button>
    </div>

    ${I.length>0?et():``}
  `,tt(),nt()}function et(){let e={},t=[];I.forEach((n,r)=>{e[n.exercise]||(e[n.exercise]=[],t.push(n.exercise)),e[n.exercise].push({...n,idx:r})});let n=t.map(t=>{let n=t.replace(/[^a-z0-9]/gi,`_`),r=!Ze.has(n),i=e[t].length;return`
    <div class="session-group ${r?`expanded`:``}" id="sg-${n}">
      <div class="session-group-header" onclick="toggleSessionGroup('${n}')">
        <span>${t} <span style="font-weight:400;opacity:0.7">(${i})</span></span>
        <span class="session-group-chevron">&#8250;</span>
      </div>
      <div class="session-group-body">
        ${e[t].map((e,t)=>`
          <div class="set-row">
            <div class="set-dot"></div>
            <div class="set-name">Set ${t+1}</div>
            <div class="set-meta">${e.bodyweight?`BW`:e.weight+` lbs`} × ${e.reps} reps</div>
            <button class="set-delete" onclick="removeSet(${e.idx})">&#10005;</button>
          </div>
        `).join(``)}
      </div>
    </div>`}).join(``);return`
    <div class="card" id="sessionCard">
      <div class="card-label">Today's Sets (${I.length})</div>
      ${n}
      <button class="btn-outline" onclick="finishWorkout()">&#10003; Finish Workout</button>
    </div>`}function tt(){let e=document.getElementById(`exerciseSelect`),t=document.getElementById(`weightGroup`);!e||!t||(t.style.display=Ie.has(e.value)?`none`:``)}function nt(){let e=document.getElementById(`exerciseSelect`),t=document.getElementById(`formLinkBtn`);if(!e||!t)return;let n=Le[e.value];n?(t.href=n,t.style.display=``):t.style.display=`none`}async function rt(e){L=e,await R()}function it(e){document.getElementById(`customInputRow`).style.display=e.value===`__custom__`?`flex`:`none`,tt(),nt()}async function at(){let e=document.getElementById(`exerciseSelect`).value;if(e===`__custom__`&&(e=(document.getElementById(`customExName`)?.value||``).trim(),!e)){z(`Enter a custom exercise name`);return}let t=Ie.has(e),n=t?0:parseFloat(document.getElementById(`inputWeight`).value),r=parseInt(document.getElementById(`inputReps`).value),i=parseInt(document.getElementById(`inputSets`).value)||1;if(!t&&!n||!r){z(`Enter weight and reps`);return}for(let a=0;a<i;a++)I.push({exercise:e,weight:n,reps:r,bodyweight:t,routine:L});await Ve(),await R()}async function ot(e){I.splice(e,1),await Ve(),await R()}async function st(){if(!I.length)return;let{workouts:e}=await j(),t=[...new Set(I.map(e=>e.routine).filter(Boolean))],n=t.length?t.join(` + `):L;e.unshift({id:Xe(),date:P(new Date),routine:n,sets:[...I]}),await M(e),I=[],await He(),ct(e),z(/iP(hone|ad|od)/.test(navigator.userAgent)?`Saved! Tap Share ? Save to Files to backup.`:`Workout saved! Backup downloaded.`),await R()}function ct(e){let t=`Date,Exercise,Weight,Reps
`;e.forEach(e=>{e.sets.forEach(n=>{t+=`${e.date},${n.exercise},${n.weight},${n.reps}\n`})});let n=`gymdash-backup-${P(new Date)}.csv`,r=new Blob([t],{type:`text/csv`});if(window.showSaveFilePicker){window.showSaveFilePicker({suggestedName:n,types:[{description:`CSV`,accept:{"text/csv":[`.csv`]}}]}).then(e=>e.createWritable()).then(e=>e.write(r).then(()=>e.close())).catch(()=>{});return}let i=new File([r],n,{type:`text/csv`});if(navigator.canShare&&navigator.canShare({files:[i]})){navigator.share({files:[i],title:`GymDash Backup`}).catch(()=>{});return}let a=URL.createObjectURL(r),o=document.createElement(`a`);o.href=a,o.download=n,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(a)}var lt;function z(e){let t=document.getElementById(`toast`);t.textContent=e,t.classList.add(`show`),clearTimeout(lt),lt=setTimeout(()=>t.classList.remove(`show`),2500)}var B=new Date,V=null;async function H(){let{workouts:e}=await j(),t=document.getElementById(`page-history`),n=new Set(e.map(e=>e.date)),r=B.getFullYear(),i=B.getMonth(),a=B.toLocaleDateString(`en-US`,{month:`long`,year:`numeric`}),o=new Date(r,i,1).getDay(),s=new Date(r,i+1,0).getDate(),c=P(new Date),l=[`Su`,`Mo`,`Tu`,`We`,`Th`,`Fr`,`Sa`].map(e=>`<div class="cal-dow">${e}</div>`).join(``),u=``;for(let e=0;e<o;e++)u+=`<div class="cal-day"></div>`;for(let e=1;e<=s;e++){let t=`${r}-${String(i+1).padStart(2,`0`)}-${String(e).padStart(2,`0`)}`,a=n.has(t),o=[`cal-day`,`in-month`,a?`has-workout`:``,t===V?`selected`:``,t===c?`today`:``].filter(Boolean).join(` `),s=a?`onclick="selectHistoryDay('${t}')"`:``;u+=`<div class="${o}" ${s}>${e}</div>`}let d=`
    <div class="cal-wrap">
      <div class="cal-header">
        <button class="cal-nav" onclick="prevHistoryMonth()">&#8249;</button>
        <div class="cal-month-label">${a}</div>
        <button class="cal-nav" onclick="nextHistoryMonth()">&#8250;</button>
      </div>
      <div class="cal-grid">${l}${u}</div>
    </div>`,f=``;if(V){let t=e.find(e=>e.date===V);t&&(f=`<div class="section-heading">Session — ${F(V).toLocaleDateString(`en-US`,{month:`short`,day:`numeric`,year:`numeric`})}</div>
        ${ut(t,!0)}`)}else f=e.length?`<div class="section-heading">Recent Sessions</div>${e.slice(0,10).map(e=>ut(e,!1)).join(``)}`:`<p style="color:var(--text-muted);font-size:14px;padding:8px 0">No sessions logged yet.</p>`;t.innerHTML=d+f}function ut(e,t){let n=F(e.date).toLocaleDateString(`en-US`,{month:`short`,day:`numeric`,year:`numeric`}),r=[...new Set(e.sets.map(e=>e.exercise))],i={};e.sets.forEach(e=>{i[e.exercise]||(i[e.exercise]=[]),i[e.exercise].push(e)});let a=Object.entries(i).map(([e,t])=>`
    <div class="detail-group">
      <div class="detail-group-name">${e}</div>
      ${t.map((e,t)=>`
        <div class="detail-set-row">
          <span class="detail-set-label">Set ${t+1}</span>
          <span class="detail-set-val">${e.bodyweight?`BW`:e.weight+` lbs`} × ${e.reps} reps</span>
        </div>
      `).join(``)}
    </div>
  `).join(``);return`
    <div class="session-card ${t?`expanded`:``}" onclick="toggleSession(this)">
      <div class="session-header">
        <div class="session-date">${n}</div>
        <div class="session-badges">${(Array.isArray(e.routine)?e.routine:e.routine.split(` + `)).map(e=>`<div class="session-badge">${e}</div>`).join(``)}</div>
      </div>
      <div class="session-tags">${r.map(e=>`<span class="session-tag">${e}</span>`).join(``)}</div>
      <div class="session-detail">
        ${a}
        <button class="btn-outline" style="margin-top:12px;border-color:var(--primary);color:var(--primary)" onclick="event.stopPropagation();deleteWorkout('${e.id}')">&#10005; Delete Session</button>
      </div>
    </div>`}async function dt(e){if(!confirm(`Delete this session? This cannot be undone.`))return;let{workouts:t}=await j(),n=t.filter(t=>t.id!==e);await M(n),V&&(n.find(e=>e.date===V)||(V=null)),z(`Session deleted.`),await H()}async function ft(){B=new Date(B.getFullYear(),B.getMonth()-1,1),V=null,await H()}async function pt(){B=new Date(B.getFullYear(),B.getMonth()+1,1),V=null,await H()}async function mt(e){V=V===e?null:e,await H()}function ht(e){e.classList.toggle(`expanded`)}var U=`weight`,W=`30D`;async function gt(){let{workouts:e}=await j(),t=document.getElementById(`page-progress`),n=await qe();if(!n.length){t.innerHTML=`<div class="section-heading">Personal Records</div>
      <p style="color:var(--text-muted);font-size:14px">No data yet. Log a workout to see your PRs.</p>`;return}let r={},i=Object.keys(A);n.forEach(e=>{let t=`Other`;for(let[n,r]of Object.entries(A))if(r.some(t=>t.toLowerCase()===e.exercise.toLowerCase())){t=n;break}r[t]||(r[t]=[]),r[t].push(e)});let a=[...i.filter(e=>r[e]),...r.Other?[`Other`]:[]].map(e=>{let t=r[e],n=Math.max(...t.map(e=>e.max)),i=t.map(e=>{let t=``;t=e.trend===null?`<div class="pr-trend">—</div>`:e.trend>0?`<div class="pr-trend up">&#9650; +${e.trend} lbs</div>`:e.trend<0?`<div class="pr-trend down">&#9660; ${e.trend} lbs</div>`:`<div class="pr-trend">&#8212; same</div>`;let n=e.exercise.replace(/[^a-z0-9]/gi,`_`);return`<div class="pr-row">
        <div class="pr-name">${e.exercise}</div>
        <div class="pr-mid">
          <canvas class="pr-sparkline" id="spark-${n}" width="60" height="28"></canvas>
        </div>
        <div class="pr-right">
          <div class="pr-weight">${e.max} lbs</div>
          ${t}
        </div>
      </div>`}).join(``),a=e.replace(/[^a-z]/gi,`_`);return`
      <div class="pr-group" id="prg-${a}">
        <div class="pr-group-header" onclick="togglePRGroup('${a}')">
          <div class="pr-group-name">${e}</div>
          <div style="display:flex;align-items:center;gap:6px">
            <div class="pr-group-meta">${t.length} exercise${t.length===1?``:`s`} · top ${n} lbs</div>
            <div class="pr-group-chevron">&#8250;</div>
          </div>
        </div>
        <div class="pr-group-body">${i}</div>
      </div>`}).join(``),o=(await Je()).slice(0,10).map((e,t)=>`
    <div class="orm-row">
      <div class="orm-rank">#${t+1}</div>
      <div class="orm-name">${e.exercise}</div>
      <div class="orm-right">
        <div class="orm-val">~${e.orm} lbs</div>
        <div class="orm-source">${e.weight} lbs × ${e.reps}</div>
      </div>
    </div>`).join(``),s=await Ye(),c=s.some(e=>e.value>0);t.innerHTML=`
    <div class="section-heading">Personal Records</div>
    ${a}
    <div class="section-heading">Estimated 1-Rep Max</div>
    <div class="card">
      <div style="font-size:11px;color:var(--text-muted);margin-bottom:10px">Epley formula on best set &middot; top 10 lifts</div>
      ${o||`<p style="color:var(--text-muted);font-size:13px">No weighted sets yet.</p>`}
    </div>
    <div class="section-heading">Weekly Volume</div>
    <div class="card">
      <div style="font-size:11px;color:var(--text-muted);margin-bottom:10px">Total weight lifted per week &middot; last 12 weeks</div>
      ${c?`<div class="vol-chart-wrap"><canvas class="volume-canvas" id="volChart" height="180"></canvas></div>`:`<p style="color:var(--text-muted);font-size:13px">Not enough data yet.</p>`}
    </div>
  `,requestAnimationFrame(()=>{n.forEach(e=>yt(e)),c&&bt(s)})}function _t(e){document.getElementById(`prg-`+e).classList.toggle(`expanded`),requestAnimationFrame(async()=>{document.getElementById(`prg-`+e).classList.contains(`expanded`)&&(await qe()).forEach(e=>yt(e))})}function vt(e){let t=document.getElementById(`sg-`+e);t&&(t.classList.contains(`expanded`)?(Ze.add(e),t.classList.remove(`expanded`)):(Ze.delete(e),t.classList.add(`expanded`)))}function yt(e){let t=e.exercise.replace(/[^a-z0-9]/gi,`_`),n=document.getElementById(`spark-`+t);if(!n)return;let r=e.sessionHistory||[];if(r.length<2){n.style.opacity=`0.2`;return}let i=window.devicePixelRatio||1;n.width=60*i,n.height=28*i,n.style.width=`60px`,n.style.height=`28px`;let a=n.getContext(`2d`);a.scale(i,i),a.clearRect(0,0,60,28);let o=r.length,s=r,c=Math.min(...s),l=Math.max(...s)-c||1,u=e=>2+e/(o-1)*56,d=e=>24-(e-c)/l*20+2,f=getComputedStyle(document.documentElement).getPropertyValue(`--primary`).trim(),p=getComputedStyle(document.documentElement).getPropertyValue(`--green`).trim()||`#22c55e`,m=s[o-1]>s[0]?p:s[o-1]<s[0]?f:`#888`;a.beginPath(),a.strokeStyle=m,a.lineWidth=1.5,a.lineJoin=`round`,s.forEach((e,t)=>{t===0?a.moveTo(u(t),d(e)):a.lineTo(u(t),d(e))}),a.stroke(),a.beginPath(),a.fillStyle=m,a.arc(u(o-1),d(s[o-1]),2.5,0,Math.PI*2),a.fill()}function bt(e){let t=document.getElementById(`volChart`);if(!t)return;let n=window.devicePixelRatio||1,r=t.offsetWidth;t.width=r*n,t.height=180*n,t.style.width=r+`px`,t.style.height=`180px`;let i=t.getContext(`2d`);i.scale(n,n),i.clearRect(0,0,r,180);let a=r-8-8,o=e.length,s=Math.max(...e.map(e=>e.value),1)*1.12,c=Math.max(...e.map(e=>e.value)),l=a/o,u=l*.52,d=(l-u)/2,f=getComputedStyle(document.documentElement).getPropertyValue(`--primary`).trim(),p=getComputedStyle(document.documentElement).getPropertyValue(`--accent`).trim();i.strokeStyle=`rgba(255,255,255,0.06)`,i.lineWidth=1;for(let e=1;e<=3;e++){let t=152-e/4*128;i.beginPath(),i.moveTo(8,t),i.lineTo(r-8,t),i.stroke()}e.forEach((e,t)=>{if(!e.value)return;let n=8+t*l+d,r=Math.max(e.value/s*128,4),a=152-r,o=e.value===c,m=i.createLinearGradient(0,a,0,152);m.addColorStop(0,o?p:f),m.addColorStop(1,o?p+`88`:f+`55`),i.fillStyle=m,i.beginPath(),i.roundRect(n,a,u,r,[3,3,0,0]),i.fill(),i.fillStyle=o?p:`rgba(255,255,255,0.75)`,i.font=`bold 9px 'JetBrains Mono', monospace`,i.textAlign=`center`;let h=e.value>=1e4?`${(e.value/1e3).toFixed(0)}k`:`${(e.value/1e3).toFixed(1)}k`;i.fillText(h,n+u/2,a-5)}),e.forEach((e,t)=>{if(t%2!=0&&t!==o-1)return;let n=8+t*l+d;i.fillStyle=t===o-1?`rgba(255,255,255,0.9)`:`#6b7280`,i.font=`8px 'JetBrains Mono', monospace`,i.textAlign=`center`;let r=e.weeksAgo===0?`now`:`${e.weeksAgo}w`;i.fillText(r,n+u/2,172)})}async function xt(){let e=document.getElementById(`page-trophies`),t=await Be(),n=t.filter(e=>e.earned),r=Math.round(n.length/t.length*100),i={bronze:`#cd7f32`,silver:`#a8b0bf`,gold:`#f5c518`,diamond:`#7dd3fc`},a={bronze:`Bronze`,silver:`Silver`,gold:`Gold`,diamond:`Diamond`},o=[{label:`First Steps`,ids:[`first_blood`,`iron_habit`,`centurion`]},{label:`Consistency`,ids:[`three_peat`,`month_machine`,`relentless`]},{label:`Lifting Milestones`,ids:[`pr_hunter`,`plate_math`,`two_plates`,`three_plates`]},{label:`Volume & Variety`,ids:[`grease_the_groove`,`tonnage`,`full_split`,`leg_day_lifer`]},{label:`Fuel & Recovery`,ids:[`hydrated`,`protein_goal`,`creatine_streak`,`weight_logger`,`sleep_champ`,`supplement_king`]},{label:`Goals`,ids:[`goal_setter`,`bullseye`,`hat_trick`]}],s=Object.fromEntries(t.map(e=>[e.id,e])),c=o.map(e=>{let t=e.ids.map(e=>{let t=s[e];if(!t)return``;let n=i[t.tier];return`
        <div class="trophy-card ${t.earned?`earned`:`locked`}" style="--trophy-color:${n}">
          <span class="trophy-tier-badge">${a[t.tier]}</span>
          <div class="trophy-icon-wrap">
            <svg viewBox="0 0 24 24">${t.icon}</svg>
          </div>
          <div class="trophy-name">${t.name}</div>
          <div class="trophy-desc">${t.desc}</div>
        </div>`}).join(``);return`<div class="trophy-section-label">${e.label}</div><div class="trophy-grid">${t}</div>`}).join(``);e.innerHTML=`
    <div class="trophy-summary">
      <div class="trophy-summary-count">${n.length}</div>
      <div class="trophy-summary-text">
        <div class="trophy-summary-label">Trophies Earned</div>
        <div class="trophy-summary-sub">${t.length-n.length} remaining to unlock</div>
        <div class="trophy-progress-bar">
          <div class="trophy-progress-fill" style="width:${r}%"></div>
        </div>
      </div>
    </div>
    ${c}
  `}async function G(){return await x(`gymdash_goals`)||[]}async function St(e){await S(`gymdash_goals`,e)}async function Ct(e){let{workouts:t}=await j(),n=[...t].sort((e,t)=>F(e.date)-F(t.date)),r=0,i=[];return n.forEach(t=>{let n=t.sets.filter(t=>t.exercise===e&&!t.bodyweight).reduce((e,t)=>Math.max(e,t.weight),0);if(n>0){r=Math.max(r,n);let e=F(t.date);i.push({label:`${e.getMonth()+1}/${e.getDate()}`,value:r,date:t.date})}}),i}async function wt(e){let{workouts:t}=await j(),n=0;return t.forEach(t=>t.sets.forEach(t=>{t.exercise===e&&!t.bodyweight&&t.weight>n&&(n=t.weight)})),n}function Tt(e){if(!e)return null;let t=new Date;t.setHours(0,0,0,0);let n=new Date(e+`T00:00:00`);return Math.round((n-t)/864e5)}async function Et(){let e=document.getElementById(`page-goals`),t=await G(),{workouts:n}=await j(),r=`
    <div class="goal-form-card" id="goalFormCard">
      <div class="card-label" style="margin-bottom:12px">New Goal</div>
      <div style="margin-bottom:8px">
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px;font-weight:600">EXERCISE</div>
        <select class="select-field" id="goalExercise" style="width:100%">
          <option value="">Select exercise...</option>
          ${[...new Set(n.flatMap(e=>e.sets.filter(e=>!e.bodyweight).map(e=>e.exercise)))].sort().map(e=>`<option value="${e}">${e}</option>`).join(``)}
          <option value="__custom">Custom (type below)...</option>
        </select>
        <input class="add-exercise-input" id="goalCustomEx" placeholder="Custom exercise name..." style="display:none;margin-top:6px;width:100%" />
      </div>
      <div class="goal-form-row">
        <div style="flex:1">
          <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px;font-weight:600">TARGET WEIGHT (LBS)</div>
          <input class="add-exercise-input" id="goalTarget" type="number" placeholder="e.g. 225" style="width:100%" />
        </div>
        <div style="flex:1">
          <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px;font-weight:600">DEADLINE (OPTIONAL)</div>
          <input class="add-exercise-input" id="goalDeadline" type="date" style="width:100%;color-scheme:dark" />
        </div>
      </div>
      <div class="new-routine-btn-row">
        <button class="btn-primary" style="flex:1" onclick="saveNewGoal()">Save Goal</button>
        <button class="btn-outline" style="margin-top:0;flex:1" onclick="cancelGoalForm()">Cancel</button>
      </div>
    </div>`;if(!t.length){e.innerHTML=`
      ${r}
      <div class="goal-empty" id="goalEmpty">
        <div class="goal-empty-title">No Goals Yet</div>
        <div>Set a target lift to track your progress toward it.</div>
      </div>
      <button class="btn-outline" id="addGoalBtn" onclick="showGoalForm()" style="width:100%;margin-top:8px">+ Set a Goal</button>`;return}e.innerHTML=`
    ${r}
    <div class="section-heading">Active Goals</div>
    ${(await Promise.all(t.map(e=>Dt(e)))).join(``)}
    <button class="btn-outline" id="addGoalBtn" onclick="showGoalForm()" style="width:100%;margin-top:4px">+ Set a Goal</button>`,t.forEach(e=>{requestAnimationFrame(async()=>{await Ot(e)})})}async function Dt(e){let t=await wt(e.exercise),n=e.targetWeight>0?Math.min(100,Math.round(t/e.targetWeight*100)):0,r=Math.max(0,e.targetWeight-t),i=Tt(e.deadline),a=``;i!==null&&(a=`<span class="goal-deadline-badge ${i<0?`overdue`:i<=14?`soon`:``}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:10px;height:10px"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      ${i<0?`${Math.abs(i)}d overdue`:i===0?`Due today`:`${i}d left`}</span>`);let o=n>=100?`<span style="font-size:10px;font-family:'JetBrains Mono',monospace;color:var(--accent);background:rgba(245,158,11,0.12);border-radius:20px;padding:3px 8px;margin-left:6px">&#9733; ACHIEVED</span>`:``;return`
    <div class="goal-card" id="goal-${e.id}">
      <div class="goal-header">
        <div>
          <div style="display:flex;align-items:center;flex-wrap:wrap;gap:4px">
            <div class="goal-exercise">${e.exercise}</div>${o}
          </div>
          ${a}
        </div>
        <button class="routine-ex-delete" onclick="deleteGoal('${e.id}')" style="font-size:18px;padding:4px 6px">&#10005;</button>
      </div>
      <div class="goal-stats">
        <div class="goal-stat">
          <div class="goal-stat-val current">${t>0?t+` lbs`:`—`}</div>
          <div class="goal-stat-label">Current PR</div>
        </div>
        <div style="display:flex;align-items:center;color:var(--border);font-size:20px;padding-top:2px">&#8594;</div>
        <div class="goal-stat">
          <div class="goal-stat-val target">${e.targetWeight} lbs</div>
          <div class="goal-stat-label">Target</div>
        </div>
        ${r>0?`
        <div class="goal-stat" style="margin-left:auto">
          <div class="goal-stat-val" style="font-size:18px;color:var(--text-muted)">${r} lbs</div>
          <div class="goal-stat-label">To Go</div>
        </div>`:``}
      </div>
      <div class="goal-progress-track">
        <div class="goal-progress-fill" style="width:${n}%"></div>
      </div>
      <div class="goal-progress-label">
        <span>0 lbs</span>
        <span style="color:var(--text);font-weight:700">${n}%</span>
        <span>${e.targetWeight} lbs</span>
      </div>
      <div class="goal-mini-chart">
        <canvas id="goal-chart-${e.id}" height="80"></canvas>
      </div>
    </div>`}async function Ot(e){let t=document.getElementById(`goal-chart-`+e.id);if(!t)return;let n=await Ct(e.exercise);if(n.length<2){t.getContext(`2d`),t.style.display=`none`;return}let r=window.devicePixelRatio||1,i=t.offsetWidth;t.width=i*r,t.height=80*r,t.style.width=i+`px`,t.style.height=`80px`;let a=t.getContext(`2d`);a.scale(r,r),a.clearRect(0,0,i,80);let o=i-8-8,s=n.length,c=n.map(e=>e.value),l=Math.min(...c)*.95,u=Math.max(Math.max(...c),e.targetWeight)*1.02,d=e=>8+(s>1?e/(s-1)*o:o/2),f=e=>62-(e-l)/(u-l)*48,p=getComputedStyle(document.documentElement).getPropertyValue(`--primary`).trim(),m=getComputedStyle(document.documentElement).getPropertyValue(`--accent`).trim();getComputedStyle(document.documentElement).getPropertyValue(`--border`).trim();let h=f(e.targetWeight);h>=14&&h<=62&&(a.setLineDash([4,3]),a.strokeStyle=m+`AA`,a.lineWidth=1.5,a.beginPath(),a.moveTo(8,h),a.lineTo(i-8,h),a.stroke(),a.setLineDash([]),a.fillStyle=m,a.font=`bold 9px 'JetBrains Mono', monospace`,a.textAlign=`right`,a.fillText(`TARGET`,i-8-2,h-3));let g=a.createLinearGradient(0,14,0,62);g.addColorStop(0,p+`44`),g.addColorStop(1,p+`00`),a.beginPath(),n.forEach((e,t)=>{t===0?a.moveTo(d(t),f(e.value)):a.lineTo(d(t),f(e.value))}),a.lineTo(d(s-1),62),a.lineTo(d(0),62),a.closePath(),a.fillStyle=g,a.fill(),a.beginPath(),a.strokeStyle=p,a.lineWidth=2,a.lineJoin=`round`,n.forEach((e,t)=>{t===0?a.moveTo(d(t),f(e.value)):a.lineTo(d(t),f(e.value))}),a.stroke(),n.forEach((e,t)=>{a.beginPath(),a.fillStyle=p,a.arc(d(t),f(e.value),3,0,Math.PI*2),a.fill(),a.fillStyle=`#A3A3A3`,a.font=`9px 'JetBrains Mono', monospace`,a.textAlign=`center`,(t===0||t===s-1||s<=5)&&a.fillText(e.label,d(t),77)})}function kt(){document.getElementById(`goalFormCard`).style.display=`block`,document.getElementById(`addGoalBtn`).style.display=`none`;let e=document.getElementById(`goalEmpty`);e&&(e.style.display=`none`),document.getElementById(`goalExercise`).onchange=function(){document.getElementById(`goalCustomEx`).style.display=this.value===`__custom`?`block`:`none`}}async function At(){document.getElementById(`goalFormCard`).style.display=`none`,document.getElementById(`addGoalBtn`).style.display=``;let e=document.getElementById(`goalEmpty`);e&&!(await G()).length&&(e.style.display=``)}async function jt(){let e=document.getElementById(`goalExercise`).value,t=e===`__custom`?document.getElementById(`goalCustomEx`).value.trim():e,n=parseFloat(document.getElementById(`goalTarget`).value),r=document.getElementById(`goalDeadline`).value||null;if(!t){z(`Select or enter an exercise`);return}if(!n||n<=0){z(`Enter a target weight`);return}let i=await G();if(i.some(e=>e.exercise===t)){z(`Goal for `+t+` already exists`);return}i.push({id:Xe(),exercise:t,targetWeight:n,deadline:r}),await St(i),z(`Goal set: `+t+` ? `+n+` lbs`),await Et()}async function Mt(e){await St((await G()).filter(t=>t.id!==e)),await Et()}var K=[];async function q(){let{routines:e}=await j(),t=document.getElementById(`page-settings`),n=e=>Object.prototype.hasOwnProperty.call(A,e);t.innerHTML=`
    <div class="settings-section" id="section-routines">
      <div class="settings-section-header" onclick="toggleSettingsSection('routines')">
        <div class="section-heading">Routines</div>
        <span class="settings-section-chevron">&#8250;</span>
      </div>
      <div class="settings-section-body">
        
    <div class="new-routine-card" id="newRoutineForm" style="display:none">
      <div class="card-label">New Routine</div>
      <div class="new-routine-name-row">
        <input class="new-routine-name-input" id="newRoutineName" placeholder="Routine name..." />
      </div>
      <div class="new-routine-ex-list" id="newRoutineExList"></div>
      <div class="add-exercise-row" style="margin-bottom:12px">
        <input class="add-exercise-input" id="newRoutineExInput" placeholder="Add exercise..." onkeydown="if(event.key==='Enter')addNewRoutineEx()" />
        <button class="btn-sm" onclick="addNewRoutineEx()">Add</button>
      </div>
      <div class="new-routine-btn-row">
        <button class="btn-primary" style="flex:1" onclick="saveNewRoutine()">Save Routine</button>
        <button class="btn-outline" style="margin-top:0;flex:1" onclick="cancelNewRoutine()">Cancel</button>
      </div>
    </div>
        ${Object.entries(e).map(([e,t])=>{let r=e.replace(/[^a-z]/gi,`_`),i=n(e);return`
    <div class="routine-card" id="rc-${r}">
      <div class="routine-header" data-id="${r}" onclick="toggleRoutine(this.dataset.id)">
        <div style="display:flex;align-items:center;gap:4px">
          <div class="routine-name">${e}</div>
          ${i?`<span class="routine-default-badge">default</span>`:``}
        </div>
        <div style="display:flex;align-items:center">
          ${i?``:`<button class="routine-delete-btn" onclick="event.stopPropagation();deleteRoutine('${e}')" title="Delete routine">&#10005;</button>`}
          <div class="routine-chevron">&#8250;</div>
        </div>
      </div>
      <div class="routine-body">
        ${t.map((t,n)=>`
          <div class="routine-ex-row">
            <div class="routine-ex-name">${t}</div>
            <button class="routine-ex-delete" data-routine="${e}" data-idx="${n}" onclick="removeExercise(this.dataset.routine, +this.dataset.idx)">&#10005;</button>
          </div>
        `).join(``)}
        <div class="add-exercise-row" style="margin-top:12px">
          <input class="add-exercise-input" id="addEx-${r}" placeholder="New exercise name..." />
          <button class="btn-sm" data-routine="${e}" onclick="addExercise(this.dataset.routine)">Add</button>
        </div>
      </div>
    </div>`}).join(``)}
        <button class="btn-outline" id="addRoutineBtn" onclick="showNewRoutineForm()" style="width:100%;margin-bottom:10px">+ New Routine</button>
      </div>
    </div>
    <div class="settings-section" id="section-theme">
      <div class="settings-section-header" onclick="toggleSettingsSection('theme')">
        <div class="section-heading">Theme</div>
        <span class="settings-section-chevron">&#8250;</span>
      </div>
      <div class="settings-section-body">
        <div class="card" style="margin-bottom:10px">
          <div class="card-label">Color Theme</div>
          <div class="theme-grid">
            ${Object.entries(D).map(([e,t])=>`
              <div class="theme-swatch ${localStorage.getItem(`gymdash_theme`)===e||!localStorage.getItem(`gymdash_theme`)&&e===`noir`?`active`:``}" onclick="setTheme('${e}')">
                <div class="theme-swatch-dot" style="background:${t.primary};border-color:${t.accent}"></div>
                <div class="theme-swatch-label">${t.name}</div>
              </div>
            `).join(``)}
          </div>
        </div>
      </div>
    </div>
    <div class="section-heading" style="margin-top:8px">Data</div>
    <div class="card">
      <div class="card-label">Workouts</div>
      <p style="font-size:12px;color:var(--text-muted);margin-bottom:10px">CSV format: Date, Exercise, Weight, Reps</p>
      <div class="data-btn-row">
        <button class="btn-outline" onclick="triggerImport()" style="margin-top:0">&#8593; Import CSV</button>
        <button class="btn-outline" onclick="exportCSV()" style="margin-top:0">&#8595; Export CSV</button>
      </div>
      <input type="file" id="csvFileInput" style="display:none" onchange="handleImport(this)" />
    </div>
    <div class="card" style="margin-top:10px">
      <div class="card-label">Nutrition</div>
      <p style="font-size:12px;color:var(--text-muted);margin-bottom:10px">CSV format: Date, Water, Protein, Creatine, Weight, Sleep, custom...</p>
      <div class="data-btn-row">
        <button class="btn-outline" onclick="triggerNutritionImport()" style="margin-top:0">&#8593; Import CSV</button>
        <button class="btn-outline" onclick="exportNutritionCSV()" style="margin-top:0">&#8595; Export CSV</button>
      </div>
      <input type="file" id="nutriCsvInput" style="display:none" onchange="handleNutritionImport(this)" />
    </div>
    <div class="section-heading" style="margin-top:8px">About</div>
    <div class="card">
      <div class="card-label">App Version</div>
      <p style="font-family:'JetBrains Mono',monospace;font-size:18px;font-weight:700;color:var(--primary);margin-top:6px">${je}</p>
    </div>
  `}function Nt(e){document.getElementById(`rc-`+e).classList.toggle(`expanded`)}function Pt(e){document.getElementById(`section-`+e).classList.toggle(`expanded`)}async function Ft(e,t){let{routines:n}=await j();n[e].splice(t,1),await N(n),await q()}async function It(e){let t=e.replace(/[^a-z]/gi,`_`),n=(document.getElementById(`addEx-`+t)?.value||``).trim();if(!n)return;let{routines:r}=await j();r[e].includes(n)||(r[e].push(n),await N(r),z(`Added "${n}" to ${e}`)),await q()}function Lt(){K=[],document.getElementById(`newRoutineForm`).style.display=``,document.getElementById(`addRoutineBtn`).style.display=`none`,document.getElementById(`newRoutineName`).focus(),Vt()}function Rt(){K=[],document.getElementById(`newRoutineForm`).style.display=`none`,document.getElementById(`addRoutineBtn`).style.display=``}function zt(){let e=document.getElementById(`newRoutineExInput`),t=(e?.value||``).trim();t&&(K.includes(t)||K.push(t),e.value=``,e.focus(),Vt())}function Bt(e){K.splice(e,1),Vt()}function Vt(){let e=document.getElementById(`newRoutineExList`);e&&(e.innerHTML=K.map((e,t)=>`
    <span class="new-routine-ex-chip">
      ${e}
      <button onclick="removeNewRoutineEx(${t})">&#10005;</button>
    </span>`).join(``))}async function Ht(){let e=(document.getElementById(`newRoutineName`)?.value||``).trim();if(!e){z(`Enter a routine name`);return}if(!K.length){z(`Add at least one exercise`);return}let{routines:t}=await j();if(t[e]){z(`A routine with that name already exists`);return}t[e]=[...K],await N(t),z(`"${e}" saved!`),K=[],await q(),await R()}function Ut(){window.showOpenFilePicker?window.showOpenFilePicker({multiple:!1}).then(async([e])=>{Jt(await(await e.getFile()).text())}).catch(()=>{}):document.getElementById(`csvFileInput`).click()}async function Wt(e,t){try{await Ae.share({title:e,text:t,dialogTitle:`Export `+e});return}catch(e){if(e.message&&e.message.includes(`AbortError`))return}let n=new Blob([t],{type:`text/csv`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=e,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(r)}async function Gt(){let{workouts:e}=await j(),t=`Date,Exercise,Weight,Reps
`;e.forEach(e=>{e.sets.forEach(n=>{t+=`${e.date},${n.exercise},${n.weight},${n.reps}\n`})}),await Wt(`workouts.csv`,t)}function Kt(e){let t=Object.entries(A).map(([t,n])=>({routine:t,count:e.filter(e=>n.some(t=>e.toLowerCase().includes(t.toLowerCase()))).length}));return t.sort((e,t)=>t.count-e.count),t[0].count>0?t[0].routine:`Other`}function qt(e){let t=e.files[0];if(!t)return;let n=new FileReader;n.onload=t=>{Jt(t.target.result),e.value=``},n.readAsText(t)}async function Jt(e){let t=e.split(`
`).map(e=>e.trim()).filter(Boolean),n=t[0].toLowerCase().includes(`date`)?t.slice(1):t,r={},i=0;n.forEach(e=>{let t=e.split(`,`);if(t.length<4){i++;return}let[n,a,o,s]=t.map(e=>e.trim()),c=F(n);if(!c||isNaN(c.getTime())){i++;return}let l=parseFloat(o),u=parseInt(s);if(isNaN(l)||isNaN(u)){i++;return}let d=P(c);r[d]||(r[d]=[]),r[d].push({exercise:a,weight:l,reps:u})});let{workouts:a}=await j(),o=new Set(a.map(e=>e.date)),s=0;Object.entries(r).forEach(([e,t])=>{if(o.has(e)){i+=t.length;return}let n=Kt(t.map(e=>e.exercise));a.push({id:Xe(),date:e,routine:n,sets:t}),s++}),a.sort((e,t)=>F(t.date)-F(e.date)),await M(a),z(`Imported ${s} sessions. Skipped ${i} rows.`),await R()}async function J(e){let t=await x(`gymdash_nutrition`)||{};return Object.assign({water:0,protein:0,creatine:!1,weight:null,sleep:null,custom:{}},t[e]||{})}async function Y(e,t){let n=await x(`gymdash_nutrition`)||{};n[e]=t,await S(`gymdash_nutrition`,n)}async function X(){return await x(`gymdash_nutrition`)||{}}async function Z(){return Object.assign({waterGoal:8,proteinGoal:150,customMetrics:[]},await x(`gymdash_nutrition_config`)||{})}async function Yt(e){await S(`gymdash_nutrition_config`,e)}async function Q(){let e=await J(P(new Date)),t=await Z(),n=document.getElementById(`page-nutrition`),r=new Date().toLocaleDateString(`en-US`,{weekday:`long`,month:`short`,day:`numeric`}).toUpperCase(),i=t.customMetrics.map(t=>{let n=(e.custom||{})[t.id];if(t.type===`toggle`){let e=n===!0;return`
        <div class="nutri-row">
          <div class="nutri-label">${t.name}</div>
          <button class="nutri-toggle-btn ${e?`active`:``}" onclick="toggleNutritionCustom('${t.id}')">${e?`&#10003; Done`:`Mark Done`}</button>
        </div>`}else if(t.type===`counter`)return`
        <div class="nutri-row">
          <div class="nutri-label">${t.name}</div>
          <div class="nutri-counter">
            <button class="nutri-count-btn" onclick="adjustNutritionCustom('${t.id}', -1)">-</button>
            <div class="nutri-count-value">${n||0}</div>
            <button class="nutri-count-btn" onclick="adjustNutritionCustom('${t.id}', 1)">+</button>
          </div>
        </div>`;else return`
        <div class="nutri-row">
          <div class="nutri-label">${t.name}</div>
          <div style="display:flex;align-items:center;gap:6px">
            <input class="nutri-number-input" type="number" value="${n||``}" placeholder="0"
              onchange="saveNutritionCustomNumber('${t.id}', this.value)" />
            <span class="nutri-unit">${t.unit}</span>
          </div>
        </div>`}).join(``),a=[{id:`weight`,label:`Weight`},{id:`sleep`,label:`Sleep`},...t.customMetrics.filter(e=>e.type===`number`||e.type===`counter`).map(e=>({id:e.id,label:e.name}))].map(e=>`<button class="nutri-metric-pill ${U===e.id?`active`:``}" onclick="setNutriChartMetric('${e.id}')">${e.label}</button>`).join(``),o=t.customMetrics.map(e=>`
    <div class="nutri-custom-item">
      <div>
        <div style="font-weight:600;font-size:14px">${e.name}</div>
        <div style="font-size:11px;color:var(--text-muted)">${e.type}${e.unit?` · `+e.unit:``}</div>
      </div>
      <button class="routine-ex-delete" onclick="deleteCustomMetric('${e.id}')">&#10005;</button>
    </div>`).join(``);n.innerHTML=`
    <div class="section-heading">${r}</div>
    <div class="nutri-daily-card">
      <div class="nutri-row">
        <div class="nutri-label">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;flex-shrink:0"><path d="M12 2v6M12 22v-6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M22 12h-6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24"/></svg>
          Water
        </div>
        <div class="nutri-counter">
          <button class="nutri-count-btn" onclick="adjustWater(-1)">-</button>
          <div class="nutri-count-value">${e.water}</div>
          <span class="nutri-unit">/ ${t.waterGoal} cups</span>
          <button class="nutri-count-btn" onclick="adjustWater(1)">+</button>
        </div>
      </div>
      <div class="nutri-row">
        <div class="nutri-label">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;flex-shrink:0"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
          Protein
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <input class="nutri-number-input" type="number" value="${e.protein||``}" placeholder="0"
            onchange="saveNutritionSimple('protein', +this.value)" />
          <span class="nutri-unit">g</span>
        </div>
      </div>
      <div class="nutri-row">
        <div class="nutri-label">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;flex-shrink:0"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          Creatine
        </div>
        <button class="nutri-toggle-btn ${e.creatine?`active`:``}" onclick="toggleCreatine()">${e.creatine?`&#10003; Taken`:`Mark Taken`}</button>
      </div>
      ${i}
    </div>
    <div class="nutri-daily-card">
      <div class="nutri-row">
        <div class="nutri-label">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;flex-shrink:0"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
          Body Weight
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <input class="nutri-number-input" type="number" step="0.1" value="${e.weight!==null&&e.weight!==void 0?e.weight:``}" placeholder="—"
            onchange="saveNutritionSimple('weight', this.value !== '' ? +this.value : null)" />
          <span class="nutri-unit">lbs</span>
        </div>
      </div>
      <div class="nutri-row">
        <div>
          <div class="nutri-label">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;flex-shrink:0"><path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="9" x2="12" y2="2"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/><line x1="23" y1="22" x2="1" y2="22"/><polyline points="16 5 12 9 8 5"/></svg>
            Sleep
          </div>
          <div style="font-size:10px;color:var(--text-muted);margin-top:2px;padding-left:22px">Last night</div>
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <input class="nutri-number-input" type="number" step="0.5" value="${e.sleep!==null&&e.sleep!==void 0?e.sleep:``}" placeholder="—"
            onchange="saveNutritionSimple('sleep', this.value !== '' ? +this.value : null)" />
          <span class="nutri-unit">hrs</span>
        </div>
      </div>
    </div>
    <div class="nutri-chart-card">
      <div class="nutri-chart-controls">
        <div class="nutri-metric-pills">${a}</div>
        <div class="nutri-range-toggle">
          <button class="nutri-range-btn ${W===`30D`?`active`:``}" onclick="setNutriChartRange('30D')">30D</button>
          <button class="nutri-range-btn ${W===`12W`?`active`:``}" onclick="setNutriChartRange('12W')">12W</button>
          <button class="nutri-range-btn ${W===`6M`?`active`:``}" onclick="setNutriChartRange('6M')">6M</button>
        </div>
      </div>
      <canvas id="nutri-chart" height="180"></canvas>
    </div>
    <div class="settings-section" id="section-custom-metrics">
      <div class="settings-section-header" onclick="toggleSettingsSection('custom-metrics')">
        <div class="section-heading">Custom Metrics</div>
        <span class="settings-section-chevron">&#8250;</span>
      </div>
      <div class="settings-section-body">
        ${o}
        <div class="nutri-custom-form" id="newMetricForm" style="display:none">
          <div class="card-label">New Metric</div>
          <input class="add-exercise-input" id="newMetricName" placeholder="Metric name..." style="width:100%;margin-bottom:8px" />
          <div class="nutri-type-row">
            <button class="nutri-type-btn active" id="mtype-toggle" onclick="selectMetricType('toggle')">Toggle</button>
            <button class="nutri-type-btn" id="mtype-counter" onclick="selectMetricType('counter')">Counter</button>
            <button class="nutri-type-btn" id="mtype-number" onclick="selectMetricType('number')">Number</button>
          </div>
          <div id="metricUnitRow" style="display:none;margin-bottom:8px">
            <input class="add-exercise-input" id="newMetricUnit" placeholder="Unit (e.g. kcal, mg)..." style="width:100%" />
          </div>
          <div class="new-routine-btn-row">
            <button class="btn-primary" style="flex:1" onclick="saveNewCustomMetric()">Save</button>
            <button class="btn-outline" style="margin-top:0;flex:1" onclick="cancelNewMetric()">Cancel</button>
          </div>
        </div>
        <button class="btn-outline" id="addMetricBtn" onclick="showAddMetricForm()" style="width:100%;margin-bottom:10px">+ Add Custom Metric</button>
      </div>
    </div>
  `,requestAnimationFrame(on)}async function Xt(e){let t=P(new Date),n=await J(t);n.water=Math.max(0,(n.water||0)+e),await Y(t,n),await Q()}async function Zt(){let e=P(new Date),t=await J(e);t.creatine=!t.creatine,await Y(e,t),await Q()}async function Qt(e,t){let n=P(new Date),r=await J(n);r[e]=t,await Y(n,r)}async function $t(e){let t=P(new Date),n=await J(t);n.custom||={},n.custom[e]=!n.custom[e],await Y(t,n),await Q()}async function en(e,t){let n=P(new Date),r=await J(n);r.custom||={},r.custom[e]=Math.max(0,(r.custom[e]||0)+t),await Y(n,r),await Q()}async function tn(e,t){let n=P(new Date),r=await J(n);r.custom||={},r.custom[e]=t===``?null:+t,await Y(n,r)}function nn(e){U=e,Q()}function rn(e){W=e,Q()}function an(e,t){if(t===`weight`)return e.weight!==null&&e.weight!==void 0?+e.weight:null;if(t===`sleep`)return e.sleep!==null&&e.sleep!==void 0?+e.sleep:null;let n=(e.custom||{})[t];return n==null?null:+n}async function on(){let e=document.getElementById(`nutri-chart`);if(!e)return;let t=await X(),n=new Date,r=[];if(W===`30D`)for(let e=29;e>=0;e--){let i=new Date(n);i.setDate(n.getDate()-e);let a=P(i),o=Object.assign({water:0,protein:0,creatine:!1,weight:null,sleep:null,custom:{}},t[a]||{}),s=e===0||e===7||e===14||e===21||e===28;r.push({label:s?i.toLocaleDateString(`en-US`,{month:`numeric`,day:`numeric`}):``,value:an(o,U)})}else if(W===`12W`)for(let e=11;e>=0;e--){let i=new Date(n);i.setDate(n.getDate()-e*7);let a=new Date(i);a.setDate(i.getDate()-6);let o=[];for(let e=new Date(a);e<=i;e.setDate(e.getDate()+1)){let n=an(Object.assign({water:0,protein:0,creatine:!1,weight:null,sleep:null,custom:{}},t[P(new Date(e))]||{}),U);n!==null&&o.push(n)}let s=o.length?+(o.reduce((e,t)=>e+t,0)/o.length).toFixed(1):null;r.push({label:e%3==0?i.toLocaleDateString(`en-US`,{month:`short`,day:`numeric`}):``,value:s})}else for(let e=5;e>=0;e--){let i=new Date(n.getFullYear(),n.getMonth()-e,1),a=new Date(n.getFullYear(),n.getMonth()-e+1,0),o=[];for(let e=new Date(i);e<=a;e.setDate(e.getDate()+1)){let n=an(Object.assign({water:0,protein:0,creatine:!1,weight:null,sleep:null,custom:{}},t[P(new Date(e))]||{}),U);n!==null&&o.push(n)}let s=o.length?+(o.reduce((e,t)=>e+t,0)/o.length).toFixed(1):null;r.push({label:i.toLocaleDateString(`en-US`,{month:`short`}),value:s})}let i=window.devicePixelRatio||1,a=e.offsetWidth;e.width=a*i,e.height=180*i,e.style.width=a+`px`,e.style.height=`180px`;let o=e.getContext(`2d`);o.scale(i,i),o.clearRect(0,0,a,180);let s=r.map((e,t)=>({...e,i:t})).filter(e=>e.value!==null);if(!s.length){o.fillStyle=`#A3A3A3`,o.font=`13px Raleway, sans-serif`,o.textAlign=`center`,o.fillText(`No data yet — log your first entry above`,a/2,180/2);return}let c=a-10-10,l=r.length,u=s.map(e=>e.value),d=Math.min(...u),f=Math.max(...u),p=f-d||1,m=d-p*.1,h=f+p*.1,g=e=>10+(l>1?e/(l-1)*c:c/2),_=e=>152-(e-m)/(h-m)*132,v=getComputedStyle(document.documentElement).getPropertyValue(`--primary`).trim(),y=getComputedStyle(document.documentElement).getPropertyValue(`--accent`).trim();if(o.strokeStyle=`rgba(255,255,255,0.07)`,o.lineWidth=1,[.25,.5,.75].forEach(e=>{let t=20+132*(1-e);o.beginPath(),o.moveTo(10,t),o.lineTo(a-10,t),o.stroke()}),o.fillStyle=`#A3A3A3`,o.font=`9px 'JetBrains Mono', monospace`,o.textAlign=`center`,r.forEach((e,t)=>{e.label&&o.fillText(e.label,g(t),174)}),s.length>1){let e=o.createLinearGradient(0,20,0,152);e.addColorStop(0,v+`44`),e.addColorStop(1,v+`00`),o.beginPath(),s.forEach((e,t)=>{let n=g(e.i),r=_(e.value);t===0?o.moveTo(n,r):o.lineTo(n,r)}),o.lineTo(g(s[s.length-1].i),152),o.lineTo(g(s[0].i),152),o.closePath(),o.fillStyle=e,o.fill(),o.beginPath(),o.strokeStyle=v,o.lineWidth=2,o.lineJoin=`round`,s.forEach((e,t)=>{let n=g(e.i),r=_(e.value);t===0?o.moveTo(n,r):o.lineTo(n,r)}),o.stroke()}s.forEach(e=>{o.beginPath(),o.fillStyle=v,o.arc(g(e.i),_(e.value),3.5,0,Math.PI*2),o.fill()});let b=s[s.length-1];b&&(o.fillStyle=y,o.font=`bold 11px 'JetBrains Mono', monospace`,o.textAlign=`center`,o.fillText(String(b.value),g(b.i),_(b.value)-8))}var $=`toggle`;function sn(){document.getElementById(`section-custom-metrics`).classList.add(`expanded`),document.getElementById(`newMetricForm`).style.display=`block`,document.getElementById(`addMetricBtn`).style.display=`none`,$=`toggle`,document.querySelectorAll(`.nutri-type-btn`).forEach(e=>e.classList.remove(`active`)),document.getElementById(`mtype-toggle`).classList.add(`active`),document.getElementById(`metricUnitRow`).style.display=`none`}function cn(){document.getElementById(`newMetricForm`).style.display=`none`,document.getElementById(`addMetricBtn`).style.display=``}function ln(e){$=e,document.querySelectorAll(`.nutri-type-btn`).forEach(e=>e.classList.remove(`active`)),document.getElementById(`mtype-`+e).classList.add(`active`),document.getElementById(`metricUnitRow`).style.display=e===`number`?`block`:`none`}async function un(){let e=document.getElementById(`newMetricName`).value.trim();if(!e){z(`Enter a metric name`);return}let t=$===`number`?document.getElementById(`newMetricUnit`).value.trim():``,n=await Z();n.customMetrics.push({id:`cm_`+Date.now(),name:e,type:$,unit:t}),await Yt(n),z(`Added: `+e),await Q()}async function dn(e){let t=await Z();t.customMetrics=t.customMetrics.filter(t=>t.id!==e),await Yt(t),U===e&&(U=`weight`),await Q()}async function fn(){let e=await X(),t=await Z(),n=[`Date`,`Water(cups)`,`Protein(g)`,`Creatine`,`Weight(lbs)`,`Sleep(hrs)`,...t.customMetrics.map(e=>e.name+(e.unit?`(`+e.unit+`)`:``))].join(`,`)+`
`;Object.entries(e).sort(([e],[t])=>e<t?-1:1).forEach(([e,r])=>{let i=t.customMetrics.map(e=>{let t=(r.custom||{})[e.id];return t==null?``:String(t)});n+=[e,r.water||0,r.protein||0,r.creatine?`true`:`false`,r.weight??``,r.sleep??``,...i].join(`,`)+`
`}),await Wt(`nutrition.csv`,n)}function pn(){window.showOpenFilePicker?window.showOpenFilePicker({multiple:!1}).then(async([e])=>{hn(await(await e.getFile()).text())}).catch(()=>{}):document.getElementById(`nutriCsvInput`).click()}function mn(e){let t=e.files[0];if(!t)return;let n=new FileReader;n.onload=t=>{hn(t.target.result),e.value=``},n.readAsText(t)}async function hn(e){let t=e.split(`
`).map(e=>e.trim()).filter(Boolean);if(t.length<2){z(`No data found in file`);return}let n=await X(),r=0;t.slice(1).forEach(e=>{let t=e.split(`,`),i=t[0]?.trim();if(!i)return;let a={water:parseFloat(t[1])||0,protein:parseFloat(t[2])||0,creatine:t[3]?.trim()===`true`,weight:t[4]?.trim()?parseFloat(t[4]):null,sleep:t[5]?.trim()?parseFloat(t[5]):null,custom:n[i]?.custom||{}};n[i]||r++,n[i]={...n[i],...a}}),await S(`gymdash_nutrition`,n),z(`Imported `+r+` nutrition entries`),await Q()}`serviceWorker`in navigator&&window.addEventListener(`load`,()=>{navigator.serviceWorker.register(`./sw.js`).catch(()=>{})}),document.getElementById(`topbarDate`).textContent=new Date().toLocaleDateString(`en-US`,{weekday:`short`,month:`short`,day:`numeric`}),Ne(),$e().catch(e=>{console.error(`GymDash init failed:`,e)}),Object.assign(window,{addExercise:It,addNewRoutineEx:zt,addSet:at,adjustNutritionCustom:en,adjustWater:Xt,cancelGoalForm:At,cancelNewMetric:cn,cancelNewRoutine:Rt,deleteCustomMetric:dn,deleteGoal:Mt,deleteWorkout:dt,exportCSV:Gt,exportNutritionCSV:fn,finishWorkout:st,handleImport:qt,handleNutritionImport:mn,nextHistoryMonth:pt,onExerciseChange:it,openSettings:Fe,prevHistoryMonth:ft,removeExercise:Ft,removeNewRoutineEx:Bt,removeSet:ot,saveNewCustomMetric:un,saveNewGoal:jt,saveNewRoutine:Ht,saveNutritionCustomNumber:tn,saveNutritionSimple:Qt,selectHistoryDay:mt,selectMetricType:ln,selectRoutine:rt,setNutriChartMetric:nn,setNutriChartRange:rn,setTheme:Pe,showAddMetricForm:sn,showGoalForm:kt,showNewRoutineForm:Lt,switchTab:k,toggleCreatine:Zt,toggleNutritionCustom:$t,togglePRGroup:_t,toggleRoutine:Nt,toggleSession:ht,toggleSessionGroup:vt,toggleSettingsSection:Pt,triggerImport:Ut,triggerNutritionImport:pn});export{E as t};