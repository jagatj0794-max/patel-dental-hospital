/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App.tsx';

export function render(pageId: string) {
  return ReactDOMServer.renderToString(
    <App initialPage={pageId as any} />
  );
}
