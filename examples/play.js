import Vue from 'vue';
import TmDesign from 'main/index.js';
import App from './play/index.vue';
import 'packages/theme-chalk/styles/index.less';

Vue.use(TmDesign);

new Vue({ // eslint-disable-line
  render: h => h(App)
}).$mount('#app');
