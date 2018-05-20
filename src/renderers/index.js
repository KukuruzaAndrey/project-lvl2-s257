import standardRender from './standardRender';
import plainRender from './plainRender';

const renders = {
  standard: standardRender,
  plain: plainRender,
};
export default type => renders[type];
