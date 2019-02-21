//app.js

App({
    onLaunch: function() {
        // 获取用户信息
        this.wechatUserInfo()

        // 登录
        this.wechat()
    },

    // 获取用户信息
    wechatUserInfo() {
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },

    // 登录
    wechat() {
        wx.checkSession({
            success: res => {
                let token = checkStorage('token')
                this.globalData.token = token

                if (this.checkSessionCallback) {
                    this.checkSessionCallback(token)
                }
            },
            fail: res => {
                login()
            }
        })

        // 登录
        function login() {
            let that = this
            wx.login({
                success: res => {
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    console.log(res.code)
                    wx.request({
                        method: 'POST',
                        url: 'http://application.test:5000/user',
                        data: {
                            code: res.code,
                        },
                        success: res => {
                            console.log(res.data)
                            try {
                                wx.setStorageSync('token', res.data.id)
                            } catch (err) {
                                console.log(err)
                            }
                        }
                    })
                },
                fail: res => {
                    console.log('登录失败！' + res)
                }
            })
        }

        // 校验cookie
        function checkStorage(key) {
            try {
                const token = wx.getStorageSync(key)
                console.log(token)
                if (token) {
                    return token
                } else {
                    login()
                }
            } catch (err) {
                console.log(err)
                login()
            }
        }
    },

    globalData: {
        url: 'http://application.test:5000',
        userInfo: null,
        token: null,
    }
})