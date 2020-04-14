# 兼容谷歌原生 SDK

---

`vue-googlemap` 能够抛开谷歌原生 SDK 覆盖大多数场景，但对于部分定制化程度较高的场景而言，可能还是需要引入谷歌原生 SDK 来支持。这章将介绍如何在 vue-googlemap 中使用谷歌 SDK。


## 实例方式

对于大多数 `vue-googlemap` 组件，都有 `init` 这个 `event`，参数为谷歌的实例，通过这样暴露谷歌实例的方式，开发者能够非常自由地将原生 SDK 和 vue-googlemap 结合起来使用。

这里以 `vue-map` 组件举例。`vue-map` 比较特殊，它同时还支持一个 `map-manager` 属性，通过这个属性，可以在任何地方拿到谷歌原生 `google.maps.Map` 实例。下面的例子，将介绍两种方式的使用。

*若涉及到谷歌原生 `Map` 需要注意的点：*

* 若 `eslint` 报错 `google is undefined` 之类的错误。请将 `google` 配置到 `.eslintrc` 的 `globals` 中。

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="map-page-container">
      <vue-map vid="mapDemo"  :center="center" :map-manager="mapManager" :zoom="zoom" :events="events" class="map-demo">
      </vue-map>

      <div class="toolbar">
        <button @click="add()">add marker</button>
      </div>
    </div>
  </template>

  <style>
    .map-demo {
      height: 300px;
    }
  </style>

  <script>
    // NPM 方式
    // import { MapManager } from 'vue-googlemap';
    let mapManager = new VueMap.MapManager();
    module.exports = {
      data: function() {
        return {
          zoom: 12,
          center: [121.59996, 31.197646],
          mapManager,
          events: {
            init(o) {
              let marker = new google.maps.Marker({
                position: {
                  lng: 121.59996, 
                  lat: 31.197646
                }
              });

              marker.setMap(o);
            }
          }
        };
      },

      methods: {
        add() {
          let o = mapManager.getMap();
          let marker = new google.maps.Marker({
            position: {
              lng: 121.59996, 
              lat: 31.177646
            }
          });

          marker.setMap(o);
        }
      }
    };
  </script>

</script>
