<script>
import registerMixin from '../mixins/register-component'
import { boundsTo, lngLatTo } from '../utils/convert-helper'

const TAG = 'VueMapRectangle'

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

    bounds: {
      type: Array,
      $type: 'Bounds'
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
      this.$mapComponent = new google.maps.Rectangle(options)
    },
    $$getBounds() {
      return boundsTo(this.$mapComponent.getBounds())
    },
    $$getCenter() {
      return lngLatTo(this.$mapComponent.getBounds().getCenter())
    }
  },
  render() {
    return null
  }
}
</script>
