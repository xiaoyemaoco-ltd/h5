<template>
    <div>
        <Header :title="title"></Header>
        <van-pull-refresh pulling-text="Потяните вниз, чтобы обновить" class="con" v-model="isLoading" @refresh="onRefresh"
                          success-text="Обновить успешно" loading-text="Загрузка..." loosing-text="Отпустите, чтобы обновить">
            <van-list
                v-model="loading"
                :finished="finished"
                loading-text="Загрузка..."
                @load="onLoad"
            >
                <div v-for="(v, k) in list" :key="k" id="skuattr" role="button" tabindex="0" class="van-cell van-cell--clickable"
                    @click="msgdetail(v.extras, v.isredirect, v.title, v.description, v.createtime_show)">
                    <div class="van-cell__title">
                        <p class="title">{{v.title}}</p>
                        <p class="content">{{v.description}}</p>
                        <p class="time">{{v.createtime_show}}</p>
                    </div>
                    <div class="icon">
                        <i class="van-icon van-icon-arrow van-cell__right-icon"><!----></i>
                    </div>
                </div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
    import Header from "./header";
export default {
    name: "stationletter",
    components: {Header},
    data () {
        return {
            title: 'Письмо станции',
            isLoading: false,
            list: [],
            loading: false,     //是否处于加载状态，加载过程中不触发load事件
            finished: false,    //是否已加载完成，加载完成后不再触发load事件
            updata:{
                pageNumber: 0,  //页码
                pageSize:20     //每页条数
            },
            user_id: 0,
        }
    },
    mounted() {
        let userinfo = JSON.parse(localStorage.getItem('userinfo'))
        if (!userinfo) {
            this.$router.push({
                path: './login',
                query: {
                    path: '/personal'
                }
            })
            return
        }
        this.user_id = userinfo.user_id
        this.updata.pageNumber = 0
        this.updata.pageSize = 20
    },
    methods: {
        onRefresh() {
            setTimeout(() => {
                this.list = []
                this.updata.pageNumber = 0
                this.updata.pageSize = 20
                this.getlist()
                this.isLoading = false;
            }, 1000);
        },

        getlist () {
            this.$axios.post('api/v1/Getusermsglist', {
                user_id: this.user_id,
                skip: this.updata.pageNumber,
                maxperpage: this.updata.pageSize,
            }).then((e) => {
                console.log(e)
                if (e.data.statuscode == 200) {
                    let list = e.data.list
                    this.loading = false;              //是否处于加载状态，加载过程中不触发load事件
                    if (list == null || list.length === 0) {
                        this.finished = true;           // 加载结束
                        return;
                    }
                    this.updata.pageNumber = e.data.skip;
                    this.list = this.list.concat(list); // 将新数据与老数据进行合并
                } else {
                    this.finished = true;
                }
            })
        },
        onLoad() {
            this.getlist();
        },
        msgdetail (goods, isredirect, title, desc, date) {
            if (isredirect == 1) {
                if (goods != '') {
                    let goods1 = JSON.parse(goods)
                    this.$router.push({
                        path: './goodsdetail',
                        query: {
                            goods_id: goods1.goods
                        }
                    })
                }
            } else {
                this.$router.push({
                    path: 'stationmsgdetail',
                    query: {
                        title: title,
                        desc: desc,
                        date: date
                    }
                })
            }
        }
    },
}
</script>

<style scoped>
    .con {
        height: calc( 100vh - 100px );
        overflow-y:auto;
    }
    #skuattr {
        display: flex;
        padding: 15px;
        text-align: left;
        border-bottom: 1px #eee solid;
    }
    .title {
        margin-top: 15px;
        font-weight: 600;
        font-size: 34px;
    }
    .content {
        margin-top: unset;
        color: #686868;
        word-break: break-all;
        margin-right: 15px;
    }
    .time {
        margin-bottom: unset;
    }
    .icon {
        margin: 0 auto;
    }
    .icon i {
        margin: 0 auto;
        position: relative; /*脱离文档流*/
        top: 50%; /*偏移*/
    }
</style>