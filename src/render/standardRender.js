import _ from 'lodash';

const StandardRender = (ast) => {
  const stringify = (obj, depth) => {
    if (!_.isObject(obj)) {
      return obj;
    }
    const body = Object.keys(obj).map(key => `${'    '.repeat(depth + 2)}${key}: ${obj[key]}\n`).join('');
    return `{\n${body}${'    '.repeat(depth + 1)}}`;
  };
  const render = {
    nested: ({ name, value }, depth, func) => [`${'    '.repeat(depth)}  ${name}: {\n`, ...value.reduce((nAcc, n) => func(nAcc, n, depth + 1), []), `${'    '.repeat(depth + 1)}}`].join(''),
    added: ({ name, value }, depth) => `${'    '.repeat(depth)}+ ${name}: ${stringify(value, depth)}`,
    removed: ({ name, value }, depth) => `${'    '.repeat(depth)}- ${name}: ${stringify(value, depth)}`,
    unchanged: ({ name, value }, depth) => `${'    '.repeat(depth)}  ${name}: ${stringify(value, depth)}`,
    updated: ({ name, value: { before, after } }, depth) => [`${'    '.repeat(depth)}- ${name}: ${stringify(before, depth)}`,
      `${'    '.repeat(depth)}  + ${name}: ${stringify(after, depth)}`].join('\n'),
  };
  const iter = (acc, node, depth) => {
    const { type } = node;
    return [...acc, `  ${render[type](node, depth, iter)}\n`];
  };
  const body = ast.reduce((acc, node) => iter(acc, node, 0), []);
  return `{\n${body.join('')}}`;
};
export default StandardRender;
