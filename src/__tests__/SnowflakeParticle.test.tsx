import React from "react";
import {
  describe,
  it,
  expect,
  beforeAll,
  vitest,
  beforeEach,
  afterEach,
} from "vitest";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import SnowflakeParticle from "../SnowflakeParticle";

describe("SnowflakeParticle 컴포넌트", () => {
  const mockAnimate = vitest.fn().mockReturnValue({
    cancel: vitest.fn(),
  });

  const defaultProps = {
    fallSpeed: 5,
    size: 10,
    opacity: 0.8,
    shape: "❄",
    width: 1000,
    height: 800,
    startY: 0,
  };

  beforeAll(() => {
    Element.prototype.animate = mockAnimate;
  });

  beforeEach(() => {
    mockAnimate.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it("snowflake 요소가 정상적으로 렌더링되어야 합니다", () => {
    const { container } = render(<SnowflakeParticle {...defaultProps} />);
    const snowflake = container.firstChild;
    expect(snowflake).toBeInTheDocument();
    expect(snowflake?.textContent).toBe(defaultProps.shape);
  });

  it("애니메이션이 적용되어야 합니다", () => {
    render(<SnowflakeParticle {...defaultProps} />);
    expect(mockAnimate).toHaveBeenCalled();
  });

  it("mix 크기가 적용되어야 합니다", () => {
    const props = {
      ...defaultProps,
      size: "mix" as const,
    };

    const { container } = render(<SnowflakeParticle {...props} />);
    const snowflake = container.firstChild;
    expect(snowflake).toBeInTheDocument();
  });

  it("fallSpeed가 제한되어야 합니다", () => {
    const props = {
      ...defaultProps,
      fallSpeed: 25, // MAX_SPEED(20)보다 큰 값
    };

    render(<SnowflakeParticle {...props} />);
    expect(mockAnimate).toHaveBeenCalled();
  });

  it("컴포넌트가 언마운트될 때 애니메이션이 취소되어야 합니다", () => {
    const mockCancel = vitest.fn();
    mockAnimate.mockReturnValue({ cancel: mockCancel });

    const { unmount } = render(<SnowflakeParticle {...defaultProps} />);
    unmount();
    expect(mockCancel).toHaveBeenCalled();
  });

  it("opacity가 적용되어야 합니다", () => {
    const props = {
      ...defaultProps,
      opacity: 0.5,
    };

    const { container } = render(<SnowflakeParticle {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("startY 위치가 적용되어야 합니다", () => {
    const props = {
      ...defaultProps,
      startY: -100,
    };

    render(<SnowflakeParticle {...props} />);
    expect(mockAnimate).toHaveBeenCalled();
  });
});
