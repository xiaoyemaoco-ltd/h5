<template>
    <div>
        <Header :title="title"></Header>
        <div class="content">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh" loading-text="Загрузка..." loosing-text="Отпустите, чтобы обновить..." pulling-text="Отпустите, чтобы обновить...">
                <van-search v-model="value" placeholder="Пожалуйста, введите ключевые слова" search="search"/>
                <div class="option">
                    <span :class="date.indexOf('-') >= 0 ? 'active' : ''" class="img" @click="selectdate">
                        <img src="../assets/image/month.png" >
                    </span>
                    <span :class="date == 'month' ? 'active' : ''" @click="month">эа месяц</span>
                    <span :class="date == 'week' ? 'active' : ''" @click="week">эа неделя</span>
                    <span :class="date == 'day' ? 'active' : ''" @click="day">эа день</span>
                    <span :class="date == 'all' ? 'active' : ''" @click="all">Все</span>

                    <van-popup v-model="show" round position="bottom" style="z-index: 2113;" >
                        <van-datetime-picker v-model="currentDate" type="year-month" title="Выберите год и месяц" confirm-button-text="подтвердить"
                                             cancel-button-text="отменить" :min-date="minDate" :max-date="maxDate" @confirm="confirmdate" @cancel="cancel"/>
                    </van-popup>
                </div>
                <div class="desc">
                    <span>Всего: {{count}}</span>
                    <span class="text">сумма заказа:</span>
                    <span class="money">{{allperformance}}</span>
                    <span>тг.</span>
                </div>

                <div class="list" v-for="(v, k) in list" :key="k">
                    <div class="images">
                        <img id="img" v-if="v.headimg" :src="v.headimg">
                        <img id="img" v-else src="../assets/image/default_head_img.png">
                        <p>{{v.user_name}}</p>
                    </div>
                    <div class="other">
                        <div class="top">
                            <span class="text1">сумма заказа:</span>
                            <span class="money">{{v.performance}}</span>
                            <span>тг.</span>
                        </div>
                        <div class="middle">
                            <span>+7 {{v.mobile_phone}}</span>
                        </div>
                        <div class="bottom ing" v-if="v.status == 1">в Процесс проверки</div>
                        <div class="bottom" v-else @click="applyvip(v.user_id)">настроить как VIP</div>
                    </div>
                </div>

                <div style="margin-top: 10px" v-if="list.length == 0">
                    <img style="width: 100%" src="../assets/image/shop/dingdankong@2x.png">
                </div>
            </van-pull-refresh>
        </div>
    </div>
</template>

<script>
    import Header from "./header";
    export default {
        name: "myuser",
        components: {Header},
        data () {
            return {
                title: 'Мои подписчики',
                minDate: new Date(2020, 1, 1),
                maxDate: new Date(2030, 10, 1),
                currentDate: new Date(),
                show: false,
                value: '',
                user_id: 0,
                list: [],
                date: 'month',
                allperformance: 0,
                count: 0,
                isLoading: false,
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
            this.getlist()
        },
        methods: {
            formatter(type, val) {
                if (type === 'year') {
                    return val;
                } else if (type === 'month') {
                    return val;
                }
                return val;
            },
            selectdate () {
                this.show = true
            },
            search () {
                this.getlist()
            },
            //获取列表
            getlist () {
                this.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                    mask: true,
                    message: "Загрузка..."
                });

                this.$axios.post('api/user/vipInviteUser', {
                    user_id: this.user_id,
                    date: this.date,
                    keyword: this.value
                }).then((e) => {
                    this.$toast.clear()
                    if (e.data.statuscode == 200) {
                        this.list = e.data.data
                        this.count =e.data.count
                        this.allperformance =e.data.allperformance
                    }
                })
            },
            all () {
                this.date = 'all'
                this.getlist()
            },
            day () {
                this.date = 'day'
                this.getlist()
            },
            week () {
                this.date = 'week'
                this.getlist()
            },
            month () {
                this.date = 'month'
                this.getlist()
            },
            //确认时间
            confirmdate (value) {
                this.show = false
                let year = value.getFullYear()
                let month = Number(value.getMonth()) + 1
                this.date = year + '-' + month
                this.getlist()
            },
            //时间取消
            cancel () {
                this.show = false
            },
            //申请vip
            applyvip (user_id) {
                this.$dialog.confirm({
                    title: 'Удалить избранное',
                    message: 'Вы хотите удалить товар?',
                    confirmButtonText: 'подтвердить',
                    cancelButtonText: 'отменить',
                    cancelButtonColor: '#2196f3',
                    confirmButtonColor: '#2196f3'
                })
                .then(() => {
                    this.$toast.loading({
                        duration: 0,
                        forbidClick: true,
                        mask: true,
                        message: "Загрузка..."
                    });

                    this.$axios.post('api/user/applyVip', {
                        plus_user_id: this.user_id,
                        user_id: user_id
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
                        } else {
                            this.$toast.fail(e.data.message)
                        }
                    })
                })
            },
            //下拉刷新
            onRefresh() {
                setTimeout(() => {
                    this.list = []
                    this.getlist();
                    this.isLoading = false;
                }, 1000);
            },
        }
    }
</script>

<style scoped>

    .van-search__content {
        border-radius: 30px;
        background-color: #eee;
    }
    .option {
        display: flex;
        padding: 0 30px 15px 30px;
        align-self:flex-end;
        border-bottom: 1px #eee solid;
        flex-direction: row-reverse;
        background-color: #fff;
    }
    .option span {
        height: 30px;
        line-height: 30px;
        float: right;
        display: inline-block;
        background-color: #cccccc;
        color: #fff;
        font-size: 18px;
        border-radius: 30px;
        padding: 10px 15px;
        margin-left: 10px;
    }
    .option .img {
        width: 50px;

    }
    .option .img img{
        width: 30px;
    }
    .option .active {
        color: #fff;
        background-color: #ff362c;
    }
    .desc {
        padding: 30px 15px;
        text-align: left;
        background-color: #fff;
    }
    .desc span {
        display: inline-block;
        font-size: 30px;
        font-weight: bold;
        margin-right: 15px;
    }
    .desc .money, .other .money {
        color: #ff362c;
        font-size: 30px;
    }
    .desc .text {
        margin-left: 15px;
    }
    .list {
        display: flex;
        margin-top: 20px;
        background-color: #fff;
        border-radius: 15px;
    }
    .content {
        background-color: #eee;
        height: calc( 100vh - 100px );
        overflow-y:auto;
    }
    .images {
        width: 30%;
        margin: 15px 40px;
    }
    .images #img {
        width: 140px;
        border-radius: 50%;
    }
    .images P {
        font-size: 26px;
        margin-bottom: unset;
    }
    .other {
        margin: 15px 20px;
        padding-top: 10px;
        text-align: left;
    }
    .other span {
        display: inline-block;
        font-size: 26px;
    }
    .other .top,  .other .middle, .other .bottom{
        margin: 20px 0;
    }
    .top .text1 {
        color: #686868;
    }
    .other .middle span {
        color: #1989fa;
    }
    .other .bottom {
        width: 100%;
        background-color: #ff362c;
        color: #fff;
        font-size: 30px;
        height: 50px;
        border-radius: 25px;
        padding: 0 15px;
        line-height: 50px;
        text-align: center;
    }
    .other .ing {
        background-color: #686868;
        color: #fff;
    }
</style>