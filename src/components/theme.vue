<template>
    <div id="theme">
        <b-nav-item-dropdown text="切换主题" right>
            <b-dropdown-item href="#" @click="dayOrNight(1)">夜间模式</b-dropdown-item>
            <b-dropdown-item href="#" @click="dayOrNight(0)">白天模式</b-dropdown-item>
            <b-dropdown-item href="#" @click="dayOrNight(2,0)">自定义-背景色</b-dropdown-item>
            <!-- 模态框 -->
            <b-modal v-model="diyColor" title="自定义颜色" :header-class="'body-class'" dialog-class="dialog-class"
            :body-class="'body-class'" modal-class="modal-class" hide-footer>
            <form ref="form" @submit.stop.prevent="handleSubmit" class="dilog-input">
                <b-card>
                    <!-- <ck-color-picker v-model="color"  @change="changeColor($event)"/> -->
                    <colorPicker :value="color" @input="updateValue"></colorPicker>
                </b-card>
                <b-button class="mt-3" variant="outline-primary" block @click="diyColor=false">确 定</b-button>
            </form>
            </b-modal>
            <b-dropdown-item href="#" @click="dayOrNight(3,0)">自定义-背景图</b-dropdown-item>
            <b-modal v-model="diyBg" title="自定义背景" :header-class="'body-class'" dialog-class="dialog-class"
            :body-class="'body-class'" modal-class="modal-class" hide-footer>
            <form ref="form" @submit.stop.prevent="handleSubmit" class="dilog-input">
                <b-form-file multiple :file-name-formatter="formatNames" :placeholder="tip" browse-text="本地浏览" autofocus @change="choosePic" accept="image/*"></b-form-file>
                <b-button class="mt-3" variant="outline-primary" block @click="diyBg=false">确 定</b-button>
            </form>
            </b-modal>
        </b-nav-item-dropdown>
    </div>
</template>

<script>
// 引入主题设置
import theme from '@/assets/js/theme'
// import colorPicker from '@/assets/js/colorPicker'
import {Sketch  as colorPicker} from 'vue-color'
let themeEle = document.getElementById('style')
let mainArea=document.getElementsByClassName('content-theme')[0]
    export default {
        data(){
            return{
                diyColor:false, //自定义颜色
                diyBg:false,     //自定义背景
                tip:'请选择图片',
                color: '#0D96C3A8', //默认自定义背景颜色颜色
                colorShow:true
            }
        },
        methods: {
            // 切换主题 - 主题状态 主题判断（自行读取：false、人为设置：true）
            dayOrNight(flag,judeg) {
                flag=Number(flag)
                switch (flag) {
                    case 0: { // 白天
                        themeEle.innerHTML = theme.day
                    };
                    break;
                    case 1: { // 黑夜
                        themeEle.innerHTML = null
                    };
                    break;
                    case 2:{ // 自定义背景色
                        if(judeg && this.$store.state.diyColor && this.$store.state.theme==flag){
                            this.changeColor(this.$store.state.diyColor)
                        }else{
                            if(!this.$store.state.diyColor){}
                            this.diyColor=true
                            this.changeColor()
                        }
                    };break;
                    case 3:{ // 自定义背景图
                        if(judeg && this.$store.state.diyBg && this.$store.state.theme==flag){
                            this.choosePic()
                        }else{
                            if(!this.$store.state.diyBg) this.tip='图片已失效，请重新选择图片！'
                            this.diyBg=true
                            this.choosePic()
                            this.$store.commit('alert','注意：刷新或图片不显示时重新上传！')
                        }
                        
                    };break;
                }
                this.$store.commit('changeTheme', flag)
            },
            // 获取已选择图片名称
            formatNames(files) {
                if (files.length === 1) {
                    return files[0].name
                } else {
                    return `${files.length} 个图片已选择，但只会显示其中一个！`
                }
            },
            // 选择图片
            choosePic(files){
                let url
                let oldSty=themeEle.innerHTML.toString().split('.content-theme')[0] //截取，避免样式重复
                if(files){
                    url=this.getImgUrl(files.target.files[0])
                }else{
                    url=this.$store.state.diyBg
                }
                let sty=theme.diyBg(url)
                themeEle.innerHTML=`${oldSty.trim()}${sty}`
                this.$store.commit('diyBg',url)
            },
            // 获取上传的图片的地址
            getImgUrl(file) {
                var url = null ;
                // 下面函数执行的结果是一样的，针对不同的浏览器执行不同的 js 函数
                if (window.createObjectURL!=undefined) { // basic
                    url = window.createObjectURL(file) ;
                } else if (window.URL!=undefined) { // firefox
                    url = window.URL.createObjectURL(file) ;
                } else if (window.webkitURL!=undefined) { // webkit、chrome
                    url = window.webkitURL.createObjectURL(file) ;
                }
                return url ;
            },
            // 已选中的颜色
            updateValue (val) {
                this.color = val.hex8
                
                this.changeColor(this.color)
            },
            // 选择颜色
            changeColor(color){
                let oldSty=themeEle.innerHTML.toString().split('.content-theme')[0] //截取，避免样式重复
                if(color){}
                else{color=this.color}
                let sty=theme.diyColor(color)
                themeEle.innerHTML=`${oldSty.trim()}${sty}`
                this.$store.commit('diyColor',color)
            }
        },
        mounted() {
            // 读取主题
            this.dayOrNight(this.$store.state.theme,1)
        },
        watch:{
            // 监控通过快捷键改变主题
            '$store.state.theme':{
                handler(val){
                    this.dayOrNight(this.$store.state.theme,1)
                },
            }
        },
        components:{
            colorPicker
        }
    }
</script>

<style lang="less" scoped>

</style>