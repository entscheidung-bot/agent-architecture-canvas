// @vitest-environment jsdom
import React from 'react';
import {test,expect,vi,afterEach} from 'vitest';
import {render,screen,fireEvent,cleanup} from '@testing-library/react';
import {DecisionCard} from './components';
import {createArchitecture} from './domain/model';
afterEach(cleanup);
test('all 84 original decisions expose distinct tailored placeholders and collapsed illustrative examples without changing answers',()=>{
 const decisions=createArchitecture().decisions; expect(decisions).toHaveLength(84);
 const placeholders=new Set<string>(),examples=new Set<string>();
 for(const d of decisions){const change=vi.fn();const before=JSON.stringify(d);const {container,unmount}=render(<DecisionCard d={d} onChange={change}/>);
 const input=screen.getByLabelText('Decision') as HTMLTextAreaElement;expect(input.placeholder).not.toBe('Write the architecture decision…');expect(input.value).toBe('');placeholders.add(input.placeholder);
 const summary=screen.getByText('Example answer');const details=summary.closest('details')!;expect(details.open).toBe(false);expect(details.closest('.decision-guidance')).not.toBeNull();expect(details.textContent).toContain('Illustrative only — adapt to your architecture.');
 examples.add(details.querySelector('[data-example]')!.textContent!);fireEvent.click(summary);expect(change).not.toHaveBeenCalled();expect(JSON.stringify(d)).toBe(before);expect(container.querySelector('select')!.value).toBe('NEEDS_DECISION');unmount();}
 expect(placeholders.size).toBe(84);expect(examples.size).toBe(84);
});
test('unknown IDs and changed original titles never receive unrelated examples',()=>{for(const patch of [{id:'definition.999'},{title:'Imported custom question'}]){const d={...createArchitecture().decisions[0],...patch};const {unmount}=render(<DecisionCard d={d} onChange={()=>{}}/>);expect(screen.queryByText('Example answer')).toBeNull();expect((screen.getByLabelText('Decision') as HTMLTextAreaElement).placeholder).toBe('Write the architecture decision…');unmount();}});
 test('example expansion preserves entered answer, notes and status',()=>{const d={...createArchitecture().decisions[0],decision:'Our actual choice',notes:'Reviewed',status:'DEFINED' as const};const change=vi.fn();render(<DecisionCard d={d} onChange={change}/>);fireEvent.click(screen.getByText('Example answer'));expect((screen.getByLabelText('Decision') as HTMLTextAreaElement).value).toBe('Our actual choice');expect((screen.getByLabelText('Review notes') as HTMLTextAreaElement).value).toBe('Reviewed');expect(change).not.toHaveBeenCalled();});
 test('native example disclosure opens and closes',()=>{render(<DecisionCard d={createArchitecture().decisions[0]} onChange={()=>{}}/>);const summary=screen.getByText('Example answer');const details=summary.closest('details')!;summary.click();expect(details.open).toBe(true);summary.click();expect(details.open).toBe(false);});
 test('placeholder edits still use existing decision callback',()=>{const d=createArchitecture().decisions[0];const change=vi.fn();render(<DecisionCard d={d} onChange={change}/>);fireEvent.change(screen.getByLabelText('Decision'),{target:{value:'A real decision'}});expect(change).toHaveBeenCalledWith({...d,decision:'A real decision'});});
 