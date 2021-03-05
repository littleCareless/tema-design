import { TmDesignUIComponent } from './component'

export type ContentPosition = 'left' | 'center' | 'right'

/** Divider Component */
export declare class TmDivider extends TmDesignUIComponent {
  /** enable vertical divider */
  vertical: boolean

  /** customize the content on the divider line */
  posiiton: ContentPosition
}
