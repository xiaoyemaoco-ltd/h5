<template>
    <div>
        <div id="header">
            <h2 id="cart">корзина</h2>
            <div id="text">
                <span class="admin_cart" @click="adminCart" v-show="glcart">управлять покупками</span>
                <span class="complete" @click="complete" v-show="plete">выполнить</span>
            </div>
        </div>
        <!--<div id="content">
            <div id="hw">
                <van-swipe-cell id="swipe">
                    <div id="goods">
                        <van-checkbox v-model="checked2"></van-checkbox>
                        <van-image class="image" width="90px" height="80px" radius="5px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                        <div id="detail">
                            <h4>商品标题</h4>
                            <span id="price">8888</span>
                            <span id="ch">x</span>
                            <span id="number">1</span>
                        </div>
                    </div>
                    <template #right>
                        <van-button square type="danger" text="Удалить" />
                        <van-button square type="primary" text="Избранное" />
                    </template>
                </van-swipe-cell>
                <label id="stepper"><van-stepper v-model="value" /></label>
            </div>
            <div id="hw">
                <van-swipe-cell id="swipe">
                    <div id="goods">
                        <van-checkbox v-model="checked2"></van-checkbox>
                        <van-image class="image" width="90px" height="80px" radius="5px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                        <div id="detail">
                            <h4>商品标题</h4>
                            <span id="price">8888</span>
                            <span id="ch">x</span>
                            <span id="number">1</span>
                        </div>
                    </div>
                    <template #right>
                        <van-button square type="danger" text="Удалить" />
                        <van-button square type="primary" text="Избранное" />
                    </template>
                </van-swipe-cell>
                <label id="stepper"><van-stepper v-model="value" /></label>
            </div>
            <div id="hw">
                <van-swipe-cell id="swipe">
                    <div id="goods">
                        <van-checkbox v-model="checked2"></van-checkbox>
                        <van-image class="image" width="90px" height="80px" radius="5px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                        <div id="detail">
                            <h4>商品标题</h4>
                            <span id="price">8888</span>
                            <span id="ch">x</span>
                            <span id="number">1</span>
                        </div>
                    </div>
                    <template #right>
                        <van-button square type="danger" text="Удалить" />
                        <van-button square type="primary" text="Избранное" />
                    </template>
                </van-swipe-cell>
                <label id="stepper"><van-stepper v-model="value" /></label>
            </div>
            <div id="hw">
                <van-swipe-cell id="swipe">
                    <div id="goods">
                        <van-checkbox v-model="checked2"></van-checkbox>
                        <van-image class="image" width="90px" height="80px" radius="5px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                        <div id="detail">
                            <h4>商品标题</h4>
                            <span id="price">8888</span>
                            <span id="ch">x</span>
                            <span id="number">1</span>
                        </div>
                    </div>
                    <template #right>
                        <van-button square type="danger" text="Удалить" />
                        <van-button square type="primary" text="Избранное" />
                    </template>
                </van-swipe-cell>
                <label id="stepper"><van-stepper v-model="value" /></label>
            </div>
            <div id="hw">
                <van-swipe-cell id="swipe">
                    <div id="goods">
                        <van-checkbox v-model="checked2"></van-checkbox>
                        <van-image class="image" width="90px" height="80px" radius="5px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                        <div id="detail">
                            <h4>商品标题</h4>
                            <span id="price">8888</span>
                            <span id="ch">x</span>
                            <span id="number">1</span>
                        </div>
                    </div>
                    <template #right>
                        <van-button square type="danger" text="Удалить" />
                        <van-button square type="primary" text="Избранное" />
                    </template>
                </van-swipe-cell>
                <label id="stepper"><van-stepper v-model="value" /></label>
            </div>
            <div id="hw">
                <van-swipe-cell id="swipe">
                    <div id="goods">
                        <van-checkbox v-model="checked2"></van-checkbox>
                        <van-image class="image" width="90px" height="80px" radius="5px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                        <div id="detail">
                            <h4>商品标题</h4>
                            <span id="price">8888</span>
                            <span id="ch">x</span>
                            <span id="number">1</span>
                        </div>
                    </div>
                    <template #right>
                        <van-button square type="danger" text="Удалить" />
                        <van-button square type="primary" text="Избранное" />
                    </template>
                </van-swipe-cell>
                <label id="stepper"><van-stepper v-model="value" /></label>
            </div>
        </div>-->
        <div id="kong">
            <div id="cartimg">
                <img src="../assets/image/shop/gouwuchekong@2x.png">
            </div>
            <h2>Пустая корзина</h2>
            <p>Вы ничего не купили</p>
            <van-button id="minibnt" round type="danger" size="mini">Перейди на домашнюю страницу</van-button>
        </div>

        <van-submit-bar v-show="sub" label="Всего：" currency='' :price="price" button-text="Подтвердить заказ" @submit="onSubmit">
            <van-checkbox v-model="checked">все</van-checkbox>
        </van-submit-bar>
        <div id="delete" v-show="delshop">
            <van-checkbox id="sel" v-model="checked1">выбрать все</van-checkbox>
            <van-button id="delshop" type="danger">Удалить</van-button>
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
                value: 1,
                sub: true,
                delshop: false,
                active: 'cart',
                glcart: true,
                plete: false,
                price: 3050,
                checked: true,
                checked1: false,
                checked2: false,
            }
        },
        components: {
            Tabbar
        },
        methods: {
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
            onSubmit() {
                this.$router.push('./pay')
            }
        }
    }
</script>

<style scoped>
    #header {
        height: 100px;
        background-color: #ef423a;
        padding: 0 20px 15px 40px;
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
    }
    #header #text .admin_cart, #header #text .complete {
        color: #fff;
        display: inline-block;
        font-size: 26px;
    }
    .van-submit-bar {
        bottom: 100px;
    }
    .van-button--square {
        height: 100%;
    }
    #delete #sel {
        flex: 1;
    }
    #delete #delshop {

    }
    #delete {
        display: flex;
        width: 650px;
        position: fixed;
        bottom: 100px;
        padding: 0 35px;
        z-index: 999;
    }
    #kong {
      text-align: center;
      width: 100%;
      margin-top: 30px;
    }
    #content {
        padding-bottom: 200px;
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
        border-bottom: 1px #eeeeee solid;
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
    #swipe {
        width: 101%;
    }
</style>