# 地图实例

## 点击地图获取经纬度和具体地址

```javascript
window.VueMap.initMapApiLoader({
  key: 'YOUR_CODE'
});
```

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="map-page-container">
      <vue-map
        vid="mapDemo"  
        :center="center"
        :no-clear="true"
        :disable-default-ui="disableDefaultUI"
        :zoom="zoom"  
        class="map-demo"
        :events="events">
      </vue-map>
      <div class="toolbar">
        position: [{{ lng }}, {{ lat }}] address: {{ address }}
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
      data: function() {
        let self = this;

        return {
          zoom: 12,
          center: [121.59996, 31.197646],
          disableDefaultUI: false,
          address: '',
          events: {
            click(e) {
              // 这里注意Event
              let lng = e.latLng.lng();
              let lat = e.latLng.lat();
              self.lng = lng;
              self.lat = lat;

              // 这里通过google SDK 完成。
              var geocoder = new google.maps.Geocoder();        
              geocoder.geocode({
                location: {lat: -34.397, lng: 150.644}
              }, function(results, status) {
                if (status === 'OK') {
                  if (results[0]) {
                    self.address = results[0].formatted_address;
                    self.$nextTick();
                  } else {
                    window.alert('No results found');
                  }
                } else {
                  window.alert('Geocoder failed due to: ' + status);
                }
              });        
            }
          },
          lng: 0,
          lat: 0
        };
      }
    };
  </script>

</script>
