let searchVals = '' //搜索框的值
let searchWindow = 0 //更多搜索窗口
let windowWidth=0 //窗口大小
let mainTitle = '业精于勤荒于嬉' //主标题
let [showAboutDesc, showAboutEmail, showAboutUpdate,showAboutKey] = [false, false, false,false] // About组件-详情、Email、更新说明、快捷键
let [theme,diyBg]=[1,''] //主题-1：夜晚（默认），0：白天 自定义背景
let side = 0 //左侧大导航-1：显示 0：隐藏
let newKey=null //保存上一次的按键-快捷键
let alert=0 //警告框
let gradOptions=null //自定义背景色渐变配置
try {
    if (localStorage.getItem('mainTitle')) mainTitle = localStorage.getItem('mainTitle')
} catch (error) {
    mainTitle
}
try {
    if (localStorage.getItem('theme')) theme = localStorage.getItem('theme')
} catch (error) {
    theme
}
try {
    if (localStorage.getItem('diyBg')) diyBg = localStorage.getItem('diyBg')
} catch (error) {
    diyBg
}
try {
    if (localStorage.getItem('diyColor')) diyColor = localStorage.getItem('diyColor')
} catch (error) {
    diyColor
}
try {
    if (localStorage.getItem('side')) side = localStorage.getItem('side')
} catch (error) {
    side
}
try {
    if (localStorage.getItem('gradOptions')) gradOptions = localStorage.getItem('gradOptions')
} catch (error) {
    gradOptions
}

export default {
    searchVals,
    searchWindow,
    windowWidth,
    mainTitle,
    showAboutDesc,
    showAboutEmail,
    showAboutUpdate,
    showAboutKey,
    theme,
    diyBg,
    side,
    newKey,
    alert,
    gradOptions
}