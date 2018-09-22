// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  let data = { ...event }
  let ifhave = await db.collection('user').where({
    openId: event.userInfo.openId
  }).get()
  if (ifhave.data.length>=1){
    return {
      status: 200,
      data: ifhave.data
    }
  } else {
    await db.collection('user').add({
      data: { ...data, ...data.userInfo }
    }).then(e => { console.log(e) }).catch(e => {
      return {
        status: 500,
        data: '添加失败'
      }
    })
    ifhave = await db.collection('user').where({
      openId: event.userInfo.openId
    }).get()
    return {
      status: 200,      
      data: ifhave.data
    }
  }

}