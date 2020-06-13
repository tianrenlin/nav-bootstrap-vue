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
                    <div class="chooseColor" ref="colorCase">
                        <div class="color1">
                            <span>颜色1</span>
                            <label @click="setGrad(0)"></label>
                        </div>
                        <div class="color1">
                            <span>颜色2</span>
                            <label @click="setGrad(1)"></label>
                        </div>
                        <div class="gradient">
                            <span>线性渐变</span>
                            <b-form-checkbox switch size="lg" v-model="gradType"></b-form-checkbox>
                            <span>径向渐变</span>
                        </div>
                        <b-form-select v-model="chooseOpt" :options="options" @change="gradOptVal"></b-form-select>
                    </div>
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
import {Sketch  as colorPicker} from 'vue-color'
let themeEle = document.getElementById('style')
let mainArea=document.getElementsByClassName('content-theme')[0]
    export default {
        data(){
            return{
                diyColor:false, //自定义颜色
                diyBg:false,     //自定义背景
                tip:'请选择图片',
                color: 'rgba(11,62,81,0.66)', //默认自定义背景颜色颜色 rgba(11,62,81,0.66)
                gradType:true, //渐变类型-径向:true 线性:false
                chooseOpt:null, //选择的渐变参数
                options: [  //配置渐变参数（默认为径向渐变）
                    { value: null, text: '选择渐变参数',disabled: true },
                    { value: 'ellipse', text: '椭圆（默认）' },
                    { value: 'circle', text: '圆形' }
                ],
                oldOpt:null, //存储上一次的optios（即径向渐变参数）
                selectOpt:'ellipse', //保存渐变配置参数-select
                color1Flag:true,color2Flag:false, //保存颜色1、颜色2的状态
                color1:'rgba(11,62,81,0.66)',color2:'rgba(11,62,81,0.66)',
                gradOptions:{}, //保存整体配置信息
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
                        if(judeg && this.$store.state.gradOptions && this.$store.state.theme==flag){
                            this.setGrad(3) //有配置
                        }else{ //无配置
                            this.diyColor=true
                            // 再次校验，去掉本地有值情况
                            if(this.$store.state.gradOptions){
                                this.setGrad(3)
                            }else{
                                this.setGrad(2)
                            }
                            
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
                this.setBgStyle(sty)
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
                this.color = `rgba(${val.rgba.r},${val.rgba.g},${val.rgba.b},${val.rgba.a.toFixed(2)})`
                this.setGrad()
            },
            // 获取渐变配置参数-select
            gradOptVal(val){
                this.selectOpt=val
            },
            // 设置渐变，包括颜色小方块的颜色
            setGrad(judeg=-1){
                let options=this.$store.state.gradOptions
                if(options){ //有值
                    options=JSON.parse(options.toString())
                }
                switch(Number(judeg)){
                    case 0:{ //颜色1
                        this.color1Flag=true
                        this.color2Flag=false
                        options.color1=this.color
                    };break;
                    case 1:{ //颜色2
                        this.color1Flag=false
                        this.color2Flag=true
                        options.color2=this.color
                    };break;
                    case 2:{ //无配置
                        options={
                            'color1':this.color1,
                            'color2':this.color2,
                            'type':this.gradType,
                            'select':this.selectOpt
                        }
                    };break;
                    case 3:{ //有配置
                        options
                    };break;
                    default:{
                        // 判断状态-加强
                        if(this.color1Flag){ //颜色1
                            options.color1=this.color
                        }
                        if(this.color2Flag){ //颜色2
                            options.color2=this.color
                        }
                    }
                }
                // 解决打开调色板时颜色小方块颜色不对问题
                this.$nextTick(()=>{
                    this.setColorCase(options)
                })
                
            },
            // 设置小方块背景色、状态
            setColorCase(options){
                // 小方块颜色
                let colorCase=this.$refs.colorCase
                if(colorCase) {
                    colorCase=Array.from(colorCase.childNodes) //转化为数组
                    colorCase.some((item,i)=>{
                        if(i<2){
                            item=item.children[1]
                            if(i==0){ //设置color1背景色
                                item.style= `background:${options.color1}`
                                this.color1=options.color1
                                return
                            } 
                            if(i==1){ //设置color2背景色
                                item.style= `background:${options.color2}`
                                this.color2=options.color2
                                return
                            }
                        }
                    })
                }
                let sty=theme.diyColor(options.type,options.select,options.color1,options.color2)
                this.setBgStyle(sty)
                this.gradOptions=options
                // 保存渐变配置数据
                this.$store.commit('gradOptions',JSON.stringify(options))
            },
            
            // 获取Ele设置背景图、背景色
            setBgStyle(style){
                let oldSty=themeEle.innerHTML.toString().split('.content-theme')[0] //截取，避免样式重复
                themeEle.innerHTML=`${oldSty.trim()}${style}`
            },
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
            },
            // 监听渐变类型-径向：true，线性：false
            gradType:{
                handler(val){
                    if(!this.gradType){
                        this.oldOpt=this.options
                        this.selectOpt='to bottom'
                        this.options=[
                            { value: null, text: '选择渐变参数',disabled: true },
                            { value: 'to bottom', text: '从上到下（默认）'},
                            { value: 'to top', text: '从下到上'},
                            { value: 'to right', text: '从左到右'},
                            { value: 'to left', text: '从左到右'},
                            { value: 'to bottom right', text: '从左上到右下'},
                            { value: 'to top right', text: '从左下到右上'},
                            { value: 'to bottom left', text: '从右上到左下'},
                            { value: 'to top left', text: '从右下到左上'},
                        ]
                    }else{
                        this.options=this.oldOpt
                        this.selectOpt='ellipse'
                    }
                    this.gradOptions.type=this.gradType
                    this.setColorCase(this.gradOptions)
                }
            },
            // 监听不同类型渐变参数-select
            selectOpt:{
                handler(){
                    this.gradOptions.select=this.selectOpt
                    this.setColorCase(this.gradOptions)
                }
            },
        },
        components:{
            colorPicker
        }
    }
</script>

<style lang="less" scoped>
.chooseColor{
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    height: 110px;
    padding-bottom: 10px;
    .color1,.color2{
        display: flex;
        justify-content: space-around;
        align-items: center;
        label{
            display: block;
            width: 20px;
            height: 20px;
            margin: 0 0 0 5px;
            background: chocolate;
            border: 1px solid chocolate;
        }
    }
    .gradient{
        display: flex;
        justify-content: space-around;
        align-items: center;
        max-width: 200px;
        width: 100%;
    }
}
.card{
    border: 1px solid #007ACC;
}

</style>