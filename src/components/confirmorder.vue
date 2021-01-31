<template>
    <div>
        <Header :title="title"></Header>
        <div class="content">
            <div class="desc">
                <div class="icon"><van-icon name="todo-list-o" /></div>
                <div class="text">Ваша заявка на покупку успешно отправлена. Пожалуйста, оплатите заказ в течение 30 минут.</div>
            </div>
            <div class="detail">
                <div class="sn">
                    <span class="text1">номер заказа:</span>
                    <span class="text2">{{ordersn}}</span>
                </div>
                <div class="sn amount">
                    <span class="text1">Количество:</span>
                    <span class="text2">{{amount}}</span>
                </div>
            </div>
            <div class="images">
                <div class="img">
                    <img :src="imgs">
                </div>
                <div class="img"><img src="../assets/image/pay/visa.png"></div>
                <div class="img"><img src="../assets/image/pay/mastercard.png"></div>
            </div>
            <van-button round class="btn" @click="pay">Оплата</van-button>
        </div>
    </div>
</template>

<script>
    import Header from './header'
    export default {
        name: "confirmorder",
        data () {
          return {
              title: 'Оплата онлайн',
              amount: 0,
              ordersn: '',
              desc: '',
              pay_code: '',
              imgs: ''
          }
        },
        components: {
            Header
        },
        mounted() {
            if (!this.$route.query.amount || !this.$route.query.ordersn) {
                this.$router.push('./home')
                return
            }
            this.amount = this.$route.query.amount
            this.ordersn = this.$route.query.ordersn
            this.getpaytype()
        },
        methods: {
            //获取支付方式
            getpaytype () {
                this.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                    mask: true,
                    message: "Загрузка..."
                });

                this.$axios.post('api/order/getPaymentMsg', {
                    pay_id: this.$route.query.pay_id
                }).then((e) => {
                    this.$toast.clear()
                    if (e.data.statuscode == 200) {
                        this.desc = e.data.desc
                        this.pay_code = e.data.pay_code
                        this.imgs = this.getImgUrl(this.pay_code)
                    } else {
                        this.$toast.fail(e.data.message)
                    }
                })

            },
            //获取图片路径
            getImgUrl(icon){
                return require("@/assets/image/pay/payment_"+icon+".jpg");
            },
            pay () {
                this.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                    mask: true,
                    message: "Загрузка..."
                });
                this.$axios.post('api/' + this.pay_code + '/payorder', {
                    order_sn: this.ordersn
                }).then((e) => {
                    this.$toast.clear()
                    if (e.data.statuscode == 200) {
                        window.open(e.data.url,"_blank");
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .content {
        text-align: center;
    }
    .desc {
        display: flex;
        width: 95%;
        margin: 20px 15px;
        border: 1px #f60 solid;
        border-radius: 15px;
    }

    .desc .text {
        width: 90%;
        font-size: 20px;
        color: #f60;
        padding: 15px;
        text-align: left;
    }
    .icon {
        margin: 0 auto;
        width: 10%;
    }
    .van-icon {
        vertical-align: center;
    }
    .detail {
        text-align: left;
        margin: 0 15px;
    }
    .detail span {
        display: inline-block;
    }
    .detail .text1{
        font-size: 26px;
        margin-right: 10px;
    }
    .detail .text2{
        font-size: 32px;
        color: #ff362c;
    }
    .sn {
        margin: 20px 0;
        padding: 15px 0;
        border-bottom: 1px #eee solid;
        border-top: 1px #eee solid;
    }
    .images {
        margin: 30px 15px;
        padding-left: 5px;
        display: flex;
    }
    .images .img {
        padding: 10px;
        margin-right: 20px;
        border:1px #ccc solid;
        margin: 0 auto;
    }
    .img img {
        margin: 0 auto;
        width: 80%;
    }
    .btn {
        width: 80%;
        background-color: #ff362c;
        color: #fff;
        height: 80px;
        border-radius: 40px;
        font-size: 34px;
        margin-top: 30px;
    }
    .detail .amount {
        border-top: unset;
        padding-top: unset;
    }
</style>