import TmBreadcrumb from './src/breadcrumb';

/* istanbul ignore next */
TmBreadcrumb.install = function(Vue) {
  Vue.component(TmBreadcrumb.name, TmBreadcrumb);
};

export default TmBreadcrumb;
