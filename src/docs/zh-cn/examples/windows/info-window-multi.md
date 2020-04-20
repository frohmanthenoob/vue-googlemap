# 信息窗体 - 多窗口

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="map-page-container">
      <vue-map
        vid="mapDemo"  
        :center="center"
        :zoom="zoom"  
        class="map-demo">
        <vue-map-marker 
          v-for="marker in markers" 
          :position="marker.position"
          :custominfo="marker.info"
          :events="marker.events"></vue-map-marker>
        <vue-map-info-window 
          v-for="marker in markers" 
          :offset="offset" 
          :position="marker.position" 
          :visible.sync="marker.visible" >
          <div class="prompt">{{marker.info}}</div>
        </vue-map-info-window>
      </vue-map>
    </div>
  </template>

  <style>
    .map-demo {
      height: 300px;
    }

    .prompt {
      background: white;
      width: 100px;
      height: 30px;
      text-align: center;
    }
  </style>

  <script>
    module.exports = {
      data: function() {
        const self = this
        return {
          zoom: 16,
          center: [121.59996, 31.197646],
          markers: [],
          offset: [0, -50]
        }
      },

      mounted() {
        let markers = []
        let num = 3

        for (let i = 0 ; i < num ; i ++) {
          markers.push({
            info: `marker-${i}`,
            position: [121.59396 + i * 0.005, 31.197646],
            visible: false,
            events: {
              click() {
                // 非箭头函数,事件回调时this为当前点击的VueMapMarker组件
                markers[i].visible = true
              }
            }
          })
        }

        this.markers = markers
      }
    };
  </script>

</script>
