import { ref, watchEffect } from "vue"

export function useLocalStorage(name,initValue) {
  const data = ref(JSON.parse(localStorage.getItem(name))||initValue)
  
  watchEffect(() => {
    localStorage.setItem(name, JSON.stringify(data.value))
  })
  
  return data
}