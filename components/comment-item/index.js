// components/commitItem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    commentItem:{
      type: Object,
      value: {}
    },
    commentIndex: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    index: 0,
    array: ['举报']
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindPickerChange(e){
      wx.showToast({
        title: '声东击西:举报成功',
        icon:'none'
      })
    }
  }
})
