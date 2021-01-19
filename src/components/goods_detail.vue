<template>
    <div>
        <Header :title="title"></Header>
        <div id="content">
            <div id="swipe">
                <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" width="375" height="350">
                    <van-swipe-item v-for="(item, index) in swiper" :key="index">
                        <img id="swiper_img" v-lazy="item">
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div id="detail">
                <h3 id="title">{{detail.goods_name}}</h3>
                <p id="sku">SKU : <span>{{detail.goods_sn}}</span></p>
                <div id="coupon">
                    <van-cell v-if="coupondata.hascoupon" is-link @click="showPopup">купон</van-cell>
                    <van-popup round  v-model="show1" closeable position="bottom">
                        <div id="coupon1" v-for="(item, index) in coupondata.couponlist" :key="index">
                            <div class="Allshop">
                                <div class="shop_price">
                                    <div class="titleTop">
                                        <h3>{{item.name}}</h3>
                                        <div id="date">
                                            <label>Срок действия ваучера：</label>
                                            <span class="priceShop">{{item.stoptime_show}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div id="money">
                                    <h2>{{item.amount}}</h2>
                                    <!--<label>满20000可用</label>-->
                                    <van-button id="use" @click="usecoupon(item.couponid)" round type="info">применять</van-button>
                                </div>
                            </div>
                        </div>
                    </van-popup>
                </div>
                <div id="attr">
                    <div id="price" v-if="detail.is_promote == 0">
                        <span id="amount">{{detail.shop_price}} тг.</span>
                    </div>
                    <div id="price" v-else-if="detail.is_promote == 1">
                        <span id="amount">{{detail.promote_price}} тг.</span>
                    </div>
                    <label id="addr">
                        <span id="text">Данный товар находится на {{detail.cang_name}}</span>
                        <span :id="detail.cang_showkeyname == 'CN' ? 'cang' : 'hskst'">{{detail.cang_showkeyname}}</span>
                    </label>
                    <div id="attrlist">
                        <label id="tz">Срок доставки：</label>
                        <p id="desc">{{aging}}</p>
                    </div>
                    <div id="attrlist">
                        <label id="tz">регион доставки：</label>
                        <p id="desc" class="area" v-if="cityname == ''" @click="selctarea">Выбрать</p>
                        <p id="desc" class="area" v-else @click="selctarea">{{provice}} {{cityname}}</p>
                    </div>

                    <!--省市選取-->
                    <div>
                        <van-popup round  v-model="show2" closeable position="bottom">
                            <div id="coupon1">
                                <!--<van-tabs v-model="active">
                                    <van-tab title="Область">内容 1</van-tab>
                                    <van-tab title="Город">内容 2</van-tab>
                                </van-tabs>-->

                                <van-tree-select height="55vw" :items="items" :active-id.sync="items.region_id"
                                                 :main-active-index.sync="activeIndex" @click-nav="getprovice">
                                    <template slot="content" >
                                        <ul class="right-content">
                                             <li v-for="(item, index) in city" :key="index" :class="selected == item.region_id ? 'selected' : ''"
                                                 @click="onItemClick(item.region_id, item.region_name)"> {{item.region_name}} </li>
                                        </ul>
                                    </template>
                                </van-tree-select>
                            </div>
                        </van-popup>
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
                    <div class="detailimg" v-html="detail.goods_desc"></div>
                </div>
            </div>
            <div>
                <van-goods-action>
                    <van-goods-action-icon icon="like-o" />
                    <van-goods-action-icon icon="chat-o"><a href="tel:13828172679"></a></van-goods-action-icon>
                    <van-goods-action-button type="danger" text="Купи сейчас" @click="selectsku"
                    />
                </van-goods-action>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "./header";

    export default {
        name: "goods_detail",
        components: {Header},
        data() {
            return {
                activeIndex: 0,
                items: [],
                city: [],
                images: [1,2,3,4,5],
                skuattr: 'Выберите количество',
                show: false,
                show1: false,
                value: 1,
                attr: '请选择',
                title: 'деталь продукции',
                show2: false,
                detail: [],
                swiper: [],
                coupondata: [],
                selected: 0,
                provice: '',
                cityname: '',
                aging: ''
            };
        },
        mounted() {
            this.getGoodsDetail()
            this.getCity(3)
        },
        methods: {
            onChange(index) {
                this.showList = false;
                this.chosenCoupon = index;
            },
            getprovice(index) {
                let provice = this.items[index].region_id
                this.provice = this.items[index].text
                this.getCity(provice)
            },
            onItemClick(id, name){
                this.selected = id
                this.cityname = name
                this.$axios.post('api/goods/calShipping', {
                    city_id: id,
                    cang_id: this.detail.cang_id
                }).then((res) => {
                    console.log(res)
                    if (res.data.statuscode == 200) {
                        this.aging = res.data.aging
                    }
                })
                this.show2 = false
            },
            selectsku() {
                this.show = true
            },
            close() {
                this.show = false
            },
            selctarea() {
                this.show2 = true
            },
            showPopup() {
                this.show1 = true
            },
            getGoodsDetail() {
                this.$axios.post('api/goods/getGoodsDetail', {
                    goods_id: this.$route.query.goods_id
                }).then((res) => {
                    if (res.data.statuscode == 200) {
                        this.detail = res.data.data
                        this.swiper = res.data.data.swiper_img
                        this.coupondata = res.data.data.coupons
                        let provice = res.data.data.provice
                        provice.map((item) => {
                            this.items.push({
                                region_id: item.region_id,
                                text: item.region_name
                            })
                        })
                        this.provice = this.items[0].text
                    }
                })
            },
            getCity(id) {
                this.$axios.post('api/goods/getCity', {
                    provice_id: id
                }).then((res) => {
                    if (res.data.statuscode == 200) {
                        this.city = []
                        this.city = res.data.data
                        this.selected = this.city[0].region_id
                    }
                })
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
        background-color: #fff;
    }
    .van-cell__value--alone {
        color: #ff362c;
        font-weight: bold;
        font-size: 32px;
    }
    .van-sidebar-item--select {
        font-weight: bold;
    }
    #coupon1 >>> .van-tree-select__item--active {
        color: #ee0a24;
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
    #swiper_img {
        width: 100%;
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
        padding: 15px 15px;
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
        margin: 15px 0;
    }

    #price #amount {
        padding: 0 15px;
        display: inline-block;
        height: 100%;
        line-height: 80px;
        color: #ff362c;
        font-size: 40px;
        font-weight: bolder;
        float: left;
    }

    #addr {
        display: inline-block;
        width: 100%;
        margin: 15px 0;
    }

    #addr #text {
        float: left;
        font-size: 22px;
        color: #ff362c;
        margin-right: 10px;
    }

    #addr #cang {
        width: 50px;
        height: 35px;
        float: right;
        display: inline-block;
        background-color: #ff362c;
        color: #ffffff;
        line-height: 40px;
        border-radius: 5px;
    }
    #hskst {
        width: 50px;
        height: 35px;
        float: right;
        display: inline-block;
        background-color: #00a0de;
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
        color: #ff362c;
    }

    #attrlist .area {
        line-height: 100px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    #skuattr {
        padding: unset;
        margin: 15px 0;
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
        color: #ff362c;
        font-size: 28px;
        margin-right: 10px;
    }
    .shopNums {
        font-size: 28px;
    }
    .detailimg >>> table {
        width: 100%;
        border: 1px solid #d5d5d5;
        border-collapse:collapse;
    }
    .detailimg >>> td {
        border: 1px solid #d5d5d5;
        padding:4px;
    }
    .detailimg >>> img {
        width: 100%;
    }
    .detailTitle h2 {
        color: #ff362c;
    }
    .right-content li {
        height: 80px;
        line-height: 80px;
    }
    .selected {
        color: #ff362c;
    }
</style>