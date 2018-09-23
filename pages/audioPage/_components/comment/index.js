// pages/audioPage/_components/comment/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    onTimeUpdate: {
      type: String,
      value: ''
    },
    playPosition: {
      type: Number,
      value: 0
    },
    _id:{
      type: String,
      value: ''
    },
    commentList:{
      type: Array,
      value: []
    },
    totalComment: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    commitText: '',
    limit: 6
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getNews(){
      const db = wx.cloud.database()
      wx.showLoading({
        title: '更新中',
        mask: true
      })
      var that = this
      db.collection('comment').where({
        audioId: this.data._id
      }).count({
        success: function (res) {
          that.setData({
            totalComment: res.total
          })
        }
      })

      db.collection('comment').where({
        audioId: this.data._id
      }).orderBy('saveTime', 'desc').limit(this.data.limit).get().then(res => {
        let nowDate = new Date()
        for (let i in res.data) {
          let thisDate = new Date(res.data[i].saveTime)
          let cha = nowDate.getTime() - thisDate.getTime()
          if (cha < 86400000) {
            if (cha / 1000 / 60 <= 1) {
              res.data[i].saveTime = '刚刚'
            } else if (cha / 1000 / 60 < 60) {
              res.data[i].saveTime = `${Math.round(cha / 1000 / 60)}分钟前`
            } else {
              res.data[i].saveTime = `${Math.round(cha / 1000 / 60 / 60)}小时前`
            }
          } else if (cha < 172800000) {
            res.data[i].saveTime = '一天前'
          } else if (thisDate.getFullYear() == now.getFullYear()) {
            res.data[i].saveTime = `${thisDate.getMonth() + 1 < 10 ? '0' + (thisDate.getMonth() + 1) : thisDate.getMonth() + 1}月${thisDate.getDate() < 10 ? '0' + thisDate.getDate() : thisDate.getDate()}日`
          }
        }
        that.data.commentList = [...res.data]
        that.setData({
          commentList: that.data.commentList
        },()=>{
          wx.hideLoading()
          wx.showToast({
            title: '声东击西:已是最新评论',
            icon: 'none'
          })
        })
      })
        .catch(res => console.error(res))

    },
    getMore(){
        const db = wx.cloud.database()
        if (this.data.commentList.length == this.data.totalComment){
          wx.showToast({
            title: '声东击西:再怎么拉都没有啦',
            icon:'none'
          })
          return false
        }
        var that = this
        db.collection('comment').where({
          audioId: this.data._id
        }).count({
          success: function (res) {
            that.setData({
              totalComment: res.total
            })
          }
        })
        db.collection('comment').where({
          audioId: this.data._id
        }).orderBy('saveTime', 'desc').skip(this.data.commentList.length).limit(this.data.limit).get().then(res => {
          let nowDate = new Date()
          for (let i in res.data) {
            let thisDate = new Date(res.data[i].saveTime)
            let cha = nowDate.getTime() - thisDate.getTime()
            if (cha < 86400000) {
              if (cha / 1000 / 60 <= 1) {
                res.data[i].saveTime = '刚刚'
              } else if (cha / 1000 / 60 < 60) {
                res.data[i].saveTime = `${Math.round(cha / 1000 / 60)}分钟前`
              } else {
                res.data[i].saveTime = `${Math.round(cha / 1000 / 60 / 60)}小时前`
              }
            } else if (cha < 172800000) {
              res.data[i].saveTime = '一天前'
            } else if (thisDate.getFullYear() == now.getFullYear()) {
              res.data[i].saveTime = `${thisDate.getMonth() + 1 < 10 ? '0' + (thisDate.getMonth() + 1) : thisDate.getMonth() + 1}月${thisDate.getDate() < 10 ? '0' + thisDate.getDate() : thisDate.getDate()}日`
            }
            console.log(res.data[i].saveTime)
          }
          that.data.commentList.push(...res.data)
          that.setData({
            commentList: that.data.commentList
          })
        })
          .catch(res => console.error(res))
    },
    // 检查是否登录
    ifLogin(){
      if(!wx.getStorageSync('hasUserInfo')) {
      wx.navigateTo({
      url: '/pages/login/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
      })
      return false
      }
    },
    // 输入
    handleInput(e) {
      this.ifLogin()
      this.setData({
        commitText: e.detail.value
      })
    },
    // 点击确认
    handleConfirm() {
      if (!wx.getStorageSync('hasUserInfo')) {
        wx.navigateTo({
          url: '/pages/login/index',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
        return false
      }

      if (this.data.commitText == '') {
        wx.showToast({
          title: '声东击西:不能发表空评论',
          icon: 'none'
        })
        return false
      }

      var that = this

      wx.cloud.callFunction({
        name: 'postCommit',
        data: {
          commitText: this.data.commitText,
          audioPlayTime: this.data.playPosition,
          _id: this.data._id
        },
        success(res) {
          that.getNews()
        }
      })
      that.setData({
        commitText: ''
      },()=>{
        wx.showToast({
          title: '声东击西:评论发表成功',
          icon: 'none'
        })
      })
    }
  }
})
