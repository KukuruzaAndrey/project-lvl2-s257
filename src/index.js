import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';
import getParser from './parser';

const genDiff = (path1, path2) => {
  const ext = path.extname(path1);
  const parse = getParser(ext);
  const obj1 = parse(readFileSync(path1, 'utf-8'));
  const obj2 = parse(readFileSync(path2, 'utf-8'));
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const body = keys.reduce((acc, key) => {
    if (!_.has(obj1, key)) {
      return [...acc, `+ ${key}: ${obj2[key]}`];
    } else if (!_.has(obj2, key)) {
      return [...acc, `- ${key}: ${obj1[key]}`];
    } else if (obj1[key] === obj2[key]) {
      return [...acc, `  ${key}: ${obj1[key]}`];
    } else if (obj1[key] !== obj2[key]) {
      return [...acc, `- ${key}: ${obj1[key]}`, `+ ${key}: ${obj2[key]}`];
    }
    return [];
  }, []);
  return `{\n    ${body.join('\n    ')}\n}`;
};

export default genDiff;
