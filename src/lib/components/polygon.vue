<script>
import registerMixin from '../mixins/register-component'
import { toLngLat, lngLatTo } from '../utils/convert-helper'

export default {
  name: 'VueMapPolygon',
  mixins: [registerMixin],
  props: {
    vid: String,
    clickable: Boolean,
    draggable: Boolean,
    editable: Boolean,
    fillColor: String,
    fillOpacity: Number,
    strokeColor: String,
    strokeOpacity: Number,
    // {0: CENTER, 1: INSIDE, 2: OUTSIDE}
    strokePosition: Number,
    strokeWeight: Number,
    visible: Boolean,
    zIndex: Number,
    geodesic: Boolean,

    path: Array,
    events: Object
  },
  data() {
    return {
      converters: {
        path(arr) {
          if (arr && arr.length) {
            return arr.map(toLngLat)
          }
        }
      }
    }
  },
  methods: {
    __initComponent(options) {
      console.log('polygon options', options)
      this.$mapComponent = new google.maps.Polygon(options)
    },
    $$getPath() {
      return this.$mapComponent.getPath().getArray().map(lngLatTo)
    }
  },
  render() {
    return null
  }
}
</script>
