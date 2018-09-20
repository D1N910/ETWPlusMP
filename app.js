//app.js
App({
  onLaunch() {
    var that = this
    wx.getSystemInfo({
      success(res){
        that.gobalData.statusBarHeight = res.statusBarHeight
        console.log()
        // 检测是安卓还是苹果
        if (res.system.indexOf('Android')==0){
          that.gobalData.capsuleHeight = 48
        }else{
          that.gobalData.capsuleHeight = 44
        }
      }
    })
    // 获取首页轮播图内容
    wx.cloud.init({
      env: 'etwplus-test-485c18'
    })
    const db = wx.cloud.database()
    db.collection('audioList').where({
    }).get({
      success: res => {
        console.log(res.data)
        this.gobalData.audioList = res.data
        for (let i in this.gobalData.audioList){
          wx.downloadFile({
            url: this.gobalData.audioList[i].header, 
            success(res) {
              if (res.statusCode === 200) {
                that.gobalData.audioList[i].tempFilePath = res.tempFilePath
                console.log(res.tempFilePath)
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
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  gobalData: {
  }
})