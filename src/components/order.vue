<template>
    <div>
        <Header :title="title"></Header>
        <div class="Allorder" id="middle">
            <van-tabs :active="active">
              <van-search v-model="value" placeholder="введите ключевое слово для поиска" />
                <van-tab title="Bce" name="a">
                    <div id="content">
                        <div class="AllCode">
                            <div class="codeOrder">номер заказа:1234567890</div>
                            <div class="paid">время：13-01-2021 15:25</div>
                        </div>
                        <div class="Allshop">
                            <div class="shop_img">
                                <img src="https://img.yzcdn.cn/vant/cat.jpeg" />
                            </div>
                            <div class="shop_price">
                                <div class="titleTop">
                                    <h3>123456123456123456123456123456123456123456123456123456123456</h3>
                                    <p class="priceShop">sfasdfsflklasdlfksfieidskflsfasdfsflklasdlfksfieidskflsfasdfsflklasdlfksfieidskflsfasdfsflklasdlfksfieidskfl</p>
                                </div>
                                <div class="titleBottom">
                                    <span class="shopNumber">200</span>
                                    <span class="shopNums">x2</span>
                                </div>
                            </div>
                        </div>
                        <div class="priceNum">
                            <label id="total">Bcero：</label>
                            <label id="num">2</label>
                            <label id="total">Toвap：</label>
                            <label id="num">9999</label>
                        </div>
                        <div id="status">
                            <button class="paid_btn paid_detail">пожалуйста</button>
                            <button class="paid_btn" @click="getOrderDetail">спецификация</button>
                            <div style="clear: both;"></div>
                        </div>
                    </div>
                    <div id="content">
                        <div class="AllCode">
                            <div class="codeOrder">номер заказа:1234567890</div>
                            <div class="paid">время：13-01-2021 15:25</div>
                        </div>
                        <div class="Allshop">
                            <div class="shop_img">
                                <img src="https://img.yzcdn.cn/vant/cat.jpeg" />
                            </div>
                            <div class="shop_price">
                                <div class="titleTop">
                                    <h3>123456123456123456123456123456123456123456123456123456123456</h3>
                                    <p class="priceShop">sfasdfsflklasdlfksfieidskflsfasdfsflklasdlfksfieidskflsfasdfsflklasdlfksfieidskflsfasdfsflklasdlfksfieidskfl</p>
                                </div>
                                <div class="titleBottom">
                                    <span class="shopNumber">200</span>
                                    <span class="shopNums">x2</span>
                                </div>
                            </div>
                        </div>
                        <div class="priceNum">
                            <label id="total">Bcero：</label>
                            <label id="num">2</label>
                            <label id="total">Toвap：</label>
                            <label id="num">9999</label>
                        </div>
                        <div id="status">
                            <button class="paid_btn paid_detail">пожалуйста</button>
                            <button class="paid_btn">спецификация</button>
                            <div style="clear: both;"></div>
                        </div>
                    </div>
                    <div id="content">
                        <div class="AllCode">
                            <div class="codeOrder">номер заказа:1234567890</div>
                            <div class="paid">время：13-01-2021 15:25</div>
                        </div>
                        <div class="Allshop">
                            <div class="shop_img">
                                <img src="https://img.yzcdn.cn/vant/cat.jpeg" />
                            </div>
                            <div class="shop_price">
                                <div class="titleTop">
                                    <h3>123456123456123456123456123456123456123456123456123456123456</h3>
                                    <p class="priceShop">sfasdfsflklasdlfksfieidskflsfasdfsflklasdlfksfieidskflsfasdfsflklasdlfksfieidskflsfasdfsflklasdlfksfieidskfl</p>
                                </div>
                                <div class="titleBottom">
                                    <span class="shopNumber">200</span>
                                    <span class="shopNums">x2</span>
                                </div>
                            </div>
                        </div>
                        <div class="priceNum">
                            <label id="total">Bcero：</label>
                            <label id="num">2</label>
                            <label id="total">Toвap：</label>
                            <label id="num">9999</label>
                        </div>
                        <div id="status">
                            <button class="paid_btn paid_detail">пожалуйста</button>
                            <button class="paid_btn">спецификация</button>
                            <div style="clear: both;"></div>
                        </div>
                    </div>
                    <div id="content">
                        <div class="AllCode">
                            <div class="codeOrder">номер заказа:1234567890</div>
                            <div class="paid">время：13-01-2021 15:25</div>
                        </div>
                        <div class="Allshop">
                            <div class="shop_img">
                                <img src="https://img.yzcdn.cn/vant/cat.jpeg" />
                            </div>
                            <div class="shop_price">
                                <div class="titleTop">
                                    <h3>123456123456123456123456123456123456123456123456123456123456</h3>
                                    <p class="priceShop">sfasdfsflklasdlfksfieidskflsfasdfsflklasdlfksfieidskflsfasdfsflklasdlfksfieidskflsfasdfsflklasdlfksfieidskfl</p>
                                </div>
                                <div class="titleBottom">
                                    <span class="shopNumber">200</span>
                                    <span class="shopNums">x2</span>
                                </div>
                            </div>
                        </div>
                        <div class="priceNum">
                            <label id="total">Bcero：</label>
                            <label id="num">2</label>
                            <label id="total">Toвap：</label>
                            <label id="num">9999</label>
                        </div>
                        <div id="status">
                            <button class="paid_btn paid_detail">пожалуйста</button>
                            <button class="paid_btn">спецификация</button>
                            <div style="clear: both;"></div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="Ожидающий">
                    <div id="content">
                        <div class="AllCode">
                            <div class="codeOrder">номер заказа:1234567890</div>
                            <div class="paid">время：13-01-2021 15:25</div>
                        </div>
                        <div class="Allshop">
                            <div class="shop_img">
                                <img src="https://img.yzcdn.cn/vant/cat.jpeg" />
                            </div>
                            <div class="shop_price">
                                <div class="titleTop">
                                    <h3>123456123456123456123456123456123456123456123456123456123456</h3>
                                    <p class="priceShop">sfasdfsflklasdlfksfieidskflsfasdfsflklasdlfksfieidskflsfasdfsflklasdlfksfieidskflsfasdfsflklasdlfksfieidskfl</p>
                                </div>
                                <div class="titleBottom">
                                    <span class="shopNumber">200</span>
                                    <span class="shopNums">x2</span>
                                </div>
                            </div>
                        </div>
                        <div class="priceNum">
                            <label id="total">Bcero：</label>
                            <label id="num">2</label>
                            <label id="total">Toвap：</label>
                            <label id="num">9999</label>
                        </div>
                        <div id="status">
                            <button class="paid_btn paid_detail">пожалуйста</button>
                            <button class="paid_btn">спецификация</button>
                            <div style="clear: both;"></div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="Aктивный">
                    <div id="content">
                        <div class="AllCode">
                            <div class="codeOrder">номер заказа:1234567890</div>
                            <div class="paid">время：13-01-2021 15:25</div>
                        </div>
                        <div class="Allshop">
                            <div class="shop_img">
                                <img src="https://img.yzcdn.cn/vant/cat.jpeg" />
                            </div>
                            <div class="shop_price">
                                <div class="titleTop">
                                    <h3>123456123456123456123456123456123456123456123456123456123456</h3>
                                    <p class="priceShop">sfasdfsflklasdlfksfieidskflsfasdfsflklasdlfksfieidskflsfasdfsflklasdlfksfieidskflsfasdfsflklasdlfksfieidskfl</p>
                                </div>
                                <div class="titleBottom">
                                    <span class="shopNumber">200</span>
                                    <span class="shopNums">x2</span>
                                </div>
                            </div>
                        </div>
                        <div class="priceNum">
                            <label id="total">Bcero：</label>
                            <label id="num">2</label>
                            <label id="total">Toвap：</label>
                            <label id="num">9999</label>
                        </div>
                        <div id="status">
                            <button class="paid_btn paid_detail">пожалуйста</button>
                            <button class="paid_btn">спецификация</button>
                            <div style="clear: both;"></div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="завершено">
                    <div id="content">
                        <div class="AllCode">
                            <div class="codeOrder">номер заказа:1234567890</div>
                            <div class="paid">время：13-01-2021 15:25</div>
                        </div>
                        <div class="Allshop">
                            <div class="shop_img">
                                <img src="https://img.yzcdn.cn/vant/cat.jpeg" />
                            </div>
                            <div class="shop_price">
                                <div class="titleTop">
                                    <h3>123456123456123456123456123456123456123456123456123456123456</h3>
                                    <p class="priceShop">sfasdfsflklasdlfksfieidskflsfasdfsflklasdlfksfieidskflsfasdfsflklasdlfksfieidskflsfasdfsflklasdlfksfieidskfl</p>
                                </div>
                                <div class="titleBottom">
                                    <span class="shopNumber">200</span>
                                    <span class="shopNums">x2</span>
                                </div>
                            </div>
                        </div>
                        <div class="priceNum">
                            <label id="total">Bcero：</label>
                            <label id="num">2</label>
                            <label id="total">Toвap：</label>
                            <label id="num">9999</label>
                        </div>
                        <div id="status">
                            <button class="paid_btn paid_detail">пожалуйста</button>
                            <button class="paid_btn">спецификация</button>
                            <div style="clear: both;"></div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="Отменено">
                    <div id="content">
                        <div class="AllCode">
                            <div class="codeOrder">номер заказа:1234567890</div>
                            <div class="paid">время：13-01-2021 15:25</div>
                        </div>
                        <div class="Allshop">
                            <div class="shop_img">
                                <img src="https://img.yzcdn.cn/vant/cat.jpeg" />
                            </div>
                            <div class="shop_price">
                                <div class="titleTop">
                                    <h3>123456123456123456123456123456123456123456123456123456123456</h3>
                                    <p class="priceShop">sfasdfsflklasdlfksfieidskflsfasdfsflklasdlfksfieidskflsfasdfsflklasdlfksfieidskflsfasdfsflklasdlfksfieidskfl</p>
                                </div>
                                <div class="titleBottom">
                                    <span class="shopNumber">200</span>
                                    <span class="shopNums">x2</span>
                                </div>
                            </div>
                        </div>
                        <div class="priceNum">
                            <label id="total">Bcero：</label>
                            <label id="num">2</label>
                            <label id="total">Toвap：</label>
                            <label id="num">9999</label>
                        </div>
                        <div id="status">
                            <button class="paid_btn paid_detail">пожалуйста</button>
                            <button class="paid_btn">спецификация</button>
                            <div style="clear: both;"></div>
                        </div>
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
                active:'a',
                value: ''
            }
        },
        components: {
            Header
        },
        methods: {
            getOrderDetail() {
                this.$router.push('./orderdetail')
            }
        }
    }
</script>

<style scoped>
    .Allorder {
        background-color: #eee;
        margin-bottom: 100px;
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
        padding: 20px 30px 0 0;
    }
    .priceNum #num {
        color: #EE0B0B;
        margin-right: 20px;
    }
    #status {
        text-align: right;
        height: 50px;
        padding: 20px 30px 0 0;
    }
    #status .paid_btn {
        margin-right: 20px;
        border-radius: 3px;
    }
    .paid_detail {
        color: #EE0B0B;
    }
</style>