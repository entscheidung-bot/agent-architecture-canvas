// @vitest-environment jsdom
import React from 'react';
import {test, expect, afterEach} from 'vitest';
import {render, screen, cleanup} from '@testing-library/react';
import App from './App';
afterEach(()=>{cleanup();localStorage.clear();location.hash='';});
test('autonomy dropdown shows original full descriptions',()=>{render(<App/>);expect(screen.getByLabelText('Autonomy level').textContent).toContain('L5 — High-impact autonomous');});
test('original placeholders explain metadata and profile inputs',()=>{render(<App/>);expect(screen.getByPlaceholderText('e.g. Member Support Agent')).toBeTruthy();expect(screen.getByPlaceholderText('Team or person')).toBeTruthy();expect(screen.getByPlaceholderText('v1.0')).toBeTruthy();expect(screen.getByPlaceholderText('Runtime / platform')).toBeTruthy();expect(screen.getByPlaceholderText('Humans, applications, other agents…')).toBeTruthy();expect(screen.getByPlaceholderText('What outcome is this agent accountable for?')).toBeTruthy();});
test('footer restores every original color legend label',()=>{render(<App/>);for(const text of ['Defined / Low / Pass','Needs decision / Medium','Blocker / Critical','Read / Episodic','Semantic','Procedural / Production','Execute / High impact'])expect(screen.getByText(text)).toBeTruthy();expect(document.querySelectorAll('.legend .dot').length).toBe(8);});
test('definition contract groups fields below heading without duplicate autonomy legend',()=>{location.hash='#/definition';render(<App/>);expect(document.querySelector('.definition-contract .contract-fields')).toBeTruthy();expect(screen.queryByText(/L0 Answer only · L1 Recommend/)).toBeNull();});
