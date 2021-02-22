<template>
    <div>
        <Header :title="title"></Header>
        <div class="Allorder" id="middle">
            <van-tabs :active="active" @change="changstatus" swipeable>
                <van-search v-model="value" placeholder="введите ключевое слово для поиска" search="search"/>
                <van-tab title="Bce" name="-1">
                    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" loading-text="Загрузка..." loosing-text="Отпустите, чтобы обновить..." pulling-text="Отпустите, чтобы обновить...">
                        <van-list
                                v-model="loading" offset="10"
                                :finished="finished"
                                finished-text="Больше не надо"
                                loading-text="Загрузка..."
                                @load="onLoad" v-if="orderlist.length > 0"
                        >
                            <div id="content" v-for="(v, k) in orderlist" :key="k">
                                <div class="AllCode">
                                    <div class="codeOrder">номер заказа:{{v.order_sn}}</div>
                                    <div class="paid">время：{{v.add_time}}</div>
                                </div>
                                <div class="Allshop" v-for="(item, index) in v.goodslist" :key="index" @click="getOrderDetail(v.order_id)">
                                    <div class="shop_img">
                                        <img :src="item.goods_thumb" />
                                    </div>
                                    <div class="shop_price">
                                        <div class="titleTop">
                                            <h3>{{item.goods_name}}</h3>
                                            <p class="priceShop">{{item .goods_attr}}</p>
                                        </div>
                                        <div class="titleBottom">
                                            <span class="shopNumber">{{item.goods_price}}</span>
                                            <span class="shopNums">x{{item.goods_number}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="priceNum">
                                    <label id="total">Bcero：</label>
                                    <label id="num">{{v.order_total_count}}</label>
                                    <label id="total">Toвap：</label>
                                    <label id="num">{{v.order_total_amount}}</label>
                                </div>
                                <div id="status">
                                    <button v-if="v.pay_status == 0" class="paid_btn paid_detail" @click="pay(v.pay_id, v.order_sn, v.order_total_amount)">Платить</button>
                                    <button v-if="v.pay_status == 0" class="paid_btn" @click="cancel(v.order_id)">Отменить</button>
                                    <button class="paid_btn" @click="getOrderDetail(v.order_id)">Проверить заказ</button>
                                    <div style="clear: both;"></div>
                                </div>
                            </div>
                        </van-list>
                    </van-pull-refresh>

                    <div style="height: 100%; margin-top: 10px" v-if="orderlist.length == 0">
                        <img style="width: 100%" src="../assets/image/shop/dingdankong@2x.png">
                        <P style="font-weight: bold; font-size: 28px; text-align: center">купонов Нет</P>
                    </div>
                </van-tab>
                <van-tab title="Bожиданий" name="100">
                    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" loading-text="Загрузка..." loosing-text="Отпустите, чтобы обновить..." pulling-text="Отпустите, чтобы обновить...">
                        <van-list
                        v-model="loading" offset="10"
                        :finished="finished"
                        finished-text="Больше не надо"
                        loading-text="Загрузка..."
                        @load="onLoad" v-if="orderlist.length > 0"
                    >
                    <div id="content" v-for="(v, k) in orderlist" :key="k">
                        <div class="AllCode">
                            <div class="codeOrder">номер заказа:{{v.order_sn}}</div>
                            <div class="paid">время：{{v.add_time}}</div>
                        </div>
                        <div class="Allshop" v-for="(item, index) in v.goodslist" :key="index" @click="getOrderDetail(v.order_id)">
                            <div class="shop_img">
                                <img :src="item.goods_thumb" />
                            </div>
                            <div class="shop_price">
                                <div class="titleTop">
                                    <h3>{{item.goods_name}}</h3>
                                    <p class="priceShop">{{item .goods_attr}}</p>
                                </div>
                                <div class="titleBottom">
                                    <span class="shopNumber">{{item.goods_price}}</span>
                                    <span class="shopNums">x{{item.goods_number}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="priceNum">
                            <label id="total">Bcero：</label>
                            <label id="num">{{v.order_total_count}}</label>
                            <label id="total">Toвap：</label>
                            <label id="num">{{v.order_total_amount}}</label>
                        </div>
                        <div id="status">
                            <button v-if="v.pay_status == 0" class="paid_btn paid_detail" @click="pay(v.pay_id, v.order_sn, v.order_total_amount)">Платить</button>
                            <button v-if="v.pay_status == 0" class="paid_btn" @click="cancel(v.order_id)">Отменить</button>
                            <button class="paid_btn" @click="getOrderDetail(v.order_id)">Проверить заказ</button>
                            <div style="clear: both;"></div>
                        </div>
                    </div>
                    </van-list>
                    </van-pull-refresh>
                    <div style="height: 100%; margin-top: 10px" v-if="orderlist.length == 0">
                        <img style="width: 100%" src="../assets/image/shop/dingdankong@2x.png">
                        <P style="font-weight: bold; font-size: 28px; text-align: center">купонов Нет</P>
                    </div>
                </van-tab>
                <van-tab title="Aктивные" name="101">
                    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" loading-text="Загрузка..." loosing-text="Отпустите, чтобы обновить..." pulling-text="Отпустите, чтобы обновить...">
                        <van-list
                        v-model="loading" offset="10"
                        :finished="finished"
                        finished-text="Больше не надо"
                        loading-text="Загрузка..."
                        @load="onLoad" v-if="orderlist.length > 0"
                    >
                    <div id="content" v-for="(v, k) in orderlist" :key="k">
                        <div class="AllCode">
                            <div class="codeOrder">номер заказа:{{v.order_sn}}</div>
                            <div class="paid">время：{{v.add_time}}</div>
                        </div>
                        <div class="Allshop" v-for="(item, index) in v.goodslist" :key="index" @click="getOrderDetail(v.order_id)">
                            <div class="shop_img">
                                <img :src="item.goods_thumb" />
                            </div>
                            <div class="shop_price">
                                <div class="titleTop">
                                    <h3>{{item.goods_name}}</h3>
                                    <p class="priceShop">{{item .goods_attr}}</p>
                                </div>
                                <div class="titleBottom">
                                    <span class="shopNumber">{{item.goods_price}}</span>
                                    <span class="shopNums">x{{item.goods_number}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="priceNum">
                            <label id="total">Bcero：</label>
                            <label id="num">{{v.order_total_count}}</label>
                            <label id="total">Toвap：</label>
                            <label id="num">{{v.order_total_amount}}</label>
                        </div>
                        <div id="status">
                            <button class="paid_btn" @click="getOrderDetail(v.order_id)">Проверить заказ</button>
                            <div style="clear: both;"></div>
                        </div>
                    </div>
                    </van-list>
                    </van-pull-refresh>
                    <div style="height: 100%; margin-top: 10px" v-if="orderlist.length == 0">
                        <img style="width: 100%" src="../assets/image/shop/dingdankong@2x.png">
                        <P style="font-weight: bold; font-size: 28px; text-align: center">купонов Нет</P>
                    </div>
                </van-tab>
                <van-tab title="Завершенные" name="105">
                    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" loading-text="Загрузка..." loosing-text="Отпустите, чтобы обновить..." pulling-text="Отпустите, чтобы обновить...">
                        <van-list
                        v-model="loading" offset="10"
                        :finished="finished"
                        finished-text="Больше не надо"
                        loading-text="Загрузка..."
                        @load="onLoad" v-if="orderlist.length > 0"
                    >
                    <div id="content" v-for="(v, k) in orderlist" :key="k">
                        <div class="AllCode">
                            <div class="codeOrder">номер заказа:{{v.order_sn}}</div>
                            <div class="paid">время：{{v.add_time}}</div>
                        </div>
                        <div class="Allshop" v-for="(item, index) in v.goodslist" :key="index" @click="getOrderDetail(v.order_id)">
                            <div class="shop_img">
                                <img :src="item.goods_thumb" />
                            </div>
                            <div class="shop_price">
                                <div class="titleTop">
                                    <h3>{{item.goods_name}}</h3>
                                    <p class="priceShop">{{item .goods_attr}}</p>
                                </div>
                                <div class="titleBottom">
                                    <span class="shopNumber">{{item.goods_price}}</span>
                                    <span class="shopNums">x{{item.goods_number}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="priceNum">
                            <label id="total">Bcero：</label>
                            <label id="num">{{v.order_total_count}}</label>
                            <label id="total">Toвap：</label>
                            <label id="num">{{v.order_total_amount}}</label>
                        </div>
                        <div id="status">
                            <button class="paid_btn comment_btn" @click="comment">Написать отзыв</button>
                            <button class="paid_btn" @click="getOrderDetail(v.order_id)">Проверить заказ</button>
                            <div style="clear: both;"></div>
                        </div>
                    </div>
                    </van-list>
                    </van-pull-refresh>

                    <div style="height: 100%; margin-top: 10px" v-if="orderlist.length == 0">
                        <img style="width: 100%" src="../assets/image/shop/dingdankong@2x.png">
                        <P style="font-weight: bold; font-size: 28px; text-align: center">купонов Нет</P>
                    </div>
                </van-tab>
                <van-tab title="Отмененные" name="102">
                    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" loading-text="Загрузка..." loosing-text="Отпустите, чтобы обновить..." pulling-text="Отпустите, чтобы обновить...">
                        <van-list
                        v-model="loading"
                        :finished="finished" offset="10"
                        finished-text="Больше не надо"
                        loading-text="Загрузка..."
                        @load="onLoad" v-if="orderlist.length > 0"
                    >
                    <div id="content" v-for="(v, k) in orderlist" :key="k">
                        <div class="AllCode">
                            <div class="codeOrder">номер заказа:{{v.order_sn}}</div>
                            <div class="paid">время：{{v.add_time}}</div>
                        </div>
                        <div class="Allshop" v-for="(item, index) in v.goodslist" :key="index" @click="getOrderDetail(v.order_id)">
                            <div class="shop_img">
                                <img :src="item.goods_thumb" />
                            </div>
                            <div class="shop_price">
                                <div class="titleTop">
                                    <h3>{{item.goods_name}}</h3>
                                    <p class="priceShop">{{item .goods_attr}}</p>
                                </div>
                                <div class="titleBottom">
                                    <span class="shopNumber">{{item.goods_price}}</span>
                                    <span class="shopNums">x{{item.goods_number}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="priceNum">
                            <label id="total">Bcero：</label>
                            <label id="num">{{v.order_total_count}}</label>
                            <label id="total">Toвap：</label>
                            <label id="num">{{v.order_total_amount}}</label>
                        </div>
                        <div id="status">
                            <button class="paid_btn" @click="getOrderDetail(v.order_id)">спецификация</button>
                            <div style="clear: both;"></div>
                        </div>
                    </div>
                    </van-list>
                    </van-pull-refresh>

                    <div style="height: 100%; margin-top: 10px" v-if="orderlist.length == 0">
                        <img style="width: 100%" src="../assets/image/shop/dingdankong@2x.png">
                        <P style="font-weight: bold; font-size: 28px; text-align: center">купонов Нет</P>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
    import Header from './header'
    export default {
        name: "order",
        data() {
            return {
                title: 'Мой заказ',
                active:'-1',
                value: '',
                user_id: 0,
                orderlist: [],
                loading: false,     //是否处于加载状态，加载过程中不触发load事件
                finished: false,    //是否已加载完成，加载完成后不再触发load事件
                updata:{
                    pageNumber: 0,  //页码
                    pageSize:20     //每页条数
                },
                isLoading: false,
            }
        },
        components: {
            Header
        },
        mounted() {
            setTimeout(() => {
                let userinfo = JSON.parse(localStorage.getItem('userinfo'))
                if (!userinfo) {
                    this.$router.push({
                        path: './login',
                        query: {
                            path: '/personal'
                        }
                    })
                    return
                }
                this.user_id = userinfo.user_id
                this.updata.pageNumber = 0
                this.updata.pageSize = 20
                this.active = localStorage.getItem('order_active')
                this.getuserorder();
            }, 0)
        },
        inject: ['reload'],
        methods: {
            pay (pay_id, order_sn, price) {
                this.$router.push({
                    path: './confirmorder',
                    query: {
                        pay_id: pay_id,
                        amount: price,
                        ordersn:order_sn
                    }
                })
            },
            getuserorder () {

                /*this.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                    mask: true,
                    message: "Загрузка..."
                });*/

                this.$axios.post('api/order/Getuserorder', {
                    user_id: this.user_id,
                    skip: this.updata.pageNumber,
                    maxperpage: this.updata.pageSize,
                    composite_status: this.active,
                    keyword: this.value
                }).then((e) => {
                    // this.$toast.clear()
                    if (e.data.statuscode == 200) {
                        let list = e.data.list
                        this.loading = false;              //是否处于加载状态，加载过程中不触发load事件
                        if (list == null || list.length === 0) {
                            this.finished = true;           // 加载结束
                            return;
                        }
                        this.updata.pageNumber = e.data.skip;
                        this.orderlist = this.orderlist.concat(list); // 将新数据与老数据进行合并
                    } else {
                        this.finished = true;
                    }
                })
            },
            search () {
                this.getuserorder()
            },
            changstatus (e) {
                this.active = e
                localStorage.setItem('order_active', this.active)
                this.updata.pageNumber = 0
                this.orderlist = []
                this.finished = false;
                this.getuserorder()
            },
            onLoad() {
                // this.updata.pageNumber++;

                this.getuserorder();

            },
            //跳详情
            getOrderDetail(order_id) {
                this.$router.push(
                {
                    path: './orderdetail',
                    query: {
                        order_id: order_id
                    }
                })
            },
            //取消订单
            cancel (id) {
                this.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                    mask: true,
                    message: "Загрузка..."
                });

                this.$axios.post('api/order/cancelOrder', {
                    user_id: this.user_id,
                    order_id: id
                }).then((e) => {
                    this.$toast.clear()
                    if (e.data.statuscode == 200) {
                        this.$toast({
                            type: 'success',
                            message: e.data.message,
                            onClose: () => {
                               this.reload()
                            }
                        })
                    } else {
                        this.$toast({
                            type: 'fail',
                            message: e.data.message
                        })
                    }
                })
            },
            //下拉刷新
            onRefresh() {
                setTimeout(() => {
                    this.updata.pageNumber = 0
                    this.updata.pageSize = 20
                    this.orderlist = []
                    this.getuserorder();
                    this.isLoading = false;
                }, 1000);
            },
            comment () {
                this.$router.push('/comment')
            }
        }
    }
</script>

<style scoped>
    .Allorder {
        background-color: #eee;
    }
    .van-tab__pane {
        height: calc( 100vh - 300px);
        overflow-y:auto;
    }
    #content {
        background-color: #fff;
        margin-top: 15px;
        padding-top: 15px;
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
    #middle {
      height: calc( 100vh - 100px);
      overflow-y:auto;
    }
    .AllCode .paid {
        float: right;
    }
    #content .Allshop {
        display: flex;
        padding: 20px 30px;
    }
    .Allshop {
        border-bottom: 1px #eee solid;
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
    .priceNum  {
        text-align: right;
        border-bottom: 1px #eee solid;
        height: 50px;
        padding: 10px 15px 0 0;
    }
    .priceNum #num {
        color: #EE0B0B;
        margin-right: 20px;
    }
    #status {
        text-align: right;
        height: 55px;
        padding: 5px 15px 0 0;
    }
    #status .paid_btn {
        margin-right: 20px;
        border-radius: 5px;
        background-color: #fff;
        border: 1px #666666 solid;
        height: 50px;
    }
    #status .comment_btn {
        background-color: #ff362c;
        border: unset;
        color: #fff;
    }
    .paid_detail {
        color: #EE0B0B;
    }
</style>