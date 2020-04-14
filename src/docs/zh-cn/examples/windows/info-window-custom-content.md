# 信息窗体 - 自定义样式

<vuep template="#exampleContent"></vuep>

<script v-pre type="text/x-template" id="exampleContent">

  <template>
    <div class="map-page-container">
      <vue-map
        vid="mapDemo"  
        :center="center"
        :zoom="zoom"
        class="map-demo">
        <vue-map-info-window :position="window.position" :visible="window.visible" >
          <div class="info-window">
            <div class="info-window-header">
              <span class="info-window-header-title">自定义样式</span>
              <i @click="window.visible=false">×</i>
            </div>
          </div>
        </vue-map-info-window>
      </vue-map>
    </div>
  </template>

  <style>
    .map-demo {
      height: 300px;
    }
    /* 重写外层默认样式 */
    .gm-style .gm-style-iw-c {
      padding: 0;
    }
    .gm-style .gm-style-iw-d {
      overflow: hidden!important;
    }
    .gm-style .gm-style-iw-d+button {
      display: none!important;
    }

    .info-window {
      width: 350px;
      height: 250px;
      color: #666;
    }
    .info-window-header {
      background-color: #305fe6;
      line-height: 40px;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      color: #fff;
      padding-left: 10px;
      display: flex;
    }
    .info-window-header .info-window-header-title {
      flex: 1
    }
    .info-window-header i {
      cursor: pointer;
      line-height: 40px;
      margin-right: 10px;
      font-style: normal;
      font-size: 20px;
    }
  </style>

  <script>
    module.exports = {
      data: function() {
        let center = [121.59996, 31.197646];
        return {
          zoom: 12,
          center,
          window: {
            position: center,
            visible: true
          }
        };
      },

      created() {
      }
    };
  </script>

</script>

### template 模板渲染

支持传入 `Vue` 模板，支持 `Vue` 机制的事件绑定和状态访问。当同时设置 `content` 和 `template` 时，优先 `content`。`v0.4.0` 开始支持。

<vuep template="#exampleTemplate"></vuep>

<script v-pre type="text/x-template" id="exampleTemplate">

  <template>
    <div class="amap-page-container">
      <el-amap
        vid="amapDemo1"  
        :center="center"
        :zoom="zoom"
        class="amap-demo">
        <el-amap-info-window :position="window.position" :template="window.template"></el-amap-info-window>
      </el-amap>
    </div>
  </template>

  <style>
    .amap-demo {
      height: 300px;
    }
  </style>

  <script>
    module.exports = {
      data: function() {
        let self = this;

        return {
          zoom: 12,
          center: [121.59996, 31.197646],
          markers: [],
          markerRefs: [],
          source: 'click'
        };
      },

      created() {
        let basePosition = [121.59996, 31.197646];
        this.window = {
          position: [basePosition[0], basePosition[1]],
          template: `<button @click="handler('hello')">{{ source }}</button>`
        }
      },

      methods: {
        handler(index) {
          alert(`${ index } - trigger`);
        }
      }
    };
  </script>

</script>

### render 方式渲染

`v0.4.3` 开始支持。

<vuep template="#exampleRender"></vuep>

<script v-pre type="text/x-template" id="exampleRender">

  <template>
    <div class="amap-page-container">
      <el-amap
        vid="amapDemo2"  
        :center="center"
        :zoom="zoom"
        class="amap-demo">
        <el-amap-info-window :position="window.position" :content-render="window.contentRender"></el-amap-info-window>
      </el-amap>
    </div>
  </template>

  <style>
    .amap-demo {
      height: 300px;
    }
  </style>

  <script>
    module.exports = {
      data: function() {
        let self = this;
        const BtnComponent = {
          props: ['text'],
          template: `<button>{{text}}</button>`
        };
        const center = [121.59996, 31.197646];
        return {
          zoom: 12,
          center,
          markers: [],
          source: 'click',
          window: {
            position: center,
            contentRender: h => h(BtnComponent, {
                props: {
                  text: 'hello'
                },
                style: {
                  background: 'rgb(173, 47, 47)',
                  color: '#eee'
                },
                nativeOn: {
                  click: () => this.handler(`hello click`)
                }
              })
          }
        };
      },
      created() {
      },

      methods: {
        handler(val) {
          alert(`${ val } - trigger`);
        }
      }
    };
  </script>

</script>

### slots 渲染

`v0.4.5` 开始支持。

<vuep template="#exampleSlots"></vuep>

<script v-pre type="text/x-template" id="exampleSlots">

  <template>
    <div class="amap-page-container">
      <el-amap
        vid="amapDemo3"  
        :center="center"
        :zoom="zoom"
        class="amap-demo">
        <el-amap-info-window :position="window.position">
          <div :style="slotStyle">
            <b>Hello {{ count }} times</b>
            <button @click="onClick">Add</button>
          </div>
        </el-amap-info-window>
      </el-amap>
    </div>
  </template>

  <style>
    .amap-demo {
      height: 300px;
    }
  </style>

  <script>
    module.exports = {
      data: function() {
        let self = this;
        const center = [121.59996, 31.197646];
      
        return {
          zoom: 12,
          center,
          count: 0,
          slotStyle: {
            padding: '2px 8px',
            background: '#eee',
            color: '#333',
            border: '1px solid #aaa'
          },
          window: {
            position: [121.59996, 31.197646]
          }
        };
      },

      methods: {
        onClick() {
          this.count += 1;
        }
      },

      created() {
      }
    };
  </script>
</script>
