// pages/login/register.js
const request = require("../../utils/request");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    comTypes: [{
        comType: 2,
        value: "企业",
        checked: true
      },
      {
        comType: 3,
        value: "个人"
      }
    ],
    isCompany: true,
    inputValue: '',
    marginTop: '40rpx',
    contactSex: '',
    comType: 2,
    isNull: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //单选框 --- 企业 个人
  radioChange: function (e) {
    if (e.type == "change") {
      var that = this;
      if (e.detail.value == "3") {
        that.setData({
          isCompany: false,
          comType: 3
        })
      } else {
        that.setData({
          isCompany: true,
          comType: 2
        })
      }
    }
  },
  //信息输入
  inputChange: function (e) {
    var inputValue = e.detail.value;
    var name = e.detail.name;
    this.setData({
      [name]: inputValue
    })
  },
  clearTap: function (e) {
    var name = e.detail.name;
    this.setData({
      [name]: ''
    })
  },
  checkIsNull: function (e) {
    var isNull = e.detail.isNull;
    //var name = e.detail.name;
    // var isNullList = this.data.isNullList;
    // isNullList.push({
    //   name: name,
    //   value: isNull
    // });    
    this.setData({
      isNull: isNull,
      //isNullList
    })
  },
  getFocus: function (e) {
    var isNull = e.detail.isNull;
    this.setData({
      isNull: isNull,
    })
  },
  // 提交用户注册
  registerUser: function (e) {
    var that = this;
    var errorMsg = '';
    //判断密码2次输入是否相同
    var firstUserPwd = this.data.firstUserPwd;
    var secondUserPwd = this.data.secondUserPwd;
    if (firstUserPwd != secondUserPwd) {
      errorMsg = "两次密码不同";
    } else {
      //验证身份证信息 
      var contactIDCardNo = this.data.contactIDCardNo;
      var contactSex = this.data.contactSex;
      if (contactIDCardNo != null) {
        if (contactIDCardNo.length != 18) {
          errorMsg += ",请输入正确的身份证号码"
        } else {
          //获取性别
          contactSex = parseInt(contactIDCardNo.substr(16, 1)) % 2 == 1 ? "男" : "女";
        }
      }
      //验证手机号
      var contactPhoneNo = this.data.contactPhoneNo;
      if (contactPhoneNo != null) {
        if (contactPhoneNo.length != 11) {
          errorMsg += ",为保障使用，请输入真实电话号码"
        }
      }
      //验证用户名是否已存在
      var userName = this.data.userName;
      const options = {
        data: {
          userName: userName
        }
      }
      request.get('/Login/ExistUserName', options).then(res => {
        var isExist = res;
        if (isExist) {
          wx.showToast({
            title: '用户名已存在',
            icon: 'error',
            duration: 2000
          })
        } else {
          const options = {
            // 封装信息
            data:{
              userName: userName,
              weChatId: wx.getStorageSync('wechatId'),
              userPwd: firstUserPwd,
              userIcon: wx.getStorageSync('userIcon'),
              estateAgencyType: this.data.comType,
              companyFullName: this.data.companyFullName,
              companyName: this.data.companyName,
              socialCreditCode: this.data.socialCreditCode,
              legalPerson: this.data.legalPerson,
              contactName: this.data.contactName,
              contactSex: contactSex,
              contactPhoneNo: contactPhoneNo,
              contactIDCardNo: contactIDCardNo
            },
            dataType: "json",
            header: {
              "content-type": "application/json;charset=utf8"
            },
          }
          //注册
          request.post('/Login/RegisterUser', options).then(res => {
            if (res) {
              wx.showToast({
                title: '注册成功',
                icon: 'success',
                duration: 2000
              })
              wx.switchTab({
                url: '/pages/home/index',
              })
              wx.getStorageSync('roleId', comType)
            } else {
              wx.showModal({
                title: '提示',
                content: errorMsg,
                success(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }
          })
        }
      })
    }
  },



  // // 判断对象中key对应value是否为空
  // objectValueNotNone: function (obj) {
  //   for (var objKey in obj) {
  //     if (!obj[objKey]) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }
})