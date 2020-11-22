<template>
  <div id="about">
    <b-nav-item-dropdown right>
      <template v-slot:button-content>
        <span>子夜雨</span>
      </template>
      <b-dropdown-item @click="$store.commit('showAboutDesc', true)">简介</b-dropdown-item>
      <b-dropdown-item @click="$store.commit('showAboutEmail', true)">Email</b-dropdown-item>
      <b-dropdown-item @click="$store.commit('showAboutUpdate', true)">更新说明</b-dropdown-item>
      <b-dropdown-item @click="$store.commit('showAboutKey', true)">快捷按键</b-dropdown-item>
      <b-dropdown-item><router-link to="https://github.com/tianrenlin/nav-bootstrap-vue">欢迎Star</router-link></b-dropdown-item>
    </b-nav-item-dropdown>
    <!-- header-class：自定义样式，根据主题判断样式 -->
    <b-modal v-model="$store.state.showAboutDesc" :title="title.desc" :header-class="'body-class'" dialog-class="dialog-class" :body-class="'body-class'" modal-class="modal-class" hide-footer>
      <p>{{ description }}</p>
      <a :href="staticUrl" target="_blank" class="staticUrl">点击查看原始项目</a>
    </b-modal>
    <b-modal v-model="$store.state.showAboutEmail" :title="title.email" :header-class="'body-class'" dialog-class="dialog-class" :body-class="'body-class'" modal-class="modal-class" hide-footer>
      <div title="默认使用QQ邮箱" class="h4 mb-2 email" @click="email" style="display: flex; align-items: center; justify-content: center; cursor: pointer"><b-icon icon="envelope" :variant="variant[0]" font-scale="1.1"></b-icon> <span style="padding: 0 0 6px 5px">向我发邮件</span></div>
    </b-modal>
    <b-modal v-model="$store.state.showAboutUpdate" scrollable :title="title.update" :header-class="'body-class'" dialog-class="dialog-class" :body-class="'body-class'" modal-class="modal-class" hide-footer>
      <div>
        <b-alert show :variant="variant[i % variant.length]" v-for="(item, i) in info" :key="i">
          <b-icon icon="award" :variant="variant[i % variant.length]"></b-icon>
          {{ item.time }}
          {{ item.desc }}
        </b-alert>
      </div>
    </b-modal>
    <b-modal v-model="$store.state.showAboutKey" :title="title.key" :header-class="'body-class'" dialog-class="dialog-class" :body-class="'body-class'" modal-class="modal-class" hide-footer>
      <p class="key_desc">使用前最好先切换为“英文输入法”</p>
      <b-table :items="keyInfo" :fields="fields" bordered striped> </b-table>
    </b-modal>
  </div>
</template>

<script>
import update from "@/assets/data/updateInfo.json";
export default {
  data() {
    return {
      title: {
        desc: "简介",
        email: "Email",
        update: "更新说明",
        key: "按键大全",
      },
      info: [],
      variant: ["primary", "secondary", "success", "danger", "warning", "info", "dark"],
      description:
        "这个项目很久之前都想做了，之前做了个很简单的，想纯用js不借助框架来写。该项目陆陆续续收集和写了两个月，主要想到兼容移动端，但发现一点都不好使。使用boostrap自带的处理移动端的功能。本项目主要使用Vue-cli3和bootstrap-vue搭建，其中还重点使用到的有vux、vue-awesome-swiper、vue-color以及vue-router的路由按需加载。当然了，加上引入CDN、路由懒加载、使用本地文件等优化。后续也会持续更新新的内容以及优化，详情可看“更新说明”。",
      staticUrl: "https://tilin.gitee.io/nav1/",
      keyInfo: [
        { key: "↑+↑", desc: "回到顶部" },
        { key: "↓+↓", desc: "回到底部" },
        { key: "←+←", desc: "关闭大导航" },
        { key: "→+→", desc: "开启大导航" },
        { key: "T+T", desc: "打开修改主标题窗口" },
        { key: "F+F", desc: "自动聚焦搜索框" },
        { key: "D+D", desc: "开启白天模式" },
        { key: "N+N", desc: "开启夜间模式" },
        { key: "C+C", desc: "自定义背景渐变" },
        { key: "B+B", desc: "自定义背景图片" },
        { key: "M+M", desc: "关闭更多搜索并清除搜索框" },
        { key: "CTRL+退格键", desc: "清空搜索框" },
        { key: "CTRL+M", desc: "关闭更多搜索" },
      ],
      fields: [
        { key: "key", label: "快捷键" },
        { key: "desc", label: "功 能" },
      ],
    };
  },
  created() {
    this.info = update.info;
  },
  methods: {
    email() {
      window.open("http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=TH9_dHt9fHR7dXkMPT1iLyMh");
    },
  },
};
</script>

<style lang="less" scoped>
p {
  line-height: 27px;
  text-align: center;
}
.staticUrl {
  display: block;
  font-size: 14px;
  color: #4689bf;
  text-align: center;
  padding-top: 5px;
}
.b-table {
  color: #007acc;
  text-align: center;
}
.key_desc {
  color: #888;
}
</style>
