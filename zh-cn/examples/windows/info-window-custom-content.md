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
