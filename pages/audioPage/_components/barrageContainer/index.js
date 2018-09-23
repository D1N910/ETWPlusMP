// pages/audioPage/_components/barrageContainer/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    barrageList:{
      type: Array,
      value: [],
      observer: function (newVal, oldVal) {
        this.setData({
          scrollTop: 120 * this.data.barrageList.length
        })
      }      
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    scrollTop: 999
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
