(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-75469378"],{"3a34":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"about"}},[s("b-nav-item-dropdown",{attrs:{right:""},scopedSlots:t._u([{key:"button-content",fn:function(){return[s("span",[t._v("子夜雨")])]},proxy:!0}])},[s("b-dropdown-item",{on:{click:function(e){return t.$store.commit("showAboutDesc",!0)}}},[t._v("简介")]),s("b-dropdown-item",{on:{click:function(e){return t.$store.commit("showAboutEmail",!0)}}},[t._v("Email")]),s("b-dropdown-item",{on:{click:function(e){return t.$store.commit("showAboutUpdate",!0)}}},[t._v("更新说明")]),s("b-dropdown-item",{on:{click:function(e){return t.$store.commit("showAboutKey",!0)}}},[t._v("快捷按键")])],1),s("b-modal",{attrs:{title:t.title.desc,"header-class":"body-class","dialog-class":"dialog-class","body-class":"body-class","modal-class":"modal-class","hide-footer":""},model:{value:t.$store.state.showAboutDesc,callback:function(e){t.$set(t.$store.state,"showAboutDesc",e)},expression:"$store.state.showAboutDesc"}},[s("p",[t._v(t._s(t.description))]),s("a",{staticClass:"staticUrl",attrs:{href:t.staticUrl,target:"_blank"}},[t._v("点击查看原始项目")])]),s("b-modal",{attrs:{title:t.title.email,"header-class":"body-class","dialog-class":"dialog-class","body-class":"body-class","modal-class":"modal-class","hide-footer":""},model:{value:t.$store.state.showAboutEmail,callback:function(e){t.$set(t.$store.state,"showAboutEmail",e)},expression:"$store.state.showAboutEmail"}},[s("div",{staticClass:"h4 mb-2 email",staticStyle:{display:"flex","align-items":"center","justify-content":"center",cursor:"pointer"},attrs:{title:"默认使用QQ邮箱"},on:{click:t.email}},[s("b-icon",{attrs:{icon:"envelope",variant:t.variant[0],"font-scale":"1.1"}}),t._v(" "),s("span",{staticStyle:{padding:"0 0 6px 5px"}},[t._v("向我发邮件")])],1)]),s("b-modal",{attrs:{scrollable:"",title:t.title.update,"header-class":"body-class","dialog-class":"dialog-class","body-class":"body-class","modal-class":"modal-class","hide-footer":""},model:{value:t.$store.state.showAboutUpdate,callback:function(e){t.$set(t.$store.state,"showAboutUpdate",e)},expression:"$store.state.showAboutUpdate"}},[s("div",t._l(t.info,(function(e,a){return s("b-alert",{key:a,attrs:{show:"",variant:t.variant[a%t.variant.length]}},[s("b-icon",{attrs:{icon:"award",variant:t.variant[a%t.variant.length]}}),t._v(" "+t._s(e.time)+" "+t._s(e.desc)+" ")],1)})),1)]),s("b-modal",{attrs:{title:t.title.key,"header-class":"body-class","dialog-class":"dialog-class","body-class":"body-class","modal-class":"modal-class","hide-footer":""},model:{value:t.$store.state.showAboutKey,callback:function(e){t.$set(t.$store.state,"showAboutKey",e)},expression:"$store.state.showAboutKey"}},[s("p",{staticClass:"key_desc"},[t._v("使用前最好先切换为“英文输入法”")]),s("b-table",{attrs:{items:t.keyInfo,fields:t.fields,bordered:"",striped:""}})],1)],1)},o=[],i=s("ea76"),c={data:function(){return{title:{desc:"简介",email:"Email",update:"更新说明",key:"按键大全"},info:[],variant:["primary","secondary","success","danger","warning","info","dark"],description:"这个项目很久之前都想做了，之前做了个很简单的，想纯用js不借助框架来写。该项目陆陆续续收集和写了两个月，主要想到兼容移动端，但发现一点都不好使。使用boostrap自带的处理移动端的功能。本项目主要使用Vue-cli3和bootstrap-vue搭建，其中还重点使用到的有vux、vue-awesome-swiper、vue-color以及vue-router的路由按需加载。当然了，加上引入CDN、路由懒加载、使用本地文件等优化。后续也会持续更新新的内容以及优化，详情可看“更新说明”。",staticUrl:"https://tilin.gitee.io/nav1/",keyInfo:[{key:"↑+↑",desc:"回到顶部"},{key:"↓+↓",desc:"回到底部"},{key:"←+←",desc:"关闭大导航"},{key:"→+→",desc:"开启大导航"},{key:"T+T",desc:"打开修改主标题窗口"},{key:"F+F",desc:"自动聚焦搜索框"},{key:"D+D",desc:"开启白天模式"},{key:"N+N",desc:"开启夜间模式"},{key:"C+C",desc:"自定义背景渐变"},{key:"B+B",desc:"自定义背景图片"},{key:"M+M",desc:"关闭更多搜索并清除搜索框"},{key:"CTRL+退格键",desc:"清空搜索框"},{key:"CTRL+M",desc:"关闭更多搜索"}],fields:[{key:"key",label:"快捷键"},{key:"desc",label:"功 能"}]}},created:function(){this.info=i.info},methods:{email:function(){window.open("http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=TH9_dHt9fHR7dXkMPT1iLyMh")}}},l=c,r=(s("e757"),s("2877")),n=Object(r["a"])(l,a,o,!1,null,"2d80539c",null);e["default"]=n.exports},b293:function(t,e,s){},e757:function(t,e,s){"use strict";var a=s("b293"),o=s.n(a);o.a},ea76:function(t){t.exports=JSON.parse('{"info":[{"time":"2019/某月/某日","desc":"看了某人的博客有所启发，于是做了一个专属的个人资源导航。"},{"time":"2020/2/某天","desc":"使用新出的bootstrap-vue来重新写一个。"},{"time":"2020/3/整月","desc":"看视频学习，收集资料，写写代码。图片要放在public中，还特意去Github上问了作者……"},{"time":"2020/4/~","desc":"一切貌似又是新的开始！！！加油！！！"},{"time":"2020/5/~","desc":"优化代码，不使用better-scroll，可能与bootstrap-vue的一些功能冲突，造成很卡，有的需要解决点击事件的问题。主要解决在移动端的问题！使用setTimeout代替setInterval实现首页的时钟转动；优化主题切换；"},{"time":"2020/5/3","desc":"“学习网站”添加：“网易云课堂”、“慕课网”、“scrimba”"},{"time":"2020/5/13","desc":"“学习网站”添加：“技术胖”；“社区求索”添加“简书”；“综合资源”添加“大力盘”、“百度网盘资源”；首页搜索添加“大力盘”；修改“音乐狂”地址"},{"time":"2020/5/29-31","desc":"新增控制左边大导航显示/隐藏按钮。键盘快捷键对应功能，About添加快捷键说明页。“API文档”添加“MDN”。使用requestAnimationFrame取代定时器实现首页时间滚动效果,解决假死/卡顿的根源。"},{"time":"2020/6/7","desc":"修改清除搜索框快捷键为“Ctrl+退格键”。修改“音乐狂”的title小图标。“其它内容”添加“字体下载网”。"},{"time":"2020/6/10-13","desc":"主题添加自定义背景色和自定义背景图，并添加相关快捷键。添加弹出警告框。配置开发环境和发布环境。背景色改为两色渐变，且可设置对应参数（艰难调试后完成）。"}]}')}}]);
//# sourceMappingURL=chunk-75469378.ea952e21.js.map