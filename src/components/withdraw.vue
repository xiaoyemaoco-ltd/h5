<template>
    <div>
        <Header :title="title"></Header>
        <div class="content">
            <div class="desc">
                <div class="icon"><img src="../assets/image/tip.png"></div>
                <div class="text">
                    <p>заполните номер вашей банковской карты.
                        Активные бонусы будут перечисляться вам на
                        карту каждый понедельник. минимальная
                        сумма 15000 тг. если вы не заполнили данные
                        вашей карты или заполнили неверно , ваши
                        бонусы останутся в вашем личном кабинете в
                        приложений.</p>
                    <a href="tel:87008360661">по вопросам звонить 8(700)8360661</a>
                </div>
            </div>
            <div class="money">
                <div class="text">съемный баланс</div>
                <div class="number">2729тг.</div>
            </div>
            <div class="type">
                <van-radio-group v-model="radio" class="radio" @change="onchange">
                    <van-radio name="1" checked-color="#ee0a24" label-position="left">
                        <div class="bank">
                            <div class="text">банк</div>
                            <div class="img">
                                <img src="../assets/image/pay/visa.png">
                                <img src="../assets/image/pay/mastercard.png">
                            </div>
                        </div>
                    </van-radio>
                    <van-radio name="2" checked-color="#ee0a24" label-position="left">
                        <div class="kaspi">
                            <div class="text">Kaspi</div>
                            <div class="img">
                                <img src="../assets/image/pay/kaspi.png">
                            </div>
                        </div>
                    </van-radio>
                </van-radio-group>
            </div>
            <div class="detail">
                <van-field v-model="text" label="ф.и.о.:" />
                <van-field v-model="text1" label="номер карты:" />
                <van-field v-show="show" v-model="text2" label="название банка:" />
            </div>
            <van-button class="button" round type="info">сохранить</van-button>
        </div>
    </div>
</template>

<script>
    import Header from "./header";
    export default {
        name: "withdraw",
        components: {Header},
        data () {
            return {
                title: 'Обналичить',
                radio: '2',
                text: '',
                text1: '',
                text2: '',
                show: false
            }
        },
        methods: {
            onchange () {
                if (this.radio == 1) {
                    this.show = true
                } else {
                    this.show = false
                }
            }
        }
    }
</script>

<style scoped>
    .content {
        background-color: #eee;
        height: calc( 100vh - 100px );
        overflow-y:auto;
    }
    .desc {
        display: flex;
        width: 95%;
        margin: 20px 15px;
        border-radius: 10px;
        background-color: #FCF2CE;
    }

    .desc .text {
        width: 90%;
        font-size: 20px;
        color: #74652E;
        padding: 15px;
        text-align: left;
        line-height: 30px;
    }
    .text P {
        margin: unset;
    }
    .text a {
        color: #4D52B0;
    }
    .icon {
        margin: 0 auto;
        width: 10%;
        /*图片居中*/
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .icon img {
        width: 70%;
    }
    .content .money, .content .type {
        display: flex;
        height: 150px;
        margin: 0 15px;
        padding: 0 15px;
        line-height: 150px;
        background-color: #fff;
        border-radius: 10px;
    }
    .money .text {
        text-align: left;
        width: 50%;
        color: #585858;
        font-size: 30px;
    }
    .money .number {
        text-align: right;
        width: 50%;
        font-size: 50px;
        color: #ff362c;
    }
    .content .type {
        margin: 20px 15px;
        height: 170px;
    }
    .type .bank,  .type .kaspi {
        display: flex;
        width: 100%;
    }
    .type .bank .text, .type .kaspi .text {
        height: 80px;
        line-height: 80px;
        color: #121212;
        font-size: 30px;
    }
    .type .img {
        width: 90%;
        text-align: right;
    }
    .type .img img{
        width: 15%;
        margin-top: 15px;
        margin-right: 40px;
    }
    .type .kaspi .img img {
        width: 10%;
    }
    .type .radio {
        width: 100%;
    }
    .type .radio >>> .van-radio__label--left {
        width: 90%;
    }
    .content .detail {
        margin: 20px 15px;
        background-color: #ffffff;
        border-radius: 20px;
    }
    .detail >>> .van-cell{
        padding-left: 15px;
        padding-right: 15px;
    }
    .detail >>> .van-cell::after {
        left: 0;
        right: 0;
        border-bottom: 2px solid #eee;
    }
    .detail >>> .van-cell__title {
        width: unset;
        color: #060606;
        font-size: 35px;
    }
    .content .button {
        background-color: #ff362c;
        color: #fff;
        border: unset;
        height: 70px;
        width: 90%;
        font-size: 35px;
    }
</style>