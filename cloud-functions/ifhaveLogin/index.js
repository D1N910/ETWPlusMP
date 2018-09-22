// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  let ifhave = await db.collection('user').where({
    openId: event.userInfo.openId
  }).get()
  if (ifhave.data.length >= 1) {
    return {
      status: 200,
      data: ifhave.data
    }
  } else {
    return {
      status: 404
    }
  }
}