// pages/index/index.js
const app = getApp()

Page({

    /**
     * Page initial data
     */
    data: {
        inputShowed: false,
        inputVal: "",
        catalogs: [],
        items: [],
        activeCatalog: null,
        cart: [],
        total: 0,
    },

    goToOrder() {
        let items = JSON.stringify(this.data.cart)
        console.log(items)
        wx.navigateTo({
            url: '../order/order?items=' + items,
        })
    },

    showInput() {
        this.setData({
            inputShowed: true
        })
    },

    hideInput() {
        this.setData({
            inputVal: "",
            inputShowed: false
        })
    },

    clearInput() {
        this.setData({
            inputVal: ""
        })
    },

    inputTyping(event) {
        this.setData({
            inputVal: event.detail.value
        })
    },

    getCatalogs() {
        wx.request({
            method: 'GET',
            url: app.globalData.url + '/catalog',
            success: res => {
                this.setData({
                    catalogs: res.data,
                    activeCatalog: res.data[0].id
                })

                this.getItems(res.data[0].id)
            },
            fail: err => {
                console.log(err.errMsg)
            }
        })
    },

    getItems(catalogId) {
        wx.request({
            method: 'GET',
            url: app.globalData.url + '/item/' + catalogId,
            success: res => {
                let cart = this.data.cart
                let items = res.data.map(item => {
                    for (let k in cart) {
                        if (item.id === cart[k].id) {
                            item.count = cart[k].count
                            return item
                        }
                    }
                    item.count = 0

                    return item
                })
                
                this.setData({
                    items: items
                })
            },
            fail: err => {
                console.log(err.errMsg)
            }
        })
    },

    selectCatalog(event) {
        this.setData({
            activeCatalog: event.currentTarget.id
        })
        this.getItems(event.currentTarget.id)
    },

    addCount(event) {
        let id = event.target.dataset.id
        let cart = this.data.cart
        let items = this.data.items.map(item => {
            if (item.id === id) {
                item.count++
                    if (item.count === 1) {
                        cart.push(item)
                    } else {
                        for (let k in cart) {
                            if (cart[k].id === item.id) {
                                cart[k].count = item.count
                                break
                            }
                        }
                    }
            }
            return item
        })

        this.setData({
            items: items,
            cart: cart,
        })

        this.updateCart()
    },

    subCount(event) {
        let id = event.target.dataset.id
        let cart = this.data.cart
        let items = this.data.items.map(item => {
            if (item.id === id && item.count > 0) {
                item.count--
                    if (item.count === 0) {
                        for (let k in cart) {
                            if (cart[k].id === item.id) {
                                cart.splice(k, 1)
                            }
                        }
                    } else {
                        for (let k in cart) {
                            if (cart[k].id === item.id) {
                                cart[k].count = item.count
                                break
                            }
                        }
                    }
            }
            return item
        })

        this.setData({
            items: items,
            cart: cart,
        })

        this.updateCart()
    },

    getCart() {
        let token = app.globalData.token

        wx.request({
            method: 'GET',
            url: app.globalData.url + '/cart/' + token,
            success: res => {
                if (res.data) {
                    let cart = JSON.parse(res.data.replace(new RegExp(/\'/g), '\"'))
                    let total = this.calculateTotal(cart)

                    this.setData({
                        cart: cart,
                        total: total
                    })
                }

                this.getCatalogs()
            }
        })
    },

    updateCart() {
        let cart = this.data.cart
        let token = app.globalData.token

        wx.request({
            method: 'PUT',
            url: app.globalData.url + '/cart/' + token,
            data: {
                items: JSON.stringify(cart)
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

        cart.forEach(item => {
            total += item.price * item.count
        })

        return total.toFixed(2)
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function(options) {
        
    },

    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady: function() {

    },

    /**
     * Lifecycle function--Called when page show
     */
    onShow: function() {
        if (app.globalData.token) {
            this.getCart()
        } else {
            app.checkSessionCallback = res => {
                this.getCart()
            }
        }
    },

    /**
     * Lifecycle function--Called when page hide
     */
    onHide: function() {

    },

    /**
     * Lifecycle function--Called when page unload
     */
    onUnload: function() {

    },

    /**
     * Page event handler function--Called when user drop down
     */
    onPullDownRefresh: function() {

    },

    /**
     * Called when page reach bottom
     */
    onReachBottom: function() {

    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function() {

    }
})