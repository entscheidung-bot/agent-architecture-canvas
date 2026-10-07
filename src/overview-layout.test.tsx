// @vitest-environment jsdom
import React from 'react';
import { test, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import App from './App';

afterEach(() => { cleanup(); localStorage.clear(); location.hash = ''; });

test('overview follows the supplied contract-first editorial order', () => {
  render(<App />);
  const headings = screen.getAllByRole('heading', { level: 3 }).map(h => h.textContent);
  expect(headings.slice(0, 2)).toEqual(['01 / Agent contract', '02 / Canvas completion']);
  const contract = screen.getByLabelText('This agent may');
  const matrix = screen.getByRole('heading', { name: '02 / Canvas completion' });
  expect(contract.compareDocumentPosition(matrix) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(document.querySelector('.overview-metrics')).toBeNull();
});
