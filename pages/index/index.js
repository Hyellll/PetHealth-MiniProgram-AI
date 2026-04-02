Page({
  data: {
    petList: []
  },

  onShow() {
    const savedPets = wx.getStorageSync('myPets') || [];
    this.setData({ petList: savedPets });
  },

  goToDetail(e) {
    const name = e.currentTarget.dataset.name;
    wx.navigateTo({ url: `/pages/detail/detail?name=${name}` });
  },

  showAddPetModal() {
    wx.showModal({
      title: '添加新成员',
      placeholderText: '请输入毛孩子的名字',
      editable: true,
      success: (res) => {
        if (res.confirm && res.content) {
          const newList = [...this.data.petList, { name: res.content }];
          this.setData({ petList: newList });
          wx.setStorageSync('myPets', newList);
        }
      }
    });
  },

  deletePet(e) {
    const index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '要删除这位毛孩子的所有数据吗？',
      confirmColor: '#ff4d4f',
      success: (res) => {
        if (res.confirm) {
          let list = this.data.petList;
          list.splice(index, 1);
          this.setData({ petList: list });
          wx.setStorageSync('myPets', list);
        }
      }
    });
  }
})