import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';
import getParser from './parser';
import getRender from './renderers';

const genDiff = (path1, path2, renderType = 'standard') => {
  const ext = path.extname(path1);
  const parse = getParser(ext);
  const obj1 = parse(readFileSync(path1, 'utf-8'));
  const obj2 = parse(readFileSync(path2, 'utf-8'));
  const keyTypes = [
    {
      type: 'nested',
      check: (before, after, key) => _.isObject(before[key]) && _.isObject(after[key]),
      action: (before, after, func) => ({ children: func(before, after) }),
    },
    {
      type: 'added',
      check: (before, after, key) => !_.has(before, key),
      action: (before, after) => ({ value: after }),
    },
    {
      type: 'removed',
      check: (before, after, key) => !_.has(after, key),
      action: before => ({ value: before }),
    },
    {
      type: 'unchanged',
      check: (before, after, key) => before[key] === after[key],
      action: (before, after) => ({ value: after }),
    },
    {
      type: 'updated',
      check: (before, after, key) => before[key] !== after[key],
      action: (before, after) => ({ valueBefore: before, valueAfter: after }),
    },
  ];
  const buildAST = (before, after) => {
    const keys = _.union(_.keys(before), _.keys(after));
    return keys.map((key) => {
      const { type, action } = _.find(keyTypes, item => item.check(before, after, key));
      const partTree = action(before[key], after[key], buildAST);
      return { name: key, type, ...partTree };
    });
  };
  const render = getRender(renderType);
  return render(buildAST(obj1, obj2));
};

export default genDiff;
