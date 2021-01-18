<template>
    <div id="content">
        <Header :title="title"></Header>
        <div id="att">
            <div id="personmsg">
                <div role="button" tabindex="0"
                     class="van-cell van-cell--clickable van-cell--center van-cell--borderless van-contact-card van-contact-card--edit">
                    <div class="van-cell__value van-cell__value--alone van-contact-card__value">
                        <div>张三 13000000000</div>
                        <div>浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室</div>
                    </div>
                    <i class="van-icon van-icon-arrow van-cell__right-icon"><!----></i></div>
            </div>
            <div id="attrlist">
                <p id="tz">срок доставки：</p>
                <p id="desc">这是一条测试数据这是一条测试数据这是一条测试数据这是一条测试数据这是一条测试数据这是一条测试数据这是一条测试数据这是一条测试数据这是一条测试数据</p>
            </div>
            <div id="shop">
                <div id="goods">
                    <van-image class="image" width="90px" height="80px" radius="5px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                    <div id="detail">
                        <h4>商品标题</h4>
                        <span id="price">8888</span>
                        <span id="ch">x</span>
                        <span id="number">1</span>
                    </div>
                </div>
                <div id="goods">
                    <van-image class="image" width="90px" height="80px" radius="5px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                    <div id="detail">
                        <h4>商品标题</h4>
                        <span id="price">8888</span>
                        <span id="ch">x</span>
                        <span id="number">1</span>
                    </div>
                </div>
            </div>
            <van-cell-group id="beizhu">
                <van-field v-model="value" label="комментарий:" label-width="92" placeholder="" />
            </van-cell-group>
            <div id="coupon">
                <!-- 优惠券单元格 -->
                <van-coupon-cell title="купон" :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true"/>
                <!-- 优惠券列表 -->
                <van-popup v-model="showList" round position="bottom" style="height: 60%; padding-top: 4px;">
                    <van-coupon-list :show-exchange-bar="false" :coupons="coupons" :chosen-coupon="chosenCoupon"
                                     :disabled-coupons="disabledCoupons" @change="onChange" @exchange="onExchange"/>
                </van-popup>
            </div>
            <div id="paytype">
                <p>Способ оплаты</p>
                <van-image class="image" id="active" width="50px" height="20px" radius="3px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                <van-image class="image" width="50px" height="20px" radius="3px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            </div>
            <div id="money">
                <label id="addr">
                    <span id="text">Итого</span>
                    <span id="cang">1000</span>
                </label>
                <label id="addr">
                    <span id="text">Стоимость доставки</span>
                    <span id="cang">+10</span>
                </label>
                <label id="addr">
                  <span id="text">купон</span>
                  <span id="cang">-10</span>
                </label>
            </div>
        </div>

        <van-goods-action id="bottom">
           <span id="total">1010</span>
            <van-goods-action-button type="danger" text="Подтвердить заказ" id="button"/>
        </van-goods-action>
    </div>
</template>

<script>
    import Header from './header'

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
    export default {
        name: "pay",
        components: {Header},
        data() {
            return {
                title: 'подтверждение',
                value: '',
                chosenCoupon: -1,
                showList: false,
                coupons: [coupon],
                disabledCoupons: [coupon],
                currentContact: {
                    name: '张三',
                    tel: '13000000000',
                },
            }
        },
        methods: {
            onEdit() {
                console.log(1111)
            },
            onChange(index) {
                this.showList = false;
                this.chosenCoupon = index;
            },
            onExchange() {
                this.coupons.push(coupon);
            },
        },
    }
</script>

<style scoped>
    #content {
        background-color: #eeeeee;
    }
    #att {
        height: calc(100vh - 200px);
        overflow-y:auto;
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
        vertical-align:middle;
        width: 20%;
    }
    #shop {
        margin-top: 10px;
    }
    #goods {
        background-color: #ffffff;
        display: flex;
        padding: 15px 25px;
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
        text-align: left;
        background-color: #fff;
    }
    #paytype p {
        margin: 10px 30px;
    }
    #paytype .image {
        margin-left: 15px;
    }
    #paytype #active {
        border: 2px #FF5E0F solid;
    }
    #money {
        background-color: #ffffff;
        text-align: left;
        padding: 0 30px;
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
        width: 20%;
        display: inline-block;
        color: rgb(238, 10, 36);
        font-size: 40px;
        font-weight: bold;
        margin-right: 20%;
    }
    #bottom #button{
        width: 50%;
    }
</style>