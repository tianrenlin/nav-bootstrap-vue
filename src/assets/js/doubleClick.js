// ====================自定义键盘事件=======================
let clickCount=0
document.onkeydown=(e)=>{
  let k=e.keyCode
  if(k==37){  //隐藏
    ++clickCount
    doubleClick(clickCount,1,k)
  }
  if(k==39){  //显示
    ++clickCount
    doubleClick(clickCount,0,k)
  }
  if(k==38){  //回到顶部
    ++clickCount
    doubleClick(clickCount,null,k,1)
  }
  if(k==40){  //回到底部
    ++clickCount
    doubleClick(clickCount,null,k,0)
  }
}




// 短暂的双击事件
doubleClick=(i,j,k,h)=>{
    let timer=null
      if(this.$store.state.newKey==k){
        timer=setTimeout(() => {
          if(i%2==0 && ((k==37) && this.$store.state.side!=0 || (k==39) && this.$store.state.side!=1)){
            this.$store.commit('side',j)
            this.side()
          }
          if(h&&k==38){  // 回到顶部 注意：根据左边大导航的模块高度来移动。1个模块=1个高度
            this.toSrollElement(0)
          }else
          if(!h&&k==40){  // 回到底部
            this.toSrollElement(11)
          }
          i=0
          clearTimeout(timer)
        }, 10);
      }else{
        this.$store.commit('setKey',k)
      }
}