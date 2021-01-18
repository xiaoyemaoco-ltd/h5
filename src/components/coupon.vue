<template>
    <div>
        <Header :title="title"></Header>
        <div class="Allorder">
            <van-tabs :active="active">
                <van-tab title="доверенное" name="a">
                    <div id="content">
                        <div class="Allshop">
                            <div class="shop_price">
                                <div class="titleTop">
                                    <h3>123456123456123456123456123456123456123456123456123456123456</h3>
                                    <div id="date">
                                        <label>Срок действия ваучера：</label>
                                        <span class="priceShop">13-01-2021 15:25</span>
                                    </div>
                                </div>
                            </div>
                            <div id="money">
                                <h2>1000</h2>
                                <van-button id="use" round type="info">применять</van-button>
                            </div>
                        </div>
                    </div>
                    <div id="content">
                        <div class="Allshop">
                            <div class="shop_price">
                                <div class="titleTop">
                                    <h3>123456123456123456123456123456123456123456123456123456123456</h3>
                                    <div id="date">
                                        <label>Срок действия ваучера：</label>
                                        <span class="priceShop">13-01-2021 15:25</span>
                                    </div>
                                </div>
                            </div>
                            <div id="money">
                                <h2>1000</h2>
                                <van-button id="use" round type="info">применять</van-button>
                            </div>
                        </div>
                    </div>
                    <div id="content">
                        <div class="Allshop">
                            <div class="shop_price">
                                <div class="titleTop">
                                    <h3>123456123456123456123456123456123456123456123456123456123456</h3>
                                    <div id="date">
                                        <label>Срок действия ваучера：</label>
                                        <span class="priceShop">13-01-2021 15:25</span>
                                    </div>
                                </div>
                            </div>
                            <div id="money">
                                <h2>1000</h2>
                                <van-button id="use" round type="info">применять</van-button>
                            </div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="использованный">
                    <div id="content">
                        <div class="Allshop">
                            <div class="shop_price">
                                <div class="titleTop">
                                    <h3>123456123456123456123456123456123456123456123456123456123456</h3>
                                    <div id="date">
                                        <label>Срок действия ваучера：</label>
                                        <span class="priceShop">13-01-2021 15:25</span>
                                    </div>
                                </div>
                            </div>
                            <div id="money">
                                <h2>1000</h2>
                                <van-button id="use" round type="info">применять</van-button>
                            </div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="истекший">
                    <div id="content">
                        <div class="Allshop">
                            <div class="shop_price">
                                <div class="titleTop">
                                    <h3>123456123456123456123456123456123456123456123456123456123456</h3>
                                    <div id="date">
                                        <label>Срок действия ваучера：</label>
                                        <span class="priceShop">13-01-2021 15:25</span>
                                    </div>
                                </div>
                            </div>
                            <div id="money">
                                <h2>1000</h2>
                                <van-button id="use" round type="info">применять</van-button>
                            </div>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
    import Header from './header'
    export default {
        name: "coupon",
        components: {
            Header
        },
        data() {
            return {
                active:'a',
                title: 'Мой заказ'
            }
        },
    }
</script>

<style scoped>
    .Allorder {
        background-color: #eee;
        margin-bottom: 100px;
    }
    #content {
        margin-top: 15px;
    }
    .AllCode {
        margin: 0 30px;
        text-align: left;
        padding-bottom: 20px;
        border-bottom: 1px #eee solid;
    }
    .AllCode .codeOrder{
        display: inline-block;

    }
    .AllCode .paid {
        float: right;
    }
    #content .Allshop {
        display: flex;
        padding: 20px 20px;
        padding-top: unset;
    }
    .Allshop {
        border-bottom: 1px #eee solid;
    }
    .Allshop .shop_img {
        width: 160px;
        height: 180px;
    }
    #money {
        width: 25%;
        background-color: #23b7ac;
        border-radius: 15px;
    }
    #money h2 {
        color: #fff;
        margin-bottom: 1px;
    }
    #money label {
        color: #1989fa;
        font-weight: bold;
    }
    #money #use {
        height: 40px;
        margin: 0 10px;
        font-size: 16px;
        padding: 0 20px;
        margin-top: 30px;
        background-color: #fff;
        border: 1px solid #fff;
        color: #23b7ac;
    }
    .shop_img img {
        width: 100%;
        height: 100%;
    }
    .shop_price {
        background-color: #fff;
        width: 75%;
        text-align: left;
        border-radius: 15px;
        /*border-bottom-left-radius: 15px;
        border-top-left-radius: 15px;*/
    }
    .titleTop h3 {
        word-break: break-all;
        margin: unset;
        margin: 15px 15px;
    }
    .titleTop #date {
        margin: 30px 15px 25px 15px;
    }
    #date label {
      font-size: 22px;
    }
    .titleTop span {
        font-weight: bold;
        display: inline-block;
        font-size: 26px;
    }
    .shopNumber, .shopNums{
        display: inline-block;
    }
    .shopNumber {
        color: #EE0B0B;
        font-size: 28px;
        margin-right: 10px;
    }
    .shopNums {
        font-size: 28px;
    }
</style>