declare module "react-snow-twinkle" {
  export interface SnowTwinkleProps {
    /**
     * 눈송이의 개수
     * @default 150
     */
    snowflakeCount?: number;

    /**
     * 눈송이가 떨어지는 속도
     * @default 1
     */
    fallSpeed?: number;

    /**
     * 눈송이의 크기
     * @default 3
     */
    flakeSize?: number | "mix";

    /**
     * 눈송이의 투명도
     * @default 1
     */
    opacity?: number;

    /**
     * 눈송이의 모양
     * @default "❆"
     */
    flakeShape?: string;
  }

  export const SnowTwinkle: React.FC<SnowTwinkleProps>;
}
