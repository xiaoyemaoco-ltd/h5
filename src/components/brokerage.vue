<template>
    <div>
        <Header :title="title"></Header>
        <div class="content">
            <div>
                <van-search v-model="value" placeholder="Пожалуйста, введите ключевые слова" />
                <van-dropdown-menu class="sel">
                    <van-dropdown-item v-model="value1" :options="option1" />
                    <van-dropdown-item v-model="value2" :options="option2" @change="onchange" />
                </van-dropdown-menu>

                <van-popup v-model="show" round position="bottom" style="z-index: 2113;" >
                    <van-datetime-picker v-model="currentDate" type="year-month" title="Выберите год и месяц" confirm-button-text="подтвердить"
                                         cancel-button-text="отменить" :min-date="minDate" :max-date="maxDate" @confirm="confirmdate" @cancel="cancel"/>
                </van-popup>
            </div>

            <div class="count">
                <div class="all">
                    <span>Все:</span>
                    <span class="money">0тг.</span>
                    <span>0шт.</span>
                </div>
                <div class="all">
                    <span>Все:</span>
                    <span class="money">0тг.</span>
                    <span>0 шт.</span>
                </div>
                <div class="all">
                    <span>Все:</span>
                    <span class="money">0тг.</span>
                    <span>0 шт.</span>
                </div>
                <div class="all">
                    <span>Все:</span>
                    <span class="money">0тг.</span>
                    <span>0 шт.</span>
                </div>
            </div>

            <div class="list">
                <div class="top">
                    <h3>420</h3>
                    <span class="unit">тг.</span>
                    <span class="status">yiwancheng</span>
                </div>
                <div class="second">
                    <span class="proname text">username:</span>
                    <span class="prome">2999</span>
                    <span class="text">тг.</span>
                    <div class="right">
                        <img src="../assets/image/fenxiang@2x.png" />
                        <span class="text">username</span>
                    </div>
                </div>

                <div class="second">
                    <span class="text date">11-07-2020 19:27</span>
                </div>

                <div class="second bottom">
                    <img src="../assets/image/icon-ok.png">
                    <p class="text date">12345645sfskafllasfks12345645sfskafllasfkskfksklklsdkfkkskfksdfkfkdkkfksklklsdkfkkskfksdfkfkdk</p>
                </div>
            </div>
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
                value2: 'e',
                option1: [
                    { text: 'Все', value: 0 },
                    { text: '新款商品', value: 1 },
                    { text: '活动商品', value: 2 },
                ],
                option2: [
                    { text: 'Все', value: 'a' },
                    { text: 'эа день', value: 'b' },
                    { text: 'эа неделя', value: 'c' },
                    { text: 'эа месяц', value: 'e' },
                    { text: 'период отбора', value: 'f' },
                ],
                minDate: new Date(2020, 1, 1),
                maxDate: new Date(2030, 10, 1),
                currentDate: new Date(),
                date: ''
            }
        },
        methods: {
            onchange (e) {
                console.log(e)
                if (e == 'f') {
                    this.show = true
                }
            },
            //确认时间
            confirmdate (value) {
                this.show = false
                let year = value.getFullYear()
                let month = Number(value.getMonth()) + 1
                this.date = year + '-' + month
            },
            //时间取消
            cancel () {
                this.show = false
            }
        }
    }
</script>

<style scoped>
    .content {
        background-color: #eeeeee;
        height: calc( 100vh - 100px);
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