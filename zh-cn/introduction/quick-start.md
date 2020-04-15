# 快速上手

---

本节将介绍如何在项目中使用 @vue-map/google。


## 1 - 项目结构

使用vue-cli构建项目
```
# 安装vue-cli
npm install -g @vue/cli
# 构建项目
vue create google-map-starter
```

这里提供了简单的示例项目模板。

项目结构大致如下：
```html
|- public/
    |- index.html  ----------- HTML 模板
|- src/  --------------------- 项目源代码
    |- App.vue
    |- main.js  -------------- 入口文件
|- babel.config.js  ---------- babel 配置文件
|- package.json  ------------- npm 配置文件
```

## 2 - 引入@vue-map/google

```
npm install @vue-map/google --save-dev
```

main.js
```javascript
import Vue from 'vue'
import VueMap from '@vue-map/google'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueMap)
VueMap.initMapApiLoader({
  key: 'AIzaSyD9aX2PDz6T6KZPshz1-ETbnqSKUIy5QYg'
})

new Vue({
  render: h => h(App),
}).$mount('#app')
```

App.vue
```html
<template>
  <div id="app">
    <h3 class="title">{{ msg }}</h3>
    <div class="map-wrapper">
      <vue-map class="map-box" :center="center" :zoom="12" :vid="'map-vue'"></vue-map>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      center: [121.59996, 31.197646],
      msg: '@vue-map/google向你问好！'
    }
  }
}
</script>

<style>
.map-wrapper {
  width: 500px;
  height: 500px;
}
</style>
```

## 运行

```
npm run serve
```
