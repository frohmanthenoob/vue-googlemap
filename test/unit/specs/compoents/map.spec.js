import Vue from 'vue'
import { MapManager } from '@vue-map/google'

describe('google.maps.Map', function() {

  describe('#init-instance', function() {
    it('should init map instance', (done) => {
      (new Vue({
        template: `
        <div :style="{height:'100px'}">
          <vue-map :events="events">
          </vue-map>
        </div>
        `,
        data() {
          let center = [116.397428, 39.90923]
          return {
            center,
            zoom: 12,
            events: {
              init: (instance) => {
                expect(instance instanceof window.google.maps.Map).to.true
                console.log(instance.getCenter())
                done()
              }
            }
          }
        }
      })).$mount()
    })
  })

  describe('#event', function() {
    it('should get map instance from manager', done => {
      const mapManager = new MapManager();
      (new Vue({
        template: `<vue-map
        :map-manager="mapManager"
        vid="vid"
        :events="events"
      ></vue-map>`,
        data() {
          return {
            mapManager,
            vid: 'vid',
            events: {
              init: (instance) => {
                expect(mapManager.getMap() === instance).to.true
                done()
              }
            }
          }
        }
      })).$mount()
    })
  })
})
