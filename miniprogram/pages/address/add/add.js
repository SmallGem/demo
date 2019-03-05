// pages/address/add/add.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isModify: false,
        id: null,
        name: null,
        gender: ['保密', '先生', '女士'],
        genderIndex: 0,
        mobile: null,
        address: null,
        addressLength: 0
    },

    inputName(event) {
        this.setData({
            name: event.detail.value
        })
    },

    genderChange(event) {
        this.setData({
            genderIndex: parseInt(event.detail.value)
        })
    },

    inputMobile(event) {
        this.setData({
            mobile: event.detail.value
        })
    },

    inputAddress(event) {
        let address = event.detail.value.substr(0, 140)
        let addressLength = address.length
        this.setData({
            address: address,
            addressLength: addressLength
        })
    },

    saveAddress() {
        let method = this.data.isModify ? 'PUT' : 'POST'
        let urlShard = this.data.isModify ? '/' + this.data.id : ''
        wx.request({
            method: method,
            url: 'http://application.test:5000/address' + urlShard,
            data: {
                name: this.data.name,
                gender: this.data.genderIndex,
                mobile: this.data.mobile,
                address: this.data.address,
                user_id: app.globalData.token
            },
            success: res => {
                wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 2000
                })
                wx.navigateBack({
                    delta: 1
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (Object.keys(options).length > 0 && options) {
            let address = JSON.parse(options.address)
            this.setData({
                isModify: true,
                id: address.id,
                name: address.name,
                genderIndex: address.gender,
                mobile: address.mobile,
                address: address.address,
                addressLength: address.address.length
            })
        }
        console.log(this.data.isModify)
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