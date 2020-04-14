<p align="center">
  <img src="https://cdn.rawgit.com/ElemeFE/vue-amap/master/src/docs/assets/images/logo.png">
</p>

# vue-map
[![Build Status](https://travis-ci.org/ElemeFE/vue-amap.svg?branch=master)](https://travis-ci.org/ElemeFE/vue-amap)
[![npm package](https://img.shields.io/npm/v/vue-amap.svg)](https://www.npmjs.org/package/vue-amap)
[![NPM downloads](http://img.shields.io/npm/dm/vue-amap.svg)](https://npmjs.org/package/vue-amap)
![JS gzip size](http://img.badgesize.io/https://unpkg.com/vue-amap/src/lib/index.js?compression=gzip&label=gzip%20size:%20JS)
[![license](https://img.shields.io/github/license/elemefe/vue-amap.svg?style=flat-square)](https://github.com/ElemeFE/vue-amap)
[![GitHub stars](https://img.shields.io/github/stars/elemefe/vue-amap.svg?style=social&label=Star)](https://github.com/ElemeFE/vue-amap)

> vue-googlemap是一套基于Vue 2.0和谷歌地图的地图组件。

## 安装
```
npm install -S vue-googlemap
```

## 文档
[https://penghang.github.io/vue-googlemap](https://elemefe.github.io/vue-googlemap)


## 快速上手

引入vue-googlemap

```javascript
// 引入vue-googlemap
import VueMap from 'vue-googlemap';
Vue.use(VueMap);

// 初始化vue-googlemap
VueMap.initMapApiLoader({
  // 谷歌的key
  key: 'YOUR_KEY'
});
```

## 组件

### 地图

```vue
<vue-map vid="mapDemo" :zoom="zoom" :center="center">
</vue-map>
```

### 点坐标

```vue
<vue-map vid="mapDemo" :zoom="zoom" :center="center">
  <vue-map-marker v-for="marker in markers" :position="marker.position"></vue-map-marker>
</vue-map>
```

### 折线

```vue
<vue-map vid="mapDemo" :zoom="zoom" :center="center">
  <vue-map-polyline :path="polyline.path"></vue-map-polyline>
</vue-map>
```

### 多边形

```vue
<vue-map vid="mapDemo" :zoom="zoom" :center="center">
  <vue-map-polygon v-for="polygon in polygons" :path="polygon.path" :events="polygon.events"></vue-map-polygon>
</vue-map>
```

### 圆

```vue
<vue-map vid="mapDemo" :zoom="zoom" :center="center">
  <vue-map-circle v-for="circle in circles" :center="circle.center" :radius="circle.radius"></vue-map-circle>
</vue-map>
```

### 矩形

```vue
<vue-map vid="mapDemo" :zoom="zoom" :center="center">
  <vue-map-rectangle v-for="rectangle in rectangles"></vue-map-rectangle>
</vue-map>
```

### 信息窗体

```vue
<vue-map vid="mapDemo" :zoom="zoom" :center="center">
  <vue-map-info-window v-for="window in windows" :position="window.position" :content="window.content" :open="window.open"></vue-map-info-window>
</vue-map>
```
