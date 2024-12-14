import React, { useEffect, useRef, useMemo, useCallback } from "react";

interface SnowflakeProps {
  fallSpeed: number; // 낙하 속도
  size: number | 'random'; // 눈송이 크기
  opacity: number; // 눈송이 투명도
  shape: string; // 눈송이 모양 (이모지, 텍스트 등)
}

const SnowflakeParticle: React.FC<SnowflakeProps> = ({
  fallSpeed,
  size,
  opacity,
  shape,
}) => {
  const flakeRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number>();
  const positionRef = useRef({ x: 0, y: 0 });

  // 초기 위치 계산을 메모이제이션
  const initialPosition = useMemo(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return {
      x: Math.random() * width,
      y: Math.random() * height * -1, // 화면 위쪽에 고르게 분포
    };
  }, []);

  // 크기를 메모이제이션
  const particleSize = useMemo(() => {
    if (size === 'random') {
      return Math.floor(Math.random() * 3) + 4; // 4~6px
    }
    return size;
  }, [size]);

  // 애니메이션 로직을 useCallback으로 최적화
  const animate = useCallback((timestamp: number) => {
    const flake = flakeRef.current;
    if (!flake) return;

    if (!positionRef.current.x) {
      positionRef.current = { ...initialPosition };
    }

    const elapsed = timestamp / 1000;
    
    // Y 위치 업데이트 (일정한 하강 속도)
    positionRef.current.y += fallSpeed * 0.5;
    
    // X 위치 흔들리게 하기 (더 부드러운 움직임)
    const swayAmount = 15 + (initialPosition.x % 10);
    const swaySpeed = 0.3 + (initialPosition.x % 0.5);
    const x = initialPosition.x + Math.sin(elapsed * swaySpeed) * swayAmount;
    
    // transform을 사용하여 하드웨어 가속 활용
    flake.style.transform = `translate3d(${x}px, ${positionRef.current.y}px, 0)`;

    // 화면 밖으로 나가면 위로 재배치
    if (positionRef.current.y > window.innerHeight + particleSize) {
      positionRef.current.y = -particleSize * 2;  // 화면 위에서 약간의 여유를 두고 시작
      positionRef.current.x = Math.random() * window.innerWidth;
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [fallSpeed, initialPosition, particleSize]);

  useEffect(() => {
    const flake = flakeRef.current;
    if (!flake) return;

    // 초기 스타일 설정
    flake.style.fontSize = `${particleSize}px`;
    flake.style.opacity = `${opacity}`;
    
    // 애니메이션 시작
    animationFrameRef.current = requestAnimationFrame(animate);

    // 클린업 함수
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate, opacity, particleSize]);

  return (
    <div ref={flakeRef}>
      {shape}
    </div>
  );
};

export default React.memo(SnowflakeParticle);
