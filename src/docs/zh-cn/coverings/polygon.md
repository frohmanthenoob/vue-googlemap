# 多边形

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="map-page-container">
      <vue-map vid="map" :zoom="zoom" :map-manager="mapManager" :center="center"
      ref="map"
      class="map-demo">
        <vue-map-polygon 
          v-for="(polygon, index) in polygons" 
          :vid="index" 
          :ref="`polygon_${index}`" 
          :path="polygon.path" 
          :draggable="polygon.draggable"
          :editable="polygon.editable"
          :stroke-color="polygon.strokeColor"
          :stroke-weight="polygon.strokeWeight"
          :stroke-opacity="polygon.strokeOpacity"
          :fill-color="polygon.fillColor"
          :fill-opacity="polygon.fillOpacity"
          :events="polygon.events"></vue-map-polygon>
      </vue-map>
    </div>
  </template>

  <style>
    .map-demo {
      height: 300px;
    }
  </style>

  <script>
    let mapManager = new VueMap.MapManager();
    module.exports = {
      data () {
        return {
          zoom: 15,
          center: [121.5273285, 31.21515044],
          mapManager: mapManager,
          polygons: [
            {
              editable: true,
              draggable: true,
              strokeColor: '#0091ea',
              strokeWeight: 5,
              strokeOpacity: 1,
              fillColor: '#ffff00',
              fillOpacity: 0.5,
              path: [
                [121.5273285, 31.21515044], 
                [121.5293285, 31.21515044], 
                [121.5293285, 31.21915044], 
                [121.5273285, 31.21515044]
              ],
              events: {
                click: () => {
                  alert('click polygon');
                  console.log(mapManager.getComponent(0));
                  console.log(this.$refs.map.$$getCenter())
                  console.log(this.$refs.polygon_0[0].$$getPath())
                }
              }
            }
          ]
        }
      }
    };
  </script>
</script>


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
vid | String | 组件的ID。

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
path | Array| 多边形轮廓线的节点坐标数组，当为“环”多边形时（多边形区域在多边形内显示为“岛”），path为二维数组，数组元素为多边形轮廓的节点坐标数组“环”多边形时，要求数组第一个元素为外多边形，其余为“岛”多边形，外多边形需包含“岛”多边形，否则程序不作处理
visible | Boolean | 是否可见
clickable | Boolean | 是否可点击
draggable | Boolean | 是否可以拖拽
editable | Boolean | 多边形当前是否可编辑
zIndex | Number | 多边形覆盖物的叠加顺序。地图上存在多个多边形覆盖物叠加时，通过该属性使级别较高的多边形覆盖物在上层显示
strokeColor | String | 线条颜色，使用16进制颜色代码赋值。
strokeOpacity | float | 轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。
strokeWeight | Number | 轮廓线宽度
fillColor | String | 多边形填充颜色，使用16进制颜色代码赋值，如：#FFAA00
fillOpacity | Float | 多边形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | [google.maps.Polygon](https://developers.google.cn/maps/documentation/javascript/reference/polygon#Polygon) | 获取`polygon`实例
$$getPath() | [[lng:Number,lat:Number]] | 获取 `polygon` 的边界坐标

## 事件

事件 | 参数 | 说明
---|---|---|
init | [google.maps.Polygon](https://developers.google.cn/maps/documentation/javascript/reference/polygon#Polygon) | 组件初始化
destroyed | [google.maps.Polygon](https://developers.google.cn/maps/documentation/javascript/reference/polygon#Polygon) | 组件销毁
click | [PolyMouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/polygon#PolyMouseEvent) | 鼠标左键单击事件
dblclick | [PolyMouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/polygon#PolyMouseEvent) | 鼠标左键双击事件
rightclick | [PolyMouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/polygon#PolyMouseEvent) | 右键单击
mousedown | [PolyMouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/polygon#PolyMouseEvent) | 鼠标按下
mouseup | [PolyMouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/polygon#PolyMouseEvent) | 鼠标抬起
mouseover | [PolyMouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/polygon#PolyMouseEvent) | 鼠标经过
mouseout | [PolyMouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/polygon#PolyMouseEvent) | 鼠标移出
mousemove | [PolyMouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/polygon#PolyMouseEvent) | 鼠标移动
dragstart | [MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) | 开始拖拽多边形时触发事件
drag | [MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) | 鼠标拖拽移动多边形时触发事件
dragend | [MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) | 多边形拖拽移动结束触发事件
