import _ from 'lodash';

const stringify = (obj, depth) => {
  if (!_.isObject(obj)) {
    return obj;
  }
  const body = Object.keys(obj).map(key => `${'    '.repeat(depth + 2)}${key}: ${obj[key]}`);
  return ['{', ...body, `${'    '.repeat(depth + 1)}}`].join('\n');
};

const StandardRender = (ast) => {
  const render = {
    nested: ({ name, children }, depth) => [`${'    '.repeat(depth)}    ${name}: {`, ...children.map(n => render[n.type](n, depth + 1)), `${'    '.repeat(depth)}    }`],
    added: ({ name, value }, depth) => `${'    '.repeat(depth)}  + ${name}: ${stringify(value, depth)}`,
    removed: ({ name, value }, depth) => `${'    '.repeat(depth)}  - ${name}: ${stringify(value, depth)}`,
    unchanged: ({ name, value }, depth) => `${'    '.repeat(depth)}    ${name}: ${stringify(value, depth)}`,
    updated: ({ name, valueBefore, valueAfter }, depth) => [`${'    '.repeat(depth)}  - ${name}: ${stringify(valueBefore, depth)}`, `${'    '.repeat(depth)}  + ${name}: ${stringify(valueAfter, depth)}`],
  };
  const body = _.flattenDeep(ast.map(node => render[node.type](node, 0)));
  return ['{', ...body, '}'].join('\n');
};
export default StandardRender;
