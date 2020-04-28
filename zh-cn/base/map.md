# 地图

地图组件

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="map-page-container">
      <vue-map 
        ref="map" 
        vid="mapDemo" 
        :map-manager="mapManager"
        :center="center" 
        :zoom="zoom" 
        :events="events" 
        class="map-demo">
      </vue-map>

      <div class="toolbar">
        <button @click="getMap()">get map</button>
      </div>
    </div>
  </template>

  <style>
    .map-demo {
      height: 300px;
    }
  </style>

  <script>
    // NPM 方式
    // import { MapManager } from 'vue-map';
    // CDN 方式
    let mapManager = new VueMap.MapManager();
    module.exports = {
      data: function() {
        return {
          mapManager,
          zoom: 12,
          center: [121.59996, 31.197646],
          events: {
            init: (o) => {
              console.log(o.getCenter())
              console.log(this.$refs.map.$$getInstance())
            },
            'moveend': () => {
            },
            'zoomchange': () => {
            },
            'click': (e) => {
              alert('map clicked');
            }
          }
        };
      },

      methods: {
        getMap() {
          // map vue component
          console.log(mapManager._componentMap);
          // gaode map instance
          console.log(mapManager._map);
        }
      }
    };
  </script>

</script>

## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
vid | String | 地图容器节点的ID。
mapManager| MapManager | 地图管理对象。

## 动态属性

支持响应式。

名称 | 类型 | 说明
---|---|---|
clickableIcons | Boolean | 地图图标是否可以点击，默认为false
scrollWheel | Boolean | 地图是否可以通过鼠标滚轮缩放浏览，默认为true
rotateEnable | Boolean  | 地图是否可旋转，默认false。
dragEnable | Boolean  | 	地图是否可通过鼠标拖拽平移，默认为true。
zoomEnable | Boolean  | 	地图是否可缩放，默认值为true。
zoom | Number | 地图显示级别
zooms | Array | 地图显示的缩放级别范围，默认范围[0,22]，取值范围[0-22]
center | Array | 地图中心点坐标值
fullscreenControl | Boolean | 是否可全屏
disableDefaultUi | Boolean | 是否禁用默认UI
mapTypeId | String | 地图类型。hybrid\|roadmap\|satellite\|terrain
bounds | Array | v>=0.2.0。地图边界设置，设置之后地图将调整缩放等级和中心点并最终包含此边界

## MapManager

用于获取地图实例，以及获得地图内组件的实例。

名称 | 参数 | 返回类型 | 说明
---|--- | --- |---|
getMap | | google.maps.Map | 返回地图实例，注入该管理实例的组件的地图实例
getChildInstance| vid | instance | 返回 vid 对应的组件实例

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | [google.maps.Map](https://developers.google.cn/maps/documentation/javascript/reference/map) | 获取地图实例
$$getCenter()   | [lng: Number, lat: Number] | 获取地图中心
$$getZoom()     | Number | 获取地图缩放等级


## 事件

事件 | 参数 | 说明
---|---|---|
init | [google.maps.Map](https://developers.google.cn/maps/documentation/javascript/reference/map) | 组件初始化
destroyed | [google.maps.Map](https://developers.google.cn/maps/documentation/javascript/reference/map) | 组件销毁
click |[MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) |鼠标左键单击事件
dblclick |[MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) |鼠标左键双击事件
center_changed | |地图中心点改变时触发事件
bounds_changed | |地图边界改变时触发事件
dragstart | |开始拖拽地图时触发
drag | |拖拽地图过程中触发
dragend | |停止拖拽地图时触发。如地图有拖拽缓动效果，则在拽停止，缓动开始前触发
idle | |当地图在平移或缩放后变为空闲时触发此事件。
mousemove |[MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) |鼠标在地图上移动时触发
mouseout |[MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) |鼠标移出地图容器时触发
mouseover |[MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) |鼠标移入地图容器内时触发
rightclick |[MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) |鼠标右键单击事件
zoom_changed | |地图缩放级别更改后触发
