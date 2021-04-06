<template>
    <div id="head">
        <van-nav-bar :title="val" left-arrow @click-left="clickLeft">
            <template #right v-if="title == 'деталь продукции'">
                <van-icon name="cart-o" size="28" @click="tocart"/>
            </template>
        </van-nav-bar>
    </div>
</template>

<script>
    export default {
        name: "headerBar",
        props: {
            title: String,
            before_url: String
        },
        data() {
            return {
                val: this.title,
                active: ''
            }
        },
        mounted() {
            this.active = this.$route.query.active
        },
        methods: {
            clickLeft () {
                if (this.before_url == '/pay') {
                    this.$router.go(-2)
                } else {
                    if (this.$route.query.path) {
                        this.$router.push(this.$route.query.path)
                    } else {
                        if (window.history.length <= 1) {
                            this.$router.push({path:'/'})
                            return false
                        } else {
                            this.$router.back()
                        }
                    }
                }
            },
            tocart () {
                this.$router.push('./cart')
            }
        }
    }
</script>

<style scoped>
    #head {
        height: 100px;
        background-color: #ef423a;
    }
    #head .van-nav-bar{
        background-color: unset;
        height: 100px;
    }
    #head >>> .van-nav-bar .van-icon, #head >>> .van-nav-bar .van-nav-bar__text, #head >>> .van-nav-bar .van-nav-bar__title {
        color: #fff;
    }
    #head >>> .van-nav-bar__title {
        font-size: 1.4em;
        font-weight: 600;
    }
    #head >>> .van-nav-bar__arrow {
        font-size: 45px;
    }
    #head >>> .van-nav-bar__content {
        height: 100%;
    }
</style>