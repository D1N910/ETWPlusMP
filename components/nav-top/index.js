import { setStatusBarHeight } from "../../utils/util.js"
const app = getApp()
// components/nav-top/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hiddenController: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  attached(){
    setStatusBarHeight(app, this)    
  }
})
