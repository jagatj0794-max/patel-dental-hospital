/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// A secure, silent fallback storage mechanism in case localStorage is blocked in sandboxed iframes.
const memoryStore: Record<string, string> = {};

export const safeStorage = {
  getItem(key: string): string | null {
    try {
      const value = window.localStorage.getItem(key);
      if (value !== null) return value;
    } catch {
      // Suppress SecurityError silently, fallback to memory
    }
    return memoryStore[key] !== undefined ? memoryStore[key] : null;
  },

  setItem(key: string, value: string): void {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // Suppress SecurityError silently, fallback to memory
    }
    memoryStore[key] = value;
  },

  removeItem(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Suppress SecurityError silently
    }
    delete memoryStore[key];
  }
};
