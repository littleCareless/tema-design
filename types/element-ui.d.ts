import Vue, { PluginObject } from 'vue'
import { TmDesignUIComponent, TmDesignUIComponentSize, TmDesignUIHorizontalAlignment } from './component'

import { TmAlert } from './alert'
import { TmAside } from './aside'
import { TmAutocomplete } from './autocomplete'
import { TmBadge } from './badge'
import { TmBreadcrumb } from './breadcrumb'
import { TmBreadcrumbItem } from './breadcrumb-item'
import { TmButton } from './button'
import { TmButtonGroup } from './button-group'
import { TmCard } from './card'
import { TmCarousel } from './carousel'
import { TmCarouselItem } from './carousel-item'
import { TmCascader } from './cascader'
import { TmCheckbox } from './checkbox'
import { TmCheckboxButton } from './checkbox-button'
import { TmCheckboxGroup } from './checkbox-group'
import { TmCol } from './col'
import { TmCollapse } from './collapse'
import { TmCollapseItem } from './collapse-item'
import { TmColorPicker } from './color-picker'
import { TmContainer } from './container'
import { TmDatePicker } from './date-picker'
import { TmDialog } from './dialog'
import { TmDropdown } from './dropdown'
import { TmDropdownItem } from './dropdown-item'
import { TmDropdownMenu } from './dropdown-menu'
import { TmFooter } from './footer'
import { TmForm } from './form'
import { TmFormItem } from './form-item'
import { TmHeader } from './header'
import { TmInput } from './input'
import { TmInputNumber } from './input-number'
import { TmLoading } from './loading'
import { TmMain } from './main'
import { TmMenu } from './menu'
import { TmMenuItem } from './menu-item'
import { TmMenuItemGroup } from './menu-item-group'
import { TmMessage } from './message'
import { TmMessageBox } from './message-box'
import { TmNotification } from './notification'
import { TmOption } from './option'
import { TmOptionGroup } from './option-group'
import { TmPagination } from './pagination'
import { TmPopover } from './popover'
import { TmProgress } from './progress'
import { TmRate } from './rate'
import { TmRadio } from './radio'
import { TmRadioButton } from './radio-button'
import { TmRadioGroup } from './radio-group'
import { TmRow } from './row'
import { TmSelect } from './select'
import { TmSlider } from './slider'
import { TmStep } from './step'
import { TmSteps } from './steps'
import { TmSubmenu } from './submenu'
import { TmSwitch } from './switch'
import { TmTable } from './table'
import { TmTableColumn } from './table-column'
import { TmTag } from './tag'
import { TmTabs } from './tabs'
import { TmTabPane } from './tab-pane'
import { TmTimeline } from './timeline'
import { TmTimelineItem } from './timeline-item'
import { TmTimePicker } from './time-picker'
import { TmTimeSelect } from './time-select'
import { TmTooltip } from './tooltip'
import { TmTransfer } from './transfer'
import { TmTree, TreeData } from './tree'
import { TmUpload } from './upload'
import { TmLink } from './link'
import { TmDivider } from './divider'
import { TmIcon } from './icon'
import { TmCalendar } from './calendar'
import { TmImage } from './image'
import { TmBacktop } from './backtop'
import { TmInfiniteScroll } from './infinite-scroll'
import { TmPageHeader } from './page-header'
import { TmAvatar } from './avatar'
import { TmDrawer } from './drawer'
import { TmPopconfirm } from './popconfirm'

export interface InstallationOptions {
  locale: any,
  i18n: any,
  size: string
}

/** The version of tema-ui */
export const version: string

/**
 * Install all tema-ui components into Vue.
 * Please do not invoke this method directly.
 * Call `Vue.use(TmDesignUI)` to install.
 */
export function install (vue: typeof Vue, options: InstallationOptions): void

/** TmDesignUI component common definition */
export type Component = TmDesignUIComponent

/** Component size definition for button, input, etc */
export type ComponentSize = TmDesignUIComponentSize

/** Horizontal alignment */
export type HorizontalAlignment = TmDesignUIHorizontalAlignment

/** Show animation while loading data */
export const Loading: TmLoading

/** Used to show feedback after an activity. The difference with Notification is that the latter is often used to show a system level passive notification. */
export const Message: TmMessage

/** A set of modal boxes simulating system message box, mainly for message prompt, success tips, error messages and query information */
export const MessageBox: TmMessageBox

/** Displays a global notification message at the upper right corner of the page */
export const Notification: TmNotification

// TS cannot merge imported class with namespace, so declare subclasses instead

/** Alert Component */
export class Alert extends TmAlert {}

/** Aside Component */
export class Aside extends TmAside {}

/** Autocomplete Component */
export class Autocomplete extends TmAutocomplete {}

/** Bagde Component */
export class Badge extends TmBadge {}

/** Breadcrumb Component */
export class Breadcrumb extends TmBreadcrumb {}

