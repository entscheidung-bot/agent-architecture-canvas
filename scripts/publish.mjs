import fs from 'node:fs';import{execFileSync}from'node:child_process';
const token=process.env.GH_PAT_TOKEN;if(!token)throw Error('GH_PAT_TOKEN missing');
async function api(path,method='GET',body){const r=await fetch('https://api.github.com'+path,{method,headers:{Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'},body:body?JSON.stringify(body):undefined});const data=await r.json().catch(()=>({}));if(!r.ok)throw Error(`${method} ${path}: ${r.status} ${data.message}`);return data;}
const user=await api('/user'),name='agent-architecture-canvas',full=user.login+'/'+name;
let repo;try{repo=await api('/repos/'+full);}catch{repo=await api('/user/repos','POST',{name,private:false,description:'Client-side Agent Architecture Canvas workbench'});}
if(repo.private)throw Error('Existing repository is private; refusing public conversion');
fs.writeFileSync('/opt/data/canvas-publication.json',JSON.stringify({repo:repo.html_url,full,url:`https://${user.login}.github.io/${name}/`},null,2));
const git=(...args)=>execFileSync('git',args,{stdio:'inherit'});try{git('rev-parse','--git-dir');}catch{git('init','-b','main');}git('config','user.name',user.name||user.login);git('config','user.email',`${user.id}+${user.login}@users.noreply.github.com`);try{git('remote','add','origin',repo.clone_url);}catch{git('remote','set-url','origin',repo.clone_url);}git('add','.');git('commit','-m','feat: ship Agent Architecture Canvas workbench');
const ask='/opt/data/canvas-askpass.sh';fs.writeFileSync(ask,'#!/bin/sh\ncase "$1" in\n*Username*) printf "%s\\n" x-access-token;;\n*Password*) printf "%s\\n" "$GH_PAT_TOKEN";;\nesac\n',{mode:0o700});try{execFileSync('git',['push','-u','origin','main'],{stdio:'inherit',env:{...process.env,GIT_ASKPASS:ask,GIT_TERMINAL_PROMPT:'0'}});}finally{fs.unlinkSync(ask);}
try{await api('/repos/'+full+'/pages','POST',{build_type:'workflow'});}catch(e){if(String(e).includes('409'))await api('/repos/'+full+'/pages','PUT',{build_type:'workflow'});else console.log(String(e));}
console.log(JSON.stringify({repo:repo.html_url,url:`https://${user.login}.github.io/${name}/`}));
