<template>
    <div>
        <Header :title="title"></Header>
        <div id="content">
            <div id="swipe">
                <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" width="750" height="150">
                    <van-swipe-item>1</van-swipe-item>
                    <van-swipe-item>2</van-swipe-item>
                    <van-swipe-item>3</van-swipe-item>
                    <van-swipe-item>4</van-swipe-item>
                </van-swipe>
            </div>
            <div id="detail">
                <h3 id="title">商品描述标题</h3>
                <p id="sku">SKU : <span>MD61</span></p>
                <div id="coupon">
                    <van-cell is-link @click="showPopup">купон</van-cell>
                    <van-popup round  v-model="show1" closeable position="bottom">
                        <div id="coupon1">
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
                                    <!--<label>满20000可用</label>-->
                                    <van-button id="use" round type="info">применять</van-button>
                                </div>
                            </div>
                        </div>
                        <div id="coupon1">
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
                                    <!--<label>满20000可用</label>-->
                                    <van-button id="use" round type="info">применять</van-button>
                                </div>
                            </div>
                        </div>
                    </van-popup>
                </div>
                <div id="attr">
                    <div id="price">
                        <span id="amount">9400</span>
                    </div>
                    <label id="addr">
                        <span id="text">这是一条测试数据</span>
                        <span id="cang">CN</span>
                    </label>
                    <div id="attrlist">
                        <label id="tz">срок поставки：</label>
                        <p id="desc">这是一条测试数据这是一条测试数据这是一条测试数据这是一条测试数据这是一条测试数据这是一条测试数据这是一条测试数据这是一条测试数据这是一条测试数据</p>
                    </div>
                    <div id="attrlist">
                        <label id="tz">Адрес доставки：</label>
                        <p id="desc">这是一条测试数据这是一条测试数据这是一条测试数据这是一条测试数据这是一条测试数据这是一条测试数据这是一条测试数据这是一条测试数据这是一条测试数据</p>
                    </div>
                    <div id="skuattr" role="button" tabindex="0" class="van-cell van-cell--clickable" @click="selectsku">
                        <div class="van-cell__title">
                            <span>{{skuattr}}</span>
                        </div>
                        <i class="van-icon van-icon-arrow van-cell__right-icon"><!----></i>
                    </div>
                    <!-- 规格 -->
                    <div>
                        <van-popup v-model="show" position="bottom" style="z-index: 2113;" >
                            <div class="van-sku-header van-hairline--bottom">
                                <div class="van-image van-sku-header__img-wrap"><img
                                        src="https://b.yzcdn.cn/vant/sku/shoes-1.png" class="van-image__img"
                                        style="object-fit: cover;"></div>
                                <div class="van-sku-header__goods-info">
                                    <div class="van-sku__goods-price"><span class="van-sku__price-symbol">￥</span><span
                                            class="van-sku__price-num">1.00</span></div>
                                    <div class="van-sku-header-item"><span class="van-sku__stock">剩余 <span
                                            class="van-sku__stock-num">227</span> 件</span>
                                    </div>
                                </div>
                            </div>
                            <div class="van-sku-body" style="max-height: 440px;">
                                <div class="van-sku-group-container">
                                    <div class="van-sku-row van-hairline--bottom">
                                        <div class="van-sku-row__title">цвет</div>
                                        <span class="van-sku-row__item"><div class="van-image van-sku-row__item-img"><img
                                                src="https://b.yzcdn.cn/vant/sku/shoes-1.png" class="van-image__img"
                                                style="object-fit: cover;"></div><div
                                                class="van-sku-row__item-name">粉色</div></span><span
                                            class="van-sku-row__item"><div class="van-image van-sku-row__item-img"><img
                                            src="https://b.yzcdn.cn/vant/sku/shoes-2.png" class="van-image__img"
                                            style="object-fit: cover;"></div><div
                                            class="van-sku-row__item-name">黄色</div></span><span class="van-sku-row__item"><div
                                            class="van-image van-sku-row__item-img"><img
                                            src="https://b.yzcdn.cn/vant/sku/shoes-3.png" class="van-image__img"
                                            style="object-fit: cover;"></div><div
                                            class="van-sku-row__item-name">蓝色</div></span></div>
                                    <!--<div class="van-sku-row van-hairline&#45;&#45;bottom">
                                        <div class="van-sku-row__title">尺寸</div>
                                        <span class="van-sku-row__item"><div
                                                class="van-sku-row__item-name">大</div></span><span
                                            class="van-sku-row__item"><div class="van-sku-row__item-name">小</div></span>
                                    </div>-->
                                </div>
                                <div class="van-sku-stepper-stock">
                                    <div class="van-sku__stepper-title">Количество</div>
                                    <van-stepper v-model="value" />
                                </div>
                            </div>
                            <div class="van-sku-actions">
                                <button class="van-button van-button--warning van-button--large">
                                    <div class="van-button__content"><span class="van-button__text">Добавить в корзину</span></div>
                                </button>
                                <button class="van-button van-button--danger van-button--large">
                                    <div class="van-button__content"><span class="van-button__text">Купи сейчас</span></div>
                                </button>
                            </div>
                            <i role="button" tabindex="0"
                               class="van-icon van-icon-cross van-popup__close-icon van-popup__close-icon--top-right" @click="close">
                                <!----></i>
                        </van-popup>
                    </div>
                </div>
                <div class="detailTitle">
                    <h2>——деталь продукции——</h2>
                    <div class="detailimg" v-for="(item, index) in images" :key="index">
                        <img src="https://img.yzcdn.cn/vant/cat.jpeg"/>
                    </div>
                </div>
            </div>
            <div>
                <van-goods-action>
                    <van-goods-action-icon icon="like-o" />
                    <van-goods-action-icon icon="chat-o" />
                    <van-goods-action-button type="danger" text="Купи сейчас" @click="selectsku"
                    />
                </van-goods-action>
            </div>
        </div>
    </div>
