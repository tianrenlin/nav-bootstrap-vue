let b_black = 'background:#000;' // 黑
let b_white = 'background:#fff;' // 白
    // 控制主题样式
let dayTheme = {
    name: '白天模式',
    body: b_white,
    side: b_white,
}
let nightTheme = {
    name: '夜间模式',
    body: 'background:#08262E;background: radial-gradient(#0a2e38 0%, #000000 80%);',
    side: b_black,
}
export default {
    dayTheme,
    nightTheme
}