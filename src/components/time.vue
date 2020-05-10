<template>
  <div>
    <!-- 时钟部分 -->
    <div class="time">
      <!-- 时 -->
      <ul class="t_ul">
        <li class="front"></li>
        <li class="top"></li>
        <li class="bot"></li>
        <li></li>
        <li></li>
        <li class="back"></li>
      </ul>
      <ul class="t_ul">
        <li class="front"></li>
        <li class="top"></li>
        <li class="bot"></li>
        <li></li>
        <li></li>
        <li class="back"></li>
      </ul>
      <!-- <ul><span class="point">∶</span></ul> -->
      <!-- 分 -->
      <ul class="t_ul">
        <li class="front"></li>
        <li class="top"></li>
        <li class="bot"></li>
        <li></li>
        <li></li>
        <li class="back"></li>
      </ul>
      <ul class="t_ul">
        <li class="front"></li>
        <li class="top"></li>
        <li class="bot"></li>
        <li></li>
        <li></li>
        <li class="back"></li>
      </ul>
      <!-- <ul><span class="point">∶</span></ul> -->
      <!-- 秒 -->
      <ul class="t_ul">
        <li class="front"></li>
        <li class="top"></li>
        <li class="bot"></li>
        <li></li>
        <li></li>
        <li class="back"></li>
      </ul>
      <ul class="t_ul">
        <li class="front"></li>
        <li class="top"></li>
        <li class="bot"></li>
        <li></li>
        <li></li>
        <li class="back"></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      showTime() {
        var oul = document.querySelectorAll(".t_ul");
        var back = document.querySelectorAll(".back");
        var front = document.querySelectorAll(".front");
        var Top = document.querySelectorAll(".top");
        var bot = document.querySelectorAll(".bot");
        var arr = timeArr();
        
        for (var i = 0; i < arr.length; i++) {
          front[i].innerHTML = arr[i];
          back[i].innerHTML = arr[i] + 2 >= 10 ? (arr[i] + 2) % 10 : arr[i] + 2;
          Top[i].innerHTML = arr[i] + 3 >= 10 ? (arr[i] + 3) % 10 : arr[i] + 3;
          bot[i].innerHTML = arr[i] + 1 >= 10 ? (arr[i] + 1) % 10 : arr[i] + 1;
        }

        function timeArr(){
          var arr=[]
          arr[0] = Math.floor(new Date().getHours() / 10);
          arr[1] = new Date().getHours() % 10;
          arr[2] = Math.floor(new Date().getMinutes() / 10);
          arr[3] = new Date().getMinutes() % 10;
          arr[4] = Math.floor(new Date().getSeconds() / 10);
          arr[5] = new Date().getSeconds() % 10;
          return arr
        }
        addStyle(oul)
        function addStyle(el) { // 元素，分割样式
          for (let j = 0; j < el.length; j++) {
            j % 2 == 0 ? el[j].setAttribute('style', 'margin-right:5px') : el[j].setAttribute('style',
              'margin-left:5px')
          }
        }

        function time() {
          var arr2 = timeArr();

          for (var i = 0; i < oul.length; i++) {
            if (front[i].innerHTML != arr2[i]) {
              oul[i].classList.add("transition");
            }
            oul[i].index = i;
            oul[i].addEventListener("webkitTransitionEnd", function () {

              front[this.index].innerHTML = arr2[this.index];
              back[this.index].innerHTML = arr2[this.index] + 2 < 10 ? arr2[this.index] + 2 : (arr2[this.index] +
                2) % 10;
              Top[this.index].innerHTML = arr2[this.index] + 3 < 10 ? arr2[this.index] + 3 : (arr2[this.index] +
                3) % 10;
              bot[this.index].innerHTML = arr2[this.index] + 1 < 10 ? arr2[this.index] + 1 : (arr2[this.index] +
                1) % 10;

              this.classList.remove("transition");

            })

          }

        }
        setInterval(time, 350)

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
  .t_ul {
    float: left;
    padding-left: 0;
    margin-right: 13px;
    width: 35px;
    height: 35px;
    position: relative;
    transform-style: preserve-3d;
    transform: rotateX(5deg) rotateY(-7deg);
    &:nth-child(2n-1){
      margin-right: 0!important;
    }
    &:last-child{
      margin-right: 0!important;
    }
  }


  .transition {
    transition: all 0.5s;
    transform: rotateY(-7deg) rotateX(95deg);
  }

  .time {
    max-width: 345px;
    width: 100%;
    height: 60px;
    margin: 40px auto;
    display: flex;
    justify-content: center;
  }

  .time .t_ul li {
    text-align: center;
    line-height: 30px;
    font-size: 30px;
    color: rgba(255, 255, 255, 0.2);
    width: 100%;
    height: 100%;
    position: absolute;
    transform: translateZ(17px);
    border: 1px solid #007ACC;
    font-weight: 400;
    text-shadow: 0 0 5px #29a1f1, 0 0 6px #29a1f1, 0 0 7px #29a1f1, 0 0 8px #29a1f1, 0 0 9px #29a1f1;
    padding-left: 5px;
    box-sizing: border-box;
  }

  .time li:nth-of-type(1) {
    font-size: 30px;
    text-shadow: 0 0 5px #fff, 0 0 20px #fefcc9;
    line-height: 35px;
    color: #007ACC;
    transform: translateZ(17px);
  }

  .time li:nth-of-type(2) {
    transform: rotateX(90deg) translateZ(17px)
  }

  .time li:nth-of-type(3) {
    transform: rotateX(90deg) translateZ(-17px)
  }

  .time li:nth-of-type(4) {
    transform: rotateY(90deg) translateZ(17px)
  }

  .time li:nth-of-type(5) {
    transform: rotateY(90deg) translateZ(-17px)
  }

  .time li:nth-of-type(6) {
    transform: translateZ(-17px);
  }

  .point {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
  }

  /*@keyframes sk {
    0 {
        transform: rotateX(-10deg) rotateY(-15deg) rotateZ(-5deg)
    }
    100% {
        transform: rotateX(10deg) rotateY(15deg) rotateZ(5deg)
    }
}*/
</style>