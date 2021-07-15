// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    GetUnDealCRequireList: [{
        CustomerId: "00000001",
        CustomerName: "张三",
        CustomerPhoneNo: "13800000000",
        CreateTime: "2021-10-10",
        CustomerType: "2",
        Remark: "有噪音加工厂",
        Area: "1000",
        HouseType: "厂房",
        ExpectedPrice: "18000",
        CustomerState: "2"
      },
      {
        CustomerId: "00000035",
        CustomerName: "李四",
        CustomerPhoneNo: "13800000001",
        CreateTime: "2021-12-15",
        CustomerType: "1",
        Remark: "生产时会有噪音，偏一点的地方，进出货车要方便。",
        Area: "500",
        HouseType: "加工厂",
        ExpectedPrice: "10000",
        CustomerState: "1"
      },
      {
        CustomerId: "00000058",
        CustomerName: "王五",
        CustomerPhoneNo: "13800001501",
        CreateTime: "2020-01-23",
        CustomerType: "3",
        Remark: "交通便利，适合高科技产业发展，方便我们招聘高新技术人才，近商业圈生活便利。",
        Area: "80",
        HouseType: "写字楼",
        ExpectedPrice: "3000",
        CustomerState: "2"
      }
    ]
  },

  /**
   * 打开跟进详情页面
   */
  showfollowInfo: function () {
    wx.reLaunch({
      url: '/pages/home/followInfo?userId=3,crId=00000001',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.roleId = wx.getStorageSync('roleId');
    this.userId = wx.getStorageSync('userId');
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  }
})