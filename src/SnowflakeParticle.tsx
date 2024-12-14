import React, { useEffect, useRef, useMemo } from "react";

// 상수 정의
const MAX_SPEED = 20;
const MAX_SIZE = 100;

interface SnowflakeProps {
  fallSpeed: number; // 낙하 속도
  size: number | 'mix'; // 눈송이 크기
  opacity: number; // 눈송이 투명도
  shape: string; // 눈송이 모양 (이모지, 텍스트 등)
  width: number; // 창 너비
  height: number; // 창 높이
  startY: number; // 시작 Y 위치
}

const SnowflakeParticle: React.FC<SnowflakeProps> = ({
  fallSpeed,
  size,
  opacity,
  shape,
  width,
  height,
  startY,
}) => {
  const flakeRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<Animation | null>(null);

  // 속도와 크기 제한 적용
  const limitedFallSpeed = Math.min(Math.max(fallSpeed, 0.1), MAX_SPEED);
  
  // 크기를 메모이제이션
  const particleSize = useMemo(() => {
    if (size === 'mix') {
      return Math.min(Math.floor(Math.random() * 3) + 4, MAX_SIZE);
    }
    return Math.min(Math.max(size, 1), MAX_SIZE);
  }, [size]);

  // 화면 높이에 따른 기본 지속 시간 계산
  const baseDuration = useMemo(() => {
    // 시작 위치부터 화면 끝까지의 실제 이동 거리 계산
    const distance = Math.abs(startY) + height;
    return distance * 15; // 거리에 비례하는 시간 설정
  }, [height, startY]);

  // 각 눈송이의 고유한 흔들림 특성 계산
  const swayProperties = useMemo(() => {
    return {
      amount: 15 + (Math.random() * 15), // 흔들림 폭 (15-30px)
      frequency: 0.5 + (Math.random() * 0.5), // 천천히 흔들리도록 빈도 유지
      phase: Math.random() * Math.PI * 2, // 초기 위상
    };
  }, []);

  useEffect(() => {
    const flake = flakeRef.current;
    if (!flake) return;

    flake.style.fontSize = `${particleSize}px`;
    flake.style.opacity = `${opacity}`;

    const initialX = Math.random() * width;
    const duration = baseDuration / Math.max(limitedFallSpeed, 0.1);

    // 더 많은 키프레임으로 부드러운 흔들림 생성
    const keyframes = Array.from({ length: 100 }, (_, i) => {
      const progress = i / 99;
      // 시간에 따른 사인파 계산으로 자연스러운 흔들림
      const swayX = Math.sin(progress * Math.PI * 2 * swayProperties.frequency + swayProperties.phase) * swayProperties.amount;
      const currentY = startY + (height + particleSize - startY) * progress;
      
      return {
        transform: `translate3d(${initialX + swayX}px, ${currentY}px, 0)`,
        offset: progress
      };
    });

    const animation = flake.animate(keyframes, {
      duration,
      iterations: Infinity,
      easing: 'linear',
      composite: 'replace',
    });

    animationRef.current = animation;

    return () => {
      if (animationRef.current) {
        animationRef.current.cancel();
      }
    };
  }, [height, width, opacity, limitedFallSpeed, particleSize, startY, baseDuration, swayProperties]);

  return (
    <div 
      ref={flakeRef}
      style={{
        position: 'absolute',
        willChange: 'transform',
        pointerEvents: 'none',
      }}
    >
      {shape}
    </div>
  );
};

export default SnowflakeParticle;
