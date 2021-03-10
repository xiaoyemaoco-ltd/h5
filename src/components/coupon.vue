<template>
    <div>
        <Header :title="title"></Header>
        <div class="Allorder">
            <van-tabs :active="active" @change="changstatus" swipeable>
                <van-tab title="доверенное" name="1">
                    <van-pull-refresh class="refresh" v-if="couponlist.length > 0" v-model="isLoading" @refresh="onRefresh" loading-text="Загрузка..." loosing-text="Отпустите, чтобы обновить..." pulling-text="Отпустите, чтобы обновить...">
                        <van-list v-model="loading" :finished="finished" loading-text="Загрузка..." error-text="Больше не надо"
                            @load="onLoad" v-if="couponlist.length > 0"
                    >
                        <div id="content" v-for="(v, k) in couponlist" :key="k">
                            <div class="Allshop">
                                <div class="shop_price">
                                    <div class="titleTop">
                                        <h3>{{v.name}}</h3>
                                        <div id="date">
                                            <label>Срок действия ваучера：</label>
                                            <span class="priceShop">{{v.stoptime_show}}</span>
                                        </div>
                                        <div class="detail" @click="showdetail(k)">
                                            <span class="text">подробнее</span>
                                            <img v-if="currentActive == k" src="../assets/image/discover_red.png">
                                            <img v-else src="../assets/image/discover.png">
                                        </div>
                                    </div>
                                </div>
                                <div id="money">
                                    <h2>{{v.amount}}тг.</h2>
                                    <van-button id="use" round type="info">применять</van-button>
                                </div>
                            </div>
                            <div class="lookdetail" v-if="currentActive == k">
                                <div class="desc border">
                                    <h4>Ограничения на использовать</h4>
                                    <p class="border">При покупке превышать <span>{{v.limitamount}} тг.</span> Можно использовать купоны</p >
                                </div>
                                <div class="desc">
                                    <h4>правило использовать</h4>
                                    <p class="border" v-html="v.memo"></p >
                                </div>
                                <div class="desc" v-if="v.forgoodslist">
                                    <h4>ограниченного использования товар</h4>
                                    <ul class="forgood" v-for="(item, index) in v.forgoodslist" :key="index">
                                        <li @click="goodsdetail(item.goods_id)">{{item.goods_name}}</li>
                                    </ul>
                                    <button class="button">Посмотреть больше продуктов</button>
                                </div>
                                <div class="order" v-if="v.order_sn != ''">
                                    <h4>Заказы с купонами</h4>
                                    <p>Купон использован, номер</p>
                                    <p>Заказа: {{v.order_sn}}</p>
                                </div>
                            </div>
                        </div>
                    </van-list>
                    </van-pull-refresh>
                    <div class="refresh" style="margin-top: 10px" v-if="couponlist.length == 0">
                        <img style="width: 100%" src="../assets/image/shop/dingdankong@2x.png">
                        <P style="font-weight: bold; font-size: 28px; text-align: center">купонов Нет</P>
                    </div>
                </van-tab>
                <van-tab title="использованный" name="2">
                    <van-pull-refresh class="refresh" v-if="couponlist.length > 0" v-model="isLoading" @refresh="onRefresh" loading-text="Загрузка..." loosing-text="Отпустите, чтобы обновить..." pulling-text="Отпустите, чтобы обновить...">
                        <van-list v-model="loading" :finished="finished" loading-text="Загрузка..." offset="10"
                            @load="onLoad" v-if="couponlist.length > 0">
                        <div id="content" v-for="(v, k) in couponlist" :key="k">
                            <div class="Allshop">
                                <div class="shop_price">
                                    <div class="titleTop">
                                        <h3>{{v.name}}</h3>
                                        <div id="date">
                                            <label>Срок действия ваучера：</label>
                                            <span class="priceShop">{{v.stoptime_show}}</span>
                                        </div>
                                        <div class="detail" @click="showdetail1(k)">
                                            <span class="text">подробнее</span>
                                            <img v-if="currentActive1 == k" src="../assets/image/discover_red.png">
                                            <img v-else src="../assets/image/discover.png">
                                        </div>
                                    </div>
                                </div>
                                <div id="money" style="background-color: #cccccc;">
                                    <h2>{{v.amount}}тг.</h2>
                                    <!--<van-button id="use" round type="info">применять</van-button>-->
                                </div>
                            </div>
                            <div class="lookdetail" v-if="currentActive1 == k">
                                <div class="desc border">
                                    <h4>Ограничения на использовать</h4>
                                    <p class="border">При покупке превышать <span>{{v.limitamount}} тг.</span> Можно использовать купоны</p >
                                </div>
                                <div class="desc">
                                    <h4>правило использовать</h4>
                                    <p class="border" v-html="v.memo"></p >
                                </div>
                                <div class="desc" v-if="v.forgoodslist">
                                    <h4>ограниченного использования товар</h4>
                                    <ul class="forgood" v-for="(item, index) in v.forgoodslist" :key="index">
                                        <li @click="goodsdetail(item.goods_id)">{{item.goods_name}}</li>
                                    </ul>
                                    <button class="button">Посмотреть больше продуктов</button>
                                </div>
                                <div class="order" v-if="v.order_sn != ''">
                                    <h4>Заказы с купонами</h4>
                                    <p>Купон использован, номер</p>
                                    <p>Заказа: {{v.order_sn}}</p>
                                </div>
                            </div>
                        </div>
                    </van-list>
                    </van-pull-refresh>

                    <div class="refresh" style="margin-top: 10px" v-if="couponlist.length == 0">
                        <img style="width: 100%" src="../assets/image/shop/dingdankong@2x.png">
                        <P style="font-weight: bold; font-size: 28px; text-align: center">купонов Нет</P>
                    </div>
                </van-tab>
                <van-tab title="истекший" name="3">
                    <van-pull-refresh class="refresh" v-if="couponlist.length > 0" v-model="isLoading" @refresh="onRefresh" loading-text="Загрузка..." loosing-text="Отпустите, чтобы обновить..." pulling-text="Отпустите, чтобы обновить...">
                        <van-list v-model="loading" offset="10" :finished="finished" loading-text="Загрузка..." @load="onLoad" v-if="couponlist.length > 0">
                        <div id="content" v-for="(v, k) in couponlist" :key="k">
                            <div class="Allshop">
                                <div class="shop_price">
                                    <div class="titleTop">
                                        <h3>{{v.name}}</h3>
                                        <div id="date">
                                            <label id="shix">Срок действия ваучера：</label>
                                            <span id="shix" class="priceShop">{{v.stoptime_show}}</span>
                                        </div>
                                        <div class="detail" @click="showdetail2(k)">
                                            <span class="text">подробнее</span>
                                            <img v-if="currentActive2 == k" src="../assets/image/discover_red.png">
                                            <img v-else src="../assets/image/discover.png">
                                        </div>
                                    </div>
                                </div>
                                <div id="money" style="background-color: #cccccc;">
                                    <h2>{{v.amount}}тг.</h2>
                                    <!--<van-button id="use" round type="info">применять</van-button>-->
                                </div>
                            </div>
                            <div class="lookdetail" v-if="currentActive2 == k">
                                <div class="desc border">
                                    <h4>Ограничения на использовать</h4>
                                    <p class="border special">При покупке превышать <span>{{v.limitamount}} тг.</span> Можно использовать купоны</p >
                                </div>
                                <div class="desc">
                                    <h4>правило использовать</h4>
                                    <p class="border" v-html="v.memo"></p >
                                </div>
                                <div class="desc btn" v-if="v.forgoodslist">
                                    <h4>ограниченного использования товар</h4>
                                    <ul class="forgood" v-for="(item, index) in v.forgoodslist" :key="index">
                                        <li @click="goodsdetail(item.goods_id)">{{item.goods_name}}</li>
                                    </ul>
                                    <button class="button">Посмотреть больше продуктов</button>
                                </div>
                                <div class="order" v-if="v.order_sn != ''">
                                    <h4>Заказы с купонами</h4>
                                    <p>Купон использован, номер</p>
                                    <p>Заказа: {{v.order_sn}}</p>
                                </div>
                            </div>
                        </div>
                    </van-list>
                    </van-pull-refresh>
                    <div class="refresh" style="margin-top: 10px" v-if="couponlist.length == 0">
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
        name: "coupon",
        components: {
            Header,
        },
        data() {
            return {
                active:'1',
                title: 'Мой заказ',
                user_id: 0,
                couponlist: [],
                loading: false,     //是否处于加载状态，加载过程中不触发load事件
                finished: false,    //是否已加载完成，加载完成后不再触发load事件
                updata:{
                    pageNumber: 0,  //页码
                    pageSize:20     //每页条数
                },
                currentActive: -1,
                currentActive1: -1,
                currentActive2: -1,
                show: true,
                show1: true,
                show2: true,
                isLoading: false,
            }
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
                this.active = localStorage.getItem('coupon_active')
                this.getusercouponlist();
            }, 0)
        },
        methods: {
            changstatus (e) {
                this.active = e
                localStorage.setItem('coupon_active', this.active)
                this.updata.pageNumber = 0
                this.couponlist = []
                this.getusercouponlist()
            },
            getusercouponlist () {
                this.$axios.post('api/user/Getusercouponlist', {
                    user_id: this.user_id,
                    skip: this.updata.pageNumber,
                    maxperpage: this.updata.pageSize,
                    showtype: this.active
                }).then((e) => {
                    if (e.data.statuscode == 200) {
                        let list = e.data.list
                        this.loading = false;              //是否处于加载状态，加载过程中不触发load事件
                        if (list == null || list.length === 0) {
                            this.finished = true;// 加载结束
                            return
                        }
                        this.updata.pageNumber = e.data.skip;
                        this.couponlist = this.couponlist.concat(list); // 将新数据与老数据进行合并
                    } else {
                        this.finished = true;
                    }
                })
            },
            onLoad() {
                /*let timer = setTimeout(() => {	// 定时器仅针对本地数据渲染动画效果,项目中axios请求不需要定时器
                     					// 调用上面方法,请求数据
                    // this.updata.pageNumber++;					// 分页数加一
                    this.finished && clearTimeout(timer);//清除计时器
                }, 100);*/
                this.getusercouponlist();
            },
            showdetail (id) {
                if (this.show == true) {
                    this.currentActive = id
                    this.show = false
                } else {
                    this.currentActive = -1
                    this.show = true
                }
            },
            showdetail1 (id) {
                if (this.show == true) {
                    this.currentActive1 = id
                    this.show = false
                } else {
                    this.currentActive1 = -1
                    this.show = true
                }
            },
            showdetail2 (id) {
                if (this.show2 == true) {
                    this.currentActive2 = id
                    this.show2 = false
                } else {
                    this.currentActive2 = -1
                    this.show2 = true
                }
            },
            goodsdetail (id) {
                this.$router.push({
                    path: './goodsdetail',
                    query: {
                        goods_id: id,
                        active: this.active
                    }
                })
            },
            //下拉刷新
            onRefresh() {
                setTimeout(() => {
                    this.updata.pageNumber = 0
                    this.updata.pageSize = 20
                    this.couponlist = []
                    this.getusercouponlist();
                    this.isLoading = false;
                }, 1000);
            },
        }
    }
