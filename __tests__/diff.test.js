import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const diffTest = (before, after, expectedResult) => {
  const pathToFile = `${__dirname}/__fixtures__`;
  const diff = genDiff(path.resolve(pathToFile, before), path.resolve(pathToFile, after));
  const result = fs.readFileSync(path.resolve(pathToFile, expectedResult), 'utf-8');
  expect(diff).toBe(result);
};

test('simple json', () => diffTest('simple/before.json', 'simple/after.json', 'simple/expectedResult'));

test('simple yaml', () => diffTest('simple/before.yaml', 'simple/after.yaml', 'simple/expectedResult'));

test('simple ini', () => diffTest('simple/before.ini', 'simple/after.ini', 'simple/expectedResult'));

test('nested json', () => diffTest('nested/before.json', 'nested/after.json', 'nested/expectedResult'));

test('nested yaml', () => diffTest('nested/before.yaml', 'nested/after.yaml', 'nested/expectedResult'));

test('nested ini', () => diffTest('nested/before.ini', 'nested/after.ini', 'nested/expectedResult'));