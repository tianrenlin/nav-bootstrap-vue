let b_black = 'background:#000' // 黑
let b_white = 'background:#fff' // 白
let im='!important'
    // 控制主题样式(此处保留night样式)
let day = `
    .content-theme{
        ${b_white}${im};
    }
    .side_list{
        ${b_white}${im};
    }
    .header-class{color: #007ACC${im};background: #fff${im};}
    .body-class{background:#fff${im};color: #007ACC${im};}
`
let night = `
    .content-theme{
        background:#08262E;background: radial-gradient(#0a2e38 0%, #000000 80%)${im};
    }
    .side_list{
        ${b_black}${im}
    }
`
export default {
    day,
    night
}