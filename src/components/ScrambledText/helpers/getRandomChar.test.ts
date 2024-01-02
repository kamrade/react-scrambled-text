import { expect, test } from 'vitest';
import { getRandomChar } from './getRandomChar';

test('random char will be in frames', () => {
  let str = 'abcdefghijklmnopqrstuvwxy';
  for (let i = 0; i < 1000; i++) {
    expect(getRandomChar(str).includes('z')).toBe(false);
  }
  expect(getRandomChar('abcde').includes('1')).toBe(false);
  expect(getRandomChar('a').includes('a')).toBe(true);
  expect(getRandomChar('b').includes('b')).not.toBe(false);
});