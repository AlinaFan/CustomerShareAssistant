// components/inputView/inputView.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgPath: {
      type: String,
      value: ""
    },
    waterLabel: {
      type: String,
      value: ""
    },
    maxlength: {
      type: Int32Array,
      value: 40
    },
    textType: {
      type: String,
      value: "text"
    },
    isPassword: {
      type: Boolean,
      value: false
    },
    name: {
      type: String,
      value: ""
    },
    marginTop: {
      type: String,
      value: "50rpx"
    },
    inputValue: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isClearShow: false,
    inputValue: '',
    isFocus: false,
    isNull: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getInputValue: function (e) {
      var value = e.detail.value;
      var waterLabel = e.detail.waterLabel;
      var name = e.currentTarget.dataset.id;
      if (value === null || value === undefined || value.length === 0) {
        this.setData({
          isClearShow: false
        });
      } else {
        this.setData({
          isClearShow: true
        });
      }
      this.setData({
        inputValue: value
      })
      this.triggerEvent('inputChange', {
        value,
        name,
        waterLabel
      });
    },
    clearTap: function () {
      this.setData({
        isClearShow: false,
        isFocus: true,
        inputValue: ""
      });
      var name = this.data.name;
      this.triggerEvent('clearTap', {
        name
      });
    },
    checkIsNull: function (e) {
      var value = e.detail.value;
      var name = e.currentTarget.dataset.id;
      if (value.length == 0) {
        this.setData({
          isNull: true
        })
      } else {
        this.setData({
          isNull: false
        })
      }
      var isNull = this.data.isNull;
      this.triggerEvent('checkIsNull', {
        name,
        isNull
      });
    },
    getFocus: function (e) {
      var name = e.currentTarget.dataset.id;          
      this.setData({
        isNull: false
      }) 
      var isNull = this.data.isNull; 
      this.triggerEvent('getFocus', {
        name,
        isNull
      });
    }
  }
})
