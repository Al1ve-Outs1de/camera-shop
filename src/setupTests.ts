import matchers from '@testing-library/jest-dom/matchers';
import createFetchMock from 'vitest-fetch-mock';
import { expect, vi } from 'vitest';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();
expect.extend(matchers);
