import React, { useEffect, useRef, useMemo } from "react";

// 상수 정의
const MAX_SPEED = 20;
const MAX_SIZE = 100;

interface SnowflakeProps {
  fallSpeed: number;
  size: number | 'mix';
  opacity: number;
  shape: string;
  width: number;
  height: number;
  startY: number;
}

function SnowflakeParticle({
  fallSpeed,
  size,
  opacity,
  shape,
  width,
  height,
  startY,
}: SnowflakeProps) {
  const flakeRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<Animation | null>(null);

  // 속도와 크기 제한 적용
  const limitedFallSpeed = useMemo(() => 
    Math.min(Math.max(fallSpeed, 0.1), MAX_SPEED),
    [fallSpeed]
  );
  
  // 크기를 메모이제이션
  const particleSize = useMemo(() => {
    if (size === 'mix') {
      return Math.min(Math.floor(Math.random() * 3) + 4, MAX_SIZE);
    }
    return Math.min(Math.max(size, 1), MAX_SIZE);
  }, [size]);

  // 화면 높이에 따른 기본 지속 시간 계산
  const baseDuration = useMemo(() => {
    const distance = Math.abs(startY) + height;
    return distance * 15;
  }, [height, startY]);

  // 각 눈송이의 고유한 흔들림 특성 계산
  const swayProperties = useMemo(() => ({
    amount: 15 + (Math.random() * 15),
    frequency: 0.5 + (Math.random() * 0.5),
    phase: Math.random() * Math.PI * 2,
  }), []);

  useEffect(() => {
    const flake = flakeRef.current;
    if (!flake) return;

    const cleanup = () => {
      if (animationRef.current) {
        animationRef.current.cancel();
        animationRef.current = null;
      }
    };

    // 스타일 설정을 한 번에 처리
    Object.assign(flake.style, {
      fontSize: `${particleSize}px`,
      opacity: `${opacity}`,
      position: 'absolute',
      willChange: 'transform',
      pointerEvents: 'none',
      userSelect: 'none',
    });

    const initialX = Math.random() * width;
    const duration = baseDuration / Math.max(limitedFallSpeed, 0.1);

    // 키프레임 최적화: 프레임 수를 줄이고 transform3d 사용
    const keyframes = new Array(50).fill(null).map((_, i) => {
      const progress = i / 49;
      const swayX = Math.sin(progress * Math.PI * 2 * swayProperties.frequency + swayProperties.phase) * swayProperties.amount;
      const currentY = startY + (height + particleSize - startY) * progress;
      
      return {
        transform: `translate3d(${initialX + swayX}px, ${currentY}px, 0)`,
        offset: progress
      };
    });

    cleanup();

    animationRef.current = flake.animate(keyframes, {
      duration,
      iterations: Infinity,
      easing: 'linear',
      composite: 'replace',
    });

    return cleanup;
  }, [height, width, opacity, limitedFallSpeed, particleSize, startY, baseDuration, swayProperties]);

  return (
    <div ref={flakeRef}>
      {shape}
    </div>
  );
}

export default React.memo(SnowflakeParticle);
