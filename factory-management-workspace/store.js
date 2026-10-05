'use strict';
window.Session = (() => {
 const key='factory.management.workspace.v1';
 const blank=()=>({version:1,id:Date.now(),started:new Date().toISOString(),page:0,future:{},notes:{},items:[],processes:[],kpis:[],capabilities:[],owners:{},governance:[],operating:{},blueprint:null,revision:0,timer:{elapsed:0,running:false,since:null}});
 let state; let available=true;
 try {const raw=localStorage.getItem(key);state=raw?JSON.parse(raw):blank();if(state.version!==1||!Array.isArray(state.items))state=blank();}catch{state=blank();available=false;}
 function save(revise=true){if(revise)state.revision++;try{localStorage.setItem(key,JSON.stringify(state));available=true;}catch{available=false;}return available;}
 function item(text,category='مسئله',tag='استراتژی',priority='Medium',extra={}){const row={id:crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random()),text,category,tag,priority,created:new Date().toISOString(),sample:false,owner:'',deadline:'',...extra};state.items.push(row);save();return row;}
 function toggle(field,value){const i=state[field].indexOf(value);i<0?state[field].push(value):state[field].splice(i,1);save();}
 function reset(){state=blank();save(false);}
 function seed(){Model.seed.forEach(([textCat,text,tag,priority])=>item(text,textCat,tag,priority,{sample:true}));save();}
 function elapsed(){const t=state.timer;return t.elapsed+(t.running?Math.floor((Date.now()-t.since)/1000):0);}
 function timer(){const t=state.timer;if(t.running){t.elapsed=elapsed();t.running=false;t.since=null;}else{t.running=true;t.since=Date.now();}save(false);}
 return {get state(){return state;},get available(){return available;},save,item,toggle,reset,seed,elapsed,timer};
})();
