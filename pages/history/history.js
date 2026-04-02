Page({
  data: {
    petName: '',
    isDetailMode: false, // 是否处于详情查看模式
    selectedDate: '',    // 当前选中的日期
    groupedList: [],     // 汇总列表数据
    dayRecords: []       // 选中日期的具体流水
  },

  onLoad(options) {
    this.setData({ petName: options.name || '宝贝' });
    this.processGroupedData();
  },

  // 核心逻辑：按日期分组并判断图标亮起
  processGroupedData() {
    const allRecords = wx.getStorageSync('petRecords') || {};
    const list = allRecords[this.data.petName] || [];
    
    const groups = {};
    list.forEach(item => {
      const d = item.date;
      if (!groups[d]) {
        groups[d] = { date: d, hasMed: false, hasFood: false, hasWater: false, hasExcre: false, records: [] };
      }
      
      // 判断类型以点亮图标
      if (item.typeLabel.includes('用药')) groups[d].hasMed = true;
      if (item.typeLabel.includes('饮食')) groups[d].hasFood = true;
      if (item.typeLabel.includes('饮水')) groups[d].hasWater = true;
      if (item.typeLabel.includes('排泄')) groups[d].hasExcre = true;
      
      groups[d].records.push(item);
    });

    // 转换为数组并按日期倒序（假设最新的日期在上面）
    const groupedArray = Object.keys(groups).map(k => groups[k]).reverse();
    this.setData({ groupedList: groupedArray });
  },

  // 点击某一天进入详情
  viewDayDetail(e) {
    const date = e.currentTarget.dataset.date;
    const dayData = this.data.groupedList.find(item => item.date === date);
    this.setData({
      isDetailMode: true,
      selectedDate: date,
      dayRecords: dayData.records
    });
  },

  closeDetail() {
    this.setData({ isDetailMode: false });
  },

  // 统一返回处理
  handleBack() {
    if (this.data.isDetailMode) {
      this.closeDetail(); // 如果在详情页，点返回是回到列表
    } else {
      wx.navigateBack(); // 如果在列表页，点返回是退出页面
    }
  }
})