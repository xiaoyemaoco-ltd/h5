<template>
    <div>
        <Header :title="title"></Header>
        <div class="content">
            <van-swipe-cell v-for="(v, k) in list" :key="k">
                <div class="cell" @click="todetail(v.goods_id)">
                    <div class="image">
                        <img v-lazy="v.goods_thumb">
                    </div>
                    <div class="text">
                        <p>{{v.goods_name}}</p>
                        <div class="price">
                            <div>
                                <span class="money first">{{v.shop_price}}тг.</span>
                                <div class="bottom">
                                    <span class="text1">SKU:</span>
                                    <span class="first text2">{{v.goods_sn}}</span>
                                </div>

                            </div>

                            <div>
                                <span class="text1">бонус:</span><span class="money money1">{{v.brokerage}}тг.</span>
                                <div class="bottom">
                                    <span class="text1">в наличии:</span>
                                    <span class="text2">{{v.goods_number}}</span>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
                <template #right>
                    <van-button square text="удалять" type="danger" class="delete-button" @click="delcollect(v.rec_id)"/>
                    <van-button square text="Поделиться" color="#7232dd" class="delete-button" @click="share"/>
                </template>
            </van-swipe-cell>
        </div>
    </div>
</template>

<script>
    import Header from "./header";
    export default {
        name: "collect",
        components: {Header},
        data () {
            return {
                title: 'Избранное',
                list: [],
                user_id: 0
            }
        },
        inject: ['reload'],
        mounted() {
            let userinfo = JSON.parse(localStorage.getItem('userinfo'))
            if (!userinfo) {
                this.$router.push('./login')
                return
            }
            this.user_id = userinfo.user_id
            this.getgoodslist()
        },
        methods: {
            getgoodslist () {
                this.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                    mask: true,
                    message: "Загрузка..."
                });

                this.$axios.post('api/user/userCollectGoods', {
                    user_id: this.user_id
                }).then((e) => {
                    this.$toast.clear()
                    if (e.data.statuscode == 200) {
                        this.list = e.data.data
                    }
                })
            },
            //删除
            delcollect (id) {
                this.$dialog.confirm({
                    title: 'Удалить избранное',
                    message: 'Вы хотите удалить товар?',
                    confirmButtonText: 'подтвердить',
                    cancelButtonText: 'отменить',
                    cancelButtonColor: '#ee0a24',
                    confirmButtonColor: 'black'
                })
                    // on confirm
                .then(() => {
                    this.$toast.loading({
                        duration: 0,
                        forbidClick: true,
                        mask: true,
                        message: "Загрузка..."
                    });

                    this.$axios.post('api/user/deleteCollectGoods', {
                        user_id: this.user_id,
                        rec_id: id
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
                        }
                    })
                })
                .catch(() => {
                        // on cancel
                });
            },
            //详情
            todetail (id) {
                this.$router.push({
                    path: './goodsdetail',
                    query: {
                        goods_id: id
                    }
                })
            },
            // 分享
            share () {

            }
        }
    }
</script>

<style scoped>
    .content {
        background-color: #eee;
        height: calc( 100vh - 100px );
        overflow-y:auto;
    }
    .cell {
        width: 100%;
        background-color: #fff;
        border-bottom: 1px #eee solid;
        display: flex;
    }
    .cell .image{
        width: 30%;
        margin: 30px;
    }
    .image img{
        width: 100%;
    }
    .cell .text {
        width: 70%;
        padding-right: 15px;
    }
    .cell .text p{
        font-size: 32px;
        font-weight: 500;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .cell .price {
        text-align: left;
        display: flex;
    }
    .price span {
        display: inline-block;
    }
    .price .money {
        width: 100%;
        color: #ff362c;
        font-size: 30px;
    }
    .first {
        margin-right: 50px;
    }
    .text1 {
        color: #686868;
        font-size: 26px;
    }
    .bottom {
        margin-top: 15px;
    }
    .price .money1 {
        width: auto;
    }
    .text2 {
        font-size: 28px;
    }
</style>