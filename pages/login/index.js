// pages/login/index.js
const app = getApp();
const request = require("../../utils/request");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    userName: '',
    userPwd: '',
    roleId: '',
    wechatId: '',
    userInfo: {},
    inputValue: ''

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    //查询是否已授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          //用户已授权
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
  //获取账号  
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  //获取密码
  userPwdInput: function (e) {
    this.setData({
      userPwd: e.detail.value
    })
  },
  //验证账号 密码 --- 方法
  checkCanLogin: function (userName, userPwd) {
    return new Promise(function (resolve, reject) {      
      if (userName.length == 0 || userPwd.length == 0) {
        wx.showToast({
          title: '账号或密码不能为空',
          icon: 'none',
          duration: 2000
        })
      } else {
        const options = {
          data: {
            uName: userName,
            uPwd: userPwd
          }
        }
        request.get('/Login/LoginByName', options).then(res => {
          var roleId = res.roleId;
          var userId = res.userId;
          if (roleId == 0) {
            wx.showToast({
              title: '账号、密码输入错误',
              icon: 'none',
              duration: 2000
            })
          } else {
            wx.setStorageSync('roleId', roleId);
            wx.setStorageSync('userId', userId);
            resolve({
              data: res
            })
          }
        })
      }
    })

  },
  //登陆按钮登陆
  loginByName: function () {
    var userName = this.data.userName;
    var userPwd = this.data.userPwd;
    this.checkCanLogin(userName, userPwd).then(res => {
      if (res.data.roleId > 1) {
        wx.switchTab({
          url: '/pages/home/index',
        })
      }
    });
  },
  //微信登陆
  loginByWechat: function (e) {
    var wechatId = '';
    //获取openid
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: 'wx08d6125b4f8c2610',
              secret: '5bdeb4173471fb69d959122d5302392a',
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            header: {
              'content-type': 'application/json'
            },
            method: "GET",
            success: function (res) {
              //获取openid
              wechatId = res.data.openid              
              wx.setStorageSync('wechatId', wechatId);
              wx.setStorageSync('userIcon', that.data.userInfo.avatarUrl); 
              //查询是否绑定过
              wx.request({
                url: app.globalData.host + '/Login/LoginByWeChat',
                data: {
                  weChatId: wechatId
                },
                success(res) {
                  that.roleId = res.data.roleId;
                  that.userId = res.data.userId;
                  if (that.roleId != 0) {
                    wx.setStorageSync('roleId', that.roleId);
                    wx.setStorageSync('userId', that.userId);
                    wx.switchTab({
                      url: '/pages/home/index',
                    })
                  }
                  that.showDialogBtn(that.roleId);
                  that.setData({
                    wechatId: wechatId
                  })
                },
              })
            }
          })
        }
      }
    })
  },
  //绑定微信窗口 --- 输入账号 密码
  inputChange: function (e) {
    var inputValue = e.detail.value;
    var name = e.detail.name;
    if (name == "userName") {
      this.setData({
        userName: inputValue
      })
    } else {
      this.setData({
        userPwd: inputValue
      })
    }
  },
  clearTap:function(e){
    var name = e.detail.name;
    if (name == "userName") {
      this.setData({
        userName: ""
      })
    } else {
      this.setData({
        userPwd: ""
      })
    }
  },
  // 绑定微信
  bindingWithWechat: function (e) {
    var that = this;
    //获取用户头像
    var userIcon = that.data.userInfo.avatarUrl;
    //获取openid
    var wechatId = that.data.wechatId;
    //验证账号 密码是否正确
    console.log(that.data.userName, that.data.userPwd)
    this.checkCanLogin(that.data.userName, that.data.userPwd).then(res => {
      var roleId = res.data.roleId;
      var userId = res.data.userId;
      //正确 --- 绑定 并 登陆转主页
      if (roleId != 0) {
        const options = {
          data: {
            userId: userId,
            userIcon: userIcon,
            weChatId: wechatId
          },
          dataType: "json",
          header: {
            "content-type": "application/json;charset=utf8"
          },
        }
        request.post('/Login/BindingWithWeChat', options).then(res => {
          if(res){
            wx.switchTab({
              url: '/pages/home/index',
            })
          }
        })
      }

    });
  },
  //弹窗
  showDialogBtn: function (roleId) {
    if (this.roleId == 0) {
      this.setData({
        showModal: true
      })
    } else {
      this.setData({
        showModal: false
      })
    }
  },
  // 弹出框蒙层截断touchmove事件
  preventTouchMove: function () {},
  // 隐藏模态对话框
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  //对话框取消按钮点击事件
  onCancel: function () {
    this.hideModal();
  },
  //对话框确认按钮点击事件
  onConfirm: function () {
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000
    })
    this.hideModal();
  },
  //跳转至注册页面
  jumpBtn: function () {
    wx.navigateTo({
      url: '/pages/login/register',
    })
  }
})