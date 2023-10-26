import { createStore }  from "vuex"
// import {createStore} from "./gvuex";

const store = createStore({
  state(){
    return {
      name:'11'
    }
  },
  getters:{},
  mutations:{
    add(state){
      state.name+=','
    }
  },
  actions:{
    login({commit}){
      new Promise(()=>{
        commit('add')
      })
    }
    
  },
})

export default store