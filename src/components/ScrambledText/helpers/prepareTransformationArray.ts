import type { IQueue } from './types';
import { getRandomNumber } from './getRandomNumber';

export const prepareTransformationArray = (
  prevText: string, 
  newText: string,
  startMax: number = 2,
  endMax: number = 50
  ): IQueue[] => {
  const length = Math.max(prevText.length, newText.length);
  const queue: IQueue[] = [];
  for (let i = 0; i < length; i++) {
    const from   = prevText[i] || '';
    const to     = newText[i] || '';
    const start  = getRandomNumber(startMax);
    const end    = start + getRandomNumber(endMax);
    queue.push({ from, to, start, end });
  }
  return queue;
}