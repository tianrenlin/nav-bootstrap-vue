<template>
    <div id="alert">
        <b-alert :show="dismissCountDown" dismissible fade variant="danger" @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"><a href="#"
                class="alert-link">{{$store.state.alert.toString().split('1')[0]}}</a></b-alert>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dismissSecs: 3, //设置显示时长
                dismissCountDown: 0,
            }
        },
        methods: {
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            }
        },
        watch: {
            '$store.state.alert': {
                handler(val) {
                    if (this.$store.state.alert) this.dismissCountDown = this.dismissSecs

                },
                deep: true
            }
        }
    }
</script>

<style lang="less">
    #alert {
        width: 100%;
        height: 40px;

        .alert {
            width: 100%;
            max-width: 450px;
            margin: auto;
        }
        a{color: rgba(255,0,0,0.7)}
        .close {
            top: -2px;
            color: rgba(255,0,0,0.7);
            padding: 0.25rem 5px;
            &::hover{
                color: red;
            }
        }
    }
</style>