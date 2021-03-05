import { TmDesignUIComponent } from './component'

/** Button type */
export type LinkType = 'primary' | 'success' | 'warning' | 'danger' | 'info' 

/** Link Component */
export declare class TmLink extends TmDesignUIComponent {
  /** Link type */
  type: LinkType
  
  /** Disable the link */
  disabled: boolean

  /** Link underline */
  underline: boolean

  /** Link icon, accepts an icon name of TmDesign icon component */
  icon: string

  /** Link href */
  href: string

  /** Link target */
  target: string
}
