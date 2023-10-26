import { inject, ref } from "vue"

const key = '=route'
class Route {
  constructor(options){
    // options={
    //   history:{bindEvent,url},
    //   routes
    // }
    this.history = options.history
    this.routes = options.routes
    
    this.current = ref(this.history.url)
    this.history.bindEvent(()=>{
      this.current.value = window.location.hash.slice(1)
    })
  }
  install(app){
    app.provide(key,this)
  }
}
function createWebHistory(){
  function bindEvent (fn) {
    window.addEventListener('hashchange',fn)
  }
  return {
    bindEvent,
    url:window.location.hash.slice(1) || ''
  }
}
function createRouter(options){
  return new Route(options)
}
function useRoute(){
  return inject(key)
}

export {createRouter,createWebHistory,useRoute}