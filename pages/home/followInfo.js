// pages/home/followInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tableHeader: [{      
      "FUserId": "用户编码",
      "FPartName": "单位",
      "FUserName": "跟进人",
      "CustomerState": "状态",
      "AcceptTime": "更新时间"
    }],
    GetFollowDetailList: [{
      "FUserId": "00000001",
      "FPartName": "合-中园地产",
      "FUserName": "林一",
      "CustomerState": "2",
      "AcceptTime": "2020-11-15 16:12:01"
    }, {
      "FUserId": "00000012",
      "FPartName": "合-中园地产",
      "FUserName": "刘二",
      "CustomerState": "4",
      "AcceptTime": "2020-11-15 16:12:01"
    }, {
      "FUserId": "00001584",
      "FPartName": "合-众一地产",
      "FUserName": "张六",
      "CustomerState": "2",
      "AcceptTime": "2020-11-18 16:12:01"
    }, {
      "FUserId": "00015884",
      "FPartName": "自-市场1部",
      "FUserName": "林小中",
      "CustomerState": "2",
      "AcceptTime": "2020-11-15 16:12:03"
    }]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
   

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})