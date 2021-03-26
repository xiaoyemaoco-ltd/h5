<template>
    <div>
        <Header :title="title"></Header>
        <div class="content">
            <van-pull-refresh class="refresh" v-model="isLoading" @refresh="onRefresh" loading-text="Загрузка..." loosing-text="Отпустите, чтобы обновить..." pulling-text="Отпустите, чтобы обновить...">
                <div>
                    <van-search v-model="value" placeholder="Пожалуйста, введите ключевые слова" @search="search"/>
                    <van-dropdown-menu class="sel">
                        <van-dropdown-item v-model="value1" :options="option1" @change="onchange1"/>
                        <van-dropdown-item v-model="value2" :options="option2" @change="onchange" />
                    </van-dropdown-menu>

                    <van-popup v-model="show" round position="bottom" style="z-index: 2113;" >
                        <van-datetime-picker v-model="currentDate" type="year-month" title="Выберите год и месяц" confirm-button-text="подтвердить"
                                             cancel-button-text="отменить" :min-date="minDate" :max-date="maxDate" @confirm="confirmdate" @cancel="cancel"/>
                    </van-popup>
                </div>

                <div class="count">
                    <div class="all">
                        <span>Всего:</span>
                        <span class="money">{{split_total}}тг.</span>
                        <span>{{split_total_count}}шт.</span>
                    </div>
                    <div class="all">
                        <span>Мои подписчики:</span>
                        <span class="money">{{split_mobile}}тг.</span>
                        <span>{{split_mobile_count}} шт.</span>
                    </div>
                    <div class="all">
                        <span>Поделись:</span>
                        <span class="money">{{split_h5}}тг.</span>
                        <span>{{split_h5_count}} шт.</span>
                    </div>
                    <div class="all">
                        <span>Мой заказ:</span>
                        <span class="money">{{split_self}}тг.</span>
                        <span>{{split_self_count}} шт.</span>
                    </div>
                </div>

                <van-list
                    v-model="loading" offset="10"
                    :finished="finished"
                    finished-text="Больше не надо"
                    loading-text="Загрузка..."
                    @load="onLoad" v-if="list.length > 0"
                >
                    <div class="list" v-for="(v, k) in list" :key="k">
                        <div class="top">
                            <h3>{{v.split_money}}</h3>
                            <span class="unit">тг.</span>
                            <span class="status">{{v.status_code}}</span>
                        </div>
                        <div class="second">
                            <span class="proname text">сумма заказа:</span>
                            <span class="prome">{{v.pay_money}}</span>
                            <span class="text">тг.</span>
                            <div class="right">
                                <img src="../assets/image/fenxiang@2x.png" />
                                <span class="text">{{v.xd_user_name}}</span>
                            </div>
                        </div>

                        <div class="second">
                            <span class="text date">{{v.creat_time}}</span>
                        </div>

                        <div class="second bottom">
                            <img src="../assets/image/icon-ok.png">
                            <p class="text date">{{v.invalid_res}}</p>
                        </div>
                    </div>
                </van-list>

                <div style="height: 100%; margin-top: 10px" v-if="list.length == 0">
                    <img style="width: 100%" src="../assets/image/shop/dingdankong@2x.png">
                    <P style="font-weight: bold; font-size: 16px; text-align: center">Не удалось найти никакой информации</P>
                </div>

            </van-pull-refresh>

        </div>

    </div>
</template>

