document.onkeydown = (e) => {
  let k = e.keyCode
  doubleTouch(k)
}
function doubleTouch(k) {
  console.log(k)
  let timer = null
  k = Number(k)
  /* 外层定时器解决回到顶部/底部不能触发bug
   * 原因：点击上/下方向键时有浏览器自带事件
   */
  timer = setTimeout(() => {
    // 两次按键一致
    if (this.$store.state.newKey == k) {
      switch (k) {
        case 37: { // ←←-关闭大导航
          if(this.$store.state.side){
            this.side(0)
          }
        };
        break;
      case 38: { // ↑↑-回到顶部 注意：根据左边大导航的模块高度来移动。1个模块=1个高度
        this.toSrollElement(0)
      };
      break;
      case 39: { // →→-开启大导航
        if(!this.$store.state.side){
            this.side(1)
        }
      };
      break;
      case 40: { // ↓↓-回到底部
        this.toSrollElement(11)
      };
      break;
      case 65: { // AA-弹出警告框
        this.$store.commit('alert', '我一直在背后默默支持~~~')
      };
      break;
      case 66: { // BB-自定义图片背景
        this.$store.commit('changeTheme', 3)
      };
      break;
      case 67: { // CC-自定义背景色
        this.$store.commit('changeTheme', 2)
      };
      break;
      case 68: { // DD-主题-白天
        this.$store.commit('changeTheme', 0)
      };
      break;
      case 70: { // FF-进入搜索框焦点
        this.$refs.iptSearch.focus()
      };
      break;
      case 78: { // NN-主题-夜晚
        this.$store.commit('changeTheme', 1)
      };
      break;
      case 77: { // MM-关闭更多搜索并清除搜索框
        this.showClear('clear')
        this.$store.commit('searchWindow', 0)
      };
      break;
      case 84: { // TT-修改主标题
        this.modalTitle = true
        setTimeout(() => {
          this.$refs.titleRef.focus()
        })
      };
      break;
      }
    }
    // 两个不同组合键
    else {
      if (this.$store.state.newKey == 17) { //点击CTRL键
        switch (k) {
          case 8: { // 退格键-清空搜索框
            this.showClear('clear')
          };
          break;
        case 77: { // M-关闭更多搜索
          this.$store.commit('searchWindow', 0)
        };
        break;
        }
      }
    }
    this.$store.commit('setKey', k)
    clearTimeout(timer)
    // 控制时长
    timer = setTimeout(() => {
      this.$store.commit('setKey', null)
      clearTimeout(timer)
    }, 500)
  });
}