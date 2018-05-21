import _ from 'lodash';

const stringify = (obj, depth) => {
  if (!_.isObject(obj)) {
    return obj;
  }
  const body = Object.keys(obj).map(key => `${'    '.repeat(depth + 2)}${key}: ${obj[key]}`);
  return ['{', body, `${'    '.repeat(depth + 1)}}`].join('\n');
};

const StandardRender = (ast) => {
  const render = {
    nested: ({ name, children }, depth, func) => [`  ${name}: {\n${_.flatten(children.map(n => func(n, depth + 1))).join('\n')}`, '  }'],
    added: ({ name, value }, depth) => [`+ ${name}: ${stringify(value, depth)}`],
    removed: ({ name, value }, depth) => [`- ${name}: ${stringify(value, depth)}`],
    unchanged: ({ name, value }, depth) => [`  ${name}: ${stringify(value, depth)}`],
    updated: ({ name, valueBefore, valueAfter }, depth) => [`- ${name}: ${stringify(valueBefore, depth)}`, `+ ${name}: ${stringify(valueAfter, depth)}`],
  };
  const iter = (node, depth) => {
    const { type } = node;
    const stringsWithSpace = render[type](node, depth, iter).map(str => `  ${'    '.repeat(depth)}${str}`);
    console.log(stringsWithSpace);
    return stringsWithSpace;
  };
  const body = ast.map(node => iter(node, 0));
  return ['{', ...(_.flatten(body)), '}'].join('\n');
};
export default StandardRender;
