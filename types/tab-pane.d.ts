import { TmDesignUIComponent } from './component'

/** Tab Pane Component */
export declare class TmTabPane extends TmDesignUIComponent {
  /** Title of the tab */
  label: string

  /** Whether Tab is disabled */
  disabled: boolean

  /** Identifier corresponding to the activeName of Tabs, representing the alias of the tab-pane */
  name: string

  /** Whether Tab is closable */
  closable: boolean

  /** Whether Tab is lazily rendered */
  lazy: boolean
}
