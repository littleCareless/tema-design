import { TmDesignUIComponent } from './component'

/** Use Collapse to store contents. */
export declare class TmCollapse extends TmDesignUIComponent {
  /** Whether to activate accordion mode */
  accordion: boolean

  /** Currently active panel */
  value: string | number | string[] | number[]
}
