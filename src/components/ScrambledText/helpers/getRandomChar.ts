import { getRandomNumber } from './getRandomNumber';

export const getRandomChar = (chars: string) => 
  chars[getRandomNumber(chars.length)];