<template>
    <div id="header">
        <van-nav-bar :title="val" left-arrow @click-left="onClickLeft"/>
    </div>
</template>

<script>
    export default {
        name: "header",
        props: {
            title: String
        },
        data() {
            return {
                val: this.title
            }
        },
        methods: {
            onClickLeft () {
                this.$router.back()
            }
        }
    }
</script>

<style scoped>
    #header {
        height: 100px;
        background-color: #ef423a;
    }
    #header .van-nav-bar{
        background-color: unset;
        height: 100px;
    }
    #header >>> .van-nav-bar .van-icon, #header >>> .van-nav-bar .van-nav-bar__text, #header >>> .van-nav-bar .van-nav-bar__title {
        color: #fff;
    }
</style>