import { VNodeDirective } from 'vue'

export interface TmInfiniteScroll extends VNodeDirective {
  name: 'infinite-scroll',
  value: Function
}