</script>

<style scoped>
    .refresh {
        height: calc( 100vh - 180px);
        overflow-y:auto;
    }
    .Allorder {
        background-color: #eee;
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
        margin: 0 15px;
        padding-top: unset;
        height: 180px;
    }
    .Allshop {
        /*border-bottom: 1px #eee solid;*/
    }
    .Allshop .shop_img {
        width: 160px;
        height: 180px;
    }

    .detail {
        margin: 0 15px;
        display: flex;
    }
    .detail img {
        width: 7%;
        height: 7%;
        margin-left: auto;
    }
    .detail .text {
        font-size: 20px;
        color: #666666;
        font-weight: 200;
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
        height: 60px;
        margin: 15px 15px;
        font-size: 18px;
    }
    .titleTop #date {
        margin: 0 15px 15px 15px;
    }
    #date label {
      font-size: 22px;
        color: #2c3e50;
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
    #shix {
        color: #ff362c;
    }

    .lookdetail {
        background-color: #fcfcfc;
        margin: 0 15px;
        text-align: left;
        border-radius: 15px;
        padding-top: 15px;
        margin-top: 2px;
    }
    .lookdetail h4 {
        margin: unset;
        padding: 0 0 15px 0;
        margin: 0 15px;
    }
    .lookdetail P {
        padding: 0 5px;
        margin: 0 15px;
        color: #666666;
        word-wrap: break-word;
        line-height: 44px;
    }
    #content .lookdetail .border {
        border-top: unset;
    }
    #content .lookdetail .border >>> p{
        margin: unset;
    }
    .lookdetail .desc {
        margin: 0 15px;
        padding-top: 15px;
        border-top: 1px #ccc solid;
    }
    .lookdetail .desc .special {
        padding-left: 15px;
    }
    .border p p {
        margin: 10px 0;
    }
    .forgood li{
        padding-bottom: 10px;
        font-size: 20px;
        line-height: 40px;
        list-style: disc;
        margin-left:45px;
    }
    .btn {
        padding-bottom: 10px;
    }
    .button {
        display: block;
        margin: 0 auto;
        border: unset;
        background-color: #ff362c;
        color: #fff;
        height: 50px;
        border-radius: 25px;
        padding: 0 25px;
        margin-bottom: 15px;
    }
    .order {
        padding-top: 20px;
        border-top: 1px #ccc solid;
        margin: 0 15px;
    }
    .order p{
        margin-top: unset;
        padding: 0 5px;
    }
</style>