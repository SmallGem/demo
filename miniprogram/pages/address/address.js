// pages/address/address.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        addresses: null,
    },

    goToAddAddress() {
        wx.navigateTo({
            url: './add/add',
        })
    },

    goToEditAddress(event) {
        let id = event.currentTarget.id
        let address = null
        this.data.addresses.forEach(item => {
            if (item.id === id) {
                address = item
            }
        })
        wx.navigateTo({
            url: './add/add?address=' + JSON.stringify(address),
        })
    },

    deleteAddress(event) {
        let id = event.currentTarget.id
        wx.request({
            method: 'DELETE',
            url: app.globalData.url + '/address/' + id,
            success: res => {
                let addresses = this.data.addresses
                for (let i = 0; i < addresses.length; i++) {
                    if (addresses[i].id === id) {
                        addresses.splice(i, 1)
                        break;
                    }
                }
                this.setData({
                    addresses: addresses
                })
                wx.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 2000
                })
            }
        })
    },

    selectedAddress(event) {
        let id = event.currentTarget.id
        this.data.addresses.forEach(item => {
            if (item.id === id) {
                app.globalData.address = item
            }
        })
        wx.navigateBack({
            delta: 1
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        let token = app.globalData.token

        wx.request({
            method: 'GET',
            url: app.globalData.url + '/address/' + token,
            success: res => {
                let addresses = res.data
                console.log(addresses)
                this.setData({
                    addresses: addresses
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})