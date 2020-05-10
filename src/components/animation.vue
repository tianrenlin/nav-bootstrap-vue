<template>
    <transition>
        <slot></slot>
    </transition>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>
.v-enter,.v-leave-to{
    opacity:0;
    transform: translateY(500px);
}
.v-enter-active,.v-leave-active{
    transition: all 0.5s ease;
}
</style>