<script>
import registerMixin from '../mixins/register-component'
import { toIcon, toPixel, lngLatTo } from '../utils/convert-helper'

export default {
  name: 'VueMapMarker',
  mixins: [registerMixin],
  props: [
    'vid',
    'position',
    'icon',
    'animation',
    'cursor',
    'draggable',
    'label',
    'visible',
    'zIndex',
    'opacity',
    'offset',
    'events',
    'clickable'
  ],
  data() {
    return {
      converters: {
        icon(options) {
          const icon = toIcon(options)
          if (!icon.anchor && this.offset) {
            icon.anchor = toPixel(this.offset)
          }
          return icon
        }
      },
      handlers: {
        offset(value) {
          if (value) {
            // 这里的this为原生地图对象
            const icon = this.getIcon()
            icon.anchor = toPixel(value)
            this.setIcon(icon)
          }
        }
      }
    }
  },
  methods: {
    __initComponent(options) {
      this.$mapComponent = new google.maps.Marker(options)
    },
    $$getPosition() {
      return lngLatTo(this.$mapComponent.getPosition())
    }
  },
  render() {
    return null
  }
}
</script>
