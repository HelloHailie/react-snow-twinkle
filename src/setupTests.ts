import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// @testing-library/jest-dom의 matcher들을 vitest에 확장
expect.extend(matchers as any);

// 각 테스트 이후 cleanup
afterEach(() => {
  cleanup();
});
