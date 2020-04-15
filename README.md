# @vue-map/google

> @vue-map/google是一套基于Vue 2.0和谷歌地图的地图组件。

## 安装
```
npm i @vue-map/google
```

## 文档
[https://penghang.github.io/vue-googlemap](https://penghang.github.io/vue-googlemap)


## 快速上手

引入@vue-map/google

```javascript
// 引入vue-googlemap
import VueMap from '@vue-map/google'
Vue.use(VueMap)

// 初始化vue-googlemap
VueMap.initMapApiLoader({
  // 谷歌的key
  key: 'YOUR_KEY'
})
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
