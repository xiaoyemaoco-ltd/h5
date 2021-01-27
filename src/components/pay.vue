<template>
    <div id="content">
        <Header :title="title"></Header>
        <div id="att">
            <div id="personmsg">
                <div @click="selectaddress" role="button" tabindex="0"
                     class="van-cell van-cell--clickable van-cell--center van-cell--borderless van-contact-card van-contact-card--edit">
                    <div class="van-cell__value van-cell__value--alone van-contact-card__value" v-if="userinfo.address_id">
                        <div style="font-weight: bold; margin-bottom: 10px">{{username}} {{mobile}}</div>
                        <div>{{address}}</div>
                    </div>
                    <div v-else class="van-cell__value van-cell__value--alone van-contact-card__value" style="color: #ff362c">
                        Пожалуйста, выберите адрес
                    </div>
                    <i class="van-icon van-icon-arrow van-cell__right-icon"><!----></i></div>
            </div>
            <div id="attrlist">
                <p id="tz">срок доставки：</p>
                <p id="desc">{{ship}}</p>
            </div>
            <!--提货方式-->
            <div id="skuattr" role="button" tabindex="0" class="van-cell van-cell--clickable" @click="selectway">
                <div class="van-cell__title">
                    <span>Способ доставки:</span>
                    <span style="margin-left: 20px; color: #686868;">{{shipping_name}}</span>
                </div>
                <i class="van-icon van-icon-arrow van-cell__right-icon"><!----></i>
            </div>
            <div>
                <van-popup v-model="show" closeable round position="bottom" style="z-index: 2113;" >
                    <div class="van-sku-body" style="height: 300px;">
                        <div class="van-sku-group-container">
                            <div id="title" class="van-sku-row van-hairline--bottom">
                                <div class="van-sku-row__title">Способ доставки</div>
                                <div  class="van-sku-row__item" v-for="(item, index) in shipping_list" :key="index">
                                    <div :id="shipping_id == item.shipping_id ? 'active' : ''" class="van-sku-row__item-name"
                                         @click="selectpickupway(item.shipping_id, item.support_pickup, item.shipping_name, item.first_fee)">{{item.shipping_name}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </van-popup>
            </div>

            <!--选择提货点-->
            <div v-if="shippickup == 1" id="skuattr" role="button" tabindex="0" class="van-cell van-cell--clickable" @click="pickuppoint">
                <div class="van-cell__title" style="display: flex">
                    <span>Выбрать пункта выдачи:</span>
                    <span style="margin-left: 20px; color: #686868;">{{pointtext}}</span>
                </div>
                <i class="van-icon van-icon-arrow van-cell__right-icon"><!----></i>
            </div>
            <div>
                <van-popup v-model="show1" closeable round position="bottom" style="z-index: 2113;" >
                    <div class="van-sku-body" style="height: 400px;">
                        <div class="van-sku-group-container">
                            <div id="title" class="van-sku-row van-hairline--bottom">
                                <van-radio-group v-model="radio">
                                <div id="point" v-for="(v, k) in point" :key="k">
                                    <van-radio id="radio" :name="v.id" @click="change(k)"></van-radio>
                                    <div id="pointtext">
                                        <p>{{v.stanum}} {{v.shop_name}}</p>
                                        <p id="text2">{{v.region_all}}{{v.address}}</p>
                                    </div>
                                </div>
                                </van-radio-group>
                            </div>
                        </div>
                    </div>
                </van-popup>
            </div>

            <div id="shop">
                <div id="goods" v-for="(v, k) in goods" :key="k">
                    <!--<van-image class="image" width="90px" height="80px" radius="5px" src="https://img.yzcdn.cn/vant/cat.jpeg" />-->
                    <img v-lazy="v.goods_thumb" style="width: 90px; height: 80px" @click="todetail(v.goods_id)">
                    <div id="detail">
                        <h4 style="text-align: left">{{v.goods_name}}</h4>
                        <span id="price">{{v.goods_price}}тг.</span>
                        <span id="ch">x</span>
                        <span id="number">{{v.goods_number}}</span>
                    </div>
                </div>
            </div>
            <van-cell-group id="beizhu">
                <van-field v-model="postscript" label="комментарий:" label-width="92" placeholder="" />
            </van-cell-group>
            <div id="coupon">
                <van-cell is-link @click="showPopup">купон</van-cell>
                <van-popup round style="height: 400px" v-model="show2" closeable position="bottom">
                    <div id="coupon1" v-for="(item, index) in coupondata" :key="index">
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
                    <div style="height: 100%; margin-top: 10px">
                        <img style="width: 100%" src="../assets/image/shop/dingdankong@2x.png">
                        <P style="font-weight: bold; font-size: 28px; text-align: center">купонов Нет</P>
                    </div>
                </van-popup>
            </div>
            <div id="paytype">
                <p>Способ оплаты</p>
                <div style="display: flex">
                    <div v-for="(v, k) in payment" :key="k">
                        <img class="image" :id="payid == v.pay_id ? 'active' : ''" @click="selectpay(v.pay_id, v.pay_desc)" :src="getImgUrl(v.pay_code)" style="width: 70px; height: 30px">
                    </div>
                </div>
            </div>
            <div id="money1">
                <label id="addr">
                    <span id="text">Итого</span>
                    <span id="cang">{{totalprice}} тг.</span>
                </label>
                <label id="addr">
                    <span id="text">Стоимость доставки</span>
                    <span id="cang">+0 тг.</span>
                </label>
                <label id="addr">
                  <span id="text">купон</span>
                  <span id="cang">-0 тг.</span>
                </label>
            </div>
        </div>

        <van-goods-action id="bottom">
           <span id="total">{{totalprice}} тг.</span>
            <van-goods-action-button @click="saveorder" type="danger" text="Создать заказ" id="button"/>
        </van-goods-action>
    </div>
</template>

<script>
    import Header from './header'

    export default {
        name: "pay",
        components: {Header},
        data() {
            return {
                radio: '',
                title: 'подтверждение',
                userinfo: [],
                username: '',
                mobile: '',
                address: '',
                totalprice: 0,
                province_id: 0,
                city_id: 0,
                district_id: 0,
                ship: '',
                show: false,
                show1: false,
                show2: false,
                shipping_id: 0,
                shipping_name: '',
                shipping_desc: '',
                support_pickup: 0,
                first_fee: 0,
                shipping_list: [],
                shippickup: 0,
                point: [],
                pointtext: 'выбрать',
                goods: [],
                payment: [],
                paydesc: '',
                payid: 0,
                coupondata: [],
                postscript: '',
                goods_id: 0,
                product_id: 0,
                buy_num: 0,
                goods_attr_id: '',
                rec_ids: []
            }
        },
        mounted() {
            let userinfo = JSON.parse(localStorage.getItem('userinfo'))
            this.userinfo = userinfo
            this.totalprice = this.$route.query.price / 100
            this.rec_ids = this.$route.query.rec_ids
            this.getuserdefaultaddress()
            //立即购买数组
            if (this.$route.query.goods_id) {
                let good = []
                good.goods_id = this.$route.query.goods_id
                good.goods_name = this.$route.query.goods_name
                good.goods_price = this.$route.query.goods_price
                good.product_id = this.$route.query.product_id
                good.goods_attr_id = this.$route.query.goods_attr_id
                good.goods_number = this.$route.query.goods_number
                good.goods_thumb = this.$route.query.goods_thumb

                this.totalprice = this.$route.query.goods_price
                this.goods.push(good)

                this.goods_id = this.$route.query.goods_id
                this.product_id = this.$route.query.product_id
                this.buy_num = this.$route.query.goods_number
                this.goods_attr_id = this.$route.query.goods_attr_id
            }
        },
        methods: {
            //创建订单
            saveorder () {
                this.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                    mask: true,
                    message: "Загрузка..."
                });
                if (!this.province_id || !this.city_id) {
                    this.$toast.fail('Выберите адрес доставки')
                    return
                }

                if (!this.payid) {
                    this.$toast.fail('Выберите метод оплаты')
                    return
                }

                this.$axios.post('api/order/saveOrder', {
                    district: this.district_id,
                    city: this.city_id,
                    consignee: this.username,
                    mobile: this.mobile,
                    province: this.province_id,
                    address: this.address,
                    postscript: this.postscript,
                    pay_id: this.payid,
                    shipping_id: this.shipping_id,
                    pickup_point_id: this.shippickup,
                    user_id: this.userinfo.user_id,
                    goods_pid: this.product_id,
                    goods_id: this.goods_id,
                    buy_num: this.buy_num,
                    goods_attr_id: this.goods_attr_id,
                    rec_ids: this.rec_ids,
                }).then((e) => {
                    this.$toast.clear()
                    console.log(e)
                    if (e.data.statuscode == 200) {
                        this.$router.push({
                            path: './confirmorder',
                            query: {
                                pay_id: this.payid,
                                amount: this.totalprice,
                                ordersn: e.data.order_sn
                            }
                        })
                        /*this.$toast({
                            type: 'success',
                            message: e.data.message,
                            onClose: () => {

                            }
                        })*/
                    } else {
                        this.$toast.fail(e.data.message)
                    }
                })
            },
            //读取优惠券
            showPopup() {
                this.show2 = true
            },
            //去详情
            todetail (id) {
                this.$router.push({
                    path: './goodsdetail',
                    query: {
                        goods_id: id
                    }
                })
            },
            //获取图片路径
            getImgUrl(icon){
                return require("@/assets/image/pay/payment_"+icon+".jpg");
            },
            //选择付款方式
            selectpay (id, desc) {
                this.payid = id
                this.paydesc = desc
            },
            //选择收货点
            change ($e) {
                this.pointtext = this.point[$e].stanum + this.point[$e].shop_name
                this.show1 = false
            },
            //选择收获方式
            selectway() {
                this.show = true
            },
            //选择取货方式
            selectpickupway (shipid, shippickup, shipname, firstfee) {
                this.shipping_id = shipid
                this.shippickup = shippickup
                this.shipping_name = shipname
                this.first_fee = firstfee
                this.show = false
            },
            //提货点
            pickuppoint () {
                this.$axios.post('api/goods/Getpickup', {
                    district_id: this.district_id,
                    city_id: this.city_id
                }).then((e) => {
                    if (e.data.statuscode == 200) {
                        console.log(e.data)
                        this.point = e.data.data
                    }
                })
                this.show1 = true
            },
            onEdit() {
                console.log(1111)
            },
            onChange(index) {
                this.showList = false;
                this.chosenCoupon = index;
            },
            getshipping () {
                this.$axios.post('api/goods/getBuyGoodsMsg', {
                    rec_ids: this.rec_ids,
                    goods_id: this.$route.query.goods_id,
                    city_id: this.city_id
                }).then((e) => {
                    this.$toast.clear();
                    console.log(e)
                    if (e.data.statuscode == 200) {
                        this.ship = e.data.data
                        this.shipping_id = e.data.shipping_id
                        this.shipping_name = e.data.shipping_name
                        this.shipping_desc = e.data.shipping_desc
                        this.support_pickup = e.data.support_pickup
                        this.shipping_list = e.data.shipping_list
                        this.payment = e.data.payment
                        this.payid = this.payment[0].pay_id
                        this.paydesc = e.data.paydesc
                        this.coupondata = e.data.coupon
                        if (!this.$route.query.goods_id) {
                            this.goods = e.data.goods
                        }
                    }
                })
            },
            // 获取用户默认地址
            getuserdefaultaddress () {
                this.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                    mask: true,
                    message: "Загрузка..."
                });

                this.$axios.post('api/user/getUserAddress', {
                    user_id: this.userinfo.user_id,
                    address_id: this.userinfo.address_id,
                    defaultaddress: 'default'
                }).then((e) => {
                    if (e.data.statuscode == 200) {
                        let res = e.data.data
                        console.log(res)
                        this.username = res.consignee
                        this.mobile = res.mobile
                        this.province_id = res.province
                        this.city_id = res.city
                        this.district_id = res.district
                        this.getshipping()
                        if (res.district_name) {
                            this.address = res.province_name + ' ' + res.city_name + ' ' + res.district_name + ' ' + res.address
                        } else {
                            this.address = res.province_name + ' ' + res.city_name + ' ' + res.address
                        }
                    }
                })
            },
            //选择地址
            selectaddress () {
                this.$router.push('./address')
            },
        },
    }
