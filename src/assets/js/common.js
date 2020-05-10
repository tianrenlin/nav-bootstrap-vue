const getWindowWidth=function(){
    let width=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    return width
}

export default {
    getWindowWidth
}