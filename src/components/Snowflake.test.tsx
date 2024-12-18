import { describe, it, expect, beforeAll, vitest } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SnowfallEffect from '../SnowfallEffect';

// Web APIs 모킹
beforeAll(() => {
  // Web Animation API 모킹
  Element.prototype.animate = vitest.fn();
  
  // ResizeObserver 모킹
  window.ResizeObserver = class ResizeObserver {
    observe = vitest.fn();
    unobserve = vitest.fn();
    disconnect = vitest.fn();
  } as unknown as typeof ResizeObserver;

  // window 크기 모킹
  Object.defineProperty(window, 'innerWidth', { value: 1024 });
  Object.defineProperty(window, 'innerHeight', { value: 768 });
});

describe('SnowfallEffect 컴포넌트', () => {
  it('컴포넌트가 정상적으로 렌더링되어야 합니다', () => {
    const { container } = render(<SnowfallEffect />);
    
    // 컴포넌트가 정상적으로 렌더링되었는지 확인
    const snowfallContainer = container.firstChild;
    expect(snowfallContainer).toBeTruthy();
    
    // SnowflakeParticle 컴포넌트들이 렌더링되었는지 확인
    expect(container.querySelector('[style*="position: absolute"]')).toBeTruthy();
  });
});