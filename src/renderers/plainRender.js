import _ from 'lodash';

const plainRender = (ast) => {
  const stringify = (value) => {
    if (_.isObject(value)) {
      return 'complex value';
    }
    return `value: ${typeof value === 'string' ? `'${value}'` : value}`;
  };
  const render = {
    nested: ({ name, children }, parents, func) => children.reduce((nAcc, n) => func(nAcc, n, [...parents, name]), []).filter(v => v).join('\n'),
    added: ({ name, value }, parents) => `Property '${[...parents, name].join('.')}' was added with ${stringify(value)}`,
    removed: ({ name }, parents) => `Property '${[...parents, name].join('.')}' was removed`,
    unchanged: () => null,
    updated: ({ name, value: { before, after } }, parents) =>
      `Property '${[...parents, name].join('.')}' was updated. From ${stringify(before)} to ${stringify(after)}`,
  };
  const iter = (acc, node, parents) => {
    const { type } = node;
    return [...acc, render[type](node, parents, iter)];
  };
  const body = ast.reduce((acc, node) => iter(acc, node, []), []).filter(v => v);
  return body.join('\n');
};

export default plainRender;
