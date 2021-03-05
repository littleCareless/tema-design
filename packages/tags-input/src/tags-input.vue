<template>
	<div class="cv-tagsinput-root" @click="tagInputFocus">
		<div :class="wrapperClass + ' cv-tagsinput'">
			<Tag v-for="(tag, index) in tags" :key="index" :closable="tag.closable" :checkable="tag.checkable" :checked="tag.checked" :type="tag.type" :color="tag.color" :name="index" :size="tag.size" @on-close="removeTag">
				{{ tag.value }}
			</Tag>

			<input class="input-tags" type="text" ref="taginput" :placeholder="placeholder" v-model="input" @keydown.enter.prevent="tagFromInput(false)" @keydown.8="removeLastTag" @keydown.down="nextSearchResult" @keydown.up="prevSearchResult" @keydown="onKeyDown" @keyup="onKeyUp" @keyup.esc="clearSearchResults" @focus="onFocus" @blur="onBlur" @value="tags">

			<input type="hidden" v-if="elementId" :name="elementId" :id="elementId" v-model="hiddenInput">
		</div>

		<!-- Typeahead/Autocomplete -->
		<div v-show="searchResults.length">
			<div v-if="typeaheadStyle === 'badges'" :class="`ivu-select-dropdown cv-tagsinput-${typeaheadStyle}`">
				<ul :class="`cv-tagsinput-${typeaheadStyle}-list`">
					<li v-for="(tag, index) in searchResults" :key="index" @mouseover="searchSelection = index" @mousedown.prevent="tagFromSearchOnClick(tag)" v-bind:class="{
            'cv-tagsinput-item': true,
            'cv-tagsinput-item-highlighted': index == searchSelection,
            'cv-tagsinput-add-btn': tag.newTag
          }">
						<tm-tag v-html="tag.newTag?`${tag.value} (${discardSearchText})`:tag.value" :type="tag.type" :color="tag.color" :name="index" :size="tag.size"></tm-tag>
					</li>
				</ul>
			</div>
			<div v-else-if="typeaheadStyle === 'dropdown'" :class="`ivu-select-dropdown cv-tagsinput-${typeaheadStyle}`">
				<ul :class="`ivu-select-dropdown-list cv-tagsinput-${typeaheadStyle}-list`">
					<!-- <li v-if="!typeaheadHideDiscard" class="cv-tagsinput-select-item cv-tagsinput-hide-btn" @mousedown.prevent="clearSearchResults" v-text="discardSearchText"></li> -->

					<li v-for="(tag, index) in searchResults" :key="index" v-html="tag.newTag?`${tag.value} (${discardSearchText})`:tag.value" @mouseover="searchSelection = index" @mousedown.prevent="tagFromSearchOnClick(tag)" v-bind:class="{
            'ivu-select-item': true,
            'ivu-select-item-focus': index == searchSelection,
            'cv-tagsinput-item': index != searchSelection,
            'cv-tagsinput-item-highlighted': index == searchSelection,
            'cv-tagsinput-add-btn': tag.newTag
            }"></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
