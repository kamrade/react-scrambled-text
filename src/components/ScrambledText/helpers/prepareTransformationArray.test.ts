import { expect, test, expectTypeOf } from 'vitest';
import { prepareTransformationArray } from './prepareTransformationArray';
import { IQueue } from './types';

test('should return value with correct type', () => {
  expectTypeOf(prepareTransformationArray('test1', 'test2')).toEqualTypeOf<IQueue[]>;
});

test('should return array with proper length (based on longer value)', () => {
  const prevText = '1234567890';
  const newText = '12345678901234567890';
  const length = Math.max(prevText.length, newText.length);
  const returnedData = prepareTransformationArray(prevText, newText);
  expect(returnedData.length).toEqual(length);
});

test('should return value with correct fields', () => {

  let from = 'test1';
  let to = 'jest2';
  const returnedData = prepareTransformationArray(from, to)[0];
  
  expect(returnedData).not.toHaveProperty('char');
  expect(returnedData).toHaveProperty('from')
  expect(returnedData).toHaveProperty('to');
  expect(returnedData).toHaveProperty('start');
  expect(returnedData).toHaveProperty('end');
});

test('should return object with correct values', () => {
  let from = 'test1';
  let to = 'jest2';
  const returnedData = prepareTransformationArray(from, to)[0];
  let returnedData2 = prepareTransformationArray('test1', 'jest2');

  expect(returnedData['from']).toEqual(from[0]);
  expect(returnedData['to']).not.toEqual('t');
  expect(returnedData2[returnedData2.length-1]['from']).toEqual(from[from.length-1]);
  expect(returnedData2[returnedData2.length-1]['to']).toEqual(to[to.length-1]);
});

test('should return object with properties where START is always less or equal than END', () => {
  let from = 'test1';
  let to = 'jest2';
  const returnedData = prepareTransformationArray(from, to, 1000, 1);
  returnedData.map((item, _i) => expect(item.start <= item.end).toEqual(true));
});