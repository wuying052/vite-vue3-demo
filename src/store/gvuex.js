import { inject, reactive,computed } from 'vue'

const key = '__store__'

function useStore() {
  return inject(key)
}

function createStore(options) {
  return new Store(options)
}

class Store {
  constructor(options) {
    this.$options = options
    this._state = reactive({ data: options.state() })  //state定义为一个函数
    this._mutations = options.mutations
    this._actions = options.actions
    this.getters = {}

    options.getters && Object.keys(options.getters).forEach(name => {
      const fn = options.getters[name]
      this.getters[name] = computed(() => fn(this.state))
    })
  }
  //get
  get state() {
    return this._state.data
  }

  commit = (type, paload) => {
    const entry = this._mutations[type]
    entry && entry(this.state, paload)
  }
  dispatch(type, payload) {
    const entry = this._actions[type]
    return entry && entry(this, payload)
  }
  install(app) {
    app.provide(key, this)
  }
}

export { createStore,useStore }
