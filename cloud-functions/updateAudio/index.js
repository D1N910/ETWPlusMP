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

  if (ifhave.data.length==0){
    return {
      status: 404,
      msg:'user no find'
    }
  }else{
    let data = {}
    for (let i in event.updata) {
      data[i] = _.inc(event.updata[i])
    }
    
    for (let i in event.updata) {
      if (event.updata[i]>0){
        if (!ifhave.data[0][i] || ifhave.data[0][i].indexOf(event._id) < 0){
          await db.collection('user').doc(ifhave.data[0]._id).update({
            data: {
              [i]: _.push(event._id)
            }
          })  
        }
      }else{
        ifhave.data[0][i].splice(ifhave.data[0][i].indexOf(event._id), 1)
        await db.collection('user').doc(ifhave.data[0]._id).update({
          data: {
          [i]: ifhave.data[0][i]
          }
        })
      }
    }

    await db.collection('audioList').doc(event._id).update({
      data
    })

    return true
  }
  

}