import fs from 'fs'
import _ from 'lodash'

const genDiff = (path1, path2) => {
  const obj1 = JSON.parse(fs.readFileSync(path1));
  const obj2 = JSON.parse(fs.readFileSync(path2));
  const keys = _.union(Object.keys(obj1),Object.keys(obj2));
  const body = keys.reduce((acc, key) => {
    const intend = '\n    ';
    if (!_.has(obj1, key)) {
      return `${acc}${intend}+ ${key}: ${obj2[key]}`;
    } else if (!_.has(obj2, key)) {
      return `${acc}${intend}- ${key}: ${obj1[key]}`;
    } else if (obj1[key] === obj2[key]) {
      return `${acc}${intend}  ${key}: ${obj1[key]}`;
    } else if (obj1[key] !== obj2[key]) {
      return `${acc}${intend}- ${key}: ${obj1[key]}${intend}+ ${key}: ${obj2[key]}`;
    }
    return '';
  }, '');
  return `{${body}\n}`;
};

export default genDiff;