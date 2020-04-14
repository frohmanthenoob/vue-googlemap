let eventHelper
class EventHelper {
  constructor() {
    /**
     * listener has表
     * {
     *  instance: {
     *              eventName: [...handlers]
     *            }
     * }
     */
    this._listener = new Map()
  }

  addListener(instance, eventName, handler, context) {
    if (!google.maps.event) throw new Error('please wait for Map API load')
    let listener = google.maps.event.addListener(instance, eventName, handler, context)
    if (!this._listener.get(instance)) this._listener.set(instance, {})
    let listenerMap = this._listener.get(instance)
    if (!listenerMap[eventName]) listenerMap[eventName] = []
    listenerMap[eventName].push(listener)

  }

  removeListener(instance, eventName, handler) {
    if (!google.maps.event) throw new Error('please wait for Map API load')
    if (!this._listener.get(instance) || !this._listener.get(instance)[eventName]) return
    let listenerArr = this._listener.get(instance)[eventName]
    if (handler) {
      let l_index = listenerArr.indexOf(handler)
      google.maps.event.removeListener(listenerArr[l_index])
      listenerArr.splice(l_index, 1)
    } else {
      listenerArr.forEach(listener => {
        google.maps.event.removeListener(listener)
      })
      this._listener.get(instance)[eventName] = []
    }
  }
  addListenerOnce(instance, eventName, handler, context) {
    return google.maps.event.addListenerOnce(instance, eventName, handler, context)
  }
  trigger(instance, eventName, args) {
    return google.maps.event.trigger(instance, eventName, args)
  }

  clearListeners(instance) {
    let listeners = this._listener.get(instance)
    if (!listeners) return
    Object.keys(listeners).map(eventName => {
      this.removeListener(instance, eventName)
    })
  }
}

eventHelper = eventHelper || new EventHelper()

export default eventHelper
