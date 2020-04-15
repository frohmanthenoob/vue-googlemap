# 折线

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="map-page-container">
      <vue-map vid="map" :zoom="zoom" :center="center" class="map-demo">
        <vue-map-polyline
          v-for="polyline in polylines"
          :editable="polyline.editable" 
          :path="polyline.path"
          :stroke-color="polyline.strokeColor"
          :stroke-weight="polyline.strokeWeight"
          :stroke-opacity="polyline.strokeOpacity"
          :icons="polyline.icons"
          :events="polyline.events"></vue-map-polyline>
      </vue-map>

      <div class="toolbar">
        <button type="button" name="button" v-on:click="changeEditable">change editable</button>
      </div>
    </div>
  </template>

  <style>
    .map-demo {
      height: 300px;
    }
  </style>

  <script>
    const path = [[121.5389385, 31.21515044], [121.5389385, 31.29615044], [121.5273285, 31.21515044]]
    const strokeColor = '#0091ea'
    module.exports = {
      data() {
        return {
          zoom: 12,
          center: [121.5273285, 31.25515044],
          polylines: [
            // 普通折线
            {
              strokeColor,
              strokeWeight: 5,
              strokeOpacity: 1,
              path,
              events: {
                click(e) {
                  alert('click polyline');
                }
              },
              editable: false
            },
            // 复杂折线
            {
              strokeColor,
              strokeWeight: 8,
              path: path.map(arr => {
                return [arr[0] - 0.1, arr[1]]
              }),
              icons: [
                {
                  icon: {
                    path: 2,
                    // fillOpacity: 1,
                    // fillColor: '#ff0000',
                    strokeColor: '#ffffff',
                    strokeWeight: 2,
                    // strokeOpacity: 0.5,
                    scale: 1
                  },
                  repeat: '40px'
                }
              ]
            },
            // 虚线
            {
              strokeColor,
              strokeOpacity: 0,
              path: path.map(arr => {
                return [arr[0] + 0.1, arr[1]]
              }),
              icons: [{
                icon: {
                  path: 'M 0,-1 0,1',
                  strokeOpacity: 1,
                  // 可以控制线宽度
                  scale: 2
                },
                offset: '0',
                repeat: '10px'
              }]
            }
          ]
        };
      },
      methods: {
        changeEditable() {
          this.polylines[0].editable = !this.polylines[0].editable;
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
editable | Boolean | 折线当前是否可编辑
path | Array | 折线的节点坐标数组
zIndex | Number | 折线覆盖物的叠加顺序。默认叠加顺序，先添加的线在底层，后添加的线在上层。通过该属性可调整叠加顺序，使级别较高的折线覆盖物在上层显示。
strokeColor | String | 线条颜色，使用16进制颜色代码赋值。默认值为#006600
strokeOpacity | Number | 线条透明度，取值范围[0,1]，0表示完全透明，1表示不透明。
strokeWeight | Number | 线条宽度，单位：像素
geodesic | Boolean | 是否绘制大地线，默认false
icons | Array | 要沿着折线呈现的图标。

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | [google.maps.Polyline](https://developers.google.cn/maps/documentation/javascript/reference/polygon#Polyline) | 获取`polyline`实例
$$getPath() | [ [lng:Number, lat:Number] ] | 获取 `polyline` 获取折线路径的节点数组


## 事件

事件 | 参数 | 说明
---|---|---|
init | Object | 组件实例
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
