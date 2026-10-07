// @vitest-environment jsdom
import React from 'react';
import {test,expect,afterEach} from 'vitest';
import {render,screen,cleanup} from '@testing-library/react';
import App from './App';
afterEach(()=>{cleanup();location.hash='';localStorage.clear();});
test('decision canvas exposes numbered editorial columns and score',()=>{
 location.hash='#/definition';render(<App/>);
 expect(screen.getByText('What must be defined')).toBeTruthy();
 expect(document.querySelector('.decision-number')?.textContent).toBe('01');
 expect(document.querySelector('.page-score')).toBeTruthy();
 expect(document.querySelector('.decision-grid')).toBeTruthy();
});
 test('overview retains editable contract',()=>{render(<App/>);expect(screen.getByLabelText('This agent may')).toBeTruthy();expect(screen.getByLabelText('But must never')).toBeTruthy();});
 test('prototype tokens remain exact',async()=>{// @ts-expect-error Node runtime builtin available to Vitest
const fs=await import('node:fs');const css=fs.readFileSync('src/style.css','utf8');expect(css).toContain('max-width:1500px');expect(css).toContain('grid-template-columns:1.2fr .8fr');expect(css).toContain('font-size:42px');});
