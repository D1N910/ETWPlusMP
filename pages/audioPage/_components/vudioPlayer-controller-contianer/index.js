// pages/audioPage/_components/vudioPlayer-controller-contianer/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hiddenController: {
      type: Boolean,
      value: false
    },
    playStatus: {
      type: Number,
      value: 1
    },
    ifShowLoading: {
      type: Boolean,
      value: false
    },
    playPosition: {
      type: Number,
      value: 0
    },
    maxLength: {
      type: Number,
      value: 0
    },
    percent: {
      type: Number,
      value: 0
    },
    allTime: {
      type: String,
      value: ''
    },
    onTimeUpdate: {
      type: String,
      value: '00:00'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ToMaximize: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlePlay() {
      this.triggerEvent('handlePlay')      
    },
    handlePause() {
      this.triggerEvent('handlePause')            
    },
    // 最大化
    ToMaximize() {
      this.setData({
        ToMaximize: true
      })
      this.triggerEvent('ToMaximize')            
    },
    // 最小化
    ToMinimize() {
      this.setData({
        ToMaximize: false
      })
      this.triggerEvent('ToMinimize')            
    },
    /**
     * 开始更改
     */
    handleChangeing(e) {
      let minuteInt = parseInt(e.detail.value / 60)
      let secondInt = parseInt((e.detail.value / 60 - minuteInt) * 60)
      let nowTimeMinutes = minuteInt < 10 ? '0' + minuteInt : minuteInt
      let nowTimeSecond = secondInt < 10 ? '0' + secondInt : secondInt

      if (this.data.nowTimeMinutes != minuteInt || this.data.nowTimeSecond != secondInt) {
        this.data.nowTimeMinutes = minuteInt
        this.data.nowTimeSecond = secondInt
        this.setData({
          onTimeUpdate: `${nowTimeMinutes}:${nowTimeSecond}`
        })
      }
      this.triggerEvent('handSlider', {touchSlip: true})
    },
    handleSliderChange(e){
      this.triggerEvent('handSlider', { touchSlip: false, value: e.detail.value})
    }
  }
})
