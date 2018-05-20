import standardRender from './standardRender';
import plainRender from './plainRender';
import JSONRender from './JSONRender';

const renders = {
  standard: standardRender,
  plain: plainRender,
  json: JSONRender,
};
export default type => renders[type];
