// Type declarations for polyfill packages

declare module 'smoothscroll-polyfill' {
  export function polyfill(): void;
}

declare module 'intersection-observer' {
  // IntersectionObserver polyfill types
  interface IntersectionObserverEntry {
    readonly boundingClientRect: DOMRectReadOnly;
    readonly intersectionRatio: number;
    readonly intersectionRect: DOMRectReadOnly;
    readonly isIntersecting: boolean;
    readonly rootBounds: DOMRectReadOnly | null;
    readonly target: Element;
    readonly time: number;
  }

  interface IntersectionObserverCallback {
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void;
  }

  class IntersectionObserver {
    constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit);
    readonly root: Element | null;
    readonly rootMargin: string;
    readonly thresholds: readonly number[];
    disconnect(): void;
    observe(target: Element): void;
    unobserve(target: Element): void;
    takeRecords(): IntersectionObserverEntry[];
  }

  global {
    interface IntersectionObserverInit {
      root?: Element | null;
      rootMargin?: string;
      threshold?: number | number[];
    }
  }
}

// Global browser info interface
declare global {
  interface Window {
    __browserInfo?: {
      isWebGLSupported: boolean;
      isWebGL2Supported: boolean;
      isModernBrowser: boolean;
      isSafari: boolean;
      isFirefox: boolean;
      isChrome: boolean;
      isEdge: boolean;
      isIE: boolean;
      supportsTouch: boolean;
      supportsIntersectionObserver: boolean;
      supportsRequestAnimationFrame: boolean;
      supportsCSSGrid: boolean;
      supportsFlexbox: boolean;
      supportsES6: boolean;
    };
  }
}

export {};