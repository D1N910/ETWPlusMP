// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
let data = {}
exports.main = async (event, context) => {
  await db.collection('audioList').doc(event._id).update({
    data:{
      watch: _.inc(1)
    }
  })
  await db.collection('audioList').doc(event._id).get().then(res=>data = res)

  let ifhave = await db.collection('user').where({
    openId: event.userInfo.openId
  }).get()
  
  let defalutfunctionModule = ['star', 'like','mark']

  if (ifhave.data.length == 0) {
    for(let i of defalutfunctionModule){
      data.data[`if${i}`]=false
    }
  }else{
    for (let i of defalutfunctionModule) {
      if (!ifhave.data[0][i] || ifhave.data[0][i].indexOf(event._id) < 0){
        data.data[`if${i}`] = false
      } else {
        data.data[`if${i}`] = true        
      }
    }
  }
  return data
}