import { setStatusBarHeight } from "../../utils/util.js"
var Audio = wx.createInnerAudioContext()

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    enterShowAnimationData: [],
    seloganLAnimationData: [],
    color: '#000000'
  },

  /**
   * 跳转页面
   */
  enter() {
    Audio.destroy()
    wx.reLaunch({
      url: '../index/index'
    })
  },
  onLoad() {
    setStatusBarHeight(app,this)
    Audio.src = 'https://audio.fireside.fm/podcasts/audio/8/8dd8a56f-9636-415a-8c00-f9ca6778e511/episodes/b/b57ebd4d-31e9-409a-8f1b-a900a23c238b/b57ebd4d-31e9-409a-8f1b-a900a23c238b.mp3'
    Audio.play()
    setTimeout(()=>{
      Audio.stop()
    },5000)
  },
  onReady() {
    // 标语动效
    var seloganAnimationData = wx.createAnimation({
      duration: 1200,
      timingFunction: 'ease',
    })
    
    this.seloganAnimationData = seloganAnimationData

    seloganAnimationData.opacity(1).step()

    this.setData({
      seloganAnimationData: seloganAnimationData.export()
    })

    // 进入按钮动效
    var enterShowAnimationData = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
  
    this.enterShowAnimationData = enterShowAnimationData

    enterShowAnimationData.opacity(1).step()

    setTimeout(()=>{

      this.setData({
        enterShowAnimationData: enterShowAnimationData.export()
      })
      setTimeout(function () {
        enterShowAnimationData = wx.createAnimation({
          duration: 1200,
          timingFunction: 'ease',
        })

        this.enterShowAnimationData = enterShowAnimationData

        enterShowAnimationData.rotate(-180).step()
        this.setData({
          enterShowAnimationData: enterShowAnimationData.export(),
        })
        setTimeout(()=>{
          this.setData({
            color: '#fc4236'                      
          })
        },1000)
      }.bind(this), 800)
    },1000)
  }
})
