import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const diffTest = (before, after, expectedResult) => {
  const pathToFile = `${__dirname}/__fixtures__`;
  const diff = genDiff(path.resolve(pathToFile, before), path.resolve(pathToFile, after));
  const result = fs.readFileSync(path.resolve(pathToFile, expectedResult), 'utf-8');
  expect(diff).toBe(result);
};

test('standart simple json', () => diffTest('simple/before.json', 'simple/after.json', 'simple/standartExpectedResult'));

test('standart simple yaml', () => diffTest('simple/before.yaml', 'simple/after.yaml', 'simple/standartExpectedResult'));

test('standart simple ini', () => diffTest('simple/before.ini', 'simple/after.ini', 'simple/standartExpectedResult'));

test('standart nested json', () => diffTest('nested/before.json', 'nested/after.json', 'nested/standartExpectedResult'));

test('standart nested yaml', () => diffTest('nested/before.yaml', 'nested/after.yaml', 'nested/standartExpectedResult'));

test('standart nested ini', () => diffTest('nested/before.ini', 'nested/after.ini', 'nested/standartExpectedResult'));

// test('plain nested json', () => diffTest('nested/before.json', 'nested/after.json', 'nested/plainExpectedResult'));
//
// test('plain nested yaml', () => diffTest('nested/before.yaml', 'nested/after.yaml', 'nested/plainExpectedResult'));
//
// test('plain nested ini', () => diffTest('nested/before.ini', 'nested/after.ini', 'nested/plainExpectedResult'));
