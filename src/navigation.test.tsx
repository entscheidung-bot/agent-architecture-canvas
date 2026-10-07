// @vitest-environment jsdom
import React from 'react';
import {test,expect,afterEach} from 'vitest';
import {render,screen,cleanup,fireEvent,waitFor} from '@testing-library/react';
import App from './App';
afterEach(()=>{cleanup();localStorage.clear();location.hash='';});
test('numbered contents rail provides all canvases and tablet jump navigation',async()=>{render(<App/>);expect(document.querySelector('.contents-rail')).toBeTruthy();expect(document.querySelectorAll('.contents-rail a').length).toBe(13);const jump=screen.getByLabelText('Jump to canvas');fireEvent.change(jump,{target:{value:'memory'}});await waitFor(()=>expect(screen.getByRole('heading',{level:2,name:'Memory & Context'})).toBeTruthy());expect(location.hash).toBe('#/memory');expect(document.querySelector('.contents-rail a[aria-current="page"]')?.getAttribute('href')).toBe('#/memory');});
