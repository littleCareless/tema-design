import TmTimelineItem from '../timeline/src/item';

/* istanbul ignore next */
TmTimelineItem.install = function(Vue) {
  Vue.component(TmTimelineItem.name, TmTimelineItem);
};

export default TmTimelineItem;
