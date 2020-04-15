# 矩形

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

   <template>
     <div class="map-page-container">
        <vue-map vid="mapDemo" :zoom="zoom" :center="center" class="map-demo">
          <vue-map-rectangle 
            v-for="retangle in retangles" 
            :events="retangle.events" 
            :center="retangle.center" 
            :bounds="retangle.bounds" 
            :draggable="retangle.draggable"
            :editable="retangle.editable"
            :stroke-color="retangle.strokeColor"
            :stroke-weight="retangle.strokeWeight"
            :stroke-opacity="retangle.strokeOpacity"
            :fill-color="retangle.fillColor"
            :fill-opacity="retangle.fillOpacity"></vue-map-rectangle>
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
          zoom: 12,
          center: [121.5273285, 31.21515044],
          retangles: [
            {
              center: [121.5273285, 31.21515044],
              bounds: [[121.5273285, 31.21515044], [121.7276285, 31.24545044]],
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


## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
visible | Boolean | 是否隐藏
clickable | Boolean | 是否可点击
draggable | Boolean | 是否可以拖拽
editable | Boolean | 折线当前是否可编辑
bounds | Array<Array> | 矩形的范围
zIndex | Number | 层叠顺序
strokeColor | String | 线条颜色，使用16进制颜色代码赋值。
strokeOpacity | String | 轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。
strokeWeight | Number | 轮廓线宽度
fillColor | String | 圆形填充颜色,使用16进制颜色代码赋值。
fillOpacity | String | 圆形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | [google.maps.Rectangle](https://developers.google.cn/maps/documentation/javascript/reference/polygon#Rectangle) | 获取`Rectangle`实例
$$getCenter() | [lng:Number,lat:Number] | 获取 `Rectangle` 中心坐标
$$getBounds() | [[lng:Number,lat:Number], [lng:Number,lat:Number]]| 边界


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
dragstart | [MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) | 开始拖拽矩形时触发事件
drag | [MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) | 鼠标拖拽移动矩形时触发事件
dragend | [MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) | 矩形拖拽移动结束触发事件
center_changed | | 矩形中心坐标改变触发事件
