import _ from 'lodash';

const StandardRender = (ast) => {
  const stringify = (obj, depth) => {
    if (!_.isObject(obj)) {
      return obj;
    }
    const body = Object.keys(obj).map(key => `${'    '.repeat(depth + 2)}${key}: ${obj[key]}\n`).join('');
    return `{\n${body}${'    '.repeat(depth + 1)}}`;
  };
  const statusMap = {
    added: ({ name, value }, depth) => `${'    '.repeat(depth)}+ ${name}: ${stringify(value, depth)}`,
    removed: ({ name, value }, depth) => `${'    '.repeat(depth)}- ${name}: ${stringify(value, depth)}`,
    unchanged: ({ name, value }, depth) => `${'    '.repeat(depth)}  ${name}: ${stringify(value, depth)}`,
    updated: ({ name, valueBefore, valueAfter }, depth) => [`${'    '.repeat(depth)}- ${name}: ${stringify(valueBefore, depth)}`,
      `${'    '.repeat(depth)}  + ${name}: ${stringify(valueAfter, depth)}`].join('\n'),
  };
  const iter = (acc, node, depth) => {
    const {
      name, status, children,
    } = node;
    if (children === undefined) {
      return [...acc, `  ${statusMap[status](node, depth)}\n`];
    }
    return [...acc, `  ${'    '.repeat(depth)}  ${name}: {\n`, ...children.reduce((nAcc, n) => iter(nAcc, n, depth + 1), []), `${'    '.repeat(depth + 1)}}\n`];
  };
  const body = ast.reduce((acc, node) => iter(acc, node, 0), []);
  return `{\n${body.join('')}}`;
};
export default StandardRender;
