<template>
    <div>
        <div id="header">
            <h2 id="cart">корзина</h2>
            <div id="text">
                <span class="admin_cart" @click="adminCart" v-show="glcart">управлять покупками</span>
                <span class="complete" @click="complete" v-show="plete">выполнить</span>
            </div>
        </div>
        <div id="content" v-if="list.length > 0">
            <van-checkbox-group v-model="checked2" @change="selectone" ref="checkboxGroup">
                <div id="hw" v-for="(item, index) in list" :key="index">
                    <van-checkbox style="width: 6%" icon-size="28rpx" :name="item.rec_id"></van-checkbox>
                    <van-swipe-cell id="swipe">
                        <div id="goods" @click="goToDetail(item.goods_id)">
                            <img v-lazy="item.goods_thumb" style="width: 90px; height: 80px">
                            <div id="detail">
                                <h4>{{item.goods_name}}</h4>
                                <span id="price">{{item.total_price}} тг.</span>
                                <span id="ch">x</span>
                                <span id="number">{{item.goods_number}}</span>
                            </div>
                        </div>
                        <label id="stepper"><van-stepper :value="item.goods_number" @change="changenum($event,item)" /></label>
                        <template #right>
                            <van-button square type="danger" text="Удалить" @click="delcartone(item.rec_id)" />
                            <van-button square type="primary" text="Избранное" @click="collect(item.goods_id)" />
                        </template>
                    </van-swipe-cell>
                </div>
            </van-checkbox-group>
        </div>

        <!--购物车为空-->
        <div id="kong" v-if="list.length == 0">
            <div id="cartimg">
                <img src="../assets/image/shop/gouwuchekong@2x.png">
            </div>
            <h2>Пустая корзина</h2>
            <p>Вы ничего не купили</p>
            <van-button id="minibnt" @click="toindex" round type="danger" size="mini">Перейди на домашнюю страницу</van-button>
        </div>


        <van-submit-bar v-show="sub" :decimal-length="0" label="Всего：" currency='' :price="price" button-text="Подтвердить заказ" @submit="onSubmit">
            <van-checkbox v-model="checkedAll" @click="selectall">все</van-checkbox>
        </van-submit-bar>

        <div id="delete" v-show="delshop">
            <van-checkbox id="sel" v-model="checkedAll" @click="delselectall">выбрать все</van-checkbox>
            <van-button id="delshop" type="danger" @click="delcart">Удалить</van-button>
        </div>
        <tabbar :active="active"></tabbar>
    </div>
</template>

