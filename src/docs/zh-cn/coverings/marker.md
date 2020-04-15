# 点坐标

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="map-page-container">
      <vue-map vid="mapDemo" :zoom="zoom" :center="center" class="map-demo">
        <vue-map-marker 
          v-for="(marker, index) in markers" 
          :position="marker.position" 
          :events="marker.events" 
          :visible="marker.visible" 
          :draggable="marker.draggable" 
          :vid="index"></vue-map-marker>
      </vue-map>
      <div class="toolbar">
        <button type="button" name="button" v-on:click="toggleVisible">toggle first marker</button>
        <button type="button" name="button" v-on:click="changePosition">change position</button>
        <button type="button" name="button" v-on:click="changeDraggle">change draggle</button>
        <button type="button" name="button" v-on:click="addMarker">add marker</button>
        <button type="button" name="button" v-on:click="removeMarker">remove marker</button>
      </div>
    </div>
  </template>

  <style>
    .map-demo {
      height: 300px;
    }
  </style>

  <script>
    module.exports = {
      name: 'map-page',
      data() {
        return {
          count: 1,
          zoom: 14,
          center: [121.5273285, 31.21515044],
          markers: [
            {
              position: [121.5273285, 31.21515044],
              events: {
                click: () => {
                  alert('click marker');
                }
              },
              visible: true,
              draggable: false
            }
          ]
        };
      },
      methods: {
        onClick() {
          this.count += 1;
        },
        changePosition() {
          let position = this.markers[0].position;
          this.markers[0].position = [position[0] + 0.002, position[1] - 0.002];
        },
        changeDraggle() {
          let draggable = this.markers[0].draggable;
          this.markers[0].draggable = !draggable;
        },
        toggleVisible() {
          let visableVar = this.markers[0].visible;
          this.markers[0].visible = !visableVar;
        },
        addMarker() {
          let marker = {
            position: [121.5273285 + (Math.random() - 0.5) * 0.02, 31.21515044 + (Math.random() - 0.5) * 0.02],
            visible: true,
            draggable: true
          };
          this.markers.push(marker);
        },
        removeMarker() {
          if (!this.markers.length) return;
          this.markers.splice(this.markers.length - 1, 1);
        }
      }
    };
  </script>

</script>


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
vid | String | marker对象id。

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
visible | Boolean | 点标记是否可见，默认为true。
zIndex | Number | 点标记的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示默认zIndex：100。
position | Array | 点标记在地图上显示的位置，默认为地图中心点。
offset | Array | 点标记显示位置偏移量，默认值为Pixel(-10,-34)。Marker指定position后，默认以marker左上角位置为基准点，对准所给定的position位置，若需使marker指定位置对准在position处，需根据marker的尺寸设置一定的偏移量。
icon | String | 需在点标记中显示的图标。可以是一个本地图标地址。
draggable | Boolean | 设置点标记是否可拖拽移动，默认为false。
cursor | String | 指定鼠标悬停时的鼠标样式
animation | String | 默认无动画效果，“google.maps.Animation.DROP”，点标掉落果，“google.maps.Animation.BOUNCE”，点标弹跳效果。
clickable | Boolean | 点标记是否可点击。
label | String | 添加文本标注
opacity | Number | 不透明度[0, 1]

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | [AMap.Marker](http://lbs.amap.com/api/javascript-api/reference/overlay#Marker) | 获取`marker`实例
$$getPosition() | [lng:Number,lat:Number] | 获取位置

## 事件

事件 | 参数 | 说明
---|---|---|
init | Object | 组件实例
click | [MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) | 鼠标左键单击事件
dblclick | [MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) | 鼠标左键双击事件
rightclick | [MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) | 鼠标右键单击事件
mouseover | [MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) | 鼠标移近点标记时触发事件
mouseout | [MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) | 鼠标移出点标记时触发事件
mousedown | [MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) | 鼠标在点标记上按下时触发事件
mouseup | [MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) | 鼠标在点标记上按下后抬起时触发事件
dragstart | [MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) | 开始拖拽点标记时触发事件
drag | [MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) | 鼠标拖拽移动点标记时触发事件
dragend | [MouseEvent](https://developers.google.cn/maps/documentation/javascript/reference/map#MouseEvent) | 点标记拖拽移动结束触发事件
draggable_changed | | 点标记属性改变触发事件
animation_changed | | 同上
cursor_changed | | 同上
icon_changed | | 同上
position_changed | | 同上
visible_changed | | 同上
zindex_changed | | 同上
