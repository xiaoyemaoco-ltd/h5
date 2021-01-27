<template>
    <div>
        <Header :title="title"></Header>
        <div class="content">
            <div class="desc">
                <div class="icon"><van-icon name="todo-list-o" /></div>
                <div class="text">Ваша заявка на покупку успешно отправлена. Пожалуйста, оплатите заказ в течение 30 минут.</div>
            </div>
            <div class="detail">
                <div>
                    <span>номер заказа</span>
                    <span>{{ordersn}}</span>
                </div>
                <div>
                    <span>Количество</span>
                    <span>{{amount}}</span>
                </div>
            </div>
            <div class="images">
                <img :src="imgs">
                <img src="../assets/image/pay/visa.jpg">
                <img src="../assets/image/pay/mastercard.jpg">
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
        margin: 20px auto;
        border: 1px #f60 solid;
        border-radius: 5px;
    }

    .desc .text {
        font-size: 9px;
        color: #f60;
        text-align: left;
    }
    .icon {
        margin: 0 auto;
    }
    .van-icon {
        vertical-align: center;
    }
</style>