let searchVals = ''
let searchWindow = 0
let windowWidth=0
let mainTitle = '业精于勤荒于嬉'
let [showAboutDesc, showAboutEmail, showAboutUpdate,showAboutKey] = [false, false, false,false]
let theme = 1
let side = 0
let newKey=null
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
    if (localStorage.getItem('side')) side = localStorage.getItem('side')
} catch (error) {
    side
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
    side,
    newKey
}