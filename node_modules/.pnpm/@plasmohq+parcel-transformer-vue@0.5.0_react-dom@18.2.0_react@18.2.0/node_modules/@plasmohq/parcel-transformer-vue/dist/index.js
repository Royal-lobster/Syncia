var T=Object.create;var M=Object.defineProperty;var U=Object.getOwnPropertyDescriptor;var q=Object.getOwnPropertyNames;var x=Object.getPrototypeOf,A=Object.prototype.hasOwnProperty;var F=(e,t)=>{for(var r in t)M(e,r,{get:t[r],enumerable:!0})},b=(e,t,r,p)=>{if(t&&typeof t=="object"||typeof t=="function")for(let c of q(t))!A.call(e,c)&&c!==r&&M(e,c,{get:()=>t[c],enumerable:!(p=U(t,c))||p.enumerable});return e};var _=(e,t,r)=>(r=e!=null?T(x(e)):{},b(t||!e||!e.__esModule?M(r,"default",{value:e,enumerable:!0}):r,e)),K=e=>b(M({},"__esModule",{value:!0}),e);var V={};F(V,{default:()=>B});module.exports=K(V);var d=require("path"),a=_(require("@parcel/diagnostic")),v=require("@parcel/plugin"),R=_(require("@parcel/source-map")),O=require("@parcel/utils"),g=_(require("@vue/compiler-sfc")),k=_(require("nullthrows")),E=_(require("semver")),N=_(require("@plasmohq/consolidate")),I=/\.module\./,B=new v.Transformer({async loadConfig({config:e}){let t=await e.getConfig([".vuerc",".vuerc.json",".vuerc.js","vue.config.js"],{packageKey:"vue"}),r={};if(t&&(e.invalidateOnStartup(),r=t.contents,typeof r!="object"))throw new a.default({diagnostic:{message:"Vue config should be an object.",origin:"@parcel/transformer-vue"}});return{customBlocks:r.customBlocks||{},filePath:t&&t.filePath,compilerOptions:r.compilerOptions||{}}},canReuseAST({ast:e}){return e.type==="vue"&&E.default.satisfies(e.version,"^3.0.0")},async parse({asset:e,options:t}){let r=await e.getCode(),p=g.parse(r,{sourceMap:!0,filename:e.filePath});if(p.errors.length)throw new a.default({diagnostic:p.errors.map(w=>S(w,e.filePath))});let c=p.descriptor,m=(0,O.hashObject)({filePath:e.filePath,source:t.mode==="production"?r:null}).slice(-6);return{type:"vue",version:"3.0.0",program:{...c,script:c.script!=null||c.scriptSetup!=null?g.compileScript(c,{id:m,isProd:t.mode==="production"}):null,id:m}}},async transform({asset:e,options:t,resolve:r,config:p}){let{template:c,script:m,styles:w,customBlocks:s,id:f}=(0,k.default)(await e.getAST()).program,y="data-v-"+f,h=f+"-hmr",n=(0,d.basename)(e.filePath);return e.pipeline!=null?C({asset:e,template:c,script:m,styles:w,customBlocks:s,config:p,basePath:n,options:t,resolve:r,id:f,hmrId:h}):[{type:"js",uniqueKey:e.id+"-glue",content:`
 let script;
 let initialize = () => {
   script = ${m!=null?`require('script:./${n}');
   if (script.__esModule) script = script.default`:"{}"};
   ${c!=null?`script.render = require('template:./${n}').render;`:""}
   ${w.length!==0?`script.__cssModules = require('style:./${n}').default;`:""}
   ${s!=null?`require('custom:./${n}').default(script);`:""}
   script.__scopeId = '${y}';
   script.__file = ${JSON.stringify(t.mode==="production"?n:e.filePath)};
 };
 initialize();
 ${t.hmrOptions?`if (module.hot) {
   script.__hmrId = '${h}';
   module.hot.accept(() => {
     setTimeout(() => {
       initialize();
       if (!__VUE_HMR_RUNTIME__.createRecord('${h}', script)) {
         __VUE_HMR_RUNTIME__.reload('${h}', script);
       }
     }, 0);
   });
 }`:""}
 export default script;`}]}});function S(e,t){if(typeof e=="string")return{message:e,origin:"@parcel/transformer-vue",filePath:t};let r={message:(0,a.escapeMarkdown)(e.message),origin:"@parcel/transformer-vue",name:e.name,stack:e.stack};return e.loc&&(r.codeFrames=[{codeHighlights:[{start:{line:e.loc.start.line+e.loc.start.offset,column:e.loc.start.column},end:{line:e.loc.end.line+e.loc.end.offset,column:e.loc.end.column}}]}]),r}async function C({asset:e,template:t,script:r,styles:p,customBlocks:c,config:m,basePath:w,options:s,resolve:f,id:y,hmrId:h}){switch(e.pipeline){case"template":{t.src&&(t.content=(await s.inputFS.readFile(await f(e.filePath,t.src))).toString(),t.lang=(0,d.extname)(t.src).slice(1));let n=t.content;if(t.lang&&!["htm","html"].includes(t.lang)){let o={},l=N.default[t.lang];switch(t.lang){case"pug":o.doctype="html";break}if(!l)throw new a.default({diagnostic:{message:(0,a.md)([`Unknown template language: "${t.lang}"`]),origin:"@parcel/transformer-vue"}});n=await l.render(n,o)}let u=g.compileTemplate({filename:e.filePath,source:n,inMap:t.src?void 0:t.map,scoped:p.some(o=>o.scoped),compilerOptions:{...m.compilerOptions,bindingMetadata:r?r.bindings:void 0},isProd:s.mode==="production",id:y});if(u.errors.length)throw new a.default({diagnostic:u.errors.map(o=>S(o,e.filePath))});return[{type:"js",uniqueKey:e.id+"-template",...!t.src&&e.env.sourceMap&&{map:j(u.map,s.projectRoot)},content:u.code+`
 ${s.hmrOptions?`if (module.hot) {
   module.hot.accept(() => {
     __VUE_HMR_RUNTIME__.rerender('${h}', render);
   })
 }`:""}`}]}case"script":{r.src&&(r.content=(await s.inputFS.readFile(await f(e.filePath,r.src))).toString(),r.lang=(0,d.extname)(r.src).slice(1));let n;switch(r.lang||"js"){case"javascript":case"js":n="js";break;case"jsx":n="jsx";break;case"typescript":case"ts":n="ts";break;case"tsx":n="tsx";break;case"coffeescript":case"coffee":n="coffee";break;default:throw new a.default({diagnostic:{message:(0,a.md)([`Unknown script language: "${r.lang}"`]),origin:"@parcel/transformer-vue"}})}return[{type:n,uniqueKey:e.id+"-script",content:r.content,...!r.src&&e.env.sourceMap&&{map:j(r.map,s.projectRoot)}}]}case"style":case"style-raw":{let n={},u=await Promise.all(p.map(async(i,o)=>{switch(i.src&&(i.content=(await s.inputFS.readFile(await f(e.filePath,i.src))).toString(),i.module||(i.module=I.test(i.src)),i.lang=(0,d.extname)(i.src).slice(1)),i.lang){case"less":case"stylus":case"styl":case"scss":case"sass":case"css":case void 0:break;default:throw new a.default({diagnostic:{message:(0,a.md)([`Unknown style language: "${i.lang}"`]),origin:"@parcel/transformer-vue"}})}let l=await g.compileStyleAsync({filename:e.filePath,source:i.content,modules:i.module,preprocessLang:i.lang||"css",scoped:i.scoped,inMap:i.src?void 0:i.map,isProd:s.mode==="production",id:y});if(l.errors.length)throw new a.default({diagnostic:l.errors.map(P=>S(P,e.filePath))});let $={type:"css",content:l.code,sideEffects:!0,...!i.src&&e.env.sourceMap&&{map:j(i.map,s.projectRoot)},uniqueKey:e.id+"-style"+o};return l.modules&&(typeof i.module=="boolean"&&(i.module="$style"),n[i.module]={...n[i.module],...l.modules}),$}));if(e.pipeline=="style")return Object.keys(n).length!==0&&u.push({type:"js",uniqueKey:e.id+"-cssModules",content:`
 import {render} from 'template:./${w}';
 let cssModules = ${JSON.stringify(n)};
 ${s.hmrOptions?`if (module.hot) {
   module.hot.accept(() => {
     __VUE_HMR_RUNTIME__.rerender('${h}', render);
   });
 };`:""}
 export default cssModules;`}),u;if(e.pipeline=="style-raw"){let i=u.map(o=>o.content).join(`
`);return[{type:"js",uniqueKey:e.id+"-cssRawString",content:`
const styleRawString = \`${i}\`
export default styleRawString
          `}]}}case"custom":{let n=[];if(!m)return[];let u=new Set;for(let i of c){let{type:o,src:l,content:$,attrs:P}=i;if(!m.customBlocks[o])throw new a.default({diagnostic:{message:(0,a.md)([`No preprocessor found for block type ${o}`]),origin:"@parcel/transformer-vue"}});l&&($=(await s.inputFS.readFile(await f(e.filePath,l))).toString()),n.push([o,$,P]),u.add(o)}return[{type:"js",uniqueKey:e.id+"-custom",content:`
 let NOOP = () => {};
 ${(await Promise.all([...u].map(async i=>`import p${i} from './${(0,d.relative)((0,d.dirname)(e.filePath),await f((0,k.default)(m.filePath),m.customBlocks[i]))}';
 if (typeof p${i} !== 'function') {
   p${i} = NOOP;
 }`))).join(`
`)}
 export default script => {
   ${n.map(([i,o,l])=>`  p${i}(script, ${JSON.stringify(o)}, ${JSON.stringify(l)});`).join(`
`)}
 }`}]}default:return[]}}function j(e,t){let r=new R.default(t);return r.addVLQMap(e),r}
