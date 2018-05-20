import standardRender from './standardRender';
import plainRender from './plainRender';

export default (type) => {
  const typeMap = {
    standard: standardRender,
    plain: plainRender,
  };
  return typeMap[type];
};
