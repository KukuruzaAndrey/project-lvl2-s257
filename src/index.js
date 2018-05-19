import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';
import getParser from './parser';
import { standardRender, plainRender } from './render';

const genDiff = (path1, path2) => {
  const ext = path.extname(path1);
  const parse = getParser(ext);
  const obj1 = parse(readFileSync(path1, 'utf-8'));
  const obj2 = parse(readFileSync(path2, 'utf-8'));

  const buildAST = (before, after) => {
    const keys = _.union(_.keys(before), _.keys(after));
    const ast = keys.map((key) => {
      if (_.isObject(before[key]) && _.isObject(after[key])) {
        return {
          name: key,
          children: buildAST(before[key], after[key]),
        };
      } else if (!_.has(before, key)) {
        return {
          name: key,
          value: after[key],
          status: 'added',
        };
      } else if (!_.has(after, key)) {
        return {
          name: key,
          value: before[key],
          status: 'removed',
        };
      } else if (before[key] === after[key]) {
        return {
          name: key,
          value: after[key],
          status: 'unchanged',
        };
      } else if (before[key] !== after[key]) {
        return {
          name: key,
          valueBefore: before[key],
          valueAfter: after[key],
          status: 'updated',
        };
      }
      return [];
    });
    return ast;
  };

  return standardRender(buildAST(obj1, obj2));
};

export default genDiff;
