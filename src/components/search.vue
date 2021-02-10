<template>
    <div>
        <div id="header">
            <img src="../assets/image/back.png" @click="back">
            <van-search v-model="value" autofocus placeholder="поиска товар" @search="search" />
        </div>
        <div class="content">
            <div class="mine" v-show="show">
                <div class="title">
                    <span>история поиска</span>
                    <img src="../assets/image/shanchu_gray.png">
                </div>
                <div class="keywords">
                    <span>носок</span><span>носок</span><span>носок</span><span>носок</span>
                </div>
            </div>
            <div class="history">
                <p>Поиск найден</p>
                <div class="keywords">
                    <span v-for="(v, k) in keywords" :key="k" @click="goods(v)">{{v}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "search",
        data () {
            return {
                title: 'Мой заказ',
                value: '',
                show: false,
                keywords: []
            }
        },
        components: {
        },
        mounted() {
            this.getkeywords()
        },
        methods: {
            //搜索
            search () {
                if (this.value == '') {
                    return
                }
                this.$router.push({
                    path: './goods',
                    query: {
                        keyword: this.value
                    }
                })
            },
            goods (val) {
                this.$router.push({
                    path: './goods',
                    query: {
                        keyword: val
                    }
                })
            },
            //返回
            back () {
                this.$router.back()
            },
            getkeywords () {
                this.$axios.post('api/v1/getSearchKeyword').then((e) => {
                    if (e.data.statuscode == 200) {
                        this.keywords = e.data.data
                    }
                })
            }
        }
    }
</script>

<style scoped>
    #header {
        height: 100px;
        background-color: #ef423a;
        margin: 0 auto;
        display: flex;
    }
    #header img{
        width: 40px;
        height: 40px;
        margin: 30px 0 30px 30px;
    }
    .van-search {
        width: 84%;
        padding: unset;
        margin: 0 auto;
        background-color: unset;
        border-radius: 50%;
    }
    .van-search__content {
        border-radius: 30px;
    }
    .content {
        height: calc( 100vh - 100px );
        overflow-y:auto;
    }
    .history, .mine {
        padding: 15px;
        text-align: left;
    }
    .history P {
        color: #a0a0a0;
        font-size: 15px;
    }
    .keywords {
        padding: 10px;
    }
    .keywords span {
        display: inline-block;
        border: 1px #eee solid;
        padding: 9px 15px;
        border-radius: 5px;
        margin: 0 15px 15px 0;
    }
    .mine {
        margin-top: 30px;
    }
    .title {
        display: flex;
    }
    .title span {
        color: #a0a0a0;
        font-size: 9px;
    }
    .title img {
        width: 5%;
        margin-left: auto;
    }
</style>