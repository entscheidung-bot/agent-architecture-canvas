// @vitest-environment jsdom
import React from 'react';
import {test,expect,afterEach} from 'vitest';
import {render,screen,cleanup,fireEvent,waitFor} from '@testing-library/react';
import App from './App';
afterEach(()=>{cleanup();localStorage.clear();location.hash='';});
test('numbered contents rail provides all canvases and tablet jump navigation',async()=>{render(<App/>);expect(document.querySelector('.contents-rail')).toBeTruthy();expect(document.querySelectorAll('.contents-rail a').length).toBe(13);const jump=screen.getByLabelText('Jump to canvas');fireEvent.change(jump,{target:{value:'memory'}});await waitFor(()=>expect(screen.getByRole('heading',{level:2,name:'Memory & Context'})).toBeTruthy());expect(location.hash).toBe('#/memory');expect(document.querySelector('.contents-rail a[aria-current="page"]')?.getAttribute('href')).toBe('#/memory');});
test('mobile contents menu exposes links and closes after selecting canvas',async()=>{render(<App/>);const toggle=screen.getByText('Canvases');fireEvent.click(toggle);const menu=document.querySelector('.mobile-contents') as HTMLDetailsElement;expect(menu.open).toBe(true);const link=menu.querySelector('a[href="#/tools"]') as HTMLAnchorElement;fireEvent.click(link);await waitFor(()=>expect(location.hash).toBe('#/tools'));expect(menu.open).toBe(false);});
test('mobile menu has fixed translucent overlay styling',async()=>{// @ts-expect-error Node builtin available in Vitest
const fs=await import('node:fs');const css=fs.readFileSync('src/style.css','utf8');expect(css).toContain('.mobile-contents{position:fixed');expect(css).toContain('background:rgba(255,255,255,.94)');expect(css).toContain('max-height:calc(100dvh - 64px)');});
