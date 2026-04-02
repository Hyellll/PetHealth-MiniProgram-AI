import * as echarts from '../../ec-canvas/echarts';

Page({
  data: {
    petName: '',
    currentMode: 'all', // 'all', 'med', 'food', 'water', 'excre'
    currentModeLabel: '全部',
    ec: { lazyLoad: true }
  },

  onLoad(options) {
    this.setData({ petName: options.name || '宝贝' });
    this.initChart();
  },

  goBack() { wx.navigateBack(); },

  // 弹出选择菜单
  showModeMenu() {
    const modes = [
      { id: 'all', label: '全部' },
      { id: 'med', label: '用药' },
      { id: 'food', label: '饮食' },
      { id: 'water', label: '饮水' },
      { id: 'excre', label: '排泄' }
    ];
    wx.showActionSheet({
      itemList: modes.map(m => m.label + '趋势'),
      success: (res) => {
        const selected = modes[res.tapIndex];
        this.setData({
          currentMode: selected.id,
          currentModeLabel: selected.label
        });
        this.initChart(); // 重新绘制
      }
    });
  },

  initChart() {
    this.selectComponent('#mychart-dom-line').init((canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, { width, height, devicePixelRatio: dpr });
      const option = this.getChartOption();
      chart.setOption(option);
      return chart;
    });
  },

  // 根据当前模式生成图表配置
  getChartOption() {
    const data = this.getSevenDayStats();
    const colors = { med: '#4361ee', food: '#f77f00', water: '#0077b6', excre: '#db2777' };
    
    // 基础配置
    let option = {
      grid: { containLabel: true, left: 10, right: 10, bottom: 10, top: 40 },
      xAxis: {
        type: 'category', boundaryGap: false, data: data.days,
        axisLine: { lineStyle: { color: '#eee' } },
        axisLabel: { color: '#999', fontSize: 10 }
      },
      yAxis: { type: 'value', splitLine: { lineStyle: { type: 'dashed', color: '#f0f0f0' } } },
      series: []
    };

    // 如果是“全部”模式，添加四条线
    if (this.data.currentMode === 'all') {
      ['med', 'food', 'water', 'excre'].forEach(type => {
        option.series.push({
          name: type, type: 'line', smooth: true,
          itemStyle: { color: colors[type] },
          data: data.values[type],
          symbolSize: 4
        });
      });
    } else {
      // 否则只添加对应的那条线
      option.series.push({
        type: 'line', smooth: true,
        itemStyle: { color: colors[this.data.currentMode] || '#a393d3' },
        areaStyle: { color: 'rgba(163, 147, 211, 0.1)' },
        data: data.values[this.data.currentMode],
        symbolSize: 8
      });
    }
    return option;
  },

  getSevenDayStats() {
    const allRecords = wx.getStorageSync('petRecords') || {};
    const myRecords = allRecords[this.data.petName] || [];
    const days = [];
    const values = { med: [], food: [], water: [], excre: [] };
    const now = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const dateStr = `${d.getMonth() + 1}月${d.getDate()}日`;
      days.push(dateStr);

      // 初始化每一天的四种数据
      let sums = { med: 0, food: 0, water: 0, excre: 0 };
      
      myRecords.forEach(r => {
        if (r.date === dateStr) {
          if (r.typeLabel.includes('用药')) sums.med += (r.value || 0);
          if (r.typeLabel.includes('饮食')) sums.food += (r.value || 0);
          if (r.typeLabel.includes('饮水')) sums.water += (r.value || 0);
          if (r.typeLabel.includes('排泄')) sums.excre += (r.value || 0);
        }
      });

      values.med.push(sums.med);
      values.food.push(sums.food);
      values.water.push(sums.water);
      values.excre.push(sums.excre);
    }
    return { days, values };
  }
});