</script>

<style scoped>
    .van-cell {
        padding: 15px;
    }
    #content {
        background-color: #eeeeee;
    }
    #att {
        height: calc(100vh - 200px);
        overflow-y:auto;
    }
    #skuattr {
        padding: unset;
        padding: 15px;
        text-align: left;
        border-bottom: 1px #ccc solid;
    }
    #point {
        display: flex;
    }
    #radio {
        width: 15%;
    }
    #pointtext {
        margin: 15px;
    }
    #pointtext p {
        font-weight: normal;
        margin: 15px 0;
    }
    #text2 {
        color: #a0a0a0;
        margin: unset;
    }

    #title {
        margin: 50px 15px 0 15px;
        font-size: 28px;
        color: #000;
        font-weight: bold;
        text-align: left;
    }
    .van-sku-row__item {
        background-color: #cccccc;
        border-radius: 30px;
        border: 2px #ccc solid;
    }
    #title >>> .van-sku-row__item-name {
        width: 400px;
    }
    #active {
        background-color: #ff362c;
        color: #ffffff;
    }

    .van-contact-card {
        padding: 15px;
    }
    #attrlist {
        background-color: #fff;
        display: flex;
        border-bottom: 1px #ccc solid;
        justify-content: center;
        align-items: center;
    }
    #attrlist #desc {
        width: 70%;
        height: 100%;
        display: inline-block;
    }
    #attrlist #tz {
        /*vertical-align:middle;*/
        width: 27%;
        text-align: left;
        padding-left: 10px;
    }
    #shop {
        margin-top: 10px;
    }
    #goods {
        background-color: #ffffff;
        display: flex;
        padding: 15px 15px;
    }
    #goods .image {
        margin: 0 25px;
    }
    #goods #detail {
        margin-left: 35px;
    }
    #goods #detail #ch {
        margin-left: 20px;
        font-size: 35px;
        display: inline-block;
    }
    #goods #detail #number {
        margin-left: 5px;
        font-size: 35px;
        display: inline-block;
    }
    #goods #price {
        color: rgb(238, 10, 36);
        font-size: 26px;
        display: inline-block;
    }
    .van-field__body  {
        border: 1px #ccc solid;
    }
    .van-hairline--top-bottom::after {
        border-width: unset;
    }
    #beizhu {
        margin: 10px 0;
    }
    #coupon {
        text-align: left;
        margin-bottom: 10px;
    }
    #paytype {
        padding: 15px 0;
        text-align: left;
        background-color: #fff;
    }
    #paytype p {
        margin: 0 15px 15px 15px;
    }
    #paytype .image {
        margin-left: 15px;
    }
    #paytype #active {
        border: 2px #ff362c solid;
    }
    #money1 {
        background-color: #ffffff;
        text-align: left;
        padding: 0 15px;
        margin-top: 10px;
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
        height: 35px;
        float: right;
        display: inline-block;
        color: rgb(238, 10, 36);
        line-height: 40px;
    }
    #bottom {
        background-color: #cccccc;
    }
    #bottom #total {
        width: 35%;
        display: inline-block;
        color: rgb(238, 10, 36);
        font-size: 40px;
        font-weight: bold;
        margin-right: 10%;
        margin-left: 15px;
        text-align: left;
    }
    #bottom #button{
        width: 50%;
    }

    #coupon1 {
        margin: 80px 0 0 0;
    }
    #coupon1 .Allshop {
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
        text-align: center;
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
</style>