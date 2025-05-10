import type { sm2 } from 'sm-crypto';
import * as base64 from 'base64-js';
import * as dayjs from 'dayjs';

export {};

declare global {
  interface Window {
    sm2: typeof sm2,
    base64js: typeof base64,
    dayjs: typeof dayjs
  }
}