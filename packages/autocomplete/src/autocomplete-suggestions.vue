<template>
  <transition name="el-zoom-in-top" @after-leave="doDestroy">
    <div
      v-show="showPopper"
      class="el-autocomplete-suggestion el-popper"
      :class="{ 'is-loading': !parent.hideLoading && parent.loading }"
      :style="{ width: dropdownWidth }"
      role="region">
      <tm-scrollbar
        tag="ul"
        wrap-class="el-autocomplete-suggestion__wrap"
        view-class="el-autocomplete-suggestion__list">
        <li v-if="!parent.hideLoading && parent.loading"><i class="tm-icon-loading"></i></li>
        <slot v-else>
        </slot>
      </tm-scrollbar>
    </div>
  </transition>
</template>
<script>
  import Popper from 'tema-ui/src/utils/vue-popper';
  import Emitter from 'tema-ui/src/mixins/emitter';
  import TmScrollbar from 'tema-ui/packages/scrollbar';

  export default {
    components: { TmScrollbar },
    mixins: [Popper, Emitter],

    componentName: 'TmAutocompleteSuggestions',

    data() {
      return {
        parent: this.$parent,
        dropdownWidth: ''
      };
    },

    props: {
      options: {
        default() {
          return {
            gpuAcceleration: false
          };
        }
      },
      id: String
    },

    methods: {
      select(item) {
        this.dispatch('TmAutocomplete', 'item-click', item);
      }
    },

    updated() {
      this.$nextTick(_ => {
        this.popperJS && this.updatePopper();
      });
    },

    mounted() {
      this.$parent.popperTmm = this.popperTmm = this.$el;
      this.referenceTmm = this.$parent.$refs.input.$refs.input || this.$parent.$refs.input.$refs.textarea;
      this.referenceList = this.$el.querySelector('.el-autocomplete-suggestion__list');
      this.referenceList.setAttribute('role', 'listbox');
      this.referenceList.setAttribute('id', this.id);
    },

    created() {
      this.$on('visible', (val, inputWidth) => {
        this.dropdownWidth = inputWidth + 'px';
        this.showPopper = val;
      });
    }
  };
</script>
