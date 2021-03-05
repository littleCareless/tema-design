import Vue from 'vue'

/** TmDesignUI component common definition */
export declare class TmDesignUIComponent extends Vue {
  /** Install component into Vue */
  static install (vue: typeof Vue): void
}

/** Component size definition for button, input, etc */
export type TmDesignUIComponentSize = 'large' | 'medium' | 'small' | 'mini'

/** Horizontal alignment */
export type TmDesignUIHorizontalAlignment = 'left' | 'center' | 'right'
