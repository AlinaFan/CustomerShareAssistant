// pages/custCenter/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    custTypeList: [{
      CustomerType: 0,
      CustTypeName: "全部"
    }, {
      CustomerType: 1,
      CustTypeName: "自营"
    }, {
      CustomerType: 2,
      CustTypeName: "外推"
    }, {
      CustomerType: 3,
      CustTypeName: "接收"
    }],
    custStateList: [{
      CustState: 1,
      CustStateName: "待接单"
    }, {
      CustState: 2,
      CustStateName: "跟进中"
    }, {
      CustState: 3,
      CustStateName: "终止"
    }, {
      CustState: 4,
      CustStateName: "成交"
    }],
    custType: 0,
    cRequireId: "",
    tableHeader: [{
      CRequireId: "订单编号",
      CustomerName: "姓名",
      HouseType: "房型",
      Area: "面积",
      ExpectedPrice: "价格",
      CustomerState: "状态"
    }],
    actTypeList: [{
      name: "sendout",
      value: "外推订单"
    }, {
      name: "assign",
      value: "下发订单"
    }, {
      name: "deal",
      value: "签约成功"
    }, {
      name: "end",
      value: "终止订单"
    }, {
      name: "detailInfo",
      value: "跟进详情"
    }],
    GetUnitNameList: [{
      uuId: "00000001",
      uuName: "中国地产-张三",
      percentage: "50%"
    }, {
      uuId: "00001587",
      uuName: "从一中介-刘五",
      percentage: "50%"
    }, {
      uuId: "00015848",
      uuName: "联诚房产中介-廖在一",
      percentage: "50%"
    }, {
      uuId: "000158877",
      uuName: "保利建业-刘一",
      percentage: "70%"
    }, {
      uuId: "00615201",
      uuName: "联诚中介-林大大",
      percentage: "70%"
    }, {
      uuId: "00098247",
      uuName: "保利建业-王六",
      percentage: "50%"
    }, ],
    GetDepartmentList: [{
      deptId: "0",
      deptName: "全部",
      GetAgentUserNameList: [{
        auId: "00000001",
        auName: "刘一",
        percentage: "50%"
      }, {
        auId: "00001587",
        auName: "张五",
        percentage: "50%"
      }, {
        auId: "00015848",
        auName: "张在一",
        percentage: "50%"
      }, {
        auId: "000158877",
        auName: "林小小",
        percentage: "100%"
      }, {
        auId: "05817154",
        auName: "欧阳一和",
        percentage: "70%"
      }],
      auHidden: false
    }, {
      deptId: "00000001",
      deptName: "市场1部",
      GetAgentUserNameList: [{
        auId: "00000001",
        auName: "刘一",
        percentage: "50%"
      }, {
        auId: "00001587",
        auName: "张五",
        percentage: "50%"
      }],
      auHidden: true
    }, {
      deptId: "00000002",
      deptName: "市场2部",
      GetAgentUserNameList: [{
        auId: "00015848",
        auName: "张在一",
        percentage: "50%"
      }, {
        auId: "000158877",
        auName: "林小小",
        percentage: "100%"
      }],
      auHidden: true
    }, {
      deptId: "00000003",
      deptName: "业务1部",
      GetAgentUserNameList: [{
        auId: "05817154",
        auName: "欧阳一和",
        percentage: "70%"
      }],
      auHidden: true
    }],
    GetCustRequirdList: [{
      CRequireId: "00000001",
      CustomerName: "张三",
      HouseType: "厂房",
      Area: "1000",
      ExpectedPrice: "18000",
      CustomerState: "2"
    }, {
      CRequireId: "00002551",
      CustomerName: "刘一在",
      HouseType: "写字楼",
      Area: "200",
      ExpectedPrice: "3000",
      CustomerState: "4"
    }, {
      CRequireId: "00005841",
      CustomerName: "林以地",
      HouseType: "厂房",
      Area: "10000",
      ExpectedPrice: "200000",
      CustomerState: "3"
    }, {
      CRequireId: "00025481",
      CustomerName: "李四",
      HouseType: "住宅",
      Area: "100",
      ExpectedPrice: "1700",
      CustomerState: "1"
    }, {
      CRequireId: "00058957",
      CustomerName: "王五",
      HouseType: "住宅",
      Area: "50",
      ExpectedPrice: "600",
      CustomerState: "2"
    }],
    CustRequireDetailList: [{
      CRequireId: "00000001",
      CustomerSex: "女",
      CustomerPhoneNo: "13800138001",
      CustomerType: "1",
      CRCreatorName: "市场1部-林一",
      CRCreateTime: "2020-10-11",
      Remark: "生产时会有噪音，偏一点的地方，进出货车要方便",
      DealPersonName: "",
      DealTime: "",
      DealBuilding: "",
      DealRoom: "",
      DealPrice: "",
      Percentage: ""
    }, {
      CRequireId: "00005841",
      CustomerSex: "男",
      CustomerPhoneNo: "13800138002",
      CustomerType: "2",
      CRCreatorName: "市场2部-刘二",
      CRCreateTime: "2020-09-25",
      Remark: "有污染",
      DealPersonName: "市场2部-刘二",
      DealTime: "2020-10-13",
      DealBuilding: "创客大厦",
      DealRoom: "1301室",
      DealPrice: "3250",
      Percentage: "100%"
    }],

  },
  /**
   * 点击客源状态 下拉框 
   */
  showCustState: function () {
    var that = this;
    this.setData({
      c_select: !that.data.c_select
    })
  },
  myCustState: function (e) {
    var custType = e.currentTarget.dataset.index;
    this.setData({
      c_select: false
    })
  },
  /**
   * 打开操作 下拉框
   */
  showActType: function (e) {
    var crId = e.currentTarget.dataset.id;
    this.setData({
      showModal: true
    })
    console.log(crId)
  },
  /**
   * 关闭操作 下拉框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function (res) {

  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.setData({
      actType: "",
      showModal: false
    })
  },
  myActType: function (e) {
    var actType = e.currentTarget.dataset.name;
    if (actType == "detailInfo") {
      wx.navigateTo({
        url: '/pages/home/followInfo?userId=3,crId=00000001',
        success: function (res) {},
      });
      this.setData({
        showModal: false
      });
    }
    if (actType == "end") {
      this.setData({
        showModal: false
      });
    }
    if (actType == "deal") {
      this.setData({
        showModal: false
      });
    }
    this.setData({
      actType
    })
    console.log(actType)
  },
  /**
   * 获取员工列表
   */
  getAUNameList: function (e) {
    var that = this;
    var deptId = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var state = that.data.GetDepartmentList[index].auHidden;
    var stateVal = "GetDepartmentList[" + index + "].auHidden";
    if (state == true) {
      that.setData({
        index:index,
        [stateVal]: false
      })
    } else {
      that.setData({
        index:index,
        [stateVal]: true
      })
    }
    console.log(deptId, state,[stateVal],that.data.GetDepartmentList[index])
  },

  /**
   * 显示客源订单详细信息 
   * */
  showDetailInfo: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var crId = e.currentTarget.dataset.id;
    that.data.GetCustRequirdList[index].hidden = !that.data.GetCustRequirdList[index].hidden;
    this.setData({
      GetCustRequirdList: that.data.GetCustRequirdList
    })
  },

  /** 
   * 标题 全部 自营 外推 接收
   * */
  selectIcon(e) {
    var typeId = e.currentTarget.dataset.typeid;
    this.setData({
      custType: typeId,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    showDetail: (options.showDetail == "true" ? true : false)
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
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