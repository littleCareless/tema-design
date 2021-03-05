import Vue from 'vue';
import entry from './app';
import VueRouter from 'vue-router';
import TmDesign from 'main/index.js';
import hljs from 'highlight.js';
import routes from './route.config';
import demoBlock from './components/demo-block';
import MainFooter from './components/footer';
import MainHeader from './components/header';
import SideNav from './components/side-nav';
import FooterNav from './components/footer-nav';
import title from './i18n/title';

import 'packages/theme-chalk/styles/index.less';
import './demo-styles/index.less';
import './assets/styles/common.css';
import './assets/styles/fonts/style.css';
import icon from './icon.json';

Vue.use(TmDesign);
Vue.use(VueRouter);
Vue.component('demo-block', demoBlock);
Vue.component('main-footer', MainFooter);
Vue.component('main-header', MainHeader);
Vue.component('side-nav', SideNav);
Vue.component('footer-nav', FooterNav);
console.log('执行到这里了~~~');

const globalTme = new Vue({
  data: { $isTme: false } // 是否 ele 用户
});

Vue.mixin({
  computed: {
    $isTme: {
      get: () => (globalTme.$data.$isTme),
      set: (data) => {globalTme.$data.$isTme = data;}
    }
  }
});

Vue.prototype.$icon = icon; // Icon 列表页用

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
});

router.afterEach(route => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
  const data = title[route.meta.lang];
  for (let val in data) {
    if (new RegExp('^' + val, 'g').test(route.name)) {
      document.title = data[val];
      return;
    }
  }
  document.title = 'TmDesign';
  ga('send', 'event', 'PageView', route.name);
});

new Vue({ // eslint-disable-line
  ...entry,
  router
}).$mount('#app');
