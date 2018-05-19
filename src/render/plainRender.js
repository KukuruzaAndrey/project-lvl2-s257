import _ from 'lodash';

const plainRender = (ast) => {
  const stringify = obj => `${!_.isObject(obj) ? 'complex value' : `value: ${JSON.stringify(obj)}`}`;
  const statusMap = {
    added: ({ name, value }, parents) => `Property '${[...parents, name].join('.')}' was added with ${stringify(value)}\n`,
    removed: ({ name }, parents) => `Property '${[...parents, name].join('.')}' was removed\n`,
    unchanged: () => '',
    updated: ({ name, valueBefore, valueAfter }, parents) => `Property '${[...parents, name].join('.')}' was updated. From ${stringify(valueBefore)} to ${stringify(valueAfter)}\n`,
  };
  const iter = (acc, node, parents) => {
    const {
      name, status, children,
    } = node;
    if (children === undefined) {
      return [...acc, statusMap[status](node, parents)];
    }
    return [...acc, ...children.reduce((nAcc, n) => iter(nAcc, n, [...parents, name]), [])];
  };
  const body = ast.reduce((acc, node) => iter(acc, node, []), []);
  return body.join('');
};
export default plainRender;
