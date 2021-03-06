var Components = require('../../components.json');
var fs = require('fs');
var render = require('json-templater/string');
var uppercamelcase = require('uppercamelcase');
var path = require('path');
var endOfLine = require('os').EOL;

var OUTPUT_PATH = path.join(__dirname, '../../src/index.js');
var IMPORT_TEMPLATE = 'import {{name}} from \'../packages/{{package}}/index.js\';';
var INSTALL_COMPONENT_TEMPLATE = '  {{name}}';
var MAIN_TEMPLATE = `/* Automatically generated by './build/bin/build-entry.js' */

{{include}}
import locale from 'tema-ui/src/locale';
import CollapseTransition from 'tema-ui/src/transitions/collapse-transition';

const components = [
{{install}},
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
  version: '{{version}}',
  locale: locale.use,
  i18n: locale.i18n,
  install,
  CollapseTransition,
  // Loading,
{{list}}
};
`;

delete Components.font;

var ComponentNames = Object.keys(Components);

var includeComponentTemplate = [];
var installTemplate = [];
var listTemplate = [];

// ComponentNames.forEach(name => {
//   var componentName = uppercamelcase(name);

//   includeComponentTemplate.push(render(IMPORT_TEMPLATE, {
//     name: componentName,
//     package: name
//   }));

//   if (['Loading', 'MessageBox', 'Notification', 'Message', 'InfiniteScroll'].indexOf(componentName) === -1) {
//     installTemplate.push(render(INSTALL_COMPONENT_TEMPLATE, {
//       name: componentName,
//       component: name
//     }));
//   }

//   if (componentName !== 'Loading') listTemplate.push(`  ${componentName}`);
// });
console.log(ComponentNames);
ComponentNames.forEach((name) => {
  if (
    [
      'button',
      'container',
      'popover',
      'header',
      'aside',
      'main',
      'footer',
      'backtop',
      'scrollbar',
      'col',
      'row',
      'infinite-scroll',
      'tags-input',
      'page-header'
    ].indexOf(name) > -1
  ) {
    // ????????? ????????????
    var componentName = uppercamelcase(name)
    ;[
      'pagination',
      'dialog',
      'autocomplete',
      'dropdown',
      'dropdown-menu',
      'dropdown-item',
      'menu',
      'submenu',
      'menu-item',
      'menu-item-group',
      'input',
      'input-number',
      'radio',
      'radio-group',
      'radio-button',
      'checkbox',
      'checkbox-button',
      'checkbox-group',
      'switch',
      'select',
      'option',
      'option-group',
      'button',
      'button-group',
      'table',
      'table-column',
      'date-picker',
      'time-select',
      'time-picker',

      'tooltip',
      'message-box',
      'breadcrumb',
      'breadcrumb-item',
      'form',
      'form-item',
      'tabs',
      'tab-pane',
      'tag',
      'tree',
      'alert',
      'notification',
      'slider',
      'loading',
      'icon',

      'upload',
      'progress',
      'spinner',
      'message',
      'badge',
      'card',
      'rate',
      'steps',
      'step',
      'carousel',
      'carousel-item',
      'collapse',
      'collapse-item',
      'cascader',
      'color-picker',
      'transfer',
      'timeline',
      'timeline-item',
      'link',
      'divider',
      'image',
      'calendar',
      'infinite-scroll',
      'cascader-panel',
      'avatar',
      'drawer',
      'popconfirm'
    ];
    includeComponentTemplate.push(
      render(IMPORT_TEMPLATE, {
        name: componentName,
        package: name
      })
    );

    if (
      [
        'Loading',
        'MessageBox',
        'Notification',
        'Message',
        'InfiniteScroll'
      ].indexOf(componentName) === -1
    ) {
      installTemplate.push(
        render(INSTALL_COMPONENT_TEMPLATE, {
          name: componentName,
          component: name
        })
      );
    }

    listTemplate.push(`  ${componentName}`);
  }
});

var template = render(MAIN_TEMPLATE, {
  include: includeComponentTemplate.join(endOfLine),
  install: installTemplate.join(',' + endOfLine),
  version: process.env.VERSION || require('../../package.json').version,
  list: listTemplate.join(',' + endOfLine)
});

fs.writeFileSync(OUTPUT_PATH, template);
console.log('[build entry] DONE:', OUTPUT_PATH);

