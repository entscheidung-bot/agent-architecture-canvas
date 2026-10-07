// @vitest-environment jsdom
import React from 'react';
import {test,expect,afterEach} from 'vitest';
import {render,screen,fireEvent,cleanup,waitFor} from '@testing-library/react';
import App from './App';
Object.defineProperty(globalThis,'localStorage',{value:window.localStorage,configurable:true});
afterEach(()=>{cleanup();localStorage.clear();location.hash='';});
test('loads, dynamic heading, debounced autosave',async()=>{render(<App/>);expect(screen.getByRole('heading',{level:1}).textContent).toContain('Agent Architecture Canvas');fireEvent.change(screen.getByLabelText('Agent / Use Case'),{target:{value:'Support'}});expect(screen.getByRole('heading',{level:1}).textContent).toContain('Support');await waitFor(()=>expect(localStorage.getItem('agent-architecture.v3')).toContain('Support'));});
test('memory rows add, coordinate type colors, remove',()=>{location.hash='#/memory';render(<App/>);fireEvent.click(screen.getByText('Add row'));const select=screen.getByLabelText('Type row 1');fireEvent.change(select,{target:{value:'Semantic'}});expect(select.className).toContain('violet');fireEvent.click(screen.getByLabelText('Remove row 1'));expect(screen.queryByLabelText('Type row 1')).toBeNull();});
test('reset requires confirmation and cancel preserves data',()=>{render(<App/>);fireEvent.change(screen.getByLabelText('Agent / Use Case'),{target:{value:'Keep'}});fireEvent.click(screen.getByText('New architecture'));expect(screen.getByRole('dialog')).toBeTruthy();fireEvent.click(screen.getByText('Cancel'));expect((screen.getByLabelText('Agent / Use Case') as HTMLInputElement).value).toBe('Keep');});
