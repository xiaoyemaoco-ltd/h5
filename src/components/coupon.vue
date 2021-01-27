<template>
    <div>
        <Header :title="title"></Header>
        <div class="Allorder">
            <van-tabs :active="active" @click="changstatus">
                <van-tab title="доверенное" name="1">
                    <van-list
                            v-model="loading"
                            :finished="finished"
                            finished-text="Больше не надо"
                            loading-text="Загрузка..."
                            error-text="Больше не надо"
                            @load="onLoad"
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
                                    </div>
                                </div>
                                <div id="money">
                                    <h2>{{v.amount}}тг.</h2>
                                    <van-button id="use" round type="info">применять</van-button>
                                </div>
                            </div>
                        </div>
                    </van-list>
                </van-tab>
                <van-tab title="использованный" name="2">
                    <van-list v-model="loading" :finished="finished" finished-text="Больше не надо" loading-text="Загрузка..."
                            @load="onLoad">
                        <div id="content" v-for="(v, k) in couponlist" :key="k">
                            <div class="Allshop">
                                <div class="shop_price">
                                    <div class="titleTop">
                                        <h3>{{v.name}}</h3>
                                        <div id="date">
                                            <label>Срок действия ваучера：</label>
                                            <span class="priceShop">{{v.stoptime_show}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div id="money" style="background-color: #cccccc;">
                                    <h2>{{v.amount}}тг.</h2>
                                    <!--<van-button id="use" round type="info">применять</van-button>-->
                                </div>
                            </div>
                        </div>
                    </van-list>
                </van-tab>
                <van-tab title="истекший" name="3">
                    <van-list v-model="loading" :finished="finished" finished-text="Больше не надо" loading-text="Загрузка..."
                              @load="onLoad">
                        <div id="content" v-for="(v, k) in couponlist" :key="k">
                            <div class="Allshop">
                                <div class="shop_price">
                                    <div class="titleTop">
                                        <h3>{{v.name}}</h3>
                                        <div id="date">
                                            <label id="shix">Срок действия ваучера：</label>
                                            <span id="shix" class="priceShop">{{v.stoptime_show}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div id="money" style="background-color: #cccccc;">
                                    <h2>{{v.amount}}тг.</h2>
                                    <!--<van-button id="use" round type="info">применять</van-button>-->
                                </div>
                            </div>
                        </div>
                    </van-list>
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
                active:'1',
                title: 'Мой заказ',
                user_id: 0,
                couponlist: [],
                loading: false,     //是否处于加载状态，加载过程中不触发load事件
                finished: false,    //是否已加载完成，加载完成后不再触发load事件
                updata:{
                    pageNumber: 0,  //页码
                    pageSize:20     //每页条数
                }
            }
        },
        mounted() {
            let userinfo = JSON.parse(localStorage.getItem('userinfo'))
            if (!userinfo) {
                this.$router.push('./login')
                return
            }
            this.user_id = userinfo.user_id
            this.updata.pageNumber = 0
            this.updata.pageSize = 20
        },
        methods: {
            changstatus (e) {
                console.log(e)
                this.active = e
                this.updata.pageNumber = 0
                this.couponlist = []
                this.finished = false;
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
                            this.finished = true;           // 加载结束
                            return;
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
        }
    }
</script>

<style scoped>
    .van-tab__pane {
        height: calc( 100vh - 210px);
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
        padding: 20px 20px;
        padding-top: unset;
        height: 160px;
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
        height: 70px;
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
    #shix {
        color: #ff362c;
    }
</style>