import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return 'complex value';
  }
  return `value: ${typeof value === 'string' ? `'${value}'` : value}`;
};

const plainRender = (ast) => {
  const render = {
    nested: ({ name, children }, parents, func) => children.filter(node => node.type !== 'unchanged').reduce((nAcc, n) => func(nAcc, n, [...parents, name]), []).join('\n'),
    added: ({ name, value }, parents) => `Property '${[...parents, name].join('.')}' was added with ${stringify(value)}`,
    removed: ({ name }, parents) => `Property '${[...parents, name].join('.')}' was removed`,
    updated: ({ name, valueBefore, valueAfter }, parents) =>
      `Property '${[...parents, name].join('.')}' was updated. From ${stringify(valueBefore)} to ${stringify(valueAfter)}`,
  };
  const iter = (acc, node, parents) => {
    const { type } = node;
    return [...acc, render[type](node, parents, iter)];
  };
  const body = ast.filter(node => node.type !== 'unchanged').reduce((acc, node) => iter(acc, node, []), []);
  return body.join('\n');
};

export default plainRender;
