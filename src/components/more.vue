<template>
    <div class="swiper row m-auto">
        <swiper :options="swiperOption" class="col-md-12 col-sm-12 col-xs-12">
            <!-- slides -->
            <swiper-slide v-for="(item1,i1) in more" :key="i1">
                <b-card tag="div" title="" title-tag="h6" border-variant="secondary" header="Primary"
                    header-border-variant="info" header-text-variant="danger">
                    <template v-slot:header>
                        <h6 class="mb-0 tip1">{{item1.title}} >></h6>
                        <h6 class="mb-0 tip2">
                            左右滑动更多搜索选择
                        </h6>
                    </template>
                    <div class="more_list">
                        <ul class="row">
                            <b-link @click="handleMoreItem(item2.url)"
                                :disabled="$store.state.searchVals?false:true" target="_bank" tag="li"
                                v-for="(item2,i2) in item1.web" :key="i2" class="col-md-6 col-sm-6 col-xs-12">
                                <div class="list_item" :id="item2.url">
                                    <img alt="ico" :src="item2.logo" width="30" height="30">
                                    <span class="title">{{item2.name}}</span>
                                </div>
                            </b-link>
                        </ul>
                        <!-- 底部关闭按钮 -->
                        <div class="close">
                            <b-icon icon="x" font-scale="1.3" @click="closeMoreSearch"></b-icon>
                        </div>
                    </div>

                </b-card>
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    import {swiper,swiperSlide} from 'vue-awesome-swiper'
    import {mapState,mapMutations} from 'vuex' //引入vuex辅助函数
    export default {
        data() {
            return {
                // 数据
                more: [],
                // swiper配置文件
                swiperOption: {
                    loop: true,
                    // autoplay: true,
                    delay:3000,
                    effect: 'coverflow',
                    // 解决轮播宽度的问题。当监听该元素或者父级元素DOM发生变化时，会刷新一次
                    observeParents: true,
                    observer: true
                },

            }
        },
        created() {
            this.getMoreData()
        },
        methods: {
            getMoreData() {
                this.more = this.$mydata.more
            },
            closeMoreSearch() {
                // 改变vuex中searchWindow的值
                this.changeSearchWindow(0)
            },
            handleMoreItem(url) {
                let vals = this.searchVals
                if (vals) {
                    // 处理关键字后加搜索类型的
                    let urls=url.replace(/{keyword}/,vals)
                    if(url==urls) urls=url+vals  //相等时说明没有被替换
                    window.open(urls)
                }else{
                    this.alert('请输入内容进行搜索！')
                }
            },
            ...mapMutations(['changeSearchWindow','alert'])
        },
        computed:{
            ...mapState(['searchVals'])
        },
        components: {
            swiper,
            swiperSlide
        }
    }
</script>

<style lang="less" scoped>
    .swiper {
        max-width: 100%;
        width: 100%;
        @media screen and (max-width: 670px){
            max-width: 500px;
        }
        @media screen and (max-width: 575px){
            max-width: 300px;
        }
        .tip1 {
            float: left;
        }

        .tip2 {
            float: right;
            color: #056AB2;
            font-size: 0.8rem;
            opacity: 0.85;
        }

        .more_list {
            .row {
                padding: 0;
            }

            .list_item {
                font-size: 1rem;
                padding: 10px 0;
                cursor: pointer;

                .title {
                    padding-left: 15px;
                    color: #056AB2;
                    font-size: 1rem;
                    &:after {
                        content: "";
                        width: 50%;
                        height: 1px;
                        background: orangered;
                        position: absolute;
                        bottom: 5px;
                        left: 15px;
                        transform-origin: left center;
                        /*设置元素基点位置*/
                        transform: scaleX(0);
                        /*设置元素X轴缩放*/
                        transition: all 250ms ease;
                        /*缓慢变化*/
                    }

                    &:hover:after {
                        /*hover之后再使元素X轴放大1倍*/
                        transform: scaleX(1)
                    }
                }
            }

        }

        .close {
            width: 100%;
            text-align: center;

            svg {
                color: #056AB2;
                cursor: pointer;

                &:hover {
                    color: orangered;
                }
            }
        }

        .card-body {
            padding-bottom: 5px;
        }
    }
</style>