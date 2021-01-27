<template>
    <div>
        <Header :title="title"></Header>
        <div id="content">
            <div id="personmsg">
                <div role="button" tabindex="0" id="address"
                     class="van-cell van-cell--clickable van-cell--center van-cell--borderless van-contact-card van-contact-card--edit">
                    <div class="van-cell__value van-cell__value--alone van-contact-card__value">
                        <div style="font-weight: bold; font-size: 18px">{{detail.consignee}} {{detail.mobile}}</div>
                        <div>{{detail.province}}  {{detail.city}} {{detail.district}} {{detail.address}}</div>
                    </div>
                </div>
                    <!--<i class="van-icon van-icon-arrow van-cell__right-icon">&lt;!&ndash;&ndash;&gt;</i></div>-->
            </div>
            <div class="Allshop" v-for="(v, k) in detail.goods" :key="k" @click="goodsdetail(v.goods_id)">
                <div class="shop_img">
                    <img :src="v.thumb" />
                </div>
                <div class="shop_price">
                    <div class="titleTop">
                        <h3>{{v.goods_name}}</h3>
                        <p class="priceShop">{{v.goods_attr}}</p>
                    </div>
                    <div class="titleBottom">
                        <span class="shopNumber">{{v.goods_price}}</span>
                        <span class="shopNums">x{{v.goods_number}}</span>
                    </div>
                </div>
            </div>
            <div id="message">
                <div id="text">
                    <label class="bh">номер заказа:</label>
                    <label class="number ordersn" >{{detail.order_sn}}</label>
                    <span class="copy" v-clipboard:copy="detail.order_sn" v-clipboard:success="onCopy" v-clipboard:error="onError">копировать</span>
                </div>
                <div id="text">
                    <label class="bh">время:</label>
                    <label class="number">{{detail.addtime}}</label>
                </div>
                <div id="text">
                    <label class="bh">Общая сумма:</label>
                    <label class="number">{{detail.goods_amount}}</label>
                </div>
                <div id="text">
                    <label class="bh">поставке:</label>
                    <label class="number">{{detail.shipping_fee}}</label>
                </div>
                <div id="text">
                    <label class="bh">купон:</label>
                    <label class="number">0</label>
                </div>
                <div id="text">
                    <label class="bh">Cумма заказа:</label>
                    <label class="number">{{detail.order_total_amount}}</label>
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
                title: 'спецификация заказа',
                user_id: 0,
                detail: []
            }
        },
        components: {
            Header
        },
        mounted() {
            let userinfo = JSON.parse(localStorage.getItem('userinfo'))
            if (!userinfo) {
                this.$router.push('./login')
                return
            }
            this.user_id = userinfo.user_id
            this.getorderdetail()
        },
        methods: {
            getorderdetail () {
                this.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                    mask: true,
                    message: "Загрузка..."
                });
                this.$axios.post('api/order/getorderdetail', {
                    order_id: this.$route.query.order_id,
                    user_id: this.user_id
                }).then((e) => {
                    this.$toast.clear()
                    if (e.data.statuscode == 200) {
                        this.detail = e.data.data
                        console.log(this.detail)
                    } else {
                        this.$toast.fail(e.data.message)
                    }
                })
            },
            onCopy(e){
                console.log(e)
                this.$toast.success('Копировать успешно')
            },
            onError () {

            },
            goodsdetail (goods_id) {
                this.$router.push({
                    path: './goodsdetail',
                    query: {
                        goods_id: goods_id
                    }
                })
            }
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
        padding: 20px 15px;
    }
    .Allshop {
        border-bottom: 1px #eee solid;
        background-color: #fff;
    }
    #address {
        padding: 15px;
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
        height: 90px;
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
        padding: 25px 15px 0 15px;
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
        width: 150px;
        height: 45px;
        line-height: 45px;
        background-color: #EE0B0B;
        color: #fff;
    }
</style>