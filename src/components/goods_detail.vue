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
                        <p id="desc" v-if="areavalue == ''" @click="selctarea">Выбрать</p>
                        <p id="desc" v-else @click="selctarea">{{areavalue}}</p>
                    </div>

                    <!--省市選取-->
                    <div>
                        <van-popup class="provice" v-model="show2" round position="bottom">
                            <van-cascader
                                    v-model="cascaderValue"
                                    title="Ваш район"
                                    :options="options"
                                    @close="show2 = false"
                                    @finish="onFinish"
                                    placeholder = "Выбрать"
                            />
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
                        <van-popup v-model="show" round position="bottom" style="z-index: 2113;" >
                            <div v-if="detail.goods_type != 0" class="van-sku-header van-hairline--bottom" style="text-align: left">
                                <div class="van-image van-sku-header__img-wrap">
                                    <img v-lazy="detail.goods_thumb" class="van-image__img" style="object-fit: cover;">
                                </div>
                                <div class="van-sku-header__goods-info">
                                    <div class="van-sku__goods-price">
                                        <span class="van-sku__price-num">{{productprice}}тг.</span>
                                    </div>
                                    <div class="van-sku-header-item">
                                        <span class="van-sku__stock">SKU:
                                            <span class="van-sku__stock-num">{{productsn}}</span>
                                        </span>
                                    </div>
                                    <div class="van-sku-header-item">
                                        <span class="van-sku__stock">В наличии:
                                            <span class="van-sku__stock-num">{{productstock}}</span> шт.</span>
                                    </div>
                                    <div class="van-sku-header-item">
                                        <span class="van-sku__stock">Выбрано:
                                            <span class="van-sku__stock-num">1</span> шт.</span>
                                    </div>
                                </div>
                            </div>
                            <div class="van-sku-header van-hairline--bottom" style="text-align: left" v-if="detail.goods_type == 0">
                                <div class="van-image van-sku-header__img-wrap">
                                    <img v-lazy="detail.goods_thumb" class="van-image__img" style="object-fit: cover;">
                                </div>
                                <div class="van-sku-header__goods-info">
                                    <div class="van-sku__goods-price">
                                        <span class="van-sku__price-num">{{detail.final_price}}тг.</span>
                                    </div>
                                    <div class="van-sku-header-item">
                                        <span class="van-sku__stock">SKU:
                                            <span class="van-sku__stock-num">{{detail.goods_sn}}</span>
                                        </span>
                                    </div>
                                    <div class="van-sku-header-item">
                                        <span class="van-sku__stock">В наличии:
                                            <span class="van-sku__stock-num">{{detail.goods_number}}</span> шт.</span>
                                    </div>
                                    <div class="van-sku-header-item">
                                        <span class="van-sku__stock">Выбрано:
                                            <span class="van-sku__stock-num">1</span> шт.</span>
                                    </div>
                                </div>
                            </div>
                            <div class="van-sku-body" style="max-height: 440px;">
                                <div class="van-sku-group-container" v-if="detail.goods_type > 0">
                                    <div class="van-sku-row van-hairline--bottom" v-for="(item, index) in properties.spe" :key="index">
                                        <div class="van-sku-row__title">{{item.name}}</div>
                                        <span class="van-sku-row__item" v-for="(v, k) in item.values" :key="k">
                                            <div class="van-sku-row__item-name" :id="attrselected[index] == v.id ? 'selected' : ''" @click="selectattr(v.id, index)">{{attrselected.index}} {{v.label}}</div>
                                        </span>
                                    </div>
                                </div>
                                <div class="van-sku-stepper-stock">
                                    <div class="van-sku__stepper-title">Количество</div>
                                    <van-stepper v-model="value" />
                                </div>
                            </div>
                            <div class="van-sku-actions">
                                <button class="van-button van-button--warning van-button--large" @click="addcart">
                                    <div class="van-button__content">
                                        <span class="van-button__text">Добавить в корзину</span>
                                    </div>
                                </button>
                                <button @click="buynow" class="van-button van-button--danger van-button--large">
                                    <div class="van-button__content">
                                        <span class="van-button__text">Купи сейчас</span>
                                    </div>
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
            <div class="bottom">
                <van-goods-action>
                    <van-icon name="like" v-if="detail.is_collect" color="#ff362c" @click="cancelcollect" />
                    <van-goods-action-icon v-else icon="like-o" @click="collect" />
                    <a href="tel:13828172679"><van-goods-action-icon icon="chat-o"></van-goods-action-icon></a>
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
                aging: 'Пожалуйста, выберите регион доставки',
                attrselected: [],
                properties: [],
                products: [],
                productprice: 0,
                productsn: 0,
                productstock: 0,
                product_id: '',
                attr_id: '',
                user_id: 0,
                cascaderValue: '',
                options: [],
                areavalue: ''
            };
        },
        inject: ['reload'],
        mounted() {
            let userinfo = JSON.parse(localStorage.getItem('userinfo'))
            if (userinfo) {
                this.user_id = userinfo.user_id
            }

            this.getGoodsDetail()
            this.getCity(3)
        },
        methods: {
            //选择属性
            selectattr(id, index) {
                this.attrselected[index] = id
                // let attr = JSON.parse(JSON.stringify(this.attrselected))
                let key = ''
                if (Object.keys(this.attrselected).length > 1) {
                    key = Object.values(this.attrselected).join('|')
                    let reg=new RegExp(/\|/,'g')//g代表全部
                    this.attr_id = key.replace(reg,',');
                } else {
                    key = this.attrselected[0]
                    this.attr_id = key
                }
                let resdata = this.products[key];
                this.productprice = resdata.price
                this.productsn = resdata.product_sn
                this.productstock = resdata.product_number
                this.product_id = resdata.product_id
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
            //商品详情
            getGoodsDetail() {
                this.$axios.post('api/goods/getGoodsDetail', {
                    goods_id: this.$route.query.goods_id,
                    user_id: this.user_id
                }).then((res) => {
                    if (res.data.statuscode == 200) {
                        this.detail = res.data.data
                        this.swiper = res.data.data.swiper_img
                        this.coupondata = res.data.data.coupons
                        let provice = res.data.data.provice
                        provice.map((item) => {
                            this.options.push({
                                value: item.region_id,
                                text: item.region_name,
                                children: item.children
                            })
                        })
                        this.provice = this.options[0].text
                        //判断商品是否有属性
                        if (Object.keys(res.data.data.properties).length > 0) {
                            this.properties = res.data.data.properties
                            this.products = this.properties.products
                            let selected = {}
                            let pro = Object.values(this.properties.products)
                            if (this.properties.spe.length > 1) {
                                pro.map((v) => {
                                    if (v.product_number > 0) {
                                        selected = v.goods_attr.split('|')
                                        this.attr_id = v.goods_attr
                                        this.productprice = v.price
                                        this.productsn = v.product_sn
                                        this.productstock = v.product_number
                                        this.product_id = v.product_id
                                    }
                                })
                                /*let i = 0
                                this.properties.spe.map((item) => {
                                    selected[i] = item.values[0].id
                                    i++
                                })*/
                                this.attr_id = Object.values(selected).join(',')
                            } else {
                                pro.map((v) => {
                                    if (v.product_number > 0) {
                                        selected[0] = v.goods_attr
                                        this.attr_id = v.goods_attr
                                        this.productprice = v.price
                                        this.productsn = v.product_sn
                                        this.productstock = v.product_number
                                        this.product_id = v.product_id
                                    }
                                })

                            }
                            this.attrselected = selected
                        } else {
                            this.productprice = this.detail.final_price
                            this.productsn = this.detail.goods_sn
                        }
                    }
                })
            },
            //添加购物车
            addcart() {
                //判断库存
                if (this.detail.goods_type != 0) {
                    if (this.productstock < this.value) {
                        this.$toast({
                            message: 'Этот товар распродан',
                            position: 'top',
                            type: 'fail'
                        });
                        return;
                    }
                } else {
                    if (this.detail.goods_number < this.value) {
                        this.$toast({
                            message: 'Этот товар распродан',
                            position: 'top',
                            type: 'fail'
                        });
                        return;
                    }
                }

                if (this.user_id == 0) {
                    this.$router.push('./login')
                    return
                }

                this.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                    mask: true,
                    message: "Загрузка..."
                });

                this.$axios.post('api/goods/addCart', {
                    user_id : this.user_id,
                    goods_id : this.detail.goods_id,
                    goods_sn : this.productsn,
                    goods_name : this.detail.goods_name,
                    market_price : this.detail.market_price,
                    goods_price : this.productprice,
                    product_id : this.product_id,
                    goods_number : this.value,
                    goods_attr_id : this.attr_id,
                    promote_price : this.detail.promote_price
                }).then((res) => {
                    this.$toast.clear()
                    if (res.data.statuscode == 200) {
                        this.show = false
                        this.$toast({
                            type: 'success',
                            message: res.data.message
                        })
                    }
                })
            },
            //立即购买
            buynow () {
                console.log(this.productstock, this.value)
                //判断库存
                if (this.detail.goods_type != 0) {
                    if (this.productstock < this.value) {
                        this.$toast({
                            message: 'Этот товар распродан',
                            position: 'top',
                            type: 'fail'
                        });
                        return;
                    }
                } else {
                    if (this.detail.goods_number < this.value) {
                        this.$toast({
                            message: 'Этот товар распродан',
                            position: 'top',
                            type: 'fail'
                        });
                        return;
                    }
                }

                if (this.user_id == 0) {
                    this.$router.push('./login')
                    return
                }

                this.$router.push({
                    path: './pay',
                    query: {
                        user_id : this.user_id,
                        goods_id : this.detail.goods_id,
                        goods_sn : this.productsn,
                        goods_name : this.detail.goods_name,
                        market_price : this.detail.market_price,
                        goods_price : this.productprice,
                        product_id : this.product_id,
                        goods_number : this.value,
                        goods_attr_id : this.attr_id,
                        promote_price : this.detail.promote_price,
                        goods_thumb: this.detail.goods_thumb
                    }
                })
            },
            //收藏
            collect () {
                if (this.user_id == 0) {
                    this.$router.push('./login')
                    return
                }

                this.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                    mask: true,
                    message: "Загрузка..."
                });

                this.$axios.post('api/user/collectGoods', {
                    user_id: this.user_id,
                    goods_id: this.detail.goods_id
                }).then((e) => {
                    this.$toast.clear()
                    if (e.data.statuscode == 200) {
                        this.reload()
                    }
                })
            },
            //取消收藏
            cancelcollect () {
                if (this.user_id == 0) {
                    this.$router.push('./login')
                    return
                }

                this.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                    mask: true,
                    message: "Загрузка..."
                });

                this.$axios.post('api/user/deleteCollectGoods', {
                    user_id: this.user_id,
                    goods_id: this.detail.goods_id
                }).then((e) => {
                    this.$toast.clear()
                    if (e.data.statuscode == 200) {
                        this.reload()
                    }
                })
            },
            //获取城市
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
            },
            //城市选择完成时
            onFinish (value) {
                this.show2 = false
                this.areavalue = value.selectedOptions.map((option) => option.text).join(' ');
                this.$axios.post('api/goods/calShipping', {
                    city_id: value.value,
                    cang_id: this.detail.cang_id
                }).then((res) => {
                    if (res.data.statuscode == 200) {
                        this.aging = res.data.aging
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
    .bottom >>> .van-goods-action-icon__icon {
        font-size: 60px;
    }
    .van-icon-like {
        font-size: 60px;
        margin: 0 15px;
    }
    .detailimg img{
        width: 100%;
        height: 100%;
        background-color: #fff;
    }
    .van-sku-header-item {
        margin-top: unset;
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
        margin-bottom: 10px;
        display:flex;
        text-align:left;
        align-items:center;
        /*justify-content:center;*/
    }

    #attrlist #desc {
        word-break: break-all;
        width: 70%;
        margin: unset;
        color: #ff362c;
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
    #selected {
        background-color: #ff362c;
        color: #fff;
    }
</style>