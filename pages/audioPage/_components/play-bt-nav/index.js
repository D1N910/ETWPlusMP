// pages/audioPage/_components/play-bt-nav/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ifping: {
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
    clickNav(e){
      this.triggerEvent('clickNav', e)
    }
  }
})
