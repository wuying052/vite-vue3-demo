<template>
  <div class="list">
    <input v-model="title" @keyup.enter="add" />
    <transition name="fade" mode="out-in" appear>
      <div v-if="msg" class="warning">
        {{ msg }}
      </div>
    </transition>
    <button v-if="active < all" @click="clear">清理</button>
    <TransitionGroup name="list" tag="ul">
      <li :class="{ done: i.done }" v-for="(i, index) in todos" :key="i.title">
        <input type="checkbox" v-model="i.done" />
        {{ i.title }}
      </li>
    </TransitionGroup>
    <div v-if="all == 0">- 暂无数据 - </div>
    <div>
      全选<input type="checkbox" v-model="allCheck" />{{ active }}/{{ all }}
    </div>
    <div>鼠标位置：( X: {{ x }} , Y: {{ y }} )</div>
    {{ name }}<button @click="addName">add</button>
    <div>jsx</div>
    <todo />
    <timeline />
    <timeline :reverse="true" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useMouse } from '../utils/mouse'
import { useLocalStorage } from '../utils/storage'

import { useStore } from "vuex";
// import { useStore } from "../store/gvuex";

import todo,{timeline} from '@/components/todo'

const msg=ref('')

const store = useStore()
const name = computed(()=>store.state.name)
const addName = ()=>{
  store.commit('add')
  // store.dispatch('login')
}

const { x, y } = useMouse()
const { title, todos, add, clear, active, all, allCheck } = useTodos()

function useTodos() {
  const title = ref("");
  const todos = useLocalStorage('todos',[])
 
  const active = computed(() => {
    return todos.value.filter((i) => !i.done).length;
  });
 
  const all = computed(() => {
    return todos.value.length;
  });

  const allCheck = computed({
    get() {
      return all.value!=0 && active.value == 0;
    },
    set(val) {
      todos.value.forEach((i) => {
        i.done = val;
      });
    },
  });

  const add = () => {
    if(!title.value){
      msg.value = '值为空'
      setTimeout(()=>{
        msg.value = ''
      },1500)
      return
    }
    todos.value.push({ title: title.value, done: false });
    title.value = ''
  };
  const clear = () => {
    todos.value = todos.value.filter((i) => !i.done);
  };
  return { title, todos, add, clear, active, all, allCheck }
}

const bgColor = 'lightpink'
onMounted(() => {
});
</script>

<!-- <script>
export default {
  data() {
    return {
      title: "",
      todos: [
        { title: "11", done: true },
        { title: "22", done: false },
      ],
    };
  },
  computed: {
    active() {
      return this.todos.filter((i) => !i.done).length;
    },
    all() {
      return this.todos.length;
    },
    allCheck: {
      get() {
        return this.active == 0;
      },
      set(val) {
        this.todos.forEach((i) => {
          i.done = val;
        });
      },
    },
  },
  methods: {
    add() {
      this.todos.push({ title: this.title, done: false });
    },
    clear() {
      this.todos = this.todos.filter((i) => !i.done);
    },
  },
};
</script> -->

<style scoped>
.list {
  width: 300px;
  margin: 0 auto;
  text-align: left;
}

.done {
  color: gray;
  text-decoration: line-through;
}

.fade-enter-active,.fade-leave-active{
  transition: opacity 0.5s linear;
}
.fade-enter-from,.fade-leave-to{
  opacity: 0;;
}
.list-move{
  transition: transform 1s ease;
}
.list-enter-active,.list-leave-active{
  transition: all 0.5s ease;
}
.list-enter-from,.list-leave-to{
  opacity: 0;
  transform: translateX(20px);
}

.warning{
  background-color: v-bind(bgColor);
  color: rgb(253, 92, 116);
  border: 1px solid rgb(252, 133, 151);
  border-radius: 4px;
  padding: 2px 4px;
  margin-top: 5px;
}
/* .warning span{
  font-size: 10px;
  float: right;
  cursor: pointer;
}*/
</style> 