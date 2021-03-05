<script>
  import Clickoutside from 'tema-ui/src/utils/clickoutside';
  import Emitter from 'tema-ui/src/mixins/emitter';
  import Migrating from 'tema-ui/src/mixins/migrating';
  import TmButton from 'tema-ui/packages/button';
  import TmButtonGroup from 'tema-ui/packages/button-group';
  import { generateId } from 'tema-ui/src/utils/util';

  export default {
    name: 'TmDropdown',

    componentName: 'TmDropdown',

    mixins: [Emitter, Migrating],

    directives: { Clickoutside },

    components: {
      TmButton,
      TmButtonGroup
    },

    provide() {
      return {
        dropdown: this
      };
    },

    props: {
      trigger: {
        type: String,
        default: 'hover'
      },
      type: String,
      size: {
        type: String,
        default: ''
      },
      splitButton: Boolean,
      hideOnClick: {
        type: Boolean,
        default: true
      },
      placement: {
        type: String,
        default: 'bottom-end'
      },
      visibleArrow: {
        default: true
      },
      showTimeout: {
        type: Number,
        default: 250
      },
      hideTimeout: {
        type: Number,
        default: 150
      },
      tabindex: {
        type: Number,
        default: 0
      }
    },

    data() {
      return {
        timeout: null,
        visible: false,
        triggerTmm: null,
        menuItems: null,
        menuItemsArray: null,
        dropdownTmm: null,
        focusing: false,
        listId: `dropdown-menu-${generateId()}`
      };
    },

    computed: {
      dropdownSize() {
        return this.size || (this.$ELEMENT || {}).size;
      }
    },

    mounted() {
      this.$on('menu-item-click', this.handleMenuItemClick);
    },

    watch: {
      visible(val) {
        this.broadcast('TmDropdownMenu', 'visible', val);
        this.$emit('visible-change', val);
      },
      focusing(val) {
        const selfDefine = this.$el.querySelector('.el-dropdown-selfdefine');
        if (selfDefine) { // 自定义
          if (val) {
            selfDefine.className += ' focusing';
          } else {
            selfDefine.className = selfDefine.className.replace('focusing', '');
          }
        }
      }
    },

    methods: {
      getMigratingConfig() {
        return {
          props: {
            'menu-align': 'menu-align is renamed to placement.'
          }
        };
      },
      show() {
        if (this.triggerTmm.disabled) return;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.visible = true;
        }, this.trigger === 'click' ? 0 : this.showTimeout);
      },
      hide() {
        if (this.triggerTmm.disabled) return;
        this.removeTabindex();
        if (this.tabindex >= 0) {
          this.resetTabindex(this.triggerTmm);
        }
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.visible = false;
        }, this.trigger === 'click' ? 0 : this.hideTimeout);
      },
      handleClick() {
        if (this.triggerTmm.disabled) return;
        if (this.visible) {
          this.hide();
        } else {
          this.show();
        }
      },
      handleTriggerKeyDown(ev) {
        const keyCode = ev.keyCode;
        if ([38, 40].indexOf(keyCode) > -1) { // up/down
          this.removeTabindex();
          this.resetTabindex(this.menuItems[0]);
          this.menuItems[0].focus();
          ev.preventDefault();
          ev.stopPropagation();
        } else if (keyCode === 13) { // space enter选中
          this.handleClick();
        } else if ([9, 27].indexOf(keyCode) > -1) { // tab || esc
          this.hide();
        }
      },
      handleItemKeyDown(ev) {
        const keyCode = ev.keyCode;
        const target = ev.target;
        const currentIndex = this.menuItemsArray.indexOf(target);
        const max = this.menuItemsArray.length - 1;
        let nextIndex;
        if ([38, 40].indexOf(keyCode) > -1) { // up/down
          if (keyCode === 38) { // up
            nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0;
          } else { // down
            nextIndex = currentIndex < max ? currentIndex + 1 : max;
          }
          this.removeTabindex();
          this.resetTabindex(this.menuItems[nextIndex]);
          this.menuItems[nextIndex].focus();
          ev.preventDefault();
          ev.stopPropagation();
        } else if (keyCode === 13) { // enter选中
          this.triggerTmmFocus();
          target.click();
          if (this.hideOnClick) { // click关闭
            this.visible = false;
          }
        } else if ([9, 27].indexOf(keyCode) > -1) { // tab // esc
          this.hide();
          this.triggerTmmFocus();
        }
      },
      resetTabindex(ele) { // 下次tab时组件聚焦元素
        this.removeTabindex();
        ele.setAttribute('tabindex', '0'); // 下次期望的聚焦元素
      },
      removeTabindex() {
        this.triggerTmm.setAttribute('tabindex', '-1');
        this.menuItemsArray.forEach((item) => {
          item.setAttribute('tabindex', '-1');
        });
      },
      initAria() {
        this.dropdownTmm.setAttribute('id', this.listId);
        this.triggerTmm.setAttribute('aria-haspopup', 'list');
        this.triggerTmm.setAttribute('aria-controls', this.listId);

        if (!this.splitButton) { // 自定义
          this.triggerTmm.setAttribute('role', 'button');
          this.triggerTmm.setAttribute('tabindex', this.tabindex);
          this.triggerTmm.setAttribute('class', (this.triggerTmm.getAttribute('class') || '') + ' el-dropdown-selfdefine'); // 控制
        }
      },
      initEvent() {
        let { trigger, show, hide, handleClick, splitButton, handleTriggerKeyDown, handleItemKeyDown } = this;
        this.triggerTmm = splitButton
          ? this.$refs.trigger.$el
          : this.$slots.default[0].elm;

        let dropdownTmm = this.dropdownTmm;

        this.triggerTmm.addEventListener('keydown', handleTriggerKeyDown); // triggerTmm keydown
        dropdownTmm.addEventListener('keydown', handleItemKeyDown, true); // item keydown
        // 控制自定义元素的样式
        if (!splitButton) {
          this.triggerTmm.addEventListener('focus', () => {
            this.focusing = true;
          });
          this.triggerTmm.addEventListener('blur', () => {
            this.focusing = false;
          });
          this.triggerTmm.addEventListener('click', () => {
            this.focusing = false;
          });
        }
        if (trigger === 'hover') {
          this.triggerTmm.addEventListener('mouseenter', show);
          this.triggerTmm.addEventListener('mouseleave', hide);
          dropdownTmm.addEventListener('mouseenter', show);
          dropdownTmm.addEventListener('mouseleave', hide);
        } else if (trigger === 'click') {
          this.triggerTmm.addEventListener('click', handleClick);
        }
      },
      handleMenuItemClick(command, instance) {
        if (this.hideOnClick) {
          this.visible = false;
        }
        this.$emit('command', command, instance);
      },
      triggerTmmFocus() {
        this.triggerTmm.focus && this.triggerTmm.focus();
      },
      initDomOperation() {
        this.dropdownTmm = this.popperTmm;
        this.menuItems = this.dropdownTmm.querySelectorAll("[tabindex='-1']");
        this.menuItemsArray = [].slice.call(this.menuItems);

        this.initEvent();
        this.initAria();
      }
    },

    render(h) {
      let { hide, splitButton, type, dropdownSize } = this;

      const handleMainButtonClick = (event) => {
        this.$emit('click', event);
        hide();
      };

      let triggerTmm = !splitButton
        ? this.$slots.default
        : (<tm-button-group>
          <tm-button type={type} size={dropdownSize} nativeOn-click={handleMainButtonClick}>
            {this.$slots.default}
          </tm-button>
          <tm-button ref="trigger" type={type} size={dropdownSize} class="el-dropdown__caret-button">
            <i class="el-dropdown__icon tm-icon-arrow-down"></i>
          </tm-button>
        </tm-button-group>);

      return (
        <div class="el-dropdown" v-clickoutside={hide}>
          {triggerTmm}
          {this.$slots.dropdown}
        </div>
      );
    }
  };
</script>
