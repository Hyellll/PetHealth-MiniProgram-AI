Page({
  data: {
    petName: '',
    // 基础的四个卡片
    cardList: [
      { type: 'med', typeClass: 'med', label: '用药情况', icon: '💊', placeholder: '输入用药情况...' },
      { type: 'food', typeClass: 'food', label: '饮食情况', icon: '🍖', placeholder: '输入重量...' },
      { type: 'water', typeClass: 'water', label: '饮水情况', icon: '💧', placeholder: '输入饮水量...' },
      { type: 'excre', typeClass: 'excre', label: '排泄情况', icon: '💩', placeholder: '输入描述...' }
    ],
    inputValues: {}
  },

  onLoad(options) {
    this.setData({ petName: options.name || '宝贝' });
    this.loadSettings();
  },

  loadSettings() {
    const customCards = wx.getStorageSync(`cards_${this.data.petName}`);
    if (customCards && customCards.length > 0) {
      this.setData({ cardList: customCards });
    }
  },

  goBack() { wx.navigateBack(); },

  onCardInput(e) {
    const type = e.currentTarget.dataset.type;
    let values = this.data.inputValues;
    values[type] = e.detail.value;
    this.setData({ inputValues: values });
  },

  // 这里的保存逻辑已经支持“数字提取”，方便后续的趋势图
  saveRecord(e) {
    const { type, label } = e.currentTarget.dataset;
    const content = this.data.inputValues[type];

    if (!content) {
      wx.showToast({ title: '请输入内容', icon: 'none' });
      return;
    }

    // 正则提取数字
    const numMatch = content.match(/\d+(\.\d+)?/); 
    const val = numMatch ? parseFloat(numMatch[0]) : 0;

    const now = new Date();
    const dateStr = `${now.getMonth() + 1}月${now.getDate()}日`; 
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    let typeClass = type;
    if (type.startsWith('custom')) typeClass = 'custom';

    const newRecord = {
      date: dateStr,
      time: timeStr,
      typeLabel: label.replace('情况', ''),
      typeClass: typeClass,
      content: content,
      value: val
    };

    // 读取并更新该宠物的总记录流
    const allRecords = wx.getStorageSync('petRecords') || {};
    const myRecords = allRecords[this.data.petName] || [];
    const newList = [newRecord, ...myRecords];
    allRecords[this.data.petName] = newList;
    wx.setStorageSync('petRecords', allRecords);

    // 清空输入框
    let inputValues = this.data.inputValues;
    inputValues[type] = '';
    this.setData({ inputValues });

    wx.showToast({ title: '已记录成功', icon: 'success' });
  },

  addNewCardCustom() {
    wx.showModal({
      title: '新建记录项',
      placeholderText: '请输入标题（如：运动）',
      editable: true,
      success: (res) => {
        if (res.confirm && res.content) {
          const newType = 'custom_' + Date.now();
          const newCard = { type: newType, typeClass: 'custom', label: res.content + '情况', icon: '📝', placeholder: '请输入...' };
          const newList = [...this.data.cardList, newCard];
          this.setData({ cardList: newList });
          wx.setStorageSync(`cards_${this.data.petName}`, newList);
        }
      }
    });
  },

  removeCard(e) {
    const index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '移除提示',
      content: '确定要移除这个卡片吗？',
      success: (res) => {
        if (res.confirm) {
          let list = this.data.cardList;
          list.splice(index, 1);
          this.setData({ cardList: list });
          wx.setStorageSync(`cards_${this.data.petName}`, list);
        }
      }
    });
  }
})