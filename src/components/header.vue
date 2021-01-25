<template>
    <div id="header">
        <van-nav-bar :title="val" left-arrow @click-left="onClickLeft">
            <template #right v-if="title == 'деталь продукции'">
                <van-icon name="cart-o" size="28" @click="tocart"/>
            </template>
        </van-nav-bar>
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
            },
            tocart () {
                this.$router.push('./cart')
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