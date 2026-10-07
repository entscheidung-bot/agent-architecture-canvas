import {test,expect} from 'vitest';
import {createArchitecture,parseArchitecture,schema} from './model';
test('resource boundary rejects invalid categorical values',()=>{const a=createArchitecture();a.inventories.memory=[{id:'memory-test',type:'Bogus'}];expect(()=>schema.parse(a)).toThrow();});
 test('legacy resource categories migrate to canonical enums',()=>{const a=parseArchitecture(JSON.stringify({schemaVersion:'2.0',application:'Agent Architecture Canvas Pack',fields:{},tables:{memory:[{type:'Semantic'}],tools:[{access:'Read',sideEffect:'Financial'}]}}));expect(a.inventories.memory[0].type).toBe('SEMANTIC');expect(a.inventories.tools[0].access).toBe('READ');});
 test('resource fields reject undeclared properties',()=>{const a=createArchitecture();a.inventories.tools=[{id:'tool',surprise:'secret'}];expect(()=>schema.parse(a)).toThrow();});
