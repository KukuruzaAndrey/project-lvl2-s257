import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const diffTest = (before, after, expectedResult) => {
  const pathToFile = `${__dirname}/__fixtures__/simple/`;
  const diff = genDiff(path.resolve(pathToFile, before), path.resolve(pathToFile, after));
  const result = fs.readFileSync(path.resolve(pathToFile, expectedResult), 'utf-8');
  expect(diff).toBe(result);
};

test('simple json', () => diffTest('before.json', 'after.json', 'expectedResult'));

test('simple yaml', () => diffTest('before.yaml', 'after.yaml', 'expectedResult'));
