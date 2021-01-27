<template>
    <div>
        <div id="header">
            <img src="../assets/image/back.png" @click="back">
            <van-search v-model="value" autofocus placeholder="поиска товар" />
        </div>
        <div class="content">
            <div>
                <div>
                    <span>история поиска</span>
                    <img src="../assets/image/shanchu_gray.png">
                </div>
                <div>
                    <sapn>носок</sapn><sapn>носок</sapn><sapn>носок</sapn><sapn>носок</sapn>
                </div>
            </div>
            <div>
                <p>Поиск найден</p>
                <div>
                    <sapn>носок</sapn><sapn>носок</sapn><sapn>носок</sapn><sapn>носок</sapn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "search",
        data () {
            return {
                title: 'Мой заказ',
                value: '',
            }
        },
        components: {
        },
        methods: {
            //返回
            back () {
                this.$router.back()
            }
        }
    }
</script>

<style scoped>
    #header {
        height: 100px;
        background-color: #ef423a;
        margin: 0 auto;
        display: flex;
    }
    #header img{
        width: 40px;
        height: 40px;
        margin: 30px 0 30px 30px;
    }
    .van-search {
        width: 84%;
        padding: unset;
        margin: 0 auto;
        background-color: unset;
        border-radius: 50%;
    }
    .van-search__content {
        border-radius: 30px;
    }
</style>