// import './tags-input-style.less';
export default {
  name: 'TmTagsInput',
  props: {
    elementId: String,
    existingTags: {
      type: Array,
      default: () => {
        return [];
      }
    },
    value: {
      type: Array,
      default: () => {
        return [];
      }
    },
    typeahead: {
      type: Boolean,
      default: false
    },
    typeaheadStyle: {
      type: String,
      default: 'badges'
    },
    typeaheadActivationThreshold: {
      type: Number,
      default: 1
    },
    typeaheadMaxResults: {
      type: Number,
      default: 0
    },
    typeaheadAlwaysShow: {
      type: Boolean,
      default: false
    },
    typeaheadHideDiscard: {
      type: Boolean,
      default: false
    },
    typeaheadDefaultSelect: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: 'Add a tag'
    },

    discardSearchText: {
      type: String,
      default: 'Discard Search Results'
    },
    limit: {
      type: Number,
      default: 0
    },
    onlyExistingTags: {
      type: Boolean,
      default: false
    },
    deleteOnBackspace: {
      type: Boolean,
      default: true
    },
    allowDuplicates: {
      type: Boolean,
      default: false
    },

    validate: {
      type: Function,
      default: () => true
    },
    addTagsOnComma: {
      type: Boolean,
      default: false
    },
    addTagsOnSpace: {
      type: Boolean,
      default: false
    },
    addTagsOnBlur: {
      type: Boolean,
      default: false
    },
    wrapperClass: {
      type: String,
      default: 'cv-tagsinput-wrapper-default'
    },
    sortSearchResults: {
      type: Boolean,
      default: true
    },
    caseSensitiveTags: {
      type: Boolean,
      default: false
    },
    beforeAddingTag: {
      type: Function,
      default: () => true
    },
    beforeRemovingTag: {
      type: Function,
      default: () => true
    }
  },
  data() {
    return {
      badgeId: 0,
      tags: [],
      input: '',
      oldInput: '',
      hiddenInput: '',
      searchResults: [],
      searchSelection: -1,
      selectedTag: -1
    };
  },
  created() {
    this.tagsFromValue();
    if (this.typeaheadAlwaysShow) {
      this.searchTag(false);
    }
    // Emit an event
    this.$emit('on-ready');
  },
  watch: {
    input(newVal, oldVal) {
      this.searchTag(false);
      if (newVal.length && newVal !== oldVal) {
        // const diff = newVal.substring(oldVal.length, newVal.length);
        if (this.addTagsOnSpace) {
          if (newVal.endsWith(' ')) {
            // The space shouldn't actually be inserted
            this.input = newVal.trim();
            // Add the inputed tag
            this.tagFromInput(true);
          }
        }
        if (this.addTagsOnComma) {
          newVal = newVal.trim();
          if (newVal.endsWith(',')) {
            // The comma shouldn't actually be inserted
            this.input = newVal.substring(0, newVal.length - 1);
            // Add the inputed tag
            this.tagFromInput(true);
          }
        }
        this.$emit('on-change', newVal);
      }
    },
    tags() {
      // Updating the hidden input
      this.hiddenInput = JSON.stringify(this.tags);
      // Update the bound v-model value
      this.$emit('input', this.tags);
    },
    existingTags(newValue) {
      this.existingTags = newValue;
    },
    value() {
      this.tagsFromValue();
    },
    typeaheadAlwaysShow(newValue) {
      if (newValue) {
        this.searchTag(false);
      } else {
        this.clearSearchResults();
      }
    }
  },
  methods: {
    /**
		 * Remove reserved regex characters from a string so that they don't
		 * affect search results
		 *
		 * @param string
		 * @returns String
		 */
    escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },
    /**
		 * Add a tag whether from user input or from search results (typeahead)
		 *
		 * @param ignoreSearchResults
		 * @returns void
		 */
    tagFromInput(ignoreSearchResults = false) {
      // If we're choosing a tag from the search results
      if (this.searchResults.length && this.searchSelection >= 0 && !ignoreSearchResults) {
        this.tagFromSearch(this.searchResults[this.searchSelection]);
        this.input = '';
      } else {
        // If we're adding an unexisting tag
        let text = this.input.trim();
        // If the new tag is not an empty string and passes validation
        if (!this.onlyExistingTags && text.length && this.validate(text)) {
          this.input = '';
          // Determine if the inputted tag exists in the existingTags
          // array
          let newTag = {
            value: text
          };
          const searchQuery = this.escapeRegExp(
            this.caseSensitiveTags ? newTag.value : newTag.value.toLowerCase()
          );
          for (let tag of this.existingTags) {
            tag.value = tag.value.toString();
            const compareable = this.caseSensitiveTags ? tag.value : tag.value.toLowerCase();
            if (searchQuery === compareable) {
              newTag = Object.assign({}, tag);
              break;
            }
          }
          this.addTag(newTag);
        }
      }
    },
    /**
		 * Add a tag from search results when a user clicks on it
		 *
		 * @param tag
		 * @returns void
		 */
    tagFromSearchOnClick(tag) {
      this.tagFromSearch(tag);
      this.$refs['taginput'].blur();
    },
    /**
		 * Add the selected tag from the search results.
		 * Clear search results.
		 * Clear user input.
		 *
		 * @param tag
		 * @return void
		 */
    tagFromSearch(tag) {
      this.clearInput();
      this.clearSearchResults();
      this.addTag(tag);
      this.$nextTick(() => {
        this.input = '';
        this.oldInput = '';
      });
    },
    /**
		 * Add/Select a tag
		 *
		 * @param tag
		 * @returns void | Boolean
		 */
    addTag(tag) {
      if (!this.beforeAddingTag(tag)) {
        return false;
      }

      // Check if the limit has been reached
      if (this.limit > 0 && this.tags.length >= this.limit) {
        this.$emit('on-limit-reach');
        return false;
      }

      // Attach the tag if it hasn't been attached yet
      if (!this.tagSelected(tag)) {
        this.tags.push(tag);
        // Emit events
        this.$nextTick(() => {
          this.$emit('on-add', tag);
          this.$emit('on-update');
        });
      }
    },
    /**
		 * Remove the last tag in the tags array.
		 *
		 * @returns void
		 */
    removeLastTag(e) {
      if (!this.input.length && this.deleteOnBackspace && this.tags.length) {
        this.removeTag(e, this.tags.length - 1);
      }
    },
    /**
		 * Remove the selected tag at the specified index.
		 *
		 * @param index
		 * @returns void
		 */
    removeTag(e, index) {
      let tag = this.tags[index];
      if (!this.beforeRemovingTag(tag)) {
        return false;
      }
      this.tags.splice(index, 1);
      // Emit events
      this.$nextTick(() => {
        this.$emit('on-remove', tag);
        this.$emit('on-update');
        if (this.typeaheadAlwaysShow) {
          this.searchTag();
        }
      });
    },
    /**
		 * Search the currently entered text in the list of existing tags
		 *
		 * @returns void | Boolean
		 */
    searchTag() {
      if (this.typeahead !== true) {
        return false;
      }
      if (
        this.oldInput !== this.input ||
				(!this.searchResults.length && this.typeaheadActivationThreshold === 0) ||
				this.typeaheadAlwaysShow
      ) {

        this.searchResults = [];
        // 需要加一个判断 是否默认选中第一项.
        this.searchSelection = this.typeaheadDefaultSelect ? 0 : -1;
        let input = this.input.trim();
        if (
          (input.length && input.length >= this.typeaheadActivationThreshold) ||
					this.typeaheadActivationThreshold === 0 ||
					this.typeaheadAlwaysShow
        ) {
          // Find all the existing tags which include the search text
          const searchQuery = this.escapeRegExp(
            this.caseSensitiveTags ? input : input.toLowerCase()
          );
          let needCreate = true;
          for (let tag of this.existingTags) {
            tag.value = tag.value.toString();
            const compareable = this.caseSensitiveTags ? tag.value : tag.value.toLowerCase();
            if (compareable.search(searchQuery) > -1) {
              if (!this.tagSelected(tag)) {
                this.searchResults.push(tag);
                if (compareable === searchQuery) {
                  needCreate = false;
                }
              }
            }
          }
          // Sort the search results alphabetically
          if (this.sortSearchResults) {
            this.searchResults.sort((a, b) => {
              if (a.value < b.value) return -1;
              if (a.value > b.value) return 1;
              return 0;
            });
          }
          // Shorten Search results to desired length
          if (this.typeaheadMaxResults > 0) {
            this.searchResults = this.searchResults.slice(0, this.typeaheadMaxResults);
          }

          if (!this.onlyExistingTags && input !== '' && needCreate && !this.tagSelected({value: input})) {
            this.searchResults.push({ value: input, newTag: true });
          }
        }
        this.oldInput = this.input;
      }
    },
    /**
		 * Hide the typeahead if there's nothing intered into the input field.
		 *
		 * @returns void
		 */
    hideTypeahead() {
      console.log('hide', this.input.length, this.searchResults);
      if (!this.input.length) {
        this.$nextTick(() => {
          this.clearSearchResults();
        });
      }
    },
    /**
		 * Select the next search result in typeahead.
		 *
		 * @returns void
		 */
    nextSearchResult() {
      if (this.searchSelection + 1 <= this.searchResults.length - 1) {
        this.searchSelection++;
      }
    },
    /**
		 * Select the previous search result in typeahead.
		 *
		 * @returns void
		 */
    prevSearchResult() {
      if (this.searchSelection > 0) {
        this.searchSelection--;
      }
    },
    /**
		 * Clear/Empty the search results.
		 *
		 * @reutrns void
		 */
    clearSearchResults() {
      this.searchResults = [];
      this.searchSelection = 0;
      if (this.typeaheadAlwaysShow) {
        this.$nextTick(() => {
          this.searchTag();
        });
      }
    },
    /**
		 * Clear the list of selected tags.
		 *
		 * @returns void
		 */
    clearTags() {
      this.tags.splice(0, this.tags.length);
    },
    /**
		 * Replace the currently selected tags with the tags from the value.
		 *
		 * @returns void
		 */
    tagsFromValue() {
      if (this.value && this.value.length) {
        if (!Array.isArray(this.value)) {
          console.error('Voerro Tags Input: the v-model value must be an array!');
          return;
        }

        let tags = this.value;
        // Don't update if nothing has changed
        if (this.tags === tags) {
          return;
        }
        this.clearTags();
        for (let tag of tags) {
          this.addTag(tag);
        }
      } else {
        if (this.tags.length === 0) {
          return;
        }
        this.clearTags();
      }
    },
    /**
		 * Check if a tag is already selected.
		 *
		 * @param tag
		 * @returns Boolean
		 */
    tagSelected(tag) {
      if (this.allowDuplicates) {
        return false;
      }
      if (!tag) {
        return false;
      }
      const searchQuery = this.escapeRegExp(
        this.caseSensitiveTags ? tag.value.toString() : tag.value.toString().toLowerCase()
      );
      for (let selectedTag of this.tags) {
        const compareable = this.caseSensitiveTags
          ? selectedTag.value.toString()
          : selectedTag.value.toString().toLowerCase();
        if (selectedTag.value.toString() === tag.value && compareable.search(searchQuery) > -1) {
          return true;
        }
      }
      return false;
    },
    /**
		 * Clear the input.
		 *
		 * @returns void
		 */
    clearInput() {
      this.input = '';
    },
    /**
		 * Process all the keyup events.
		 *
		 * @param e
		 * @returns void
		 */
    onKeyUp(e) {
      this.$emit('on-keyup', e);
    },
    /**
		 * Process all the keydown events.
		 *
		 * @param e
		 * @returns void
		 */
    onKeyDown(e) {
      this.$emit('on-keydown', e);
    },
    tagInputFocus(e) {
      console.log(e, this.$refs.taginput);
      this.$refs.taginput.focus();
    },
    /**
		 * Process the onfocus event.
		 *
		 * @param e
		 * @returns void
		 */
    onFocus(e) {
      this.$emit('on-focus', e);
      this.searchTag();
    },
    /**
		 * Process the onblur event.
		 *
		 * @param e
		 * @returns void
		 */
    onBlur(e) {
      console.log('blur');
      this.$emit('on-blur', e);
      if (this.addTagsOnBlur) {
        // Add the inputed tag
        this.tagFromInput(true);
      }
      if (!this.typeaheadAlwaysShow) {
        this.hideTypeahead();
      } else {
        this.searchTag();
      }
    }
  }
};
</script>

<style>
.cv-tagsinput-root {
	position: relative;
}
.ivu-icon-ios-close {
	color: #666 !important;
}
.input-tags::-webkit-input-placeholder {
  color: #C5C8CE;
}
</style>
