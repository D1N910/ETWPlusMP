//app.js
App({
  onLaunch() {
    var that = this
    wx.getSystemInfo({
      success(res){
        that.gobalData.statusBarHeight = res.statusBarHeight
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
            url: this.gobalData.audioList[i].header, //仅为示例，并非真实的资源
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