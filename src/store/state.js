let searchVals = ''
let searchWindow = 0
let windowWidth=0
let mainTitle = '业精于勤荒于嬉'
let [showAboutDesc, showAboutEmail, showAboutUpdate] = [false, false, false]
let theme = 0
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
export default {
    searchVals,
    searchWindow,
    windowWidth,
    mainTitle,
    showAboutDesc,
    showAboutEmail,
    showAboutUpdate,
    theme
}