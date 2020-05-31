<template>
 <div class="time">
    <!-- 时 -->
    <ul class="box">
          <li class="front"></li>
          <li class="top"></li>
          <li class="bottom"></li>
          <li class="left"></li>
          <li class="right"></li>
          <li class="back"></li>
        </ul>
    <ul class="box">
      <li class="front"></li>
      <li class="top"></li>
      <li class="bottom"></li>
      <li class="left"></li>
      <li class="right"></li>
      <li class="back"></li>
    </ul>
    <!-- 分 -->
    <ul class="box">
      <li class="front"></li>
      <li class="top"></li>
      <li class="bottom"></li>
      <li class="left"></li>
      <li class="right"></li>
      <li class="back"></li>
    </ul>
    <ul class="box">
      <li class="front"></li>
      <li class="top"></li>
      <li class="bottom"></li>
      <li class="left"></li>
      <li class="right"></li>
      <li class="back"></li>
    </ul>
    <!-- 秒 -->
    <ul class="box">
      <li class="front"></li>
      <li class="top"></li>
      <li class="bottom"></li>
      <li class="left"></li>
      <li class="right"></li>
      <li class="back"></li>
    </ul>
    <ul class="box">
      <li class="front"></li>
      <li class="top"></li>
      <li class="bottom"></li>
      <li class="left"></li>
      <li class="right"></li>
      <li class="back"></li>
    </ul>
	</div>
</template>

<script>
  export default {
    methods: {
      showTime() {
        let oul = document.querySelectorAll(".box");
        let back = document.querySelectorAll(".back");
        let front = document.querySelectorAll(".front");
        let Top = document.querySelectorAll(".top");
        let bot = document.querySelectorAll(".bottom");
        let arr = timeArr();
        // 进行数字变更
        for (let i = 0; i < arr.length; i++) {
          front[i].innerHTML = arr[i];
          back[i].innerHTML = arr[i] + 2 >= 10 ? (arr[i] + 2) % 10 : arr[i] + 2;
          Top[i].innerHTML = arr[i] + 3 >= 10 ? (arr[i] + 3) % 10 : arr[i] + 3;
          bot[i].innerHTML = arr[i] + 1 >= 10 ? (arr[i] + 1) % 10 : arr[i] + 1;
        }
        // 获取时分秒
        function timeArr(){
          let arr=[]
          arr[0] = Math.floor(new Date().getHours() / 10);
          arr[1] = new Date().getHours() % 10;
          arr[2] = Math.floor(new Date().getMinutes() / 10);
          arr[3] = new Date().getMinutes() % 10;
          arr[4] = Math.floor(new Date().getSeconds() / 10);
          arr[5] = new Date().getSeconds() % 10;
          return arr
        }
        // 1、===================进行动画-requestAnimationFrame==================
        time()
        function time() {
          let arr2 = timeArr()
          let prevArr=prevTime()
          for (let i = 0; i < oul.length; i++) {
            if (front[i].innerHTML != prevArr[i]) {
              front[i].innerHTML = prevArr[i]
              back[i].innerHTML = arr2[i] + 2 < 10 ? arr2[i] + 2 : (arr2[i] +2) % 10;
              Top[i].innerHTML = arr2[i] + 3 < 10 ? arr2[i] + 3 : (arr2[i] +3) % 10;
              bot[i].innerHTML = arr2[i] 
              animation(oul[i])
            }
          }
          // 执行动画，并请求浏览器在下一次重绘之前调用指定的函数来更新动画。根据屏幕刷新率(60Hz)来执行，放到后台后不执行。
          window.requestAnimationFrame(time);
        }
        // 设置动画
        function animation(node){
          node.animate([
              {transform:'rotateY(-7deg) rotateX(0deg)'},
              {transform:'rotateY(-7deg) rotateX(95deg)'}
            ],{
              duration:500,
              fill:'forwards',
              endDelay:500
            })
        }
        // 处理旋转时上一个数字，同时处理因旋转产生视觉多出一秒问题
        function prevTime(){
          let arr=[]
          timeArr().forEach((item,i)=>{
            if(item-1<0){
              switch(i){
                case 0:{  // 时：十位
                  item=2
                };break;
                case 2:{  // 分：十位
                  item=5
                };break;
                case 4:{  // 秒：十位
                  item=5
                };break;
                default: item=9;  // 其它个位
              }
            }else{
              item-=1
            }
            arr.push(item)
          })
          return arr
        }
        // 2、===================进行动画-使用setInterval===================
        // setInterval(time, 1000)
      /*
      "在开发环境下，很少使用间歇调用（setInterval），原因是后一个间歇调用很可能在前一个间歇调用结束前启动,
      （如，回调当中的代码执行for循环时间比，比设定时间长，在回调还没执行完的时候，第二次定时任务就已经放到事件队列中去了，
      所以多用seTimeout代替setinterval）      
      */
      // 3、===================进行动画-使用setTimeout===================
        // timeOut()
        function timeOut(){
          let t=1000
          time()
          setTimeout(timeOut, t);
        }

  }
    },
    mounted() {
      // 异步操作，保证页面渲染完成
      this.$nextTick(callback=>{
        this.showTime()
      })
    },
  }
</script>

<style lang="less" scoped>
  .time {
      max-width: 345px;
      width: 100%;
      height: 60px;
      margin: 40px auto;
      display: flex;
      justify-content: center;
    }
		.box{
			float: left;
		    padding-left: 0;
		    margin-right: 13px;
		    width: 35px;
		    height: 35px;
		    position: relative;
		    transform-style: preserve-3d;
		    transform: rotateX(5deg) rotateY(-7deg);
		}
		.box li{
		    text-align: center;
		    line-height: 35px;
		    font-size: 30px;
		    color: rgba(255, 255, 255, 0.2);
		    width: 100%;
		    height: 100%;
		    position: absolute;
		    transform: translateZ(17px);
		    border: 1px solid #007ACC;
		    font-weight: 400;
		    text-shadow: 0 0 5px #29a1f1, 0 0 6px #29a1f1, 0 0 7px #29a1f1, 0 0 8px #29a1f1, 0 0 9px #29a1f1;
		    
		    box-sizing: border-box;
		}

	  .box .front {
	    font-size: 30px;
	    // text-shadow: 0 0 5px #fff, 0 0 20px #fefcc9;
	    line-height: 35px;
	    color: #007ACC;
	    /* padding-left: 5px; */
	    transform: translateZ(17px);
	  }

	  .box .top {
	    transform: rotateX(90deg) translateZ(17px)
	  }

	  .box .bottom{
	  	color: #007ACC;
	    transform: rotateX(270deg) translateZ(17px)
	  }

	  .box .left{
	    transform: rotateY(90deg) translateZ(17px)
	  }

	  .box .right{
	    transform: rotateY(90deg) translateZ(-17px)
	  }

	  .box .back{
      color: rgba(0,0,0,0.35);
	    transform: translateZ(-17px);
	  }
    .transition {
      transition: all 0.5s;
      transform: rotateY(-7deg) rotateX(95deg);
    }
</style>