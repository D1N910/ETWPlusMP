var page = undefined;
// pages/audioPage/_components/barrageContainer/index.js
Component({
  properties: {
    barrageList:{
      type: Array,
      value: [],
      observer: function (newVal, oldVal) {
        console.log()
        if (newVal.length>=1){
          this.bindbt(newVal[newVal.length - 1].barrageText, newVal[newVal.length - 1].nickName, newVal[newVal.length - 1].avatarUrl)
        }
        this.setData({
          scrollTop: 120 * this.data.barrageList.length
        })
      }      
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    doommData: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindbt: function (barrageText, nickName, avatarUrl) {
      page = this;      
      doommList.push(new Doomm(barrageText, nickName, avatarUrl, Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 10), getRandomColor()));
      this.setData({
        doommData: doommList
      })
    }
  }
})

var doommList = [];
var i = 0;
class Doomm {
  constructor(barrageText, nickName, avatarUrl, top, time, color) {
    this.avatarUrl = avatarUrl
    this.nickName = nickName
    this.barrageText = barrageText;
    this.top = top;
    this.time = time+2;
    this.color = color;
    this.display = true;
    let that = this;
    this.id = i++;
    setTimeout(function () {
      doommList.splice(doommList.indexOf(that), 1);
      page.setData({
        doommData: doommList
      })
    }, this.time * 1000)
  }
}
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}