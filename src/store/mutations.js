// 搜索框
function changeVals(state, vals) {
    state.searchVals = vals
}
// 显示更多搜索窗口
function searchWindow(state, vals) {
    state.searchWindow = vals
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
export default {
    changeVals,
    searchWindow,
    changeTitle,
    showAboutDesc,
    showAboutEmail,
    showAboutUpdate,
    changeTheme
}