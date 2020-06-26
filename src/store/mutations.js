// 搜索框
function changeVals(state, vals) {
    state.searchVals = vals
}
// 显示更多搜索窗口
function changeSearchWindow(state, vals) {
    state.searchWindow = vals
}
// 保存获取的窗口大小
function setWindowWidth(state,val){
    state.windowWidth=val
}
// 改变主标题
function changeTitle(state, title) {
    state.mainTitle = title
    try {
        localStorage.mainTitle = title
    } catch (error) {
        alert('你的浏览器不支持本地存储！')
    }
}
// 改变主题
function changeTheme(state, flag) { // 黑-白
    state.theme = flag
    try {
        localStorage.theme = flag
    } catch (error) {
        alert('你的浏览器不支持本地存储！')
    }
}
function diyBg(state,value){ // 自定义背景
    state.diyBg=value
    try {
        localStorage.diyBg = value
    } catch (error) {
        alert('你的浏览器不支持本地存储！')
    }
}
// 自定义背景色配置
function gradOptions(state,options){
    state.gradOptions=options
    try {
        localStorage.gradOptions = options
    } catch (error) {
        alert('你的浏览器不支持本地存储！')
    }
}
// 大导航是否打开 1-打开 0-关闭
function changeSide(state, flag) {
    state.side=flag
    try {
        localStorage.side = flag
    } catch (error) {
        alert('你的浏览器不支持本地存储！')
    }
}
// 显示About相关内容
function showAboutDesc(state, judge) {
    state.showAboutDesc = judge
}

function showAboutEmail(state, judge) {
    state.showAboutEmail = judge
}

function showAboutUpdate(state, judge) {
    state.showAboutUpdate = judge
}
function showAboutKey(state, judge) {
    state.showAboutKey = judge
}
// 快捷键：2次按键值对比
function changeKey(state,value){
    state.newKey=value
}
// 警告框
function alert(state,value){
    state.alert=value+new Date().getTime() // 加上时间戳是与之前相同的数据作比较并显示alert框
}
export default {
    changeVals,
    changeSearchWindow,
    setWindowWidth,
    changeTitle,
    showAboutDesc,
    showAboutEmail,
    showAboutUpdate,
    showAboutKey,
    changeTheme,
    diyBg,
    changeSide,
    changeKey,
    alert,
    gradOptions
}