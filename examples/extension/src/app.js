import Vue from 'vue';
import App from './editor/index';
import TmDesign from 'main/index.js';
import 'packages/theme-chalk/styles/index.less';

export default () => {
  Vue.use(TmDesign, { zIndex: 100000 });
  const root = document.createElement('div');
  document.body.appendChild(root);

  window.ga = function() {
    console.log(arguments);
  };

  new Vue({ // eslint-disable-line
    render: h => h(App)
  }).$mount(root);
};
