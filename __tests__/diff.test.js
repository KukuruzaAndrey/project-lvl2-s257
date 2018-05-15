import fs from 'fs';
import path from 'path';
import genDiff from '../src';

test('simple json', () => {
  const diff = genDiff(path.resolve(__dirname, '__fixtures__/simple/before.json'), path.resolve(__dirname, '__fixtures__/simple/after.json'));
  const result = fs.readFileSync(path.resolve(__dirname, '__fixtures__/simple/expectedResult'), 'utf-8');
  expect(diff).toBe(result);
});

test('simple yaml', () => {
  const diff = genDiff(path.resolve(__dirname, '__fixtures__/simple/before.yaml'), path.resolve(__dirname, '__fixtures__/simple/after.yaml'));
  const result = fs.readFileSync(path.resolve(__dirname, '__fixtures__/simple/expectedResult'), 'utf-8');
  expect(diff).toBe(result);
});

