Component({
  data: {
    selected: 0,
    color: "#000000",
    roleId: '',
    selectedColor: "#00A99D",
    allList: [{
      "list1": [{
        "pagePath": "/pages/home/index",
        "text": "首页",
        "iconPath": "/images/tabBar/Home.png",
        "selectedIconPath": "/images/tabBar/Home-s.png"
      }, {
        "pagePath": "/pages/custCenter/index",
        "text": "客源中心",
        "iconPath": "/images/tabBar/Customer.png",
        "selectedIconPath": "/images/tabBar/Customer-s.png"
      }, {
        "pagePath": "/pages/staffCenter/index",
        "text": "员工管理",
        "iconPath": "/images/tabBar/Staff.png",
        "selectedIconPath": "/images/tabBar/Staff-s.png"
      }, {
        "pagePath": "/pages/unitCenter/index",
        "text": "合作联盟",
        "iconPath": "/images/tabBar/Unit.png",
        "selectedIconPath": "/images/tabBar/Unit-s.png"
      }, {
        "pagePath": "/pages/personalCenter/index",
        "text": "个人中心",
        "iconPath": "/images/tabBar/User.png",
        "selectedIconPath": "/images/tabBar/User-s.png"
      }],
      "list2": [{
        "pagePath": "/pages/home/index",
        "text": "首页",
        "iconPath": "/images/tabBar/Home.png",
        "selectedIconPath": "/images/tabBar/Home-s.png"
      }, {
        "pagePath": "/pages/custCenter/index",
        "text": "客源中心",
        "iconPath": "/images/tabBar/Customer.png",
        "selectedIconPath": "/images/tabBar/Customer-s.png"
      }, {
        "pagePath": "/pages/unitCenter/index",
        "text": "合作联盟",
        "iconPath": "/images/tabBar/Unit.png",
        "selectedIconPath": "/images/tabBar/Unit-s.png"
      }, {
        "pagePath": "/pages/personalCenter/index",
        "text": "个人中心",
        "iconPath": "/images/tabBar/User.png",
        "selectedIconPath": "/images/tabBar/User-s.png"
      }]
    }],
    list: []
  },
  attached() {
    const roleId = wx.getStorageSync('roleId')
    if (roleId == 2) {
      this.setData({
        list: this.data.allList[0].list1
      })
    } else{
      this.setData({
        list: this.data.allList[0].list2
      })
    }
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({
        url
      })
      this.setData({
        selected: data.index
      })
    }
  }
})