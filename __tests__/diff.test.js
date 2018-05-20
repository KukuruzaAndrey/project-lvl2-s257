import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const diffTest = (before, after, expectedResult, renderType = 'standard') => {
  const pathToF = `${__dirname}/__fixtures__`;
  const diff = genDiff(path.resolve(pathToF, before), path.resolve(pathToF, after), renderType);
  const result = fs.readFileSync(path.resolve(pathToF, expectedResult), 'utf-8');
  expect(diff).toBe(result);
};

test('standart simple json', () => diffTest('simple/before.json', 'simple/after.json', 'simple/standartExpectedResult'));

test('standart simple yaml', () => diffTest('simple/before.yaml', 'simple/after.yaml', 'simple/standartExpectedResult'));

test('standart simple ini', () => diffTest('simple/before.ini', 'simple/after.ini', 'simple/standartExpectedResult'));

test('standart nested json', () => diffTest('nested/before.json', 'nested/after.json', 'nested/standartExpectedResult'));

test('standart nested yaml', () => diffTest('nested/before.yaml', 'nested/after.yaml', 'nested/standartExpectedResult'));

test('standart nested ini', () => diffTest('nested/before.ini', 'nested/after.ini', 'nested/standartExpectedResult'));

test('plain simple json', () => diffTest('simple/before.json', 'simple/after.json', 'simple/plainExpectedResult', 'plain'));

test('plain simple yaml', () => diffTest('simple/before.yaml', 'simple/after.yaml', 'simple/plainExpectedResult', 'plain'));

test('plain simple ini', () => diffTest('simple/before.ini', 'simple/after.ini', 'simple/plainExpectedResult', 'plain'));

test('plain nested json', () => diffTest('nested/before.json', 'nested/after.json', 'nested/plainExpectedResult', 'plain'));

test('plain nested yaml', () => diffTest('nested/before.yaml', 'nested/after.yaml', 'nested/plainExpectedResult', 'plain'));

test('plain nested ini', () => diffTest('nested/before.ini', 'nested/after.ini', 'nested/plainExpectedResult', 'plain'));

test('json simple json', () => diffTest('simple/before.json', 'simple/after.json', 'simple/jsonExpectedResult', 'json'));

test('json simple yaml', () => diffTest('simple/before.yaml', 'simple/after.yaml', 'simple/jsonExpectedResult', 'json'));

test('json nested json', () => diffTest('nested/before.json', 'nested/after.json', 'nested/jsonExpectedResult', 'json'));

test('json nested yaml', () => diffTest('nested/before.yaml', 'nested/after.yaml', 'nested/jsonExpectedResult', 'json'));

test('json nested ini', () => diffTest('nested/before.ini', 'nested/after.ini', 'nested/jsonExpectedResult', 'json'));
