# 信息窗体

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="map-page-container">
      <vue-map vid="map" :zoom="zoom" :center="center" class="map-demo">
        <vue-map-info-window
          :position="currentWindow.position"
          :visible="currentWindow.visible"
          :events="currentWindow.events">
          <span>
            {{currentWindow.content}}
          </span>
        </vue-map-info-window>
      </vue-map>
      <button @click="switchWindow(0)">Show First Window</button>
      <button @click="switchWindow(1)">Show Second Window</button>
    </div>
  </template>

  <style>
    .map-demo {
      height: 300px;
    }
  </style>

  <script>
    module.exports = {
      data () {
        return {
          zoom: 14,
          center: [121.5273285, 31.21515044],
          windows: [
            {
              position: [121.5273285, 31.21515044],
              content: 'Hi! I am here!',
              visible: true,
              events: {
                closeclick() {
                  alert('close infowindow1');
                }
              }
            }, {
              position: [121.5375285, 31.21515044],
              content: 'Hi! I am here too!',
              visible: true,
              events: {
                closeclick() {
                  alert('close infowindow2');
                }
              }
            }
          ],
          slotWindow: {
            position: [121.5163285, 31.21515044]
          },
          currentWindow: {
            position: [0, 0],
            content: '',
            events: {},
            visible: false
          }
        }
      },

      mounted() {
        this.currentWindow = this.windows[0];
      },

      methods: {
        switchWindow(tab) {
          this.currentWindow.visible = false;
          this.$nextTick(() => {
            this.currentWindow = this.windows[tab];
            this.currentWindow.visible = true;
          });
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

## 静态属性

名称 | 类型 | 说明
---|---|---|
vid | String | 组件的ID。

## 动态属性

支持响应式。

名称 | 类型 | 说明
---|---|---|
autoMove | Boolean | 是否自动调整窗体到视野内（当信息窗体超出视野范围时，通过该属性设置是否自动平移地图，使信息窗体完全显示）
offset | Array | 相对于基点的偏移量。默认情况是信息窗体的底部中心点(BOTTOM_CENTER) 和基点之间的偏移量
position | Array | 信息窗体显示基点位置
visible | Boolean | 信息窗体是否显示，支持 .sync 修饰符。**支持多个信息窗体的显示**
zIndex | Number | 层叠顺序


## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | [google.maps.InfoWindow](https://developers.google.cn/maps/documentation/javascript/reference/info-window) | 获取`infoWindow`实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | Object | 组件实例
closeclick||信息窗体关闭按钮点击之后触发事件
position_changed||position属性发生变化时
zindex_changed||zindex属性发生变化时
