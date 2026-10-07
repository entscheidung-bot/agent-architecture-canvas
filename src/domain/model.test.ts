import {test,expect} from 'vitest';
import {createArchitecture,parseArchitecture} from './model';
test('new architecture has stable IDs, local review date, 13 canvases, canonical roundtrip',()=>{const a=createArchitecture();expect(a.schemaVersion).toBe('3.0');expect(a.document.lastReviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/);expect(a.decisions.length).toBeGreaterThan(80);expect(parseArchitecture(JSON.stringify(a))).toEqual(a);expect(a.agent.id).toBeTruthy();});
