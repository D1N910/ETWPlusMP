// 定义全局的音频
//app.js
App({
  getLunbo() {
    var that = this    
    
    const db = wx.cloud.database()
    db.collection('audioList').where({
      type: "news"
    }).limit(1).get({
      success: res => {
        this.globalData.audioList.push(...res.data)        
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
      }
    })
    db.collection('audioList').where({
      type:"recommend"
    }).limit(2).get({
      success: res => {
        this.globalData.audioList.push(...res.data)
        for (let i in this.globalData.audioList) {
          wx.downloadFile({
            url: this.globalData.audioList[i].header,
            success(res) {
              if (res.statusCode === 200) {
                that.globalData.audioList[i].tempFilePath = res.tempFilePath
              }
            }
          })

        }
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
      }
    })
  },
  onLaunch() {
    var that = this    
    // 完成初始化
    wx.cloud.init({
      env: 'etwplus-test-485c18'
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.cloud.callFunction({
      name: 'ifhaveLogin',
      success(res) {
        if (res.result.status == 200) {
          that.globalData.userInfo = res.result.data[0]
          that.globalData.login = true
          wx.setStorageSync('hasUserInfo', true)
          wx.setStorageSync('userInfo', res.result.data[0])
        }else{
          that.globalData.login = false       
          wx.setStorageSync('hasUserInfo', false)             
        }
      }
    })
    wx.getSystemInfo({
      success(res){
        that.globalData.statusBarHeight = res.statusBarHeight
        // 检测是安卓还是苹果
        if (res.system.indexOf('Android')==0){
          that.globalData.capsuleHeight = 48
        }else{
          that.globalData.capsuleHeight = 44
        }
      }
    })
    // 获取首页轮播图内容
    this.getLunbo()
  },
  globalData: {
    userInfo: null,
    audioList: []
  }
})