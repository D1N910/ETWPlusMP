// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
    let data = {}
    for (let i in event.updata) {
      data[i] = _.inc(event.updata[i])
    }
    await db.collection('audioList').doc(event._id).update({
      data
    })
    return true
}