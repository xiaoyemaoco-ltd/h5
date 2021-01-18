<template>
    <div>
        <Header :title="title"></Header>
        <div id="content">
            <div id="personmsg">
                <div role="button" tabindex="0"
                     class="van-cell van-cell--clickable van-cell--center van-cell--borderless van-contact-card van-contact-card--edit">
                    <div class="van-cell__value van-cell__value--alone van-contact-card__value">
                        <div>张三 13000000000</div>
                        <div>浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室</div>
                    </div>
                </div>
                    <!--<i class="van-icon van-icon-arrow van-cell__right-icon">&lt;!&ndash;&ndash;&gt;</i></div>-->
            </div>
            <div class="Allshop">
                <div class="shop_img">
                    <img src="https://img.yzcdn.cn/vant/cat.jpeg" />
                </div>
                <div class="shop_price">
                    <div class="titleTop">
                        <h3>123456123456123456123456123456123456123456123456123456123456</h3>
                        <p class="priceShop">sfasdfsflklasdlfksfieidskflsfasdfsflklasdlfksfieidskflsfasdfsflklasdlfksfieidskflsfasdfsflklasdlfksfieidskfl</p>
                    </div>
                    <div class="titleBottom">
                        <span class="shopNumber">200</span>
                        <span class="shopNums">x2</span>
                    </div>
                </div>
            </div>
            <div id="message">
                <div id="text">
                    <label class="bh">номер заказа</label>
                    <label class="number">011315250060</label>
                    <span class="copy">копировать</span>
                </div>
                <div id="text">
                    <label class="bh">время</label>
                    <label class="number">13-01-2021 15:25</label>
                </div>
                <div id="text">
                    <label class="bh">Общая сумма</label>
                    <label class="number">99999</label>
                </div>
                <div id="text">
                    <label class="bh">поставке</label>
                    <label class="number">0</label>
                </div>
                <div id="text">
                    <label class="bh">купон</label>
                    <label class="number">0</label>
                </div>
                <div id="text">
                    <label class="bh">Cумма заказа</label>
                    <label class="number">99999</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from './header'
    export default {
        name: "order_detail",
        data() {
            return {
                title: 'спецификация заказа '
            }
        },
        components: {
            Header
        }
    }
</script>

<style scoped>
    #content {
        background-color: #eee;
        padding-bottom: 30px;
        height: calc( 100vh - 130px);
        overflow-y:auto;
    }
    #content .Allshop {
        display: flex;
        padding: 20px 30px;
    }
    .Allshop {
        border-bottom: 1px #eee solid;
        background-color: #fff;
    }
    .Allshop .shop_img {
        width: 160px;
        height: 180px;
    }
    .shop_img img {
        width: 100%;
        height: 100%;
    }
    .shop_price {
        width: 75%;
        margin-left: 20px;
        text-align: left;
    }
    .titleTop h3 {
        word-break: break-all;
        margin: unset;
    }
    .titleTop .priceShop {
        word-break: break-all;
        margin: 10px 0;
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
    #message {
        text-align: left;
        background-color: #fff;
        margin-top: 20px;
    }
    #message #text {
        height: 55px;
        border-bottom: 1px #eee solid;
        padding: 25px 30px 0 30px;
    }
    #message #text .bh {
        font-size: 28px;
        margin-right: 20px;
    }
    #message #text .number {
        color: gray;
    }
    .copy {
        border-radius: 20px;
        margin-left: 30px;
        text-align: center;
        display: inline-block;
        width: 120px;
        height: 40px;
        line-height: 45px;
        background-color: #EE0B0B;
        color: #fff;
    }
</style>