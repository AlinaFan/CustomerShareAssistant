const app = getApp();
const baseUrl = app.globalData.host;
const request = (url, method, options = {}) => {
  return new Promise((resolve, reject) => {
    if (method == 'PATCH') {
      method = 'POST',
        options = {
          ...options,
          data: {
            ...options.data,
            '_method': 'PATCH'
          }
        }
    }
    wx.showLoading();
    wx.request({
      url: baseUrl + url,
      method: method,
      data: options.data,
      header: {
        ...options.header,
        Authorization: 'Bearer ' + wx.getStorageInfoSync('Token') || ''
      },
      timeout: 15000,
      success(res) {
        let msg = '数据请求失败';
        if (res.statusCode < 400) {
          resolve(res.data)
        } else {
          if (res.statusCode === 400) {
            msg = res.data.message
          } else if (res.statusCode === 422) {
            msg = res.data.errors[Object.keys(res.data.errors)[0]][0]
          } else if (res.statusCode === 500) {
            msg = "信息填写不完整";
          }
          wx.showToast({
            title: msg,
            icon: 'error',
            duration: 2000
          })
        }
      },
      fail(res) {
        reject(res)
        wx.showToast({
          title: '网络异常',
          icon: 'error',
          duration: 2000
        })
      },
      complete() {
        wx.hideLoading()
      }
    })
  })
}
const e = {
  get(url, options = {}) {
    return request(url, 'GET', options)
  },
  post(url, options = {}) {
    return request(url, 'POST', options)
  },
  delete(url, options = {}) {
    return request(url, 'DELETE', options)
  }
}

//module.exports = request
module.exports = e