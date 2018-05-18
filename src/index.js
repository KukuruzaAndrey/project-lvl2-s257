import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';
import getParser from './parser';

const genDiff = (path1, path2) => {
  const ext = path.extname(path1);
  const parse = getParser(ext);
  const obj1 = parse(readFileSync(path1, 'utf-8'));
  const obj2 = parse(readFileSync(path2, 'utf-8'));

  const diffAST = (before, after) => {
    const keys = _.union(_.keys(before), _.keys(after));
    return _.flatten(keys.map((key) => {
      if (_.isObject(before[key]) && _.isObject(after[key])) {
        return {
          name: key,
          value: '',
          status: 'unchanged',
          children: diffAST(before[key], after[key]),
        };
      } else if (!_.has(before, key)) {
        return {
          name: key,
          value: after[key],
          status: 'added',
          children: [],
        };
      } else if (!_.has(after, key)) {
        return {
          name: key,
          value: before[key],
          status: 'removed',
          children: [],
        };
      } else if (before[key] === after[key]) {
        return {
          name: key,
          value: after[key],
          status: 'unchanged',
          children: [],
        };
      } else if (before[key] !== after[key]) {
        return [{
          name: key,
          value: before[key],
          status: 'removed',
          children: [],
        }, {
          name: key,
          value: after[key],
          status: 'added',
          children: [],
        }];
      }
      return [];
    }));
  };


  const render = (ast) => {
    const stringify = (obj, depth) => {
      if (!_.isObject(obj)) {
        return obj;
      }
      return `{\n${Object.keys(obj).map(key => `${'    '.repeat(depth + 2)}${key}: ${obj[key]}`).join('\n')}\n${'    '.repeat(depth + 1)}}`;
    };
    const statusMap = {
      added: '+',
      removed: '-',
      unchanged: ' ',
    };
    const iter = (acc, node, depth) => {
      const {
        name, value, status, children,
      } = node;
      if (_.isEmpty(children)) {
        return [...acc, `  ${'    '.repeat(depth)}${statusMap[status]} ${name}: `, `${stringify(value, depth)}\n`];
      }
      return [...acc, `  ${'    '.repeat(depth)}${statusMap[status]} ${name}: {\n`, ...children.reduce((nAcc, n) => iter(nAcc, n, depth + 1), []), `${'    '.repeat(depth + 1)}}\n`];
    };
    const body = ast.reduce((acc, node) => iter(acc, node, 0), []);
    return `{\n${body.join('')}}`;
  };
  console.log(JSON.stringify(diffAST(obj1, obj2)));
  return render(diffAST(obj1, obj2));
};

export default genDiff;
