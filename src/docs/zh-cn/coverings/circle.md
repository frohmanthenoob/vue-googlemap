# 圆形

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="map-page-container">
      <vue-map vid="mapDemo" :zoom="zoom" :center="center" class="map-demo">
        <vue-map-circle 
          v-for="circle in circles" 
          :center="circle.center" 
          :radius="circle.radius"
          :draggable="circle.draggable"
          :editable="circle.editable"
          :stroke-color="circle.strokeColor"
          :stroke-weight="circle.strokeWeight"
          :stroke-opacity="circle.strokeOpacity"
          :fill-color="circle.fillColor"
          :fill-opacity="circle.fillOpacity"
          :events="circle.events"></vue-map-circle>
      </vue-map>
    </div>
  </template>

  <style>
    .map-page-container {
      height: 200px;
    }
  </style>

  <script>
    module.exports = {
      data () {
        return {
          zoom: 15,
          center: [121.5273285, 31.21515044],
          circles: [
            {
              center: [121.5273285, 31.21515044],
              radius: 200,
              editable: true,
              draggable: true,
              strokeColor: '#0091ea',
              strokeWeight: 5,
              strokeOpacity: 1,
              fillColor: '#ffff00',
              fillOpacity: 0.5,
              events: {
                click: () => {
                  alert('click');
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
visible | Boolean | 是否可见
clickable | Boolean | 是否可点击
draggable | Boolean | 是否可以拖拽
editable | Boolean | 当前圆形是否可编辑
center | LngLat | 圆心位置
radius | Number | 圆半径，单位:米
zIndex | Number | 层叠顺序
strokeColor | String | 线条颜色，使用16进制颜色代码赋值。
strokeOpacity | Float | 轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。
strokeWeight | Number | 轮廓线宽度
fillColor | String | 圆形填充颜色,使用16进制颜色代码赋值。
fillOpacity | Float | 圆形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | [google.maps.Circle](https://developers.google.cn/maps/documentation/javascript/reference/polygon#Circle) | 获取`circle`实例
$$getCenter() | [lng:Number,lat:Number] | 获取 `circle` 圆心坐标
$$getBounds() | [[lng:Number,lat:Number], [lng:Number,lat:Number]]| 边界
$$getRadius() | Number | 获取半径

## 事件

事件 | 参数 | 说明
---|---|---|
init | Object | 组件实例
click | [MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) | 鼠标左键单击事件
dblclick | [MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) | 鼠标左键双击事件
rightclick | [MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) | 右键单击
mousedown | [MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) | 鼠标按下
mouseup | [MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) | 鼠标抬起
mouseover | [MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) | 鼠标经过
mouseout | [MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) | 鼠标移出
mousemove | [MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) | 鼠标移动
dragstart | [MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) | 开始拖拽圆时触发事件
drag | [MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) | 鼠标拖拽移动圆时触发事件
dragend | [MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) | 圆拖拽移动结束触发事件
center_changed | | 圆心坐标改变触发事件
radius_changed | | 圆半径改变触发事件
