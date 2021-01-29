<template>
    <div>
        <Header :title="title"></Header>
        <div class="content">
            <van-search v-model="value" placeholder="Пожалуйста, введите ключевые слова" />
            <div class="option">
                <span @click="all">Все</span>
                <span @click="day">эа день</span>
                <span @click="week">эа неделя</span>
                <span @click="month">эа месяц</span>
                <span class="img" @click="selectdate">
                    <img src="../assets/image/month.png" >
                </span>

                <van-popup v-model="show" round position="bottom" style="z-index: 2113;" >
                    <van-datetime-picker v-model="currentDate" type="year-month" title="Выберите год и месяц" confirm-button-text="подтвердить"
                                         cancel-button-text="отменить" :min-date="minDate" :max-date="maxDate" @confirm="confirmdate" @cancel="cancel"/>
                </van-popup>
            </div>
            <div class="desc">
                <span>Всего: {{count}}</span>
                <span></span>
                <span>{{allperformance}}</span>
                <span>тг.</span>
            </div>

            <div class="list" v-for="(v, k) in list" :key="k">
                <div>
                    <img id="img" v-if="v.headimg" :src="v.headimg">
                    <img id="img" v-else src="../assets/image/default_head_img.png">
                    <p>{{v.user_name}}</p>
                </div>
                <div>
                    <span></span><span>{{v.performance}}</span><span>тг.</span>
                    <span>+7 {{v.mobile_phone}}</span>
                    <span></span>
                </div>
            </div>
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
                date: '',
                allperformance: 0,
                count: 0
            }
        },
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
                }).then((e) => {
                    this.$toast.clear()
                    if (e.data.statuscode == 200) {
                        this.list = e.data.data
                        this.count =e.data.count
                        this.allperformance =e.data.allperformance
                        console.log(e)
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
            }
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
        padding: 0 20px;
        align-self:flex-end
    }
    .option span {
        display: inline-block;
        background-color: #cccccc;
        color: #fff;
        font-size: 18px;
        border-radius: 30px;
        padding: 10px 15px;
    }
    .option .img {
        width: 50px;

    }
    .option .img img{
        width: 30px;
    }
</style>