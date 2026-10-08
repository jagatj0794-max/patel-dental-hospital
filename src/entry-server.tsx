/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App.tsx';

// Guard global objects during Server-Side Rendering (SSG)
if (typeof globalThis.window === 'undefined') {
  const dummyStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    length: 0,
    key: () => null,
  };
  (globalThis as any).window = {
    location: {
      pathname: '/',
      search: '',
      hash: '',
      href: 'https://pdhrajkot.com/',
      origin: 'https://pdhrajkot.com',
      hostname: 'pdhrajkot.com',
      host: 'pdhrajkot.com',
      protocol: 'https:',
      port: '',
    },
    localStorage: dummyStorage,
    sessionStorage: dummyStorage,
    scrollTo: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    matchMedia: () => ({ matches: false, addListener: () => {}, removeListener: () => {} }),
  };
  (globalThis as any).document = {
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    createElement: () => ({ setAttribute: () => {}, appendChild: () => {} }),
    head: { appendChild: () => {} },
    body: { appendChild: () => {} },
  };
  (globalThis as any).localStorage = dummyStorage;
  (globalThis as any).sessionStorage = dummyStorage;
}

export function render(pageId: string, preloadedData?: any) {
  return ReactDOMServer.renderToString(
    <App initialPage={pageId as any} preloadedData={preloadedData} initialLanguage="gu" />
  );
}
