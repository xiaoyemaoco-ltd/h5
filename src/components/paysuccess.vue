<template>
    <div>
        <div id="header">
            <h2 id="cart">классификация</h2>
        </div>
        <div class="content">
            <img src="../assets/image/duigou@2x.png">
            <p>Оплата завершена</p>
            <van-count-down :time="time" @finish="finish" ref="countDown">
                <template #default="timeData">
                    <span class="text">Возврат автоматически через </span>
                    <span class="block"> {{timeData.seconds}} </span>
                    <span class="text"> секунд ... </span>
                </template>
            </van-count-down>
        </div>
    </div>
</template>

<script>
    export default {
        name: "paysuccess",
        data () {
            return {
                time: 6 * 1000,
                timeData: {},
            }
        },
        methods: {
            //倒計時函數
            finish () {
                this.codebtn = true
                this.show2 = false
                this.$refs.countDown.reset();
                this.$router.push('./order')
            },
            reset() {
                this.$refs.countDown.reset();
            },
        }
    }
</script>

<style scoped>
    #cate {
        height: calc( 100vh - 100px );
        /*padding-bottom: 50px;*/
    }
    #header {
        height: 100px;
        background-color: #ef423a;
        margin: 0 auto;
    }
    #header #cart {
        height: 100%;
        line-height: 100px;
        margin: unset;
        color: #fff;
    }
    .content {
        /*background-image: url("../assets/image/chahua1@2x.png");*/
        height: calc( 100vh - 100px );
        background-size:100%;
        background-repeat: no-repeat;
        margin-top: 50px;
    }
    .content img {
        width: 20%;
    }
    .content p {
        color: #00a0de;
        font-size: 40px;
    }
    .content .text {
        font-size: 26px;
        color: #ff362c;
    }
    .content .block {
        color: #00a0de;
        font-size: 32px;
    }
</style>