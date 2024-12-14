# React Snow Twinkle

눈이 내리는 효과를 쉽게 구현할 수 있는 React 컴포넌트입니다.

![React Snow Twinkle Demo](./examples/demo.gif)

## 프로젝트 개요

React Snow Twinkle은 웹사이트나 웹 애플리케이션에 아름다운 눈 내리는 효과를 추가할 수 있는 React 컴포넌트 라이브러리입니다. TypeScript로 작성되어 타입 안정성을 보장하며, 가볍고 사용하기 쉽습니다.

### 주요 기능
- 🎨 완전한 커스터마이징
  - 눈송이 모양 변경 (이모지, 문자, SVG 등)
  - 눈송이 크기 조절 (최대 100px)
  - 투명도 조절
  - 낙하 속도 설정 (1-20 범위)
- ⚡ 성능 최적화
  - 최적화된 애니메이션 렌더링
  - 최대 700개 눈송이 지원
  - 부드러운 움직임 구현
- 💻 개발자 친화적
  - TypeScript로 작성된 타입 안정성
  - 간단한 컴포넌트 통합
  - 직관적인 Props 인터페이스
- 🌐 브라우저 호환성
  - 모던 브라우저 완벽 지원
  - 반응형 디자인
  - 모바일 환경 최적화

### Props 옵션
| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| snowflakeCount | number | 500 | 화면에 표시될 눈송이 개수 (최대 700개) |
| fallSpeed | number | 5 | 눈송이가 떨어지는 속도 (1-20) |
| flakeSize | number | 10 | 눈송이 크기 (px 단위, 최대 100px) |
| opacity | number | 1 | 눈송이 투명도 (0-1) |
| flakeShape | string | "❄️" | 눈송이 모양 (이모지, 문자 등) |

### 사용 방법

### 기본 사용법

가장 기본적인 사용 예시:

```tsx
import { SnowTwinkle } from 'react-snow-twinkle';

function App() {
  return (
    <div>
      <SnowTwinkle />
      <h1>My Winter Wonderland</h1>
    </div>
  );
}
```

### 커스텀 설정

다양한 옵션을 사용하여 눈 효과를 커스터마이징할 수 있습니다:

```tsx
import { SnowTwinkle } from 'react-snow-twinkle';

function App() {
  return (
    <div>
      <SnowTwinkle 
        snowflakeCount={100}
        speed={1.5}
        wind={2}
        color="#ffffff"
        size={4}
        opacity={0.8}
        blur={2}
      />
      <h1>Customized Snow Effect</h1>
    </div>
  );
}
```

### 개발 환경 설정

로컬에서 개발하려면:

1. 저장소를 클론합니다:
```bash
git clone https://github.com/yourusername/react-snow-twinkle.git
```

2. 의존성을 설치합니다:
```bash
cd react-snow-twinkle
npm install
```

3. 개발 서버를 실행합니다:
```bash
npm run dev
```

## 기여하기

프로젝트에 기여하고 싶으신가요? 언제든 Pull Request를 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 문의하기

문제가 발생하거나 제안사항이 있으시다면 GitHub Issues를 통해 알려주세요.
