<template>
  <div class="home">
    <!-- 头部 -->
    <b-navbar toggleable="lg" type="dark" fixed="top">
      <b-navbar-brand @click="toSrollElement(0)">
        <img :src="logo" alt="" id="logo">
        <span>TLin</span>
      </b-navbar-brand>
      <!-- 小导航 -->
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav ref="smallNav">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" small @touchmove="stopEvent($event)">
          <!-- 小导航列表 -->
          <b-nav-item v-for="(nav,n) in menuData" :key="n" v-show="showSmallNav" class="small_nav"
            :class="{'current':currentIndex==n}" @click="selectMenu(n,$event)">
            <b-icon :icon="nav.icon" font-scale="1.5"></b-icon>
            {{nav.title}}
          </b-nav-item>
          <!-- 导航右边Theme组件 -->
          <Theme></Theme>
          <!-- 导航右边About组件 -->
          <About></About>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- 主体 -->
    <div id="main">
      <!-- 侧边栏 -->
      <sideMove>
        <div id="side" v-show="side && showBigSide">
          <!-- 大导航 -->
          <div class="side_list" ref="menu">
            <b-list-group>
              <b-list-group-item :class="{'current':currentIndex==i}" @click="selectMenu(i,$event)"
                v-for="(item,i) in menuData" :key="i">
                <b-icon :icon="item.icon" font-scale="1.5"></b-icon>
                <span>{{item.title}}</span>
              </b-list-group-item>
            </b-list-group>
          </div>
        </div>
      </sideMove>
      <!-- 内容区 -->
      <div id="content" class="row" ref="content" @click.stop="$refs.smallNav.show=false">
        <div id="content-theme"></div>
        <div class="col-md-12 col-sm-12">
          <!-- 网站列表区 -->
          <div ref="list" class="list">
            <!-- 默认展示的首页 -->
            <div v-if="showIndexPage" class="index_page row align-items-center justify-content-center list-hook">
              <div class="inde_warpper">
                <div id="title" title="双击更改主标题" @dblclick="modalTitle=true"
                  class="m-auto col-md-10 col-sm-10 col-xs-12">
                  {{$store.state.mainTitle}}
                </div>
                <!-- 时间组件 -->
                <Time/>
                <Alert/>
                <div class="search">
                  <div class="search_box">
                    <b-icon icon="search" font-scale="1"
                      style="width: 28px;height: 38px;margin: auto 10px;color:5693bd;">
                    </b-icon>
                    <input placeholder="请输入内容" autofocus id="ipt_val" v-model="searchInput" @keyup="showClear"
                      ref="iptSearch" autocomplete='off'>
                    <b-icon icon="x" font-scale="1.3" id="clear" v-show="clear" @click="showClear('clear')"></b-icon>
                    <span id="search" title="默认百度搜索" @click="search($event)">搜 索</span>

                  </div>
                  <Animation>
                    <div id="more" ref="more" v-show="searchWindow">
                      <More ref="more"></More>
                    </div>
                  </Animation>
                </div>
              </div>
            </div>
            <!-- overflow:auto 解决BFC问题：子元素超出父元素 -->
            <div v-for="(item1,i1) in data" :key="i1" class="list-hook" style="overflow:auto;">
              <!-- 每个模块的title -->
              <div class="tag_title h6">
                <b-icon icon="tag" variant="primary" font-scale="1.5"></b-icon>
                <span>{{item1.title}}</span>
              </div>
              <div class="row nav_list">
                <!-- 渲染每个网站 -->
                <div class="list-unstyled col-md-3 col-sm-4 col-xs-12" :id="(item2.url)" v-for="(item2,i2) in item1.web"
                  :key="i2">
                  <ul @click="handleListItem(item2.url)" @touchstart="handleStart" @touchmove="handleMove"
                    @touchend="handleEnd(item2.url)">
                    <b-media tag="li">
                      <template v-slot:aside>
                        <b-img-lazy width="30" height="30" alt="ico" :src="item2.logo"></b-img-lazy>
                      </template>
                      <h6 class="mt-0 mb-1">{{item2.name}}</h6>
                      <p class="mb-0">
                        {{item2.des}}
                      </p>
                    </b-media>
                  </ul>
                  <!-- 鼠标悬停时 -->
                  <b-popover :target="(item2.url)" triggers="hover" placement="bottom">
                    {{item2.url}}
                  </b-popover>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <!-- 编辑title的模态框 -->
    <b-modal v-model="modalTitle" title="编辑标题" :header-class="'body-class'" dialog-class="dialog-class"
      :body-class="'body-class'" modal-class="modal-class" hide-footer>
      <form ref="form" @submit.stop.prevent="handleSubmit" class="dilog-input">
        <input v-model="$store.state.mainTitle" ref="titleRef">
        <b-button class="mt-3" variant="outline-primary" block @click="modalTitle=false">确 定</b-button>
      </form>
    </b-modal>
    <!-- 开关左侧导航的小边块 -->
    <div id="side_tip" title="双击键盘左右键快速切换" @click="leftSide(side?0:1)" v-show="showBigSide">
      <b-icon icon="arrow-bar-left" v-show="side"></b-icon>
      <b-icon icon="arrow-bar-right" v-show="!side"></b-icon>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import Time from '@/components/time' //时间组件
  import sideMove from '@/components/sideMove' //侧边栏-导航动画
  import Theme from '@/components/theme' //主题组件
  import Alert from '@/components/alert'
  import {mapState,mapMutations} from 'vuex' //引入vuex辅助函数
  export default {
    data() {
      return {
        // 保存数据
        data: [],
        // 导航菜单数据（把搜索主页加进入）
        menuData: [],
        // logo
        logo: 'img/logo1.png',
        // 选中的菜单栏高亮
        clickActive: false,
        // 搜索框数据
        searchInput: '',
        // 清空搜索框
        clear: false,
        // 标题模态框的显示
        modalTitle: false,
        // 移动端点击状态
        touchStatus: false,
        timer: null,
        // 显示showIndexPage
        showIndexPage: true,
        // 储存y轴滚动数据
        scrollY: 0,
        // 存储列表高度
        listHeight: [],
        // 显示大菜单栏 <1070px
        showBigSide: true,
        // 显示小菜单栏 <992px
        showSmallNav: false,
      }
    },
    created() {
      this.getData()
      this.getWindowWidth()
      this.getScrollWindth()
    },
    methods: {
      // 获取主要数据-data
      getData() {
        this.data = this.$mydata.data
        this.otherNav = this.$mydata.otherNav
        this.data = this.data.concat(this.otherNav)
        // 使用工具集lodash的深拷贝cloneDeep避免数据污染-添加首页
        this.menuData = _.cloneDeep(this.data)
        let indexPage = {
          "title": "主页搜索",
          "icon": "house"
        }
        this.menuData.unshift(indexPage)
      },
      // 搜索
      search() {
        let iptVals = this.getSearchVals()
        if (iptVals) {
          window.open('https://www.baidu.com/s?ie=UTF-8&wd=' + iptVals)
        }else{
          this.alert('请输入内容进行搜索！')
        }
      },
      // 监听keyup，清除搜索框数据，有数据时显示
      showClear(el) {
        let iptVals = this.getSearchVals()
        if (iptVals) {
          this.clear = true //显示清除、更多搜索
        }
        if (el == 'clear') { //清除搜索框
          this.searchInput = ''
          this.clear = false
        }
        // 监听enter键，进行搜索
        if (el.keyCode == "13") {
          if (iptVals) return window.open('https://www.baidu.com/s?ie=UTF-8&wd=' + iptVals)
        }
        this.changeSomeStyle()
      },
      // 获取Seach的内容清除空格
      getSearchVals() {
        let vals = this.searchInput.trim()
        if (vals) return vals
        return ''
      },

      // 点击每一个网站
      handleListItem(url) {
        window.open(url)
      },
      /*解决better-scroll+vue-awesome-swiper带来的滑动的问题
       问题：若在scroll列表内开启'click:true'则在swiper内的链接无法点击。移动端出现该问题，PC端因为有原生的onclick事件
       解决：
          1、在touchmove内使用setTimeout判断用户是否滑动，此处延迟120表示已滑动，状态标识touchStatus为真
          2、在touchend中判断执行，再把标识符改为假
      */
      // 滑动开始
      handleStart() {},
      // 滑动中
      handleMove() {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.touchStatus = true
        }, 120)
      },
      // 滑动结束
      handleEnd(url) {
        if (!this.touchStatus) window.open(url)
        this.touchStatus = false
      },
      // 获取浏览器窗口大小
      getWindowWidth() {
        this.optionWindowWidth()
      },
      // 浏览器窗口大小改变时调整样式
      getScrollWindth() {
        window.onresize = () => {
          this.optionWindowWidth()
        }
      },
      // 窗口大小进行调整（抽离公共部分）
      optionWindowWidth() {
        let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        //大导航菜单1070px时隐藏菜单栏
        width > 1070 ? this.showBigSide = true : this.showBigSide = false
        //小导航菜单992px时隐藏菜单栏
        width < 992 ? this.showSmallNav = true : this.showSmallNav = false
        // 关闭首页显示
        this.setWindowWidth(width)
      },
      // 获得每一个列表的高度，作为左右联动
      _calculateHeight() {
        let list = this.$refs.list.getElementsByClassName('list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      // 点击菜单 
      selectMenu(index, event) {
        // if (!event._constructed) { //event的_constructed事件，return掉PC端的原生点击事件
        //   return
        // }
        // 执行自定义派发的事件，找到对应的节点
        let list = this.$refs.list.getElementsByClassName('list-hook')
        let el = list[index]
        this.toSrollElement(index)
      },
      // 执行滚动
      toSrollElement(i) {
        window.scrollTo({
          top: this.listHeight[i],
          behavior: 'smooth' // 滚动模式：平滑移动 瞬移：instant
        })
        // 存放Y轴滚动数据
        this.scrollY = i
      },
      // 解决移动端MORE模块更长遮盖问题
      changeSomeStyle() {
        let page = document.getElementsByClassName('index_page')[0]
        let box = document.getElementsByClassName('inde_warpper')[0]
        let list = document.getElementsByClassName('list-hook')[1]
        let height = Number(box.offsetHeight - page.offsetHeight) + 50
        // 输入内容时
        if (this.searchVals && this.windowWidth < 501) {
          list.setAttribute('style', `margin-top:${height}px;`)
          box.setAttribute('style', `margin-top:10%;`)
        }
        // 取消MORE模块时
        if (this.searchWindow == 0) {
          list.removeAttribute('style')
          box.removeAttribute('style')
        }
        // 设置定时器反复执行，主要判断MORE是否关闭
      },
      // 移动端导航滚动时阻止页面滚动
      stopEvent(e) {
        e.stopPropagation()
        return false
      },
      // 左右箭头快速显示/隐藏导航 1-显示 0-隐藏
      leftSide(flag) {
        flag=Number(flag)
        let theme = document.getElementById('content-theme')
        let side = document.getElementById('side')
        let tip = document.getElementById('side_tip')
        let duration=850
        if (flag) { //显示
          this.animation(tip,'0px','177px',duration)
          theme.style.width='90%'
          this.changeSide(flag)
        } else { //隐藏
          this.animation(tip,'177px','0px',duration)
          theme.style.width='100%'
          this.changeSide(flag)
        }
      },
      // 动画
      animation(node,arg1,arg2,time){
        node.animate([{
            transform: `translateX(${arg1})`
          },
          {
            transform: `translateX(${arg2})`
          },
        ], {
          duration: time,
          fill: 'forwards' // 保留最后一帧动画
        });
      },
      // 快捷键设置
      doubleTouch(k) {
        let timer = null
        k = Number(k)
        /* 外层定时器解决回到顶部/底部不能触发bug
         * 原因：点击上/下方向键时有浏览器自带事件
         */
        timer = setTimeout(() => {
          // 两次按键一致
          if (this.newKey == k) {
            switch (k) {
              case 37: { // ←←-关闭大导航
                if(this.side){
                  this.leftSide(0)
                }
              };
              break;
            case 38: { // ↑↑-回到顶部 注意：根据左边大导航的模块高度来移动。1个模块=1个高度
              this.toSrollElement(0)
            };
            break;
            case 39: { // →→-开启大导航
              if(!this.side){
                  this.leftSide(1)
              }
            };
            break;
            case 40: { // ↓↓-回到底部
              this.toSrollElement(11)
            };
            break;
            case 65: { // AA-弹出警告框
              this.alert('我一直在背后默默支持~~~')
            };
            break;
            case 66: { // BB-自定义图片背景
              this.changeTheme(3)
            };
            break;
            case 67: { // CC-自定义背景色
              this.changeTheme(2)
            };
            break;
            case 68: { // DD-主题-白天
              this.changeTheme(0)
            };
            break;
            case 70: { // FF-进入搜索框焦点
              this.$refs.iptSearch.focus()
            };
            break;
            case 78: { // NN-主题-夜晚
              this.changeTheme(1)
            };
            break;
            case 77: { // MM-关闭更多搜索并清除搜索框
              this.showClear('clear')
              this.changeSearchWindow(0)
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
            if (this.newKey == 17) { //点击CTRL键
              switch (k) {
                case 8: { // 退格键-清空搜索框
                  this.showClear('clear')
                };
                break;
              case 77: { // M-关闭更多搜索
                this.changeSearchWindow(0)
              };
              break;
              }
            }
          }
          this.changeKey(k)
          clearTimeout(timer)
          // 控制时长
          timer = setTimeout(() => {
            this.changeKey(null)
            clearTimeout(timer)
          }, 500)
        });
      },
      ...mapMutations(['alert','setWindowWidth','changeSide','changeTheme','changeSearchWindow','changeKey','changeVals','changeTitle'])
    },
    mounted() {
      // 计算list的高度
      this._calculateHeight()
      // 返回页面顶部
      window.onload = () => {
        this.toSrollElement(0)
      };
      // 大导航状态
      // this.leftSide(this.side)
      // 键盘按下-设置快捷键
      document.onkeydown = (e) => {
        let k = e.keyCode
        this.doubleTouch(k)
      }
    },
    watch: {
      searchInput() {
        if (this.searchInput) {
          this.changeSearchWindow(1)
        }
        let vals = this.getSearchVals()
        // 改变vuex中searchVals的值
        this.changeVals(vals)
      },
      '$store.state.mainTitle': {
        handler(){
          this.changeTitle(this.mainTitle)
        }
      }
    },
    computed: {
      // 遍历列表高度（索引值）
      currentIndex() {
        return this.scrollY
      },
      // 主标题
      ...mapState(['mainTitle','searchVals','windowWidth','searchWindow','side','newKey']),
    },
    components: {
      Time,
      sideMove,
      Theme, //时间组件、侧边栏导航动画组件、主题组件
      Alert,
      // 组件懒加载
      Animation: () => import('@/components/animation'), //动画效果
      More: () => import('@/components/more'), //更多搜索组件
      About: () => import('@/components/about'), //About组件-右上角相关信息
      // Alert: () => import('@/components/alert'), //Alert组件
    }
  }
</script>
<style lang="less" scoped>
  // 千万要注意加上尾部的分号;;;;;;;;;;
  @import '~@/assets/css/home.less';
</style>