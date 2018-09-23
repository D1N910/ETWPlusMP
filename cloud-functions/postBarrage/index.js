// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  let ifhave = await db.collection('user').where({
    openId: event.userInfo.openId
  }).get()

  if (ifhave.data.length == 0) {
    return {
      status: 404,
      msg: 'user no find'
    }
  } else {
    let data = {}
    let nowData = new Date()
    data.barrageText = event.barrageText
    data.audioPlayTime = event.audioPlayTime

    data.openId = event.userInfo.openId
    data.nickName = ifhave.data[0].nickName
    data.avatarUrl = ifhave.data[0].avatarUrl
    data.saveTime = nowData.getTime()
    await db.collection('audioList').doc(event._id).update({
      data:{
        barrage: _.push(data)
      }
    })

    return true
  }


}