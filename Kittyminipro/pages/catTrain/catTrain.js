// pages/catTrain/catTrain.js
Page({
  data: {
    show: false,
    show1:false
  },

  showPopup() {
    this.setData({ show: true });
    console.log(111);
  },
  showPopup1() {
    this.setData({ show1: true });
    console.log(222);
  },

  onClose() {
    this.setData({ show: false });
  },
  onClose1() {
    this.setData({ show1: false });
  }

})