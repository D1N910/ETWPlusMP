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
    let iftrue = parseFloat(event.eggCm) <= 2.60 && parseFloat(event.eggCm) >= 2.50
    if (iftrue){
      await db.collection('user').doc(ifhave.data[0]._id).update({
        data: {
          support: true
        }
      })
      return {
        status: 1200,
        msg: 'success!'
      }
    }else{
      return {
        status: 200,
        msg: 'error passowed!',
        eggCm: event
      }
    }
  } else {
    return {
      status: 404
    }
  }
}