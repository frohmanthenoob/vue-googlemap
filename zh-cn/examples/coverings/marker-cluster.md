# 点坐标 - 聚合

安装聚合组件
```
npm i @google/markerclustererplus --save
```

引入组件
```
import MarkerClusterer from '@google/markerclustererplus';
```

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="map-page-container">
      <vue-map
        vid="mapDemo"  
        :center="center"
        :zoom="zoom"
        class="map-demo"
        :events="events">
        <vue-map-marker 
          v-for="marker in markers" 
          :position="marker.position" 
          :content="marker.content" 
          :events="marker.events"></vue-map-marker>
      </vue-map>
    </div>
  </template>

  <style>
    .map-demo {
      height: 300px;
    }
    .custom-clustericon span {
      color: #ffffff;
      font-size: 12px;
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
          clusterer: null,
          events: {
            init(map) {
              self.clusterer = new MarkerClusterer(map, self.markerRefs, {
                styles: [
                  {
                    url: '/assets/images/m1.png',
                    width: 52,
                    height: 52,
                    // [y, x]
                    anchorText: [20, 0]
                  },
                  {
                    url: '/assets/images/m2.png',
                    width: 56,
                    height: 56,
                    anchorText: [22, 0]
                  },
                  {
                    url: '/assets/images/m3.png',
                    width: 66,
                    height: 66,
                    anchorText: [27, 0]
                  },
                  {
                    url: '/assets/images/m4.png',
                    width: 78,
                    height: 78,
                    anchorText: [33, 0]
                  },
                  {
                    url: '/assets/images/m5.png',
                    width: 90,
                    height: 90,
                    anchorText: [40, 0]
                  },
                ],
                clusterClass: 'custom-clustericon'
              })
              self.createMarkers()
            }
          }
        };
      },

      methods: {
        createMarkers() {
          let self = this;
          let markers = [];
          let index = 0;

          let basePosition = [121.59996, 31.197646];

          while (++index <= 30) {
            markers.push({
              position: [basePosition[0] + 0.01 * index, basePosition[1]],
              events: {
                init(o) {
                  self.clusterer.addMarker(o, true)
                }
              }
            });
          }

          this.markers = markers;
        }
      }
    };
  </script>

</script>