</template>

<script>
    const coupon = {
        available: 1,
        condition: '无使用门槛\n最多优惠12元',
        reason: '',
        value: 150,
        name: '优惠券名称',
        startAt: 1489104000,
        endAt: 1514592000,
        valueDesc: '1.5',
        unitDesc: '元',
    };
    import Header from "./header";

    export default {
        name: "goods_detail",
        components: {Header},
        data() {
            return {
                images: [1,2,3,4,5],
                skuattr: 'Выберите количество',
                show: false,
                show1: false,
                value: 1,
                attr: '请选择',
                title: 'деталь продукции',
                chosenCoupon: -1,
                showList: false,
                coupons: [coupon],
                disabledCoupons: [coupon]
            };
        },
        mounted() {
            this.getGoodsDetail()
        },
        methods: {
            onChange(index) {
                this.showList = false;
                this.chosenCoupon = index;
            },
            onExchange() {
                this.coupons.push(coupon);
            },
            selectsku() {
                this.show = true
            },
            close() {
                this.show = false
            },
            showPopup() {
                this.show1 = true
                console.log(1111111111111)
            },
            getGoodsDetail() {
                console.log(this.$route.query.goods_id)
            }
        },
    }
</script>

<style scoped>
    #content {
        width: 750px;
        height: calc( 100vh - 100px);
        overflow-y:auto;
    }
    .detailimg img{
        width: 100%;
        height: 100%;
    }
    .van-cell__value--alone {
        color: #ff362c;
        font-weight: bold;
        font-size: 32px;
    }
    .van-stepper {
        float: right;
    }
    .van-sku-body {
        text-align: left;
    }

    #swipe {
        /*height: 300px;*/
    }

    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        background-color: #39a9ed;
    }

    #detail {
    }

    #title, #sku {
        text-align: left;
        margin: 10px 15px;
    }

    #sku {
        /*text-align: left;*/
    }

    .van-cell {
        padding: 20px 15px;
    }

    .van-cell__title {
        text-align: left;
    }

    #attr {
        margin: 0 15px;
    }

    #attr #price {
        height: 80px;
        background-color: #eee;
    }

    #price #amount {
        padding: 0 15px;
        display: inline-block;
        height: 100%;
        line-height: 80px;
        color: rgb(238, 10, 36);
        font-size: 40px;
        font-weight: bolder;
        float: left;
    }

    #addr {
        display: inline-block;
        width: 100%;
        margin: 10px 0;
    }

    #addr #text {
        float: left;
        font-size: 30px;
        color: rgb(238, 10, 36);
        margin-right: 10px;
    }

    #addr #cang {
        width: 50px;
        height: 35px;
        float: right;
        display: inline-block;
        background-color: rgb(238, 10, 36);
        color: #ffffff;
        line-height: 40px;
        border-radius: 5px;
    }

    #attrlist {
        height: 120px;
        margin-bottom: 10px;
    }

    #attrlist #tz {
        height: 100%;
        float: left;
        line-height: 100px;
    }

    #attrlist #desc {
        word-break: break-all;
        width: 70%;
        height: 100%;
        float: right;
        display: inline-block;
        margin: unset;
    }

    #skuattr {
        padding: unset;
    }


    .Allorder {
        background-color: #eee;
        margin-bottom: 100px;
    }
    #coupon1 {
        margin: 85px 0;
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
    #coupon .Allshop {
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