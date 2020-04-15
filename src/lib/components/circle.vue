<script>
import registerMixin from '../mixins/register-component'
import { boundsTo, lngLatTo } from '../utils/convert-helper'

const TAG = 'VueMapCircle'

export default {
  name: TAG,
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
    radius: Number,

    center: {
      type: Array,
      $type: 'LngLat'
    },
    events: Object
  },
  data() {
    return {
      mapTagName: TAG
    }
  },
  methods: {
    __initComponent(options) {
      this.$mapComponent = new google.maps.Circle(options)
    },
    $$getBounds() {
      return boundsTo(this.$mapComponent.getBounds())
    },
    $$getCenter() {
      return lngLatTo(this.$mapComponent.getCenter())
    },
    $$getRadius() {
      return this.$mapComponent.getRadius()
    }
  },
  render() {
    return null
  }
}
</script>
