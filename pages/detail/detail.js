Page({
  data: {
    petName: '',
    todayDate: '',
    todayDay: '',
    records: []
  },

  onLoad(options) {
    const now = new Date();
    const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    this.setData({
      petName: options.name || '宝贝',
      todayDate: `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`,
      todayDay: days[now.getDay()]
    });
  },

  onShow() {
    // 每次进入详情页都重新读取最新记录
    const allRecords = wx.getStorageSync('petRecords') || {};
    this.setData({ records: allRecords[this.data.petName] || [] });
  },

  goBack() { wx.navigateBack(); },

  goToTrend() { wx.navigateTo({ url: `/pages/trend/trend?name=${this.data.petName}` }); },
  
  goToHistory() { wx.navigateTo({ url: `/pages/history/history?name=${this.data.petName}` }); },

  // 跳转到那个新开出来的“记录中心”页面
  goToRecordPage() {
    wx.navigateTo({
      url: `/pages/record/record?name=${this.data.petName}`
    });
  },

  deleteSingle(e) {
    const index = e.currentTarget.dataset.index;
    let list = this.data.records;
    list.splice(index, 1);
    this.setData({ records: list });
    const all = wx.getStorageSync('petRecords') || {};
    all[this.data.petName] = list;
    wx.setStorageSync('petRecords', all);
  }
})