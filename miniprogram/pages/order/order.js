// pages/order/order.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: null,
        items: [],
        total: null,
    },

    goToAddress() {
        wx.navigateTo({
            url: '../address/address'
        })
    },

    addCount(event) {
        let id = event.target.dataset.id
        let items = this.data.items.map(item => {
            if (item.id === id) {
                item.count++
            }
            return item
        })

        this.setData({
            items: items,
        })

        this.updateCart()
    },

    subCount(event) {
        let id = event.target.dataset.id
        let items = this.data.items.map(item => {
            if (item.id === id && item.count > 0) {
                item.count--
            }
            return item
        })

        this.setData({
            items: items,
        })

        this.updateCart()
    },

    updateCart() {
        let items = []
        this.data.items.forEach(item => {
            if (item.count > 0) {
                items.push(item)
            }
        })
        let token = app.globalData.token

        wx.request({
            method: 'PUT',
            url: app.globalData.url + '/cart/' + token,
            data: {
                items: JSON.stringify(items)
            },
            success: res => {
                let cart = JSON.parse(res.data.replace(new RegExp(/\'/g), '\"'))
                console.log(cart)
                let total = this.calculateTotal(cart)

                this.setData({
                    total: total
                })
            }
        })
    },

    calculateTotal(cart) {
        let total = 0
        let price = 0
        cart.forEach(item => {
            total += item.count
            price += item.price * item.count
        })

        return {
            total: total,
            price: price
        }
    },

    confirmOrder() {
        if (!this.data.address) {
            wx.showToast({
                title: '请选择地址',
                icon: 'none',
                duration: 2000
            })
            return
        }

        if (!this.data.total.total > 0) {
            wx.showToast({
                title: '请选择商品',
                icon: 'none',
                duration: 2000
            })
        }

        let items = []
        this.data.items.forEach(item => {
            if (item.count > 0) {
                items.push(item)
            }
        })

        wx.request({
            method: 'POST',
            url: app.globalData.url + '/order',
            data: {
                items: JSON.stringify(items),
                price: this.data.total.price,
                address_id: this.data.address.id,
                user_id: app.globalData.token
            },
            success: res => {
                console.log(res.data)
                this.setData({
                    items: []
                })
                this.updateCart()
                wx.navigateBack({
                    delta: 7
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let items = JSON.parse(options.items)
        let total = this.calculateTotal(items)
        console.log(items)

        this.setData({
            items: items,
            total: total,
        })
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
        let address = app.globalData.address
        this.setData({
            address: address
        })
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