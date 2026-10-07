import fs from 'node:fs';
import vm from 'node:vm';
const html=fs.readFileSync('/opt/data/cache/documents/doc_ef780d102317_agent-architecture-canvas (1).html','utf8');
const part=html.slice(html.indexOf('const colorMap='),html.indexOf('let activeTab='));
const data=vm.runInNewContext(part+';JSON.stringify({colorMap,tableSchemas,canvases})');
fs.mkdirSync('src/domain',{recursive:true});fs.writeFileSync('src/domain/reference.json',data);
console.log('Reference definitions extracted');
