<template>
    <div id="about">
        <!-- header-class：自定义样式，根据主题判断样式 -->
        <b-modal v-model="$store.state.showAboutDesc" :title="title.desc" :header-class="[$store.state.theme=='day'?'body-class-day':'body-class-night']" dialog-class="dialog-class" :body-class="[$store.state.theme=='day'?'body-class-day':'body-class-night']" modal-class="modal-class" hide-footer>
            <p>{{description}}</p>
            <a :href="staticUrl" target="_blank" class="staticUrl">点击查看原始项目</a>
        </b-modal>
        <b-modal v-model="$store.state.showAboutEmail" :title="title.email"  :header-class="[$store.state.theme=='day'?'body-class-day':'body-class-night']" dialog-class="dialog-class" :body-class="[$store.state.theme=='day'?'body-class-day':'body-class-night']" modal-class="modal-class" hide-footer>
            <div title="默认使用QQ邮箱" class="h4 mb-2 email" @click="email" style="display:flex;align-items:center;justify-content:center;cursor: pointer;"><b-icon icon="envelope" :variant="variant[0]" font-scale="1.1"></b-icon> <span style="padding:0 0 6px 5px;">向我发邮件</span></div>
        </b-modal>
        <b-modal v-model="$store.state.showAboutUpdate" scrollable :title="title.update"  :header-class="[$store.state.theme=='day'?'body-class-day':'body-class-night']" dialog-class="dialog-class" :body-class="[$store.state.theme=='day'?'body-class-day':'body-class-night']" modal-class="modal-class" hide-footer>
            <div>
                <b-alert show :variant="variant[i%variant.length]" v-for="(item,i) in info" :key="i">
                    <b-icon icon="award" :variant="variant[i%variant.length]"></b-icon>
                    {{item.time}}
                    {{item.desc}}
                </b-alert>
            </div>
        </b-modal>
    </div>
</template>

<script>
import update from '@/assets/data/updateInfo.json'
    export default {
        data(){
            return{
                title:{
                    desc:'简介',
                    email:'Email',
                    update:'更新说明'
                },
                info:[],
                variant:['primary','secondary','success','danger','warning','info','light','dark'],
                description:'这个项目很久之前都想做了，之前做了个很简单的，想纯用js不借助框架来写。该项目陆陆续续收集和写了两个月，主要想到兼容移动端，但发现一点都不好使。使用的better-scroll变的很卡并且在PC端效果不好，索性使用boostrap自带的处理移动端的功能。本项目主要使用Vue-cli3和bootstrap-vue搭建，其中还重点使用到的有vux、vue-awesome-swiper以及vue-router的路由按需加载。当然了，加上引入CDN、路由懒加载、使用本地文件等优化。后续也会持续更新新的内容以及优化，详情可看“更新说明”。',
                staticUrl:'https://tilin.gitee.io/nav/'
            }
        },
        created(){
            this.info=update.info
        },
        methods:{
            email(){
                window.open('http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=TH9_dHt9fHR7dXkMPT1iLyMh')
            }
        }
    }
</script>

<style lang="less" scoped>
    p{
        text-indent: 2em;
        line-height: 27px;
    }
    .staticUrl{
        display: block;
        font-size: 14px;
        color:#4689BF;
        text-align:center;
        padding-top: 5px;
    }

</style>