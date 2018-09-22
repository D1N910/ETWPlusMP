// pages/audioPage/_components/Barrage/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    inputFocus:false,
    barrageText: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // input聚焦
    handleInputFocus(){
      this.setData({
        inputFocus: true
      })
    },
    // input失焦
    handleInputBlur() {
      this.setData({
        inputFocus: false
      })
    },
    // 输入
    handleInput(e){
      this.setData({
        barrageText: e.detail.value
      })
    },
    // 点击确认
    handleConfirm(){
      this.setData({
        barrageText: ''
      })
    }
  }
})
