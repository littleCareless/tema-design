/* Automatically generated by './build/bin/build-entry.js' */

import Button from '../packages/button/index.js';
import Popover from '../packages/popover/index.js';
import Row from '../packages/row/index.js';
import Col from '../packages/col/index.js';
import Scrollbar from '../packages/scrollbar/index.js';
import Container from '../packages/container/index.js';
import Header from '../packages/header/index.js';
import Aside from '../packages/aside/index.js';
import Main from '../packages/main/index.js';
import Footer from '../packages/footer/index.js';
import Backtop from '../packages/backtop/index.js';
import InfiniteScroll from '../packages/infinite-scroll/index.js';
import PageHeader from '../packages/page-header/index.js';
import TagsInput from '../packages/tags-input/index.js';
import locale from 'tema-ui/src/locale';
import CollapseTransition from 'tema-ui/src/transitions/collapse-transition';

const components = [
  Button,
  Popover,
  Row,
  Col,
  Scrollbar,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Backtop,
  PageHeader,
  TagsInput,
  CollapseTransition
];

const install = function(Vue, opts = {}) {
  locale.use(opts.locale);
  locale.i18n(opts.i18n);

  components.forEach(component => {
    Vue.component(component.name, component);
  });

  Vue.use(InfiniteScroll);
  // Vue.use(Loading.directive);

  Vue.prototype.$TMDESIGN = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000
  };

  // Vue.prototype.$loading = Loading.service;
  // Vue.prototype.$msgbox = MessageBox;
  // Vue.prototype.$alert = MessageBox.alert;
  // Vue.prototype.$confirm = MessageBox.confirm;
  // Vue.prototype.$prompt = MessageBox.prompt;
  // Vue.prototype.$notify = Notification;
  // Vue.prototype.$message = Message;

};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '0.0.1',
  locale: locale.use,
  i18n: locale.i18n,
  install,
  CollapseTransition,
  // Loading,
  Button,
  Popover,
  Row,
  Col,
  Scrollbar,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Backtop,
  InfiniteScroll,
  PageHeader,
  TagsInput
};
