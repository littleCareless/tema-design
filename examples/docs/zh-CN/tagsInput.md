## TagsInput

 带tags的input输入框

### 基础用法

xxxxx

:::demo sxxxx
```html
<tm-tags-input
  class="tags-input"
  v-model="value"
  :existing-tags="[
        { key: 'web-development', value: 'Web Development' },
        { key: 'php', value: 'PHP' },
        { key: 'javascript', value: 'JavaScript' },
    ]"
  :typeahead="true"
></tm-tags-input>

<script>
  export default {
    data() {
      return {
        value: '1111'
      };
    }
  }
</script>
```
:::
