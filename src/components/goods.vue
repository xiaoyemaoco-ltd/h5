<template>

    <div>
        <Header :title="title"></Header>
        <div id="menu">
            <van-dropdown-menu>
                <van-dropdown-item v-model="value" :options="option" />
                <van-dropdown-item @change="change2" v-model="value2" :options="option2" />
            </van-dropdown-menu>
        </div>
        <!--<div id="header">
            <van-nav-bar title="列表" left-text="返回" left-arrow @click-left="onClickLeft"/>
        </div>-->
        <div id="content">
            <van-list id="list">
                <div id="goods" v-for="(item, index) in list" :key="index" @click="getGoodsDetail(item.goods_id)">
                    <img v-lazy="item.goods_thumb">
                    <p v-if="item.sales > 0" id="sales">Продажи：{{item.sales}}</p>
                    <p v-else id="sales"></p>
                    <P class="text">{{item.goods_name}}</P>
                    <label id="attr">
                        <span id="price">{{item.price}}</span>
                        <span id="dw">тг.</span>
                        <span :id="item.cang == 'CN' ? 'cang' : 'hskst'">{{item.cang}}</span>
                    </label>
                </div>
            </van-list>
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
                title: 'электрический чайник',
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
                list: []
            };
        },
        mounted() {
            this.getGoodsList()
        },
        methods: {
            onClickLeft () {
                this.$router.back()
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
                    cate_id: this.$route.query.cate_id
                }).then((res) => {
                    if (res.data.statuscode == 200) {
                        console.log(res)
                        this.list = res.data.data
                    }
                })
            },
            change2() {
                console.log(this.value2)
                this.$axios.post('api/goods/getGoodsListByCate', {
                    cate_id: this.$route.query.cate_id,
                    order: this.value2
                }).then((res) => {
                    if (res.data.statuscode == 200) {
                        console.log(res)
                        this.list = res.data.data
                    }
                })
            }
        },
    }
</script>

<style scoped>
    #header {
        height: 100px;
        background-color: rgb(238, 10, 36);
    }
    #header .van-nav-bar{
        background-color: unset;
        height: 100px;
    }
    #header >>> .van-nav-bar .van-icon, #header >>> .van-nav-bar .van-nav-bar__text, #header >>> .van-nav-bar .van-nav-bar__title {
        color: #fff;
    }
    #content {
        background-color: #eee;
        height: calc( 100vh - 200px);
        overflow-y:auto;
    }
    #content #list {
        display: flex;
        flex-wrap: wrap;
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
        height: 70px;
    }
    #goods img {
        width: 220px;
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
        font-size: 8px;
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