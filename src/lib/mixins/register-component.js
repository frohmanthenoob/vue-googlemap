import upperCamelCase from 'uppercamelcase'
import { commonConvertMap } from '../utils/convert-helper'
import eventHelper from '../utils/event-helper'
// import { lazyMapApiLoaderInstance } from '../services/injected-map-api-instance'
import CONSTANTS from '../utils/constant'
import VueMap from '../'

export default {
  data() {
    return {
      unwatchFns: []
    }
  },

  mounted() {
    // if (lazyMapApiLoaderInstance) {
    //   lazyMapApiLoaderInstance.load().then(() => {
    //     this.__contextReady && this.__contextReady.call(this, this.convertProps())
    //   })
    // }
    this.$map = this.$map || this.$parent.$map
    if (this.$map) {
      this.register()
    } else {
      this.$on(CONSTANTS.MAP_READY_EVENT, map => {
        this.$map = map
        this.register()
      })
    }
  },

  destroyed() {
    this.unregisterEvents()
    if (!this.$mapComponent) return

    this.$mapComponent.setMap && this.$mapComponent.setMap(null)
    this.$mapComponent.close && this.$mapComponent.close()
    if (this.events && this.events.destroyed) {
      this.events.destroyed.call(this, this.$mapComponent, this)
    }
    // this.$mapComponent.editor && this.$mapComponent.editor.close()
    this.unwatchFns.forEach(item => item())
    this.unwatchFns = []
  },

  methods: {
    getHandlerFun(prop) {
      if (this.handlers && this.handlers[prop]) {
        return this.handlers[prop]
      }

      return this.$mapComponent[`set${upperCamelCase(prop)}`] || this.$mapComponent.setOptions
    },

    convertProps() {
      const props = {}
      if (this.$map) props.map = this.$map
      const { $options: { propsData = {} }, propsRedirect } = this
      return Object.keys(propsData).reduce((res, _key) => {
        let key = _key
        let propsValue = this.convertSignalProp(key, this[key])
        if (propsValue === undefined) return res
        if (propsRedirect && propsRedirect[_key]) key = propsRedirect[key]
        props[key] = propsValue
        return res
      }, props)
    },

    convertSignalProp(key, sourceData) {
      let converter = ''
      let type = ''

      if (this.mapTagName) {
        try {
          const name = this.mapTagName // upperCamelCase(this.mapTagName).replace(/^Vue/, '')
          const componentConfig = VueMap[name] || ''

          type = componentConfig.props[key].$type
          converter = commonConvertMap[type]
        // eslint-disable-next-line no-empty
        } catch (e) {}
      }

      if (type && converter) {
        return converter(sourceData)
      } else if (this.converters && this.converters[key]) {
        return this.converters[key].call(this, sourceData)
      } else {
        const convertFn = commonConvertMap[key]
        if (convertFn) return convertFn(sourceData)
        return sourceData
      }
    },

    registerEvents() {
      // this.setEditorEvents && this.setEditorEvents()
      if (!this.$options.propsData) return
      if (this.$options.propsData.events) {
        for (let eventName in this.events) {
          eventHelper.addListener(this.$mapComponent, eventName, (e) => {
            this.events[eventName].call(this, e, this)
          })
        }
      }

      if (this.$options.propsData.onceEvents) {
        for (let eventName in this.onceEvents) {
          eventHelper.addListenerOnce(this.$mapComponent, eventName, (e) => {
            this.onceEvents[eventName].call(this, e, this)
          })
        }
      }
    },

    unregisterEvents() {
      eventHelper.clearListeners(this.$mapComponent)
    },

    setPropWatchers() {
      const { propsRedirect, $options: { propsData = {} } } = this

      Object.keys(propsData).forEach(prop => {
        let handleProp = prop
        if (propsRedirect && propsRedirect[prop]) handleProp = propsRedirect[prop]
        let handleFun = this.getHandlerFun(handleProp)
        if (!handleFun && prop !== 'events') return

        // watch props
        const unwatch = this.$watch(prop, (nv) => {
          // console.log('watch', prop, nv, ov, nv === ov)
          if (prop === 'events') {
            this.unregisterEvents()
            this.registerEvents()
            return
          }
          if (handleFun && handleFun === this.$mapComponent.setOptions) {
            return handleFun.call(this.$mapComponent, {[handleProp]: this.convertSignalProp(prop, nv)})
          }

          handleFun.call(this.$mapComponent, this.convertSignalProp(prop, nv))
        })

        // collect watchers for destroyed
        this.unwatchFns.push(unwatch)
      })
    },

    registerToManager() {
      let manager = this.mapManager || this.$parent.mapManager
      if (manager && this.vid !== undefined) {
        manager.setComponent(this.vid, this.$mapComponent)
      }
    },

    // some prop can not init by initial created methods
    initProps() {
      const props = ['zooms']

      props.forEach(propStr => {
        if (this[propStr] !== undefined) {
          const handleFun = this.getHandlerFun(propStr)
          handleFun && handleFun.call(this.$mapComponent, this.convertSignalProp(propStr, this[propStr]))
        }
      })

      // this.printReactiveProp()
    },

    /**
     * methods for developing
     * find reactive props
     */
    printReactiveProp() {
      Object.keys(this._props).forEach(k => {
        let fn = this.$mapComponent[`set${upperCamelCase(k)}`]
        if (fn) {
          console.log(this.$options.name, k)
        }
      })
    },

    register() {
      const res = this.__initComponent && this.__initComponent(this.convertProps())
      if (res && res.then) res.then((instance) => this.registerRest(instance))  // promise
      else this.registerRest(res)
    },

    registerRest(instance) {
      if (!this.$mapComponent && instance) this.$mapComponent = instance
      this.registerEvents()
      this.initProps()
      this.setPropWatchers()
      this.registerToManager()

      if (this.events && this.events.init) {
        this.events.init.call(this, this.$mapComponent, this)
      }
    },

    // helper method
    $$getInstance() {
      return this.$mapComponent
    }
  }
}
