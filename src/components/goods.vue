<template>
    <div>
        <Header :title="title"></Header>
        <div id="menu">
            <van-dropdown-menu>
                <van-dropdown-item @change="change2" v-model="value2" :options="option2" />
            </van-dropdown-menu>
        </div>

        <div id="content" v-if="list.length" ref="listBox">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh" loading-text="Загрузка..." loosing-text="Отпустите, чтобы обновить..." pulling-text="Отпустите, чтобы обновить...">
                <van-list id="list" v-model="loading"
                          :finished="finished" offset="20"
                          finished-text=""
                          loading-text="Загрузка..."
                          @load="onLoad">
                    <div id="goods" v-for="(item, index) in list" :key="index" @click="getGoodsDetail(item.goods_id)">
                        <img v-lazy="item.goods_thumb">
                        <p v-if="item.sales > 0" id="sales">Продано：{{item.sales}}</p>
                        <p v-else id="sales"></p>
                        <P class="text">{{item.goods_name}}</P>
                        <label id="attr">
                            <span id="price">{{item.price}}</span>
                            <span id="dw">тг.</span>
                            <span v-if="item.cang" :id="item.cang == 'CN' ? 'cang' : 'hskst'">{{item.cang}}</span>
                        </label>
                    </div>
                </van-list>
            </van-pull-refresh>
        </div>
        <div style="height: 100%; margin-top: 10px" v-else>
            <img style="width: 100%" src="../assets/image/shop/dingdankong@2x.png">
        </div>
    </div>
</template>

<script>
    import Header from "./header";
    export default {
        name: "goods",
        components: {Header},
        data() {
            return {
                title: '',
                value: 0,
                value2: 'default',
                switch1: false,
                switch2: false,
                option: [
                    { text: 'По умолчанию', value: 0 }
                ],
                option2: [
                    { text: 'По умолчанию', value: 'default' },
                    { text: 'цена', value: 'price' },
                    { text: 'объем Продажи', value: 'sales' },
                ],
                list: [],
                keyword: '',
                cate_id: '',
                updata:{
                    pageNumber: 0,  //页码
                    pageSize:20     //每页条数
                },
                isLoading: false,
                loading: false,
                finished: false,
                from: ''
            };
        },
        created() {
            this.title = this.$route.query.cate_name
        },
        mounted() {
            this.keyword = this.$route.query.keyword
            this.cate_id = this.$route.query.cate_id
            this.from = this.$route.query.from
            this.updata.pageNumber = 0
            this.updata.pageSize = 20
            this.$toast.loading({
                duration: 0,
                forbidClick: true,
                message: "Загрузка..."
            });
            if (localStorage.getItem('goods_order')) {
                this.value2 = localStorage.getItem('goods_order')
            }
            this.getGoodsList()
        },
        methods: {
            onLoad() {
                this.getGoodsList();
            },
            getGoodsDetail (goods_id) {
                this.$router.push({
                    path: './goodsdetail',
                    query: {
                        goods_id: goods_id
                    }
                })
            },
            getGoodsList() {
                this.$axios.post('api/goods/getGoodsListByCate', {
                    cate_id: this.$route.query.cate_id,
                    keyword: this.keyword,
                    from: this.from,
                    order: this.value2,
                    skip: this.updata.pageNumber,
                    maxperpage: this.updata.pageSize
                }).then((res) => {
                    this.$toast.clear();
                    if (res.data.statuscode == 200) {
                        let e = Object.values(res.data.data)
                        this.loading = false;
                        if (e == null || e.length === 0) {
                            this.finished = true;           // 加载结束
                            return;
                        } else {
                            this.updata.pageNumber = res.data.skip;
                            this.list = this.list.concat(e);
                        }
                    } else {
                        this.finished = true;
                    }
                })
            },
            change2() {
                this.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                    mask: true,
                    message: "Загрузка..."
                });
                this.updata.pageNumber = 0
                this.updata.pageSize = 20
                this.finished = false;
                this.list = []
                localStorage.setItem('goods_order', this.value2)
                this.getGoodsList()
            },
            //下拉刷新
            onRefresh() {
                setTimeout(() => {
                    this.updata.pageNumber = 0
                    this.updata.pageSize = 20
                    this.list = []
                    this.getGoodsList();
                    this.isLoading = false;
                }, 1000);
            },
        },
    }
</script>

<style scoped>
    #header .van-nav-bar{
        background-color: unset;
        height: 100px;
    }
    #header >>> .van-nav-bar .van-icon, #header >>> .van-nav-bar .van-nav-bar__text, #header >>> .van-nav-bar .van-nav-bar__title {
        color: #fff;
    }
    #list >>> .van-list__finished-text, #list >>>.van-list__loading {
        margin: 0 auto;
    }
    #content {
        background-color: #eee;
        height: calc( 100vh - 190px);
        overflow-y:auto;
    }
    #content #list {
        display: flex;
        flex-wrap: wrap;
    }
    #list >>> .van-list__loading {
        width: 100%;
    }
    #content #goods {
        width: 47.5%;
        margin: 12px 0 0px 12px;
        background-color: #ffffff;
        padding: 10px 0;
        border-radius: 15px;
    }
    #goods #sales {
        margin: 0 20px;
        color: #cccccc;
        text-align: left;
        height: 30px;
    }
    #goods #attr {
        display: inline-block;
        width: 300px;
    }
    #goods .text {
        text-align: left;
        margin-left: 20px;
        height: 60px;
        line-height: 30px;
        text-overflow: -o-ellipsis-lastline;
        text-overflow: ellipsis;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    #goods img {
        width: 250px;
        height: 250px;
    }
    #attr #price, #attr #dw {
        float: left;
        display: inline-block;
    }
    #attr #price {
        font-size: 30px;
        color: rgb(238, 10, 36);
        margin-right: 10px;
    }
    #attr #dw {
        font-size: 24px;
        padding-top: 6px;
    }
    #attr #cang {
        text-align: center;
        width: 50px;
        height: 35px;
        float: right;
        display: inline-block;
        background-color: rgb(238, 10, 36);
        color: #ffffff;
        line-height: 40px;
        border-radius: 5px;
    }
    #hskst {
        text-align: center;
        background-color: #00a0de;
        width: 45px;
        height: 35px;
        float: right;
        display: inline-block;
        color: #ffffff;
        line-height: 40px;
        border-radius: 5px;
    }
</style>