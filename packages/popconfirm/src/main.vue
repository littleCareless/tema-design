<template>
  <el-popover
    v-bind="$attrs"
    v-model="visible"
    trigger="click"
  >
  <div class="el-popconfirm">
    <p class="el-popconfirm__main">
    <i
      v-if="!hideIcon"
      :class="icon"
      class="el-popconfirm__icon"
      :style="{color: iconColor}"
    ></i>
      {{title}}
    </p>
    <div class="el-popconfirm__action">
      <tm-button 
        size="mini" 
        :type="cancelButtonType" 
        @click="cancel"
      >
        {{cancelButtonText}}
      </tm-button>
      <tm-button 
        size="mini" 
        :type="confirmButtonType" 
        @click="confirm"
      >
        {{confirmButtonText}}
      </tm-button>
    </div>
  </div>
  <slot name="reference" slot="reference"></slot>
</el-popover>
</template>

<script>
import TmPopover from 'tema-ui/packages/popover';
import TmButton from 'tema-ui/packages/button';
import {t} from 'tema-ui/src/locale';

export default {
  name: 'TmPopconfirm',
  props: {
    title: {
      type: String
    },
    confirmButtonText: {
      type: String,
      default: t('el.popconfirm.confirmButtonText')
    },
    cancelButtonText: {
      type: String,
      default: t('el.popconfirm.cancelButtonText')
    },
    confirmButtonType: {
      type: String,
      default: 'primary'
    },
    cancelButtonType: {
      type: String,
      default: 'text'
    },
    icon: {
      type: String,
      default: 'tm-icon-question'
    },
    iconColor: {
      type: String,
      default: '#f90'
    },
    hideIcon: {
      type: Boolean,
      default: false
    }
  },
  components: {
    TmPopover,
    TmButton
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    confirm() {
      this.visible = false;
      this.$emit('confirm');
    },
    cancel() {
      this.visible = false;
      this.$emit('cancel');
    }
  }
};
</script>
