// pages/catCommunity/catCommunity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图
    movies: [
      { url: '/images/nav1.jpg' },
      { url: '/images/nav2.jpg' },
      { url: '/images/nav3.jpg' },
      { url: '/images/nav4.jpg' }
    ],
   //点赞评论
    commandArraylist: [
      {
        userUrl: '/assets/logo/jiatui-logo.jpg',
        articleUrl: '/assets/images/simple.jpg',
        username: '心动云',
        userpression: '公司',
        articleTitle: '2019，深圳开荒牛的TO B拓荒路',
        data: '昨天',
        praiseFlag: false,
        lovePointUser: '稻草人,玩笑而,加推你好啊,万众杀戮空间,是街坊邻居',
        commandUserList: [
          {
            name: 'zero',
            text: '厉害'
          },
          {
            name: '华仔',
            text: '不错'
          },
          {
            name: '方知',
            text: 'hello'
          },
          {
            name: '吴氏生飞 地产老猫',
            text: '好产品'
          }
        ]
      }
    ]
  }
  
})