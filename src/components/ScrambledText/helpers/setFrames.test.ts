import { expect, test } from 'vitest';
import { prepareTransformationArray}  from './prepareTransformationArray';
import { setFrames } from './setFrames';

test('should return correct value', () => {
  const prevText = '1234567890';
  const newText = '12345678901234567890';
  const queue = prepareTransformationArray(prevText, newText);
  queue[0].start = 10;
  queue[0].end = 20;
  const [output, complete] = setFrames(queue, '___', 1);
  
  expect(output.length).toEqual(newText.length);

});