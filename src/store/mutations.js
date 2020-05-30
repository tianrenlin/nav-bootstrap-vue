// 搜索框
function changeVals(state, vals) {
    state.searchVals = vals
}
// 显示更多搜索窗口
function searchWindow(state, vals) {
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
        console.log('你的浏览器不支持该内容！')
    }
}
// 改变主题
function changeTheme(state, flag) {
    state.theme = flag
    try {
        localStorage.theme = flag
    } catch (error) {
        console.log('你的浏览器不支持该内容！')
    }
}
// 大导航是否打开 1-打开 0-关闭
function side(state, flag) {
    state.side=flag
    try {
        localStorage.side = flag
    } catch (error) {
        console.log('你的浏览器不支持该内容！')
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
function setKey(state,value){
    state.newKey=value
}

export default {
    changeVals,
    searchWindow,
    setWindowWidth,
    changeTitle,
    showAboutDesc,
    showAboutEmail,
    showAboutUpdate,
    showAboutKey,
    changeTheme,
    side,
    setKey
}