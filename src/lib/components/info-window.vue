<script>
import registerMixin from '../mixins/register-component'
import Vue from 'vue'
import { toSize } from '../utils/convert-helper'

export default {
  name: 'VueMapInfoWindow',
  mixins: [registerMixin],
  props: [
    'vid',
    'autoMove',
    'offset',
    'position',
    'zIndex',
    'visible',
    'events'
  ],
  data() {
    let self = this
    return {
      listeners: [],
      tmpVm: null,
      propsRedirect: {
        autoMove: 'disableAutoPan',
        offset: 'pixelOffset'
      },
      converters: {
        autoMove(val) {
          return !val
        },
        offset(val) {
          return toSize(val)
        }
      },
      handlers: {
        visible(flag) {
          flag === false ? this.close() : this.open(self.$map)
        }
      }
    }
  },
  created() {
    const i18n = this.$i18n
    this.tmpVm = new Vue({
      i18n,
      data() {
        return {
          node: ''
        }
      },
      render(h) {
        const { node } = this
        return h('div', {ref: 'node'}, Array.isArray(node) ? node : [node])
      }
    }).$mount()
  },
  destroyed() {
    this.$mapComponent.close()
    this.tmpVm.$destroy()
  },
  methods: {
    __initComponent(options) {
      if (this.$slots.default && this.$slots.default.length) {
        options.content = this.tmpVm.$refs.node
      }

      delete options.map
      this.$mapComponent = new google.maps.InfoWindow(options)
      this.addInnerEvents()
      if (this.visible !== false) {
        this.$mapComponent.open(this.$map)
      }
    },
    addInnerEvents() {
      this.listeners.push(this.$mapComponent.addListener('closeclick', () => {
        this.$emit('update:visible', false)
      }))
    },
    removeInnerEvents() {
      this.listeners.forEach(listener => {
        google.maps.event.removeListener(listener)
      })
      this.listeners = []
    }
  },
  beforeDestroy() {
    this.removeInnerEvents()
  },
  render() {
    const slots = this.$slots.default || []
    if (slots.length) {
      this.tmpVm.node = slots
    }
    return null
  }
}
</script>
