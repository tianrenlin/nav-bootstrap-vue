let b_black = 'background:#000' // 黑
let b_white = 'background:#fff' // 白
let im='!important'
    // 控制主题样式(此处保留night样式)
let day = `
    body{${b_white}${im};}
    .side_list{
        ${b_white}${im};
    }
    .header-class{color: #007ACC${im};background: #fff${im};}
    .body-class{background:#fff${im};color: #007ACC${im};}
    .side_tip{
        color: rgb(151, 193, 216)${im};
        box-shadow: 0px 0px 8px rgb(145, 204, 236) inset${im};
    }
    .content-theme{
        ${b_white}${im};
    }
`
let night = `
    .content-theme{
        background:#08262E;background: radial-gradient(#0a2e38 0%, #000000 80%)${im};
    }
    .side_list{
        ${b_black}${im}
    }
`
function diyBg (url){
    return `
        .content-theme{
            background:url(${url})no-repeat${im};
            background-size:cover${im};
        }
    `
}
function diyColor (color){
    return `
        .content-theme{
            background:${color}${im};
        }
    `
}
export default {
    day,
    night,
    diyBg,
    diyColor
}