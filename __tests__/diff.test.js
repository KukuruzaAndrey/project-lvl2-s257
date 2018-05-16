import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const diffTest = (before, after, expectedResult) => {
  const diff = genDiff(path.resolve(__dirname, before), path.resolve(__dirname, after));
  const result = fs.readFileSync(path.resolve(__dirname, expectedResult), 'utf-8');
  expect(diff).toBe(result);
};

test('simple json', () => {
  diffTest('__fixtures__/simple/before.json', '__fixtures__/simple/after.json', '__fixtures__/simple/expectedResult');
});

test('simple yaml', () => {
  diffTest('__fixtures__/simple/before.yaml', '__fixtures__/simple/after.yaml', '__fixtures__/simple/expectedResult');
});
