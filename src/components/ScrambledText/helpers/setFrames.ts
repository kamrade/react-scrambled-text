import { IQueue } from "../ScrambledText";
import { getRandomChar } from "./getRandomChar";

export const setFrames = (queue: IQueue[], chars: string, frame: number): [output: string, complete: number] => {
  let complete = 0;
  let output: string = '';
  for (let i = 0, n = queue.length; i < n; i++) {
    let { from, to, start, end, char } = queue[i];
    if (frame >= end) {
      complete++;
      output += to;
    } else if (frame >= start) {
      if (!char || Math.random() < 0.28) {
        char = getRandomChar(chars);
        queue[i].char = char;
      }
      output += char;
    } else {
      output += from;
    }
  }
  return [output, complete];
}