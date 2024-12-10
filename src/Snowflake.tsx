import React, { useEffect, useRef } from "react";
import "./styles/Snowflake.css";

interface SnowflakeProps {
  fallSpeed: number; // 낙하 속도
  size: number; // 눈송이 크기
  opacity: number; // 눈송이 투명도
  shape: string; // 눈송이 모양 (이모지, 텍스트 등)
}

const Snowflake: React.FC<SnowflakeProps> = ({
  fallSpeed,
  size,
  opacity,
  shape,
}) => {
  const flakeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const flake = flakeRef.current;
    if (!flake) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 초기 위치를 화면 전체에 고르게 분포
    const startX = Math.random() * width;
    const startY = Math.random() * height - height; // 화면 위쪽에서 시작하되 고르게 분포

    // 눈송이 위치와 스타일 초기화
    flake.style.left = `${startX}px`;
    flake.style.top = `${startY}px`;
    flake.style.fontSize = `${size}px`;
    flake.style.opacity = `${opacity}`;

    let startTime: number | null = null;

    // 눈송이 애니메이션 함수
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;

      // Y 위치 업데이트 (일정한 하강 속도)
      const y = startY + elapsed * fallSpeed * 50;
      flake.style.top = `${y}px`;

      // X 위치 흔들리게 하기
      const swayAmount = 30 + (startX % 20); // 30~50px 사이의 흔들림 폭
      const swaySpeed = 0.5 + (startX % 1); // 더 천천히 흔들리도록 속도 조절
      const x = startX + Math.sin(elapsed * swaySpeed) * swayAmount;
      flake.style.left = `${x}px`;

      // 회전 효과
      const rotation = (elapsed * (10 + (startX % 20))); // 회전 속도 감소
      flake.style.transform = `rotate(${rotation}deg)`;

      if (y < height + 50) {
        requestAnimationFrame(animate);
      } else {
        // 화면을 벗어나면 위에서 다시 시작
        const newX = Math.random() * width;
        flake.style.left = `${newX}px`;
        flake.style.top = `${-200}px`; // 항상 화면 위에서 시작
        startTime = null;
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [fallSpeed]);

  return (
    <div ref={flakeRef} className='snowflake'>
      {shape}
    </div>
  );
};

export default Snowflake;
