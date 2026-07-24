/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// A secure, silent fallback storage mechanism in case localStorage or sessionStorage is blocked in sandboxed iframes.
const memoryStore: Record<string, string> = {};
const sessionMemoryStore: Record<string, string> = {};

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
  },

  getSessionItem(key: string): string | null {
    try {
      const value = window.sessionStorage.getItem(key);
      if (value !== null) return value;
    } catch {
      // Suppress SecurityError silently, fallback to memory
    }
    return sessionMemoryStore[key] !== undefined ? sessionMemoryStore[key] : null;
  },

  setSessionItem(key: string, value: string): void {
    try {
      window.sessionStorage.setItem(key, value);
    } catch {
      // Suppress SecurityError silently, fallback to memory
    }
    sessionMemoryStore[key] = value;
  },

  removeSessionItem(key: string): void {
    try {
      window.sessionStorage.removeItem(key);
    } catch {
      // Suppress SecurityError silently
    }
    delete sessionMemoryStore[key];
  }
};
