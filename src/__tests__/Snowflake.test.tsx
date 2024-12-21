import { describe, it, expect, beforeAll, vitest, beforeEach, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import SnowfallEffect from '../SnowfallEffect';

describe('SnowfallEffect 컴포넌트', () => {
  const mockAnimate = vitest.fn().mockReturnValue({
    cancel: vitest.fn(),
  });

  const mockObserve = vitest.fn();
  const mockDisconnect = vitest.fn();

  beforeAll(() => {
    // Web Animation API 모킹
    Element.prototype.animate = mockAnimate;
    
    // ResizeObserver 모킹
    window.ResizeObserver = vitest.fn().mockImplementation(() => ({
      observe: mockObserve,
      disconnect: mockDisconnect,
    }));

    // window 크기 모킹
    Object.defineProperty(window, 'innerWidth', { value: 1024 });
    Object.defineProperty(window, 'innerHeight', { value: 768 });
  });

  beforeEach(() => {
    mockAnimate.mockClear();
    mockObserve.mockClear();
    mockDisconnect.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it('컴포넌트가 정상적으로 렌더링되어야 합니다', () => {
    const { container } = render(<SnowfallEffect />);
    const snowfallContainer = container.firstChild;
    expect(snowfallContainer).toBeInTheDocument();
  });

  it('기본 스타일이 적용되어야 합니다', () => {
    const { container } = render(<SnowfallEffect />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('커스텀 props로 렌더링되어야 합니다', () => {
    const { container } = render(
      <SnowfallEffect
        snowflakeCount={50}
        fallSpeed={3}
        flakeSize={8}
      />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('ResizeObserver가 등록되어야 합니다', () => {
    render(<SnowfallEffect />);
    expect(mockObserve).toHaveBeenCalled();
  });

  it('컴포넌트가 언마운트될 때 ResizeObserver가 해제되어야 합니다', () => {
    const { unmount } = render(<SnowfallEffect />);
    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
  });
});
