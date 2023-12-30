import type { IQueue } from '../ScrambledText';

// start и end существуют для того, чтоб установить в какой момент данный символ начнет анимацию

export const prepareTransformationAttay = (prevText: string, newText: string): IQueue[] => {
  const length = Math.max(prevText.length, newText.length);
  const queue: IQueue[] = [];
  for (let i = 0; i < length; i++) {
    const from   = prevText[i] || '';
    const to     = newText[i] || '';
    const start  = Math.floor(Math.random() * 26);
    const end    = start + Math.floor(Math.random() * 26);
    queue.push({ from, to, start, end });
  }
  return queue;
}