/** Breadcrumb Item Component */
export class BreadcrumbItem extends TmBreadcrumbItem {}

/** Button Component */
export class Button extends TmButton {}

/** Button Group Component */
export class ButtonGroup extends TmButtonGroup {}

/** Card Component */
export class Card extends TmCard {}

/** Cascader Component */
export class Cascader extends TmCascader {}

/** Carousel Component */
export class Carousel extends TmCarousel {}

/** Carousel Item Component */
export class CarouselItem extends TmCarouselItem {}

/** Checkbox Component */
export class Checkbox extends TmCheckbox {}

/** Checkbox Button Component */
export class CheckboxButton extends TmCheckboxButton {}

/** Checkbox Group Component */
export class CheckboxGroup extends TmCheckboxGroup {}

/** Colunm Layout Component */
export class Col extends TmCol {}

/** Collapse Component */
export class Collapse extends TmCollapse {}

/** Collapse Item Component */
export class CollapseItem extends TmCollapseItem {}

/** Color Picker Component */
export class ColorPicker extends TmColorPicker {}

/** Container Component */
export class Container extends TmContainer {}

/** Date Picker Component */
export class DatePicker extends TmDatePicker {}

/** Dialog Component */
export class Dialog extends TmDialog {}

/** Dropdown Component */
export class Dropdown extends TmDropdown {}

/** Dropdown Item Component */
export class DropdownItem extends TmDropdownItem {}

/** Dropdown Menu Component */
export class DropdownMenu extends TmDropdownMenu {}

/** Footer Component */
export class Footer extends TmFooter {}

/** Form Component */
export class Form extends TmForm {}

/** Form Item Component */
export class FormItem extends TmFormItem {}

/** Header Component */
export class Header extends TmHeader {}

/** Input Component */
export class Input extends TmInput {}

/** Input Number Component */
export class InputNumber extends TmInputNumber {}

/** Main Component */
export class Main extends TmMain {}

/** Menu that provides navigation for your website */
export class Menu extends TmMenu {}

/** Menu Item Component */
export class MenuItem extends TmMenuItem {}

/** Menu Item Group Component */
export class MenuItemGroup extends TmMenuItemGroup {}

/** Dropdown Select Option Component */
export class Option extends TmOption {}

/** Dropdown Select Option Group Component */
export class OptionGroup extends TmOptionGroup {}

/** Pagination Component */
export class Pagination extends TmPagination {}

/** Popover Component */
export class Popover extends TmPopover {}

/** Progress Component */
export class Progress extends TmProgress {}

/** Rate Component */
export class Rate extends TmRate {}

/** Radio Component */
export class Radio extends TmRadio {}

/** Radio Button Component */
export class RadioButton extends TmRadioButton {}

/** Radio Group Component */
export class RadioGroup extends TmRadioGroup {}

/** Row Layout Component */
export class Row extends TmRow {}

/** Dropdown Select Component */
export class Select extends TmSelect {}

/** Slider Component */
export class Slider extends TmSlider {}

/** Step Component */
export class Step extends TmStep {}

/** Steps Component */
export class Steps extends TmSteps {}

/** Submenu Component */
export class Submenu extends TmSubmenu {}

/** Switch Component */
export class Switch extends TmSwitch {}

/** Table Component */
export class Table extends TmTable {}

/** Table Column Component */
export class TableColumn extends TmTableColumn {}

/** Tabs Component */
export class Tabs extends TmTabs {}

/** Tab Pane Component */
export class TabPane extends TmTabPane {}

/** Tag Component */
export class Tag extends TmTag {}

/** Timeline Component */
export class Timeline extends TmTimeline {}

/** Timeline Item Component */
export class TimelineItem extends TmTimelineItem {}

/** TimePicker Component */
export class TimePicker extends TmTimePicker {}

/** TimeSelect Component */
export class TimeSelect extends TmTimeSelect {}

/** Tooltip Component */
export class Tooltip extends TmTooltip {}

/** Transfer Component */
export class Transfer extends TmTransfer {}

/** Tree Component */
export class Tree<K = any, D = TreeData> extends TmTree<K, D> {}

/** Upload Component */
export class Upload extends TmUpload {}

/** Divider Component */
export class Divider extends TmDivider {}

/** Link Component */
export class Link extends TmLink {}

/** Image Component */
export class Image extends TmImage {}

/** Icon Component */
export class Icon extends TmIcon {}

/** Calendar Component */
export class Calendar extends TmCalendar {}

/** Backtop Component */
export class Backtop extends TmBacktop {}

/** InfiniteScroll Directive */
export const InfiniteScroll: PluginObject<TmInfiniteScroll>;

/** PageHeader Component */
export class PageHeader extends TmPageHeader {}

/** Avatar Component */
export class Avatar extends TmAvatar {}

/** Drawer Component */
export class Drawer extends TmDrawer {}

/** Popconfirm Component */
export class Popconfirm extends TmPopconfirm {}
