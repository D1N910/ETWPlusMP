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
    },
    color:{
      type: String,
      value: '#ffffff'
    },
    position: {
      type: String,
      value: 'absolute'
    },
    logo:{
      type: String,
      value: ''
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
    // 跳转页面
    navigateTo(e) {
      console.log(e.currentTarget.dataset.status)
      if (e.currentTarget.dataset.status == '-1') {
        wx.navigateBack({
          delta: 1
        })
      } else {
        wx.redirectTo({
          url: '/pages/index/index'
        })
      }
    }
  },
  attached(){
    setStatusBarHeight(app, this)    
  }
})
