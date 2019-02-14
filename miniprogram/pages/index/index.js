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
                this.setData({
                    items: res.data,
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

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function(options) {
        this.getCatalogs()
    },

    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady: function() {
        
    },

    /**
     * Lifecycle function--Called when page show
     */
    onShow: function () {
        
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