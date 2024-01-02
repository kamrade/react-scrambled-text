import { expect, test } from 'vitest';
import { getRandomNumber } from './getRandomNumber';

test(`random number shouldn't be bigger than max`, () => {
  let number = 10;
  for (let i = 0; i < 1000; i++) {
    expect(getRandomNumber(number) <= number).toBe(true);
    expect(getRandomNumber(number) >= 0).toBe(true);
  }
});