<script>
    import Header from "./header";
    export default {
        name: "brokerage",
        components: {Header},
        data () {
            return {
                show: false,
                title: 'Мои комиссия',
                value: '',
                value1: 0,
                value2: '3',
                option1: [
                    { text: 'Все', value: -1 },
                    { text: 'В Ожидаемый', value: 0 },
                    { text: 'Начисленные', value: 1 },
                    { text: 'недействительным', value: 2 },
                ],
                option2: [
                    { text: 'Все', value: '0' },
                    { text: 'эа день', value: '1' },
                    { text: 'эа неделя', value: '2' },
                    { text: 'эа месяц', value: '3' },
                    { text: 'период отбора', value: '-1' },
                ],
                minDate: new Date(2020, 1, 1),
                maxDate: new Date(2030, 10, 1),
                currentDate: new Date(),
                date: '',
                startdate: '',
                list: [],
                loading: false,     //是否处于加载状态，加载过程中不触发load事件
                finished: false,    //是否已加载完成，加载完成后不再触发load事件
                updata:{
                    pageNumber: 0,  //页码
                    pageSize:20     //每页条数
                },
                user_id: 0,
                split_total: 0,
                split_total_count: 0,
                split_self: 0,
                split_self_count: 0,
                split_mobile: 0,
                split_mobile_count: 0,
                split_h5: 0,
                split_h5_count: 0,
                isLoading: false,
            }
        },
        mounted() {
            let userinfo = JSON.parse(localStorage.getItem('userinfo'))
            if (!userinfo) {
                this.$router.push('./login')
                return
            }
            this.user_id = userinfo.user_id
            this.updata.pageNumber = 0
            this.updata.pageSize = 20
            this.getlist();
        },
        methods: {
            getlist () {
                this.$axios.post('api/v1/Getincomelist', {
                    user_id: this.user_id,
                    skip: this.updata.pageNumber,
                    maxperpage: this.updata.pageSize,
                    statustype: this.value1,
                    keyword: this.value,
                    datetype: this.value2,
                    monthkey: this.date
                }).then((e) => {
                    this.$toast.clear();
                    if (e.data.statuscode == 200) {
                        let list = e.data.list
                        this.loading = false;             //是否处于加载状态，加载过程中不触发load事件
                        if (list == null || list.length === 0) {
                            this.finished = true;           // 加载结束
                            return;
                        }
                        this.updata.pageNumber = e.data.skip;
                        this.list = this.list.concat(list); // 将新数据与老数据进行合并
                        this.split_total = e.data.split_total
                        this.split_total_count = e.data.split_total_count
                        this.split_self = e.data.split_self
                        this.split_self_count = e.data.split_self_count
                        this.split_mobile = e.data.split_mobile
                        this.split_mobile_count = e.data.split_mobile_count
                        this.split_h5 = e.data.split_h5
                        this.split_h5_count = e.data.split_h5_count
                        console.log(this.split_total)
                    } else {
                        this.finished = true;
                    }
                })
            },
            search () {
                this.updata.pageNumber = 0
                this.updata.pageSize = 20
                this.list = []
                this.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                    message: "Загрузка..."
                });
                this.getlist()
            },
            onLoad() {
                this.getlist();
            },
            onchange (e) {
                if (e == '-1') {
                    this.show = true
                }
                this.list = []
                this.updata.pageNumber = 0
                this.updata.pageSize = 20
                this.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                    message: "Загрузка..."
                });
                this.getlist()
            },
            onchange1 (e) {
                this.value1 = e
                this.list = []
                this.updata.pageNumber = 0
                this.updata.pageSize = 20
                this.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                    message: "Загрузка..."
                });
                this.getlist()
            },
            //确认时间
            confirmdate (value) {
                this.show = false
                let year = value.getFullYear()
                let month = Number(value.getMonth()) + 1
                this.date = year + '-' + month
                this.list = []
                this.getlist()
            },
            //时间取消
            cancel () {
                this.show = false
            },
            //下拉刷新
            onRefresh() {
                setTimeout(() => {
                    this.updata.pageNumber = 0
                    this.updata.pageSize = 20
                    this.list = []
                    this.getlist();
                    this.isLoading = false;
                }, 1000);
            },
        }
    }
</script>

<style scoped>
    .van-list >>> .van-list__finished-text {
        display: none;
    }
    .refresh {
        background-color: #eee;
        height: calc( 100vh - 100px );
        overflow-y:auto;
    }
    .sel >>> .van-dropdown-menu__bar {
        box-shadow: unset;
        border-bottom: 1px #eee solid;
        border-top: 1px #eee solid;
    }
    .count {
        background-color: #ffffff;
        padding: 10px 0;
    }
    .all {
        padding: 10px 20px;
        text-align: left;
    }
    .all span{
        display: inline-block;
        font-size: 28px;
        font-weight: 500;
        margin-right: 20px;
    }
    .all .money {
        color: #ff362c;
        margin-right: 50px;
    }
    .list {
        margin-top: 10px;
        padding: 20px 5px 10px 5px;
        background-color: #ffffff;
        border-radius: 15px;
    }
    .list .top {
        display: flex;
        border-bottom: 1px #eeeeee solid;
        padding-bottom: 15px;
    }
    .top h3 {
        margin: unset;
        padding-left: 35px;
        font-weight: 500;
        font-size: 40px;
        display:flex;
        align-items:flex-end;
        color: #019046;
    }
    .top .unit {
        display: inline-block;
        font-size: 28px;
        margin-left: 10px;
        display:flex;
        align-items:flex-end;
    }
    .top .status {
        margin-left: auto;
        text-align: center;
        font-size: 38px;
        padding-right: 15px;
        color: #019046;
    }
    .second {
        display: flex;
        border-bottom: 1px #eeeeee solid;
    }
    .second span {
        display: inline-block;
        padding: 15px 0;
    }
    .proname {
        margin-left: 15px;
        margin-right: 10px;
    }
    .text {
        font-size: 26px;
        color: #a0a0a0;
    }
    .right {
        display: flex;
        margin-left: auto;
        margin-right: 15px;
    }
    .right img {
        height: 30px;
        width: 30px;
        padding: 10px 0;
        margin-right: 12px;
    }
    .prome {
        margin-right: 10px;
    }
    .date {
        margin-left: 15px;
    }
    .bottom {
        border-bottom: unset;
        padding: 20px 15px 0 15px;
        display: flex;
        align-items: center;
    }
    .bottom img {
        width: 30px;
        height: 30px;
        align-items: center;
        vertical-align: middle;
    }
    .bottom p {
        flex: 1;
        margin: 0 0 0 12px;
        text-overflow: ellipsis;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 26px;
        word-break: break-all;
        text-align: left;
        line-height: 36px;
    }
</style>