<script>
    import Tabbar from "./tabbar";
    export default {
        name: "cart",
        data () {
            return {
                sub: true,
                delshop: false,
                active: 'cart',
                glcart: true,
                plete: false,
                price: 0,
                checkedAll: false,
                checked1: false,
                checked2: [],
                list: [],
                user_id: 0
            }
        },
        components: {
            Tabbar
        },
        inject: ['reload'],
        mounted() {
            let userinfo = localStorage.getItem('userinfo')
            // if (!userinfo) {
            //     this.$router.push('./login')
            //     return
            // }

            if (userinfo) {
                this.user_id = JSON.parse(userinfo).user_id
                this.getCartList()
            }
        },
        methods: {
            toindex () {
                this.$router.push('/')
            },
            adminCart() {
                this.glcart = false
                this.plete = true
                this.delshop = true
                this.sub = false
            },
            complete() {
                this.glcart = true
                this.plete = false
                this.delshop = false
                this.sub = true
            },
            //去支付
            onSubmit() {
                if (!(this.checked2.length > 0)) {
                    this.$toast({
                        type: 'fail',
                        message: 'Пожалуйста, выберите продукт',
                    })
                    return
                }
                this.$router.push({
                    path: './pay',
                    query: {
                        rec_ids: this.checked2,
                        price: this.price
                    }
                })
            },
            //改变数量
            changenum($event, item) {
                this.$axios.post('api/goods/changeCartGoodsNumber', {
                    rec_id: item.rec_id,
                    goods_number: $event
                }).then((e) => {
                    if (e.data.statuscode == 200) {
                        this.getCartList()
                    }
                })
            },
            //单个删除
            delcartone(id) {

                this.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                    mask: true,
                    message: "Загрузка..."
                });

                this.$axios.post('api/goods/delCartGoods', {
                    rec_ids: id
                }).then((e) => {
                    this.$toast.clear(); // 关闭加载
                    if (e.data.statuscode == 200) {
                        this.$toast({
                            type: 'success',
                            message: e.data.message,
                            onClose: () => {
                                this.getCartList()
                            }
                        })
                    } else {
                        this.$toast({
                            type: 'success',
                            message: e.data.message,
                        })
                    }
                })
            },
            //全部删除
            delcart() {
                if (this.checked2.length == 0) {
                    this.$toast({
                        type: 'fail',
                        message: 'Пожалуйста, выберите продукт',
                    })
                    return
                }

                this.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                    mask: true,
                    message: "Загрузка..."
                });

                this.$axios.post('api/goods/delCartGoods', {
                    rec_ids: this.checked2
                }).then((e) => {
                    if (e.data.statuscode == 200) {
                        this.$toast({
                            type: 'success',
                            message: e.data.message,
                            onClose: () => {
                                this.getCartList()
                            }
                        })
                    } else {
                        this.$toast({
                            type: 'success',
                            message: e.data.message,
                        })
                    }
                })
            },
            //购物车列表
            getCartList() {
                this.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                    mask: true,
                    message: "Загрузка..."
                });
                this.$axios.post('api/goods/getUserCart', {
                    user_id: this.user_id
                }).then((e) => {
                    this.$toast.clear(); // 关闭加载
                    if (e.data.statuscode == 200) {
                        this.list = e.data.data
                        this.checked2 = []
                        this.list.map((v) => {
                            if (v.can_handsel == 1) {
                                this.checked2.push(v.rec_id)
                                this.price += parseInt(v.goods_price) * 100
                            }
                        })
                        if (this.checked2.length ==  Object.keys(this.list).length) {
                            this.checkedAll = true
                        }
                        if (Object.keys(this.list).length == 0) {
                            this.checkedAll = false
                        }


                    }
                })
            },
            //全选
            selectall() {
                if (this.checkedAll == false) {
                    this.$refs.checkboxGroup.toggleAll();
                    this.price = 0
                } else {
                    this.$refs.checkboxGroup.toggleAll(true);
                    this.price = 0
                    this.list.map((item) => {
                        this.price += parseInt(item.total_price) * 100
                    })
                }
            },
            //删除全选
            delselectall() {
                if (this.checkedAll == false) {
                    this.$refs.checkboxGroup.toggleAll();
                } else {
                    this.$refs.checkboxGroup.toggleAll(true);
                }
            },
            //单选
            selectone() {
                if (this.checked2.length == Object.keys(this.list).length) {
                    this.checkedAll = true
                } else {
                    this.checkedAll = false
                }
                this.price = 0
                this.list.map((item) => {
                    this.checked2.map((v) => {
                        if (v == item.rec_id) {
                            this.price += parseInt(item.total_price) * 100
                        }
                    })
                })

                this.selected(this.checked2)
            },
            //去详情
            goToDetail(goods_id) {
                this.$router.push({
                    path: './goodsdetail',
                    query: {
                        goods_id: goods_id
                    }
                })
            },
            //选中
            selected ($ids) {
                // this.$toast.loading({
                //     duration: 0,
                //     forbidClick: true,
                //     mask: true,
                //     message: "Загрузка..."
                // });
                this.$axios.post('api/goods/cartSelected', {
                    cart_ids: $ids,
                    user_id: this.user_id
                }).then(() => {
                    this.$toast.clear(); // 关闭加载
                })
            },
            //收藏
            collect (id) {
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
                    goods_id: id
                }).then((e) => {
                    this.$toast.clear()
                    if (e.data.statuscode == 200) {
                        this.reload()
                    }
                })
            },
        }
    }
</script>

<style scoped>
    #header {
        height: 100px;
        background-color: #ef423a;
        padding: 0 20px;
    }
    #header #cart {
        float: left;
        height: 100%;
        display: inline-block;
        line-height: 100px;
        margin: unset;
        color: #fff;
    }
    #stepper {
        text-align: right;
    }
    #header #text {
        color: #fff;
        float: right;
        height: 100%;
    }
    #header #text .admin_cart, #header #text .complete {
        color: #fff;
        display: inline-block;
        font-size: 26px;
        height: 100%;
        line-height: 100px;
    }
    /*iphoneX、iphoneXs*/
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .van-submit-bar, #delete {
            bottom: 125px !important
        }
    }

    /*iphone Xs Max*/
    @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio:3) {
        .van-submit-bar, #delete {
            bottom: 125px !important
        }
    }

    /*iphone XR*/
    @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio:2) {
        .van-submit-bar, #delete {
            bottom: 125px !important
        }
    }
    .van-submit-bar {
        bottom: 90px;
    }
    .van-button--square {
        height: 100%;
    }
    #delete #sel {
        flex: 1;
        margin-left: 20px;
    }
    #delete #delshop {
        margin-right: 20px;
    }
    #delete {
        display: flex;
        width: 100%;
        position: fixed;
        bottom: 100px;
        padding: 10px 0;
        z-index: 999;
        background-color: #fff;
    }
    #kong {
      text-align: center;
      width: 100%;
      margin-top: 30px;
    }
    #content {
        padding-bottom: 200px;
        height: calc( 100vh - 300px);
        overflow-y:auto;
    }
    #content::-webkit-scrollbar {
        width: 0 !important;
    }
    #cartimg {
      width: 80%;
      margin: 0 auto;
    }
    #cartimg img {
      width: 80%;
    }
    #minibnt {
      width: 65%;
      height: 65px;
      font-size: 28px;
        background-color: #ff362c;
    }
    #content #goods {
        display: flex;
    }
    #content #hw {
        display: flex;
        border-bottom: 1px #eeeeee solid;
        padding: 15px 20px;
    }
    #goods .image {
        margin: 0 25px;
    }
    #goods #detail {
        margin-left: 35px;
        text-align: left;
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
    #swipe {
        width: 94%;
    }
</style>