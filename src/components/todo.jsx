import { defineComponent } from "vue"

export default defineComponent({
  // props:['reverse'],
  setup(props){
    return ()=> <div>1</div>
  }
})

export const timeline = (props)=>{
  const temp =[<div>1</div>,<div>2</div>]
  if(props.reverse){
    temp.reverse()
  }
  return <div>{temp}</div>

}