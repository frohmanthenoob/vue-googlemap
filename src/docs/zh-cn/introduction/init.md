# 初始化

---

## 引入地图

一般项目中，对于 @vue-map/google 的初始化只需要调用 `initMapApiLoader` 方法即可。

NPM 安装：

```javascript
import VueMap from '@vue-map/google';

Vue.use(VueMap);
VueMap.initMapApiLoader({
  key: 'YOUR_KEY',
  language: ''
});
```

## Promise

在**定制化程度较高**的项目中，开发者可能只想通过 @vue-map/google 引入谷歌地图，而部分实例化的操作直接基于谷歌地图的 sdk 完成。这个时候就需要 `lazyMapApiLoaderInstance`。

NPM 安装：

```javascript
import VueMap from '@vue-map/google';
import { lazyMapApiLoaderInstance } from '@vue-map/google';

Vue.use(VueMap);
VueMap.initMapApiLoader({
  key: 'YOUR_KEY',
  language: ''
});

lazyMapApiLoaderInstance.load().then(() => {
  // your code ...
  this.map = new google.maps.Map(Dom, {
    center: new google.maps.LatLng(31.197646, 121.59996)
  });
});
```

## 参数

参数名  | 类型  |  默认值 | 描述 |
--- | --- | --- | --- |
key | `String` |  | 谷歌 Key |
language | `String` |  | 地图语言 |
