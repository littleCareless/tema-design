## Icon 图标

提供了一套常用的图标集合。

### 使用方法

直接通过设置类名为 `tm-icon-iconName` 来使用即可。例如：

:::demo
```html
<i class="tm-icon-edit"></i>
<i class="tm-icon-share"></i>
<i class="tm-icon-delete"></i>
<tm-button type="primary" icon="tm-icon-search">搜索</tm-button>

```
:::

### 图标集合

<ul class="icon-list">
  <li v-for="name in $icon" :key="name">
    <span>
      <i :class="'tm-icon-' + name"></i>
      <span class="icon-name">{{'tm-icon-' + name}}</span>
    </span>
  </li>
</ul>
