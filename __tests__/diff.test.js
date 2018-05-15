import fs from 'fs';
import path from 'path';
import genDiff from '../src';

test('json', () => {
  const diff = genDiff(path.resolve(__dirname, '__fixtures__/simple/before.json'), path.resolve(__dirname, '__fixtures__/simple/after.json'));
  const result = fs.readFileSync(path.resolve(__dirname, '__fixtures__/simple/expectedResult'), 'utf-8');
  expect(diff).toBe(result);
});

