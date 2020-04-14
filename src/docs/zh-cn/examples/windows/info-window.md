# 信息窗体 - 切换

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="map-page-container">
      <vue-map
        vid="mapDemo"  
        :center="center"
        :zoom="zoom"  
        class="map-demo">
        <vue-map-marker v-for="marker in markers" :position="marker.position" :events="marker.events"></vue-map-marker>
        <vue-map-info-window v-if="window" :offset="offset" :position="window.position" :visible="window.visible" >
          <div class="prompt">{{window.index}}</div>
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
        return {
          zoom: 16,
          center: [121.59996, 31.197646],
          markers: [],
          windows: [],
          window: '',
          offset: [0, -50]
        };
      },

      mounted() {
        let markers = [];
        let windows = [];

        let num = 10;
        let self = this;

        for (let i = 0 ; i < num ; i ++) {
          markers.push({
            position: [121.59996, 31.197646 + i * 0.001],
            events: {
              click() {
                self.windows.forEach(window => {
                  window.visible = false;
                });

                self.window = self.windows[i];
                self.$nextTick(() => {
                  self.window.visible = true;
                });
              }
            }
          });

          windows.push({
            position: [121.59996, 31.197646 + i * 0.001],
            index: i,
            visible: false
          });
        }

        this.markers = markers;
        this.windows = windows;
      }
    };
  </script